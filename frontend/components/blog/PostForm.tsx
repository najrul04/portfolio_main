'use client';

import { useState, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { generateSlug } from '@/lib/utils/slug';

// Shared form for create + edit. Same fields, same validation — driven by the
// `initial` prop. Returning the cleaned values via onSubmit keeps the form
// agnostic to whether create or update is being called.

// Shape of a stored post passed in via `initial` (subset of the GraphQL Post).
export interface PostFormInitial {
   title?: string | null;
   slug?: string | null;
   excerpt?: string | null;
   coverImage?: string | null;
   sourceUrl?: string | null;
   tags?: string[] | null;
   content?: string | null;
   published?: boolean | null;
}

// Cleaned values handed back to the caller on submit.
export interface PostFormValues {
   title: string;
   slug: string;
   excerpt: string;
   coverImage: string | null;
   sourceUrl: string | null;
   tags: string[];
   content: string;
   published: boolean;
}

interface PostDraft {
   title: string;
   slug: string;
   excerpt: string;
   coverImage: string;
   sourceUrl: string;
   tags: string; // comma-separated string in the form, split on submit
   content: string;
   published: boolean;
}

interface PostFormProps {
   initial?: PostFormInitial;
   onSubmit: (values: PostFormValues) => void;
   onCancel: () => void;
   submitting?: boolean;
   submitLabel?: string;
}

const emptyDraft: PostDraft = {
   title: '',
   slug: '',
   excerpt: '',
   coverImage: '',
   sourceUrl: '',
   tags: '',
   content: '',
   published: false,
};

// Convert a stored post (from GraphQL) → form-friendly draft.
const postToDraft = (post: PostFormInitial): PostDraft => ({
   title: post.title ?? '',
   slug: post.slug ?? '',
   excerpt: post.excerpt ?? '',
   coverImage: post.coverImage ?? '',
   sourceUrl: post.sourceUrl ?? '',
   tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
   content: post.content ?? '',
   published: !!post.published,
});

const PostForm = ({ initial, onSubmit, onCancel, submitting, submitLabel }: PostFormProps) => {
   const [draft, setDraft] = useState<PostDraft>(() => (initial ? postToDraft(initial) : emptyDraft));
   // Track whether the user has manually edited the slug — once they do,
   // stop auto-generating from the title (prevents clobbering their edit).
   const [slugTouched, setSlugTouched] = useState(!!initial?.slug);

   useEffect(() => {
      if (initial) {
         setDraft(postToDraft(initial));
         setSlugTouched(true);
      }
   }, [initial]);

   const setField =
      (field: keyof PostDraft) =>
      (eOrValue: React.ChangeEvent<HTMLInputElement> | string) => {
         const value =
            typeof eOrValue === 'string' ? eOrValue : eOrValue.target.value;
         setDraft((prev) => {
            const next = { ...prev, [field]: value };
            // Auto-derive slug from title until the user touches the slug field.
            if (field === 'title' && !slugTouched) {
               next.slug = generateSlug(value);
            }
            return next;
         });
      };

   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSlugTouched(true);
      setDraft({ ...draft, slug: e.target.value });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({
         title: draft.title.trim(),
         slug: draft.slug.trim() || generateSlug(draft.title),
         excerpt: draft.excerpt.trim(),
         coverImage: draft.coverImage.trim() || null,
         sourceUrl: draft.sourceUrl.trim() || null,
         // Tags are stored as String[] on the backend — split, trim, drop empties.
         tags: draft.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
         content: draft.content,
         published: draft.published,
      });
   };

   return (
      <form className="post_form" onSubmit={handleSubmit}>
         <label className="blog_field">
            <span>Title</span>
            <input
               type="text"
               value={draft.title}
               onChange={setField('title')}
               placeholder="Post title"
               required
               autoFocus
               disabled={submitting}
            />
         </label>

         <label className="blog_field">
            <span>Slug</span>
            <input
               type="text"
               value={draft.slug}
               onChange={handleSlugChange}
               placeholder="post-url-slug"
               required
               disabled={submitting}
            />
            <small className="text-light post_form_help">
               Used in the post URL. Auto-generated from title until you edit it.
            </small>
         </label>

         <label className="blog_field">
            <span>Excerpt</span>
            <input
               type="text"
               value={draft.excerpt}
               onChange={setField('excerpt')}
               placeholder="One-line summary shown on the blog list"
               required
               disabled={submitting}
            />
         </label>

         <label className="blog_field">
            <span>Cover image URL <small className="text-light">(optional)</small></span>
            <input
               type="url"
               value={draft.coverImage}
               onChange={setField('coverImage')}
               placeholder="https://example.com/cover.jpg"
               disabled={submitting}
            />
         </label>

         <label className="blog_field">
            <span>Original post link <small className="text-light">(optional — LinkedIn, Facebook, Instagram…)</small></span>
            <input
               type="url"
               value={draft.sourceUrl}
               onChange={setField('sourceUrl')}
               placeholder="https://www.linkedin.com/posts/..."
               disabled={submitting}
            />
            <small className="text-light post_form_help">
               Shows a little platform logo on the post that links back to the original.
            </small>
         </label>

         <label className="blog_field">
            <span>Tags <small className="text-light">(separate with commas or spaces — # optional)</small></span>
            <input
               type="text"
               value={draft.tags}
               onChange={setField('tags')}
               placeholder="react, graphql, tutorial"
               disabled={submitting}
            />
         </label>

         <div className="blog_field">
            <span>Content</span>
            <MarkdownEditor
               value={draft.content}
               onChange={setField('content')}
               placeholder="Write your post in markdown."
            />
         </div>

         <label className="post_form_publish">
            <input
               type="checkbox"
               checked={draft.published}
               onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
               disabled={submitting}
            />
            <span>
               <strong>Published</strong>
               <br />
               <small className="text-light">
                  Unchecked = draft. Drafts are visible only to you.
               </small>
            </span>
         </label>

         <div className="post_form_actions">
            <button type="button" className="btn" onClick={onCancel} disabled={submitting}>
               Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
               {submitting ? 'Saving…' : submitLabel || 'Save'}
            </button>
         </div>
      </form>
   );
};

export default PostForm;
