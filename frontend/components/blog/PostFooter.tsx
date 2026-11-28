'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { AiOutlineLink, AiOutlineCheck } from 'react-icons/ai';
import { POSTS } from '@/lib/graphql/queries';

interface RelatedPost {
   id: string;
   title: string;
   slug: string;
   tags: string[] | null;
   createdAt: string;
}

interface PostsResult {
   posts: { items: RelatedPost[] };
}

interface PostFooterProps {
   postId: string;
   title: string;
   slug: string;
   sourceUrl: string | null;
   tags: string[] | null;
}

const formatDate = (iso: string): string =>
   new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

// Everything below a post: author card with a hire-me CTA, the LinkedIn
// discussion loop (posts mirror LinkedIn posts via sourceUrl), share buttons,
// and "Read next" suggestions. Goal: readers become contacts, or read one
// more post, instead of bouncing.
const PostFooter = ({ postId, title, slug, sourceUrl, tags }: PostFooterProps) => {
   const [copied, setCopied] = useState(false);
   const firstTag = tags?.[0];

   // Related by first tag; a second small query of latest posts fills the
   // gaps when the tag has too few siblings (both cheap: 10-post blog).
   const { data: tagData } = useQuery<PostsResult>(POSTS, {
      variables: { page: 1, perPage: 4, tag: firstTag },
      skip: !firstTag,
   });
   const { data: latestData } = useQuery<PostsResult>(POSTS, {
      variables: { page: 1, perPage: 4 },
   });

   const seen = new Set<string>([postId]);
   const related: RelatedPost[] = [];
   for (const post of [...(tagData?.posts.items ?? []), ...(latestData?.posts.items ?? [])]) {
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      related.push(post);
      if (related.length === 3) break;
   }

   const postUrl = () => `${window.location.origin}/blog/${slug}`;

   const shareLinkedIn = () =>
      window.open(
         `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl())}`,
         '_blank',
         'noopener'
      );

   const shareX = () =>
      window.open(
         `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl())}&text=${encodeURIComponent(title)}`,
         '_blank',
         'noopener'
      );

   const copyLink = async () => {
      try {
         await navigator.clipboard.writeText(postUrl());
         setCopied(true);
         window.setTimeout(() => setCopied(false), 2000);
      } catch {
         // clipboard unavailable (http, old browser): nothing to do
      }
   };

   // WHY div (not <footer>): footer.css styles the bare `footer` element
   // (accent gradient bg, centered text) for the site footer and it leaks
   // into any other <footer> on the page.
   return (
      <div className="post_footer">
         <div className="post_footer_author">
            <img
               src="/assets/najrul-avatar.webp"
               alt="MD Najrul Islam Sumon"
               className="post_footer_avatar"
            />
            <div className="post_footer_author_text">
               <span className="post_footer_author_label">Written by</span>
               <h4>MD Najrul Islam Sumon</h4>
               <p>
                  Full-stack developer building with Next.js, GraphQL and AI tooling. I write
                  about what I build and learn.
               </p>
            </div>
            <div className="post_footer_author_actions">
               <Link href="/" className="btn">
                  View Portfolio
               </Link>
               <Link href="/#contact" className="btn btn-primary">
                  Let&apos;s Talk
               </Link>
            </div>
         </div>

         <div className="post_footer_share">
            {sourceUrl && (
               <a href={sourceUrl} target="_blank" rel="noreferrer" className="post_footer_discuss">
                  <FaLinkedin /> Join the discussion on LinkedIn
               </a>
            )}
            <div className="post_footer_share_btns">
               <span className="post_footer_share_label">Share:</span>
               <button type="button" onClick={shareLinkedIn} aria-label="Share on LinkedIn">
                  <FaLinkedin />
               </button>
               <button type="button" onClick={shareX} aria-label="Share on X">
                  <FaTwitter />
               </button>
               <button type="button" onClick={copyLink} aria-label="Copy link">
                  {copied ? <AiOutlineCheck /> : <AiOutlineLink />}
               </button>
               {copied && <span className="post_footer_copied">Copied!</span>}
            </div>
         </div>

         {related.length > 0 && (
            <div className="post_footer_next">
               <h4 className="post_footer_next_title">Read next</h4>
               <div className="post_footer_next_grid">
                  {related.map((post) => (
                     <Link key={post.id} href={`/blog/${post.slug}`} className="post_footer_next_card">
                        <h5>{post.title}</h5>
                        <span>
                           {formatDate(post.createdAt)}
                           {post.tags?.[0] ? ` · #${post.tags[0]}` : ''}
                        </span>
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default PostFooter;
