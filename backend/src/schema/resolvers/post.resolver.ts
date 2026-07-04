import { GraphQLError } from 'graphql';
import type { Post } from '@prisma/client';
import type { GraphQLContext } from '../../context';

interface PostInput {
   title: string;
   slug: string;
   content: string;
   excerpt: string;
   coverImage?: string | null;
   sourceUrl?: string | null;
   tags: string[];
   published?: boolean | null;
}

// Throws if the request has no authenticated admin. Used to guard write resolvers.
// Why a helper: every admin mutation needs the same check — DRY it once.
const requireAuth = (ctx: GraphQLContext) => {
   if (!ctx.user) {
      throw new GraphQLError('Not authenticated', {
         extensions: { code: 'UNAUTHENTICATED' },
      });
   }
};

// Prisma's DateTime fields serialize as Date objects. GraphQL's String scalar
// can't accept Date directly — we ISO-stringify on the way out.
// Why centralize: every Post returned needs this; missing one would crash the resolver.
const serializePost = (post: Post) => ({
   ...post,
   createdAt: post.createdAt.toISOString(),
   updatedAt: post.updatedAt.toISOString(),
});

// Normalizes tag input regardless of how the author typed it: splits every
// element on commas AND whitespace, strips leading '#', drops empties, dedupes.
// WHY here (not just the form): the DB must never store '#A #B' as one tag
// again, no matter which client sends it. The migration
// 20260705120000 repaired historical rows the same way.
const normalizeTags = (tags: string[]): string[] => {
   const clean = tags
      .flatMap((t) => t.split(/[,\s]+/))
      .map((t) => t.replace(/^#+/, '').trim())
      .filter(Boolean);
   return [...new Set(clean)];
};

// Pulls the first markdown image URL out of a post body.
// Why regex (not a markdown parser): we only need the first `![alt](url)` token
// and the cost of importing remark just for this would be silly. The pattern
// stays conservative — won't match HTML <img> or nested parens in URLs.
const extractFirstImageUrl = (markdown: string | null | undefined): string | null => {
   if (!markdown) return null;
   const match = markdown.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
   return match ? match[1] : null;
};

export const postResolvers = {
   // Field-level resolver — runs lazily, only when a query selects `thumbnailUrl`.
   // Parent here is the Post row Prisma returned (includes content), so no extra DB hit.
   Post: {
      thumbnailUrl: (parent: Post): string | null =>
         parent.coverImage ?? extractFirstImageUrl(parent.content),
   },

   Query: {
      posts: async (
         _: unknown,
         args: {
            page?: number | null;
            perPage?: number | null;
            tag?: string | null;
            search?: string | null;
         },
         ctx: GraphQLContext
      ) => {
         // Clamp inputs — never trust client values for skip/take.
         // perPage upper bound (50) prevents a malicious caller from asking
         // for a million rows in one shot.
         const page = Math.max(1, args.page ?? 1);
         const perPage = Math.min(50, Math.max(1, args.perPage ?? 10));
         const skip = (page - 1) * perPage;

         // Filters run in Postgres (not in JS) so pagination + total stay
         // correct: page 2 of a tag filter is page 2 of MATCHING posts.
         const tag = args.tag?.trim();
         const search = args.search?.trim();
         const where = {
            published: true,
            ...(tag ? { tags: { has: tag } } : {}),
            ...(search
               ? {
                    OR: [
                       { title: { contains: search, mode: 'insensitive' as const } },
                       { excerpt: { contains: search, mode: 'insensitive' as const } },
                    ],
                 }
               : {}),
         };

         // Parallel: row fetch + count. Saves one round-trip's worth of latency.
         const [posts, total] = await Promise.all([
            ctx.prisma.post.findMany({
               where,
               orderBy: { createdAt: 'desc' },
               skip,
               take: perPage,
            }),
            ctx.prisma.post.count({ where }),
         ]);

         const totalPages = Math.max(1, Math.ceil(total / perPage));
         return {
            items: posts.map(serializePost),
            total,
            page,
            perPage,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
         };
      },

      tags: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
         // Distinct tags across published posts only — the public filter must
         // not leak tags that exist solely on drafts. Post count is small
         // (personal blog), so flatten-in-JS beats a raw SQL unnest for clarity.
         const rows = await ctx.prisma.post.findMany({
            where: { published: true },
            select: { tags: true },
         });
         return [...new Set(rows.flatMap((r) => r.tags))].sort((a, b) =>
            a.localeCompare(b)
         );
      },

      post: async (_: unknown, { slug }: { slug: string }, ctx: GraphQLContext) => {
         const post = await ctx.prisma.post.findUnique({ where: { slug } });
         // Public endpoint — drafts return null, same as missing posts (don't leak existence).
         if (!post || !post.published) return null;
         return serializePost(post);
      },

      allPosts: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
         requireAuth(ctx);
         const posts = await ctx.prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
         return posts.map(serializePost);
      },

      postById: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
         requireAuth(ctx);
         const post = await ctx.prisma.post.findUnique({ where: { id } });
         return post ? serializePost(post) : null;
      },
   },

   Mutation: {
      createPost: async (_: unknown, { input }: { input: PostInput }, ctx: GraphQLContext) => {
         requireAuth(ctx);
         // number = max+1: creation-order numbering that never renumbers on
         // delete. Read-then-write race is fine for a single-admin blog.
         const maxAgg = await ctx.prisma.post.aggregate({ _max: { number: true } });
         const created = await ctx.prisma.post.create({
            data: {
               number: (maxAgg._max.number ?? 0) + 1,
               title: input.title,
               slug: input.slug,
               content: input.content,
               excerpt: input.excerpt,
               coverImage: input.coverImage ?? null,
               sourceUrl: input.sourceUrl?.trim() || null,
               tags: normalizeTags(input.tags),
               published: input.published ?? false,
            },
         });
         return serializePost(created);
      },

      updatePost: async (
         _: unknown,
         { id, input }: { id: string; input: PostInput },
         ctx: GraphQLContext
      ) => {
         requireAuth(ctx);
         const updated = await ctx.prisma.post.update({
            where: { id },
            data: {
               title: input.title,
               slug: input.slug,
               content: input.content,
               excerpt: input.excerpt,
               coverImage: input.coverImage ?? null,
               sourceUrl: input.sourceUrl?.trim() || null,
               tags: normalizeTags(input.tags),
               // `?? undefined` so omitting `published` leaves it untouched
               // (passing null would clear it, which we don't want).
               published: input.published ?? undefined,
            },
         });
         return serializePost(updated);
      },

      deletePost: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
         requireAuth(ctx);
         await ctx.prisma.post.delete({ where: { id } });
         return true;
      },

      togglePublish: async (_: unknown, { id }: { id: string }, ctx: GraphQLContext) => {
         requireAuth(ctx);
         // Read-then-write so we can flip whatever the current value is.
         // Race condition is acceptable here: only one admin, rare concurrent edits.
         const existing = await ctx.prisma.post.findUnique({ where: { id } });
         if (!existing) {
            throw new GraphQLError('Post not found', { extensions: { code: 'NOT_FOUND' } });
         }
         const updated = await ctx.prisma.post.update({
            where: { id },
            data: { published: !existing.published },
         });
         return serializePost(updated);
      },
   },
};
