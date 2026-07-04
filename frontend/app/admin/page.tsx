'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
   AiOutlinePlus,
   AiOutlineDelete,
   AiOutlineEdit,
   AiOutlineArrowLeft,
   AiOutlineLogout,
   AiOutlineEye,
   AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { useAuth } from '@/lib/auth-context';
import { ALL_POSTS, POST_BY_ID } from '@/lib/graphql/queries';
import {
   CREATE_POST,
   UPDATE_POST,
   DELETE_POST,
   TOGGLE_PUBLISH,
} from '@/lib/graphql/mutations';
import LoginForm from '@/components/blog/LoginForm';
import PostForm, {
   type PostFormInitial,
   type PostFormValues,
} from '@/components/blog/PostForm';

interface AdminPost {
   id: string;
   title: string;
   slug: string;
   excerpt: string | null;
   tags: string[] | null;
   published: boolean;
   createdAt: string;
   updatedAt: string;
}

interface AllPostsResult {
   allPosts: AdminPost[];
}

interface PostByIdResult {
   postById: (PostFormInitial & { id: string }) | null;
}

const formatDate = (iso: string): string =>
   new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });

// Three-mode container: list | new | edit. Same pattern as the old Blog.jsx,
// but now backed by GraphQL mutations and gated by auth.
const Admin = () => {
   const { isAuthenticated, email, logout } = useAuth();

   if (!isAuthenticated) {
      return (
         <section className="admin_section">
            <div className="admin_container">
               <header className="admin_header">
                  <div>
                     <h5>Admin</h5>
                     <h2>Sign in to manage posts</h2>
                  </div>
               </header>
               <LoginForm />
            </div>
         </section>
      );
   }

   return (
      <section className="admin_section">
         <div className="admin_container">
            <AdminHeader email={email} onLogout={logout} />
            <AdminPanel />
         </div>
      </section>
   );
};

interface AdminHeaderProps {
   email: string | null;
   onLogout: () => void;
}

const AdminHeader = ({ email, onLogout }: AdminHeaderProps) => (
   <header className="admin_header">
      <div>
         <h5>Admin</h5>
         <h2>Manage Posts</h2>
      </div>
      <div className="admin_header_right">
         <span className="admin_email" title={email ?? undefined}>
            {email}
         </span>
         <button className="btn admin_action_btn" onClick={onLogout}>
            <AiOutlineLogout /> Sign out
         </button>
      </div>
   </header>
);

type AdminMode = 'list' | 'new' | 'edit';
type StatusFilter = 'all' | 'published' | 'draft';

