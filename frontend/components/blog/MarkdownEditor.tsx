'use client';

import { useRef, useState, useCallback, lazy, Suspense } from 'react';
import {
   AiOutlineBold,
   AiOutlineItalic,
   AiOutlineLink,
   AiOutlinePicture,
   AiOutlineUnorderedList,
   AiOutlineOrderedList,
   AiOutlineCode,
} from 'react-icons/ai';
import { BiHeading } from 'react-icons/bi';
import { RiDoubleQuotesL } from 'react-icons/ri';

// Preview is loaded lazily so react-markdown + remark-gfm (~55kb gzipped)
// only ship to users who actually toggle preview. The /blog list and the
// editor's "Write" tab stay fast for everyone else.
const PostPreview = lazy(() => import('./PostPreview'));

// Server-side cap — must match MAX_UPLOAD_BYTES in backend/src/routes/images.ts.
// At 5MB we can still embed photos straight from a phone without resizing.
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

// REST base URL for image upload/serve. Separate from NEXT_PUBLIC_GRAPHQL_URL because
// they're different protocols on the same host (GraphQL on /graphql, REST on /images).
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const AUTH_TOKEN_KEY = 'auth_token';

interface EditResult {
   newValue: string;
   newSelectionStart: number;
   newSelectionEnd: number;
}

interface ImageDialogState {
   url: string;
   alt: string;
}

interface MarkdownEditorProps {
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
   minRows?: number;
}

// Wraps the user's selection (or the cursor position) with `before` and `after`.
// Returns a new value + the selection range to restore after React re-renders.
const wrapSelection = (
   textarea: HTMLTextAreaElement,
   before: string,
   after: string = before,
   placeholder = ''
): EditResult => {
   const { selectionStart: start, selectionEnd: end, value } = textarea;
   const selected = value.slice(start, end) || placeholder;
   const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
   const newSelectionStart = start + before.length;
   const newSelectionEnd = newSelectionStart + selected.length;
   return { newValue, newSelectionStart, newSelectionEnd };
};

// Inserts text at the start of every line in the selection (for lists, blockquotes).
// If nothing is selected, prefixes the current line.
const prefixLines = (textarea: HTMLTextAreaElement, prefix: string): EditResult => {
   const { selectionStart, selectionEnd, value } = textarea;
   const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
   const lineEnd = value.indexOf('\n', selectionEnd);
   const sliceEnd = lineEnd === -1 ? value.length : lineEnd;
   const block = value.slice(lineStart, sliceEnd);
   const prefixed = block
      .split('\n')
      .map((line, i) => {
         // Numbered lists: increment per line so "1. ", "2. ", ... not all "1. ".
         if (prefix === '1. ') return `${i + 1}. ${line}`;
         return prefix + line;
      })
      .join('\n');
   const newValue = value.slice(0, lineStart) + prefixed + value.slice(sliceEnd);
   const newSelectionStart = lineStart;
   const newSelectionEnd = lineStart + prefixed.length;
   return { newValue, newSelectionStart, newSelectionEnd };
};

// Uploads to backend `POST /images` and returns the public URL of the stored image.
// Throws on auth failure, size limit, network, or non-image mimetype.
const uploadImage = async (file: File): Promise<string> => {
   const token = localStorage.getItem(AUTH_TOKEN_KEY);
   if (!token) {
      throw new Error('You must be signed in to upload images.');
   }

   const formData = new FormData();
   formData.append('image', file);

   const res = await fetch(`${API_BASE}/images`, {
      method: 'POST',
      // NOTE: do NOT set Content-Type manually — the browser sets multipart/form-data
      // with the correct boundary string when we pass FormData. Manually setting it
      // breaks the boundary and the server rejects.
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
   });

   if (!res.ok) {
      const errBody = await res
         .json()
         .catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(errBody.error || `Upload failed (${res.status})`);
   }

   const data = await res.json();
   return data.url;
};

