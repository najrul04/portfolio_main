import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './PostPreview.css';

// Default-exported so React.lazy() can code-split the markdown libs
// into a separate chunk (only loaded when the user toggles preview).
//
// remark-gfm enables GitHub-flavored extras: tables, strikethrough,
// task lists, autolinks. Doubles the value of writing markdown vs vanilla CommonMark.
const PostPreview = ({ content }) => (
   <article className="post_preview">
      <ReactMarkdown
         remarkPlugins={[remarkGfm]}
         // Constrain images so a giant pasted-by-URL hero doesn't blow out the layout.
         components={{
            img: ({ node, ...props }) => (
               <img loading="lazy" {...props} className="post_preview_img" />
            ),
            // Open external links in a new tab — better UX, prevents losing the editor.
            a: ({ node, ...props }) => {
               const isExternal = props.href?.startsWith('http');
               return (
                  <a
                     {...props}
                     target={isExternal ? '_blank' : undefined}
                     rel={isExternal ? 'noopener noreferrer' : undefined}
                  />
               );
            },
         }}
      >
         {content}
      </ReactMarkdown>
   </article>
);

export default PostPreview;
