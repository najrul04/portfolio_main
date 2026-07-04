'use client';

import { lazy, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { POST_BY_SLUG } from '@/lib/graphql/queries';
import SourceBadge from '@/components/blog/SourceBadge';

// Lazy-load the markdown renderer — ~55kb of markdown libs only ship when a
// visitor actually opens a post.
const PostPreview = lazy(() => import('@/components/blog/PostPreview'));

interface Post {
   id: string;
   title: string;
   slug: string;
   content: string;
   excerpt: string | null;
   coverImage: string | null;
   sourceUrl: string | null;
   tags: string[] | null;
   createdAt: string;
   updatedAt: string;
}

interface PostResult {
   post: Post | null;
}

const formatDate = (iso: string): string =>
   new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });

// Standalone post view. Mounted at /blog/[slug] so each post has its own URL —
// shareable, bookmarkable, and openable in a new tab from the list.
const BlogPost = () => {
   const params = useParams<{ slug: string }>();
   const slug = params.slug;
   const router = useRouter();
   const { data, loading, error } = useQuery<PostResult>(POST_BY_SLUG, {
      variables: { slug },
   });
   const post = data?.post;

   return (
      <section className="blog_section">
         <div className="blog_container">
            <header className="blog_header">
               <button
                  type="button"
                  className="btn blog_back_btn"
                  onClick={() => router.push('/blog')}
               >
                  <AiOutlineArrowLeft /> Back
               </button>
               <h2 className="blog_header_title">
                  {post?.title || (loading ? 'Loading…' : 'Post')}
               </h2>
               <span aria-hidden />
            </header>

            {loading && <p className="text-light blog_status">Loading post…</p>}
            {error && <div className="blog_error">Couldn&apos;t load this post.</div>}
            {!loading && !post && !error && (
               <div className="blog_empty">
                  <h3>Post not found</h3>
                  <p>It may have been unpublished or removed.</p>
               </div>
            )}

            {post && (
               <motion.article
                  className="blog_view"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
               >
                  <div className="blog_view_meta">
                     <span>{formatDate(post.createdAt)}</span>
                     {post.tags && post.tags.length > 0 && (
                        <div className="blog_tags">
                           {post.tags.map((tag) => (
                              <span key={tag} className="blog_tag">
                                 {tag}
                              </span>
                           ))}
                        </div>
                     )}
                     {post.sourceUrl && (
                        <SourceBadge url={post.sourceUrl} className="blog_source_link--inline" />
                     )}
                  </div>
                  {post.coverImage && (
                     <img
                        src={post.coverImage}
                        alt=""
                        className="blog_view_cover"
                        loading="lazy"
                     />
                  )}
                  <Suspense fallback={<p className="text-light">Loading…</p>}>
                     <PostPreview content={post.content} />
                  </Suspense>
               </motion.article>
            )}
         </div>
      </section>
   );
};

export default BlogPost;
