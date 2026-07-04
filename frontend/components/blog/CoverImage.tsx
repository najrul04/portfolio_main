'use client';

import { useState } from 'react';

interface CoverImageProps {
   src: string;
   alt?: string;
   className?: string;
}

// Cover image with a visible loading state. WHY: images are served by the
// Render backend, which cold-starts after idle — a cover can take seconds to
// arrive, and a blank gap looks broken. Until onLoad fires we show a shimmer
// skeleton with a spinner; the image then fades in. On error the skeleton
// collapses so the card falls back to text-only cleanly.
const CoverImage = ({ src, alt = '', className = '' }: CoverImageProps) => {
   const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

   if (status === 'error') return null;

   return (
      <div className={`cover_image_wrap ${status === 'loaded' ? 'is-loaded' : ''} ${className}`}>
         {status === 'loading' && (
            <span className="cover_image_spinner" aria-label="Loading image" />
         )}
         <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
         />
      </div>
   );
};

export default CoverImage;
