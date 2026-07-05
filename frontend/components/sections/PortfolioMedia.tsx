'use client';

import { useRef, useState } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';

interface PortfolioMediaProps {
   gif: string;
   title: string;
}

// Project preview with per-item loading/error states.
// WHY per-item state: the legacy version tracked ONE shared "loadingGif" and
// only cleared it after ALL gifs had loaded, so spinners lingered on top of
// slides that finished long ago — and a gif that failed left a blank card.
//
// Pause: browsers can't pause an animated GIF, but drawing it onto a <canvas>
// captures its first frame — toggling to the canvas reads as "paused", and
// toggling back restarts the animation. The canvas is never read back
// (no getImageData), so cross-origin gifs (i.ibb.co) don't cause errors.
const PortfolioMedia = ({ gif, title }: PortfolioMediaProps) => {
   const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
   const [paused, setPaused] = useState(false);
   const imgRef = useRef<HTMLImageElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);

   const togglePaused = () => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      if (!img || !canvas) return;
      if (!paused) {
         canvas.width = img.naturalWidth || img.width;
         canvas.height = img.naturalHeight || img.height;
         canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      setPaused(!paused);
   };

   const stateClasses = [
      status === 'loaded' ? 'is-loaded' : '',
      status === 'error' ? 'is-error' : '',
      paused ? 'is-paused' : '',
   ].join(' ');

   return (
      <div className={`portfolio_media ${stateClasses}`}>
         {status === 'loading' && (
            <span className="portfolio_media_spinner" aria-label="Loading preview" />
         )}
         {status === 'error' && (
            <div className="portfolio_media_error">
               Preview unavailable — try the Live Demo below.
            </div>
         )}
         <img
            ref={imgRef}
            src={gif}
            alt={`${title} preview`}
            loading="lazy"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
         />
         <canvas ref={canvasRef} aria-hidden />
         {status === 'loaded' && (
            <button
               type="button"
               className="portfolio_media_toggle"
               onClick={togglePaused}
               title={paused ? 'Play preview' : 'Pause preview'}
               aria-label={paused ? 'Play preview' : 'Pause preview'}
            >
               {paused ? <AiOutlinePlayCircle /> : <AiOutlinePauseCircle />}
            </button>
         )}
      </div>
   );
};

export default PortfolioMedia;