const MarkdownEditor = ({ value, onChange, placeholder, minRows = 14 }: MarkdownEditorProps) => {
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [tab, setTab] = useState<'write' | 'preview'>('write');
   const [imageDialog, setImageDialog] = useState<ImageDialogState | null>(null);
   const [uploading, setUploading] = useState(false);

   // After mutating the textarea content via setState, we need to restore
   // the selection on the next paint — otherwise the cursor jumps to end.
   const applyEdit = useCallback(
      ({ newValue, newSelectionStart, newSelectionEnd }: EditResult) => {
         onChange(newValue);
         // requestAnimationFrame lets React commit the new value first.
         requestAnimationFrame(() => {
            const ta = textareaRef.current;
            if (!ta) return;
            ta.focus();
            ta.setSelectionRange(newSelectionStart, newSelectionEnd);
         });
      },
      [onChange]
   );

   const command = (cmd: string) => () => {
      const ta = textareaRef.current;
      if (!ta) return;

      switch (cmd) {
         case 'bold':
            return applyEdit(wrapSelection(ta, '**', '**', 'bold text'));
         case 'italic':
            return applyEdit(wrapSelection(ta, '*', '*', 'italic text'));
         case 'code':
            return applyEdit(wrapSelection(ta, '`', '`', 'code'));
         case 'codeblock':
            return applyEdit(wrapSelection(ta, '\n```\n', '\n```\n', 'code block'));
         case 'h1':
            return applyEdit(prefixLines(ta, '# '));
         case 'h2':
            return applyEdit(prefixLines(ta, '## '));
         case 'h3':
            return applyEdit(prefixLines(ta, '### '));
         case 'ul':
            return applyEdit(prefixLines(ta, '- '));
         case 'ol':
            return applyEdit(prefixLines(ta, '1. '));
         case 'quote':
            return applyEdit(prefixLines(ta, '> '));
         case 'link': {
            const url = window.prompt('Link URL', 'https://');
            if (!url) return;
            return applyEdit(wrapSelection(ta, '[', `](${url})`, 'link text'));
         }
         default:
            return;
      }
   };

   const insertImageMarkdown = (url: string, alt = '') => {
      const ta = textareaRef.current;
      if (!ta) return;
      const md = `![${alt}](${url})`;
      const { selectionStart: start, value } = ta;
      const newValue = value.slice(0, start) + md + value.slice(start);
      applyEdit({
         newValue,
         newSelectionStart: start + md.length,
         newSelectionEnd: start + md.length,
      });
   };

   const handleFile = async (file: File | undefined) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
         window.alert('Please pick an image file.');
         return;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
         window.alert(
            `Image is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). ` +
               `Max ${MAX_UPLOAD_BYTES / 1024 / 1024}MB. Compress it first or use a URL instead.`
         );
         return;
      }

      setUploading(true);
      try {
         const url = await uploadImage(file);
         insertImageMarkdown(url, file.name.replace(/\.[^.]+$/, ''));
      } catch (err) {
         window.alert(err instanceof Error ? err.message : 'Upload failed.');
      } finally {
         setUploading(false);
      }
   };

   const submitImageDialog = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!imageDialog?.url) return;
      insertImageMarkdown(imageDialog.url, imageDialog.alt || '');
      setImageDialog(null);
   };

   // Cmd/Ctrl + B / I — common shortcuts everyone reaches for instinctively.
   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const key = e.key.toLowerCase();
      if (key === 'b') {
         e.preventDefault();
         command('bold')();
      } else if (key === 'i') {
         e.preventDefault();
         command('italic')();
      }
   };

   return (
      <div className="md_editor">
         <div className="md_editor_tabs" role="tablist">
            <button
               type="button"
               role="tab"
               aria-selected={tab === 'write'}
               className={tab === 'write' ? 'active' : ''}
               onClick={() => setTab('write')}
            >
               Write
            </button>
            <button
               type="button"
               role="tab"
               aria-selected={tab === 'preview'}
               className={tab === 'preview' ? 'active' : ''}
               onClick={() => setTab('preview')}
            >
               Preview
            </button>
         </div>

         {tab === 'write' && (
            <>
               <div className="md_toolbar" role="toolbar" aria-label="Formatting">
                  <button type="button" title="Heading 1" onClick={command('h1')}>
                     <BiHeading /><sub>1</sub>
                  </button>
                  <button type="button" title="Heading 2" onClick={command('h2')}>
                     <BiHeading /><sub>2</sub>
                  </button>
                  <button type="button" title="Heading 3" onClick={command('h3')}>
                     <BiHeading /><sub>3</sub>
                  </button>
                  <span className="md_toolbar_sep" />
                  <button type="button" title="Bold (Ctrl/⌘ B)" onClick={command('bold')}>
                     <AiOutlineBold />
                  </button>
                  <button type="button" title="Italic (Ctrl/⌘ I)" onClick={command('italic')}>
                     <AiOutlineItalic />
                  </button>
                  <button type="button" title="Inline code" onClick={command('code')}>
                     <AiOutlineCode />
                  </button>
                  <span className="md_toolbar_sep" />
                  <button type="button" title="Bulleted list" onClick={command('ul')}>
                     <AiOutlineUnorderedList />
                  </button>
                  <button type="button" title="Numbered list" onClick={command('ol')}>
                     <AiOutlineOrderedList />
                  </button>
                  <button type="button" title="Quote" onClick={command('quote')}>
                     <RiDoubleQuotesL />
                  </button>
                  <span className="md_toolbar_sep" />
                  <button type="button" title="Link" onClick={command('link')}>
                     <AiOutlineLink />
                  </button>
                  <button
                     type="button"
                     title="Image"
                     onClick={() => setImageDialog({ url: '', alt: '' })}
                  >
                     <AiOutlinePicture />
                  </button>
               </div>

               <textarea
                  ref={textareaRef}
                  className="md_textarea"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={minRows}
                  placeholder={placeholder}
               />

               <p className="md_hint">
                  Markdown supported: <code>**bold**</code>, <code>*italic*</code>,
                  {' '}<code># heading</code>, <code>[link](url)</code>,
                  {' '}<code>![alt](image-url)</code>, <code>```code```</code>
               </p>
            </>
         )}

         {tab === 'preview' && (
            <Suspense fallback={<div className="md_preview md_preview--loading">Loading preview…</div>}>
               <div className="md_preview">
                  {value.trim() ? (
                     <PostPreview content={value} />
                  ) : (
                     <p className="text-light">Nothing to preview yet — switch to Write and start typing.</p>
                  )}
               </div>
            </Suspense>
         )}

         {imageDialog && (
            // Inline modal — small enough that a portal/library would be overkill.
            <div className="md_modal_backdrop" onClick={() => setImageDialog(null)}>
               <form
                  className="md_modal"
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={submitImageDialog}
               >
                  <h4>Insert image</h4>

                  <label className="blog_field">
                     <span>Image URL</span>
                     <input
                        type="url"
                        value={imageDialog.url}
                        onChange={(e) => setImageDialog({ ...imageDialog, url: e.target.value })}
                        placeholder="https://example.com/image.png"
                        autoFocus
                     />
                  </label>

                  <label className="blog_field">
                     <span>Alt text (optional)</span>
                     <input
                        type="text"
                        value={imageDialog.alt}
                        onChange={(e) => setImageDialog({ ...imageDialog, alt: e.target.value })}
                        placeholder="Describe the image"
                     />
                  </label>

                  <div className="md_modal_or">— or —</div>

                  <button
                     type="button"
                     className="btn"
                     onClick={() => fileInputRef.current?.click()}
                     disabled={uploading}
                  >
                     {uploading ? 'Uploading…' : 'Upload from this device'}
                  </button>
                  <input
                     ref={fileInputRef}
                     type="file"
                     accept="image/*"
                     style={{ display: 'none' }}
                     onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                           handleFile(file);
                           setImageDialog(null);
                           e.target.value = ''; // reset so picking the same file twice still fires onChange
                        }
                     }}
                  />

                  <div className="md_modal_actions">
                     <button type="button" className="btn" onClick={() => setImageDialog(null)}>
                        Cancel
                     </button>
                     <button type="submit" className="btn btn-primary" disabled={!imageDialog.url}>
                        Insert
                     </button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default MarkdownEditor;
