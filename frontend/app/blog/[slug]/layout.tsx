import type { Metadata } from 'next';

// Server-side metadata for each post: without this, a blog link shared on
// LinkedIn/X/WhatsApp shows as a bare URL. The page itself is a client
// component (Apollo), so the OG fetch happens here with a plain POST to the
// GraphQL endpoint — no Apollo on the server.

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:4000/graphql';
const SITE_URL = 'https://najrul.com';

interface OgPost {
   title: string;
   excerpt: string | null;
   coverImage: string | null;
}

const fetchPostMeta = async (slug: string): Promise<OgPost | null> => {
   try {
      const res = await fetch(GRAPHQL_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            query: `query OgPost($slug: String!) { post(slug: $slug) { title excerpt coverImage } }`,
            variables: { slug },
         }),
         // WHY revalidate: the backend free tier sleeps; caching metadata for
         // 5 minutes keeps crawlers fast and spares the backend.
         next: { revalidate: 300 },
      });
      if (!res.ok) return null;
      const json = (await res.json()) as { data?: { post?: OgPost | null } };
      return json.data?.post ?? null;
   } catch {
      // Backend asleep/unreachable: fall back to generic metadata rather
      // than failing the page.
      return null;
   }
};

// OG images must be absolute URLs; cover images may be stored relative to
// the backend's REST image route.
const absoluteImage = (src: string | null): string | null => {
   if (!src) return null;
   if (src.startsWith('http')) return src;
   const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
   return apiUrl ? `${apiUrl}${src.startsWith('/') ? '' : '/'}${src}` : null;
};

export async function generateMetadata({
   params,
}: {
   params: { slug: string };
}): Promise<Metadata> {
   const post = await fetchPostMeta(params.slug);
   const title = post?.title ?? 'Blog | MD Najrul Islam Sumon';
   const description =
      post?.excerpt ?? 'Posts on full-stack development by MD Najrul Islam Sumon.';
   const image = absoluteImage(post?.coverImage ?? null);

   return {
      title: post ? `${post.title} | MD Najrul Islam Sumon` : title,
      description,
      openGraph: {
         type: 'article',
         url: `${SITE_URL}/blog/${params.slug}`,
         title,
         description,
         siteName: 'MD Najrul Islam Sumon | Portfolio',
         ...(image ? { images: [{ url: image }] } : {}),
      },
      twitter: {
         card: image ? 'summary_large_image' : 'summary',
         title,
         description,
         ...(image ? { images: [image] } : {}),
      },
   };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
   return children;
}
