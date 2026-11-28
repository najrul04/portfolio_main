'use client';

import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiArrowLeft, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { PortfolioItem } from '@/lib/constants';

interface PortfolioModalProps {
   item: PortfolioItem;
   onClose: () => void;
   // Project-to-project arrows outside the modal, so visitors can browse
   // projects without closing it. Titles feed the buttons' labels.
   onPrev?: () => void;
   onNext?: () => void;
   prevTitle?: string;
   nextTitle?: string;
}

// One gallery slide with its own load/error state. Gifs are several MB, so
// the spinner matters; if a gif's host dies we quietly swap in the static
// fallback instead of showing a broken image.
const GallerySlide = ({
   src,
   fallback,
   alt,
   eager,
}: {
   src: string;
   fallback?: string;
   alt: string;
   eager: boolean;
}) => {
   const [current, setCurrent] = useState(src);
   const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

   const handleError = () => {
      if (fallback && current !== fallback) {
         setCurrent(fallback);
      } else {
         setStatus('error');
      }
   };

   return (
      <div className={`portfolio_gallery_slide ${status === 'loaded' ? 'is-loaded' : ''}`}>
         {status === 'loading' && (
            <span className="portfolio_media_spinner" aria-label="Loading image" />
         )}
         {status === 'error' && (
            <div className="portfolio_media_error">Preview unavailable.</div>
         )}
         <img
            src={current}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            onLoad={() => setStatus('loaded')}
            onError={handleError}
         />
      </div>
   );
};

// Project detail view: image gallery + description + links.
// Projects with a `gif` play their animated walkthrough here (cards never
// autoplay). The gallery is a scroll-snap strip, so touch/trackpad swiping
// works natively; the arrow buttons and dots just scroll the strip. The
// current index is derived FROM scroll position (single source of truth) so
// swipes and button clicks can't disagree.
const PortfolioModal = ({
   item,
   onClose,
   onPrev,
   onNext,
   prevTitle,
   nextTitle,
}: PortfolioModalProps) => {
   const [index, setIndex] = useState(0);
   const trackRef = useRef<HTMLDivElement>(null);
   const modalRef = useRef<HTMLDivElement>(null);

   // Switching project keeps the modal mounted (no backdrop flash), so reset
   // the gallery to the first image and scroll the modal back to the top.
   useEffect(() => {
      setIndex(0);
      if (trackRef.current) trackRef.current.scrollLeft = 0;
      if (modalRef.current) modalRef.current.scrollTop = 0;
   }, [item]);
   // The animated walkthrough replaces the static gallery when present.
   const media = item.gif ? [item.gif] : item.images;
   const total = media.length;

   useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose();
         if (e.key === 'ArrowRight') scrollToSlide(1, true);
         if (e.key === 'ArrowLeft') scrollToSlide(-1, true);
      };
      window.addEventListener('keydown', onKey);
      // Lock the page behind the modal; restore whatever was there before.
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
         window.removeEventListener('keydown', onKey);
         document.body.style.overflow = prevOverflow;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [onClose]);

   const scrollToSlide = (target: number, relative = false) => {
      const track = trackRef.current;
      if (!track) return;
      const current = Math.round(track.scrollLeft / track.clientWidth);
      const next = relative ? current + target : target;
      track.scrollTo({
         left: Math.max(0, Math.min(total - 1, next)) * track.clientWidth,
         behavior: 'smooth',
      });
   };

   const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
   };

   return (
      <div
         className="portfolio_modal_backdrop"
         onClick={onClose}
         role="dialog"
         aria-modal="true"
         aria-label={`${item.title} details`}
      >
         {onPrev && (
            <button
               type="button"
               className="portfolio_project_nav prev"
               onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
               }}
               aria-label={`Previous project${prevTitle ? `: ${prevTitle}` : ''}`}
               title={prevTitle}
            >
               <FiArrowLeft />
            </button>
         )}
         {onNext && (
            <button
               type="button"
               className="portfolio_project_nav next"
               onClick={(e) => {
                  e.stopPropagation();
                  onNext();
               }}
               aria-label={`Next project${nextTitle ? `: ${nextTitle}` : ''}`}
               title={nextTitle}
            >
               <FiArrowRight />
            </button>
         )}

         <div className="portfolio_modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <button
               type="button"
               className="portfolio_modal_close"
               onClick={onClose}
               aria-label="Close project details"
            >
               <AiOutlineClose />
            </button>

            <div className="portfolio_gallery">
               <div
                  className="portfolio_gallery_track"
                  ref={trackRef}
                  onScroll={handleScroll}
               >
                  {media.map((src, i) => (
                     <GallerySlide
                        key={src}
                        src={src}
                        fallback={item.gif ? item.images[0] : undefined}
                        alt={
                           item.gif
                              ? `${item.title} animated preview`
                              : `${item.title} screenshot ${i + 1} of ${total}`
                        }
                        eager={i === 0}
                     />
                  ))}
               </div>

               {total > 1 && (
                  <>
                     <span className="portfolio_gallery_counter">
                        {index + 1} / {total}
                     </span>
                     {/* Image arrows sit beside the dots under the picture,
                         so they never cover the screenshot. */}
                     <div className="portfolio_gallery_controls">
                        <button
                           type="button"
                           className="portfolio_gallery_nav"
                           onClick={() => scrollToSlide(-1, true)}
                           disabled={index === 0}
                           aria-label="Previous image"
                        >
                           <FiChevronLeft />
                        </button>
                        <div className="portfolio_gallery_dots">
                           {media.map((src, i) => (
                              <button
                                 type="button"
                                 key={src}
                                 className={i === index ? 'is-active' : ''}
                                 onClick={() => scrollToSlide(i)}
                                 aria-label={`Go to image ${i + 1}`}
                              />
                           ))}
                        </div>
                        <button
                           type="button"
                           className="portfolio_gallery_nav"
                           onClick={() => scrollToSlide(1, true)}
                           disabled={index === total - 1}
                           aria-label="Next image"
                        >
                           <FiChevronRight />
                        </button>
                     </div>
                  </>
               )}
            </div>

            <div className="portfolio_modal_content">
               <h3>{item.title}</h3>
               {item.description && <p className="portfolio_item_desc">{item.description}</p>}

               {item.role && (
                  <p className="portfolio_item_role">
                     <strong>Role:</strong> {item.role}
                  </p>
               )}

               {item.highlights && item.highlights.length > 0 && (
                  // Collapsed by default: the full list made the modal long and
                  // heavy. Native <details> gives keyboard + screen reader support.
                  <details className="portfolio_item_highlights">
                     <summary>How I built it</summary>
                     <ul>
                        {item.highlights.map((h) => (
                           <li key={h}>{h}</li>
                        ))}
                     </ul>
                  </details>
               )}

               {(item.github || item.demo || item.download) && (
                  <div className="portfolio_item_cta">
                     {item.github && (
                        <a href={item.github} rel="noreferrer" className="btn" target="_blank">
                           Github
                        </a>
                     )}
                     {item.demo && (
                        <a
                           href={item.demo}
                           rel="noreferrer"
                           className="btn btn-primary"
                           target="_blank"
                        >
                           Live Demo
                        </a>
                     )}
                     {item.download && (
                        <a
                           href={item.download}
                           rel="noreferrer"
                           className="btn btn-primary"
                           target="_blank"
                        >
                           Download
                        </a>
                     )}
                  </div>
               )}

               <p className="tag_css">{item.tag}</p>
            </div>
         </div>
      </div>
   );
};

export default PortfolioModal;
