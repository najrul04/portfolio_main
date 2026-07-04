'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
   AiOutlineArrowLeft,
   AiOutlineUnorderedList,
   AiOutlineAppstore,
} from 'react-icons/ai';
import { POSTS } from '@/lib/graphql/queries';
import Pagination from '@/components/blog/Pagination';

const POSTS_PER_PAGE = 10;
const VIEW_MODE_KEY = 'blog_view_mode';

interface PostListItem {
   id: string;
   title: string;
   slug: string;
   excerpt: string | null;
   thumbnailUrl: string | null;
   content: string | null;
   tags: string[] | null;
   createdAt: string;
}

interface PostsPage {
   items: PostListItem[];
   total: number;
   page: number;
   perPage: number;
   totalPages: number;
   hasNext: boolean;
   hasPrev: boolean;
}

interface PostsResult {
   posts: PostsPage;
}

const formatDate = (iso: string): string =>
   new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });

// Naive markdown → plain text for the no-image card preview.
// Not perfect (won't handle every edge case), but cheap and good enough
// for a short visible snippet. Heavier parsers belong in the full post view.
const stripMarkdown = (md: string): string =>
   md
      .replace(/```[\s\S]*?```/g, '')      // fenced code blocks
      .replace(/`[^`]*`/g, '')              // inline code
      .replace(/!\[.*?\]\(.*?\)/g, '')      // images
      .replace(/\[([^\]]*?)\]\([^)]*?\)/g, '$1')  // links → link text
      .replace(/^>\s?/gm, '')               // blockquote markers
      .replace(/^#{1,6}\s+/gm, '')          // heading markers
      .replace(/[*_~]+/g, '')               // bold/italic/strike chars
      .replace(/\s+/g, ' ')                 // collapse whitespace
      .trim();

// Public-facing list. Read-only — no edit, delete, or new buttons.
// Why a separate page from /admin: visitors should never see admin chrome,
// even momentarily. Splitting the routes also means lighter JS for visitors
// (no PostForm or auth code in this page's chunk).
const Blog = () => {
   const router = useRouter();
   const [page, setPage] = useState(1);
   // Lazy initializer reads localStorage once on mount instead of every render.
   // Guarded for SSR-safety. Default is grid: visitors should see more posts at
   // a glance; only honour 'list' when the user has explicitly opted in.
   const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
      if (typeof window === 'undefined') return 'grid';
      return window.localStorage.getItem(VIEW_MODE_KEY) === 'list' ? 'list' : 'grid';
   });

   useEffect(() => {
      window.localStorage.setItem(VIEW_MODE_KEY, viewMode);
   }, [viewMode]);

   // Apollo caches per-variable-set, so navigating back to a previously-seen
   // page is instant. cache-and-network (default) refetches in the background
   // so newly published posts surface without a manual refresh.
   const { data, loading, error } = useQuery<PostsResult>(POSTS, {
      variables: { page, perPage: POSTS_PER_PAGE },
   });

   const handlePageChange = (nextPage: number) => {
      setPage(nextPage);
      // Scroll back to the top of the list so the user doesn't have to —
      // smooth feels less jarring than instant when paginating quickly.
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const postsPage = data?.posts;
   const items = postsPage?.items ?? [];

   return (
      <section className="blog_section">
         <div className={`blog_container ${viewMode === 'grid' ? 'blog_container--wide' : ''}`}>
            <header className="blog_header">
               <button
                  type="button"
                  className="btn blog_back_btn"
                  onClick={() => router.push('/')}
               >
                  <AiOutlineArrowLeft /> Back
               </button>
               <h2 className="blog_header_title">Blogs</h2>
               {/* Right column of the 1fr auto 1fr header grid — keeps the title
                   centered while giving the layout toggle a home. */}
               <div className="blog_view_toggle" role="group" aria-label="Layout">
                  <button
                     type="button"
                     className={`blog_view_toggle_btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                     onClick={() => setViewMode('grid')}
                     aria-pressed={viewMode === 'grid'}
                     aria-label="Grid view"
                     title="Grid view"
                  >
                     <AiOutlineAppstore />
                  </button>
                  <button
                     type="button"
                     className={`blog_view_toggle_btn ${viewMode === 'list' ? 'is-active' : ''}`}
                     onClick={() => setViewMode('list')}
                     aria-pressed={viewMode === 'list'}
                     aria-label="List view"
                     title="List view"
                  >
                     <AiOutlineUnorderedList />
                  </button>
               </div>
            </header>

            {loading && <p className="text-light blog_status">Loading posts…</p>}

            {error && (
               <div className="blog_error">
                  Couldn&apos;t load posts. Make sure the backend is running on{' '}
                  <code>{process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4001/graphql'}</code>.
               </div>
            )}

            {!loading && !error && items.length === 0 && (
               <div className="blog_empty">
                  <h3>No posts yet</h3>
                  <p>Check back soon — first post coming up.</p>
               </div>
            )}

            {items.length > 0 && postsPage && (
               <>
                  <ul className={`blog_list ${viewMode === 'grid' ? 'blog_list--grid' : ''}`}>
                     {items.map((post, idx) => (
                        // Subtle fade-up on mount. Stagger by index gives a cascade
                        // feel; capped at ~0.35s total so it never feels slow when
                        // a full page of 10 posts loads. Replays on pagination
                        // because new post IDs unmount/remount the <motion.li>s.
                        <motion.li
                           key={post.id}
                           className="blog_card"
                           initial={{ opacity: 0, y: 12 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{
                              duration: 0.3,
                              delay: Math.min(idx * 0.05, 0.35),
                              ease: 'easeOut',
                           }}
                        >
                           {/* Link (not button) so the post opens in a new tab and
                               is shareable as a real URL. rel=noopener stops the new
                               tab from getting window.opener access for security. */}
                           <Link
                              className="blog_card_body"
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              {post.thumbnailUrl && (
                                 <img
                                    src={post.thumbnailUrl}
                                    alt=""
                                    className="blog_card_cover"
                                    loading="lazy"
                                 />
                              )}
                              <h3>{post.title}</h3>
                              {post.excerpt && <p className="blog_excerpt">{post.excerpt}</p>}
                              {/* No-image fallback: show a stripped preview of the
                                  body so the card doesn't look empty in grid mode.
                                  flex-grow on this block pushes meta to the bottom,
                                  so cards in the same row end up the same height. */}
                              {!post.thumbnailUrl && post.content && (
                                 <p className="blog_card_preview">
                                    {stripMarkdown(post.content)}
                                 </p>
                              )}
                              <div className="blog_card_meta">
                                 <small className="text-light">{formatDate(post.createdAt)}</small>
                                 {post.tags && post.tags.length > 0 && (
                                    <div className="blog_tags">
                                       {post.tags.map((tag) => (
                                          <span key={tag} className="blog_tag">
                                             {tag}
                                          </span>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           </Link>
                        </motion.li>
                     ))}
                  </ul>

                  <Pagination
                     currentPage={postsPage.page}
                     totalPages={postsPage.totalPages}
                     onPageChange={handlePageChange}
                  />
               </>
            )}
         </div>
      </section>
   );
};

export default Blog;