const AdminPanel = () => {
   const [mode, setMode] = useState<AdminMode>('list');
   const [editingId, setEditingId] = useState<string | null>(null);

   // List filters — client-side. WHY: the admin list is small (all posts are
   // already fetched for the table), so filtering in the browser is instant
   // and needs no new GraphQL surface.
   const [query, setQuery] = useState('');
   const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

   // List query — admin sees drafts too. cache-and-network (default policy)
   // means stale data shows immediately while a fresh fetch refills.
   const {
      data: listData,
      loading: listLoading,
      error: listError,
      refetch: refetchList,
   } = useQuery<AllPostsResult>(ALL_POSTS, { skip: mode !== 'list' });

   // Edit mode — fetch a single post by id to pre-fill the form.
   const {
      data: editData,
      loading: editLoading,
      error: editError,
   } = useQuery<PostByIdResult>(POST_BY_ID, {
      skip: mode !== 'edit' || !editingId,
      variables: { id: editingId },
      fetchPolicy: 'network-only', // always fetch fresh content for editing
   });

   const [createPost, { loading: creating }] = useMutation(CREATE_POST, {
      refetchQueries: [{ query: ALL_POSTS }],
   });
   const [updatePost, { loading: updating }] = useMutation(UPDATE_POST, {
      refetchQueries: [{ query: ALL_POSTS }],
   });
   const [deletePost] = useMutation(DELETE_POST, {
      refetchQueries: [{ query: ALL_POSTS }],
   });
   const [togglePublish] = useMutation(TOGGLE_PUBLISH);

   const goList = () => {
      setEditingId(null);
      setMode('list');
   };

   const handleCreate = async (input: PostFormValues) => {
      try {
         await createPost({ variables: { input } });
         goList();
      } catch (err) {
         // GraphQL errors already surface via the mutation result; this catch
         // exists because Apollo throws on transport-level failures (network down).
         window.alert(`Couldn't save: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
   };

   const handleUpdate = async (input: PostFormValues) => {
      try {
         await updatePost({ variables: { id: editingId, input } });
         goList();
      } catch (err) {
         window.alert(`Couldn't save: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
   };

   const handleDelete = async (id: string) => {
      if (!window.confirm('Delete this post? This cannot be undone.')) return;
      try {
         await deletePost({ variables: { id } });
      } catch (err) {
         window.alert(`Couldn't delete: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
   };

   const handleTogglePublish = async (id: string) => {
      try {
         await togglePublish({ variables: { id } });
         // togglePublish returns { id, published } — Apollo writes that into
         // the cache, but ALL_POSTS includes it too. Refetch to keep order
         // accurate after publish state changes.
         await refetchList();
      } catch (err) {
         window.alert(`Couldn't toggle: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
   };

   if (mode === 'new') {
      return (
         <>
            <button className="btn admin_back_btn" onClick={goList}>
               <AiOutlineArrowLeft /> Back to posts
            </button>
            <PostForm
               onSubmit={handleCreate}
               onCancel={goList}
               submitting={creating}
               submitLabel="Publish post"
            />
         </>
      );
   }

   if (mode === 'edit') {
      return (
         <>
            <button className="btn admin_back_btn" onClick={goList}>
               <AiOutlineArrowLeft /> Back to posts
            </button>
            {editLoading && <p className="text-light">Loading post…</p>}
            {editError && <div className="admin_error">Couldn&apos;t load that post.</div>}
            {editData?.postById && (
               <PostForm
                  initial={editData.postById}
                  onSubmit={handleUpdate}
                  onCancel={goList}
                  submitting={updating}
                  submitLabel="Save changes"
               />
            )}
         </>
      );
   }

   // mode === 'list'
   const posts = listData?.allPosts ?? [];

   const q = query.trim().toLowerCase();
   const visiblePosts = posts.filter((post) => {
      const matchesQuery =
         !q ||
         post.title.toLowerCase().includes(q) ||
         post.slug.toLowerCase().includes(q) ||
         (post.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
      const matchesStatus =
         statusFilter === 'all' || (statusFilter === 'published') === post.published;
      return matchesQuery && matchesStatus;
   });

   return (
      <>
         <div className="admin_toolbar">
            <div className="admin_filters">
               <input
                  type="search"
                  className="admin_search"
                  placeholder="Search by title, slug or tag…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search posts"
               />
               {/* Wrapper draws the custom dropdown chevron (see admin.css) */}
               <span className="admin_select_wrap">
                  <select
                     className="admin_filter_select"
                     value={statusFilter}
                     onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                     aria-label="Filter by status"
                  >
                     <option value="all">All statuses</option>
                     <option value="published">Published</option>
                     <option value="draft">Drafts</option>
                  </select>
               </span>
            </div>
            <button className="btn btn-primary admin_action_btn" onClick={() => setMode('new')}>
               <AiOutlinePlus /> New post
            </button>
         </div>

         {listLoading && <p className="text-light">Loading posts…</p>}
         {listError && (
            <div className="admin_error">
               Couldn&apos;t load posts.{' '}
               {listError.message?.includes('Not authenticated')
                  ? 'Your session expired — please sign in again.'
                  : 'Check that the backend is running.'}
            </div>
         )}

         {!listLoading && !listError && posts.length === 0 && (
            <div className="blog_empty">
               <h3>No posts yet</h3>
               <p>Click <b>New post</b> to write your first one.</p>
            </div>
         )}

         {!listLoading && !listError && posts.length > 0 && visiblePosts.length === 0 && (
            <div className="blog_empty">
               <h3>No matching posts</h3>
               <p>Try a different search or status filter.</p>
            </div>
         )}

         {visiblePosts.length > 0 && (
            <table className="admin_table">
               <thead>
                  <tr>
                     <th className="admin_col_num">#</th>
                     <th>Title</th>
                     <th className="admin_col_status">Status</th>
                     <th className="admin_col_date">Updated</th>
                     <th className="admin_col_actions">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {visiblePosts.map((post, index) => (
                     <tr key={post.id}>
                        <td className="admin_col_num text-light">{index + 1}</td>
                        <td>
                           <div className="admin_post_title">{post.title}</div>
                           <div className="admin_post_slug text-light">/{post.slug}</div>
                        </td>
                        <td>
                           <span
                              className={`admin_status ${
                                 post.published
                                    ? 'admin_status--published'
                                    : 'admin_status--draft'
                              }`}
                           >
                              {post.published ? 'Published' : 'Draft'}
                           </span>
                        </td>
                        <td className="text-light admin_col_date">
                           {formatDate(post.updatedAt)}
                        </td>
                        <td className="admin_col_actions">
                           {/* WHY a wrapper: flex must live INSIDE the cell — putting
                               display:flex on the <td> itself breaks table-cell layout
                               and ejects the buttons out of the table. */}
                           <div className="admin_actions">
                              <button
                                 className="blog_icon_btn"
                                 onClick={() => handleTogglePublish(post.id)}
                                 title={post.published ? 'Unpublish' : 'Publish'}
                              >
                                 {post.published ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                              </button>
                              <button
                                 className="blog_icon_btn"
                                 onClick={() => {
                                    setEditingId(post.id);
                                    setMode('edit');
                                 }}
                                 title="Edit"
                              >
                                 <AiOutlineEdit />
                              </button>
                              <button
                                 className="blog_icon_btn blog_icon_btn--danger"
                                 onClick={() => handleDelete(post.id)}
                                 title="Delete"
                              >
                                 <AiOutlineDelete />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </>
   );
};

export default Admin;
