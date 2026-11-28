'use client';

import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { testimonialData } from '@/lib/constants';
import { resume } from '@/lib/resume';
import { useTilt } from '@/lib/useTilt';
// Where they have given me the reviews

// WHY: reuse the single LinkedIn URL from resume.ts so a profile change is one edit.
const linkedInRecommendations = `${resume.contacts.linkedin}/details/recommendations/`;

const linkedInLogo = '/assets/LinkedIn.webp';
const upworkLogo = '/assets/UpWork.webp';

// Rail geometry: vertical spacing between reviewers, horizontal arc push,
// and how many neighbors stay visible around the active one.
const RAIL_STEP_Y = 84;
const RAIL_STEP_X = 78; // mobile (horizontal rail)
const VISIBLE_NEIGHBORS = 2;

const Testimonials = () => {
   const [active, setActive] = useState(0);
   // Glass tilt on the quote card: 5deg, gentle enough to read while hovering.
   const quoteGlare = useTilt<HTMLDivElement>({ maxTilt: 5, scale: 1.01 });
   const [isMobile, setIsMobile] = useState(false);
   const railRef = useRef<HTMLDivElement | null>(null);
   const wheelLock = useRef(false);
   const total = testimonialData.length;

   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 900);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   // WHY a native listener: React attaches wheel handlers passively, so a
   // synthetic onWheel can't preventDefault() — the page would scroll along
   // with the rail. A non-passive listener lets the rail capture the wheel.
   useEffect(() => {
      const el = railRef.current;
      if (!el) return;

      const onWheel = (e: WheelEvent) => {
         e.preventDefault();
         if (wheelLock.current) return;
         wheelLock.current = true;
         const delta = e.deltaY > 0 ? 1 : -1;
         setActive((prev) => (prev + delta + total) % total);
         setTimeout(() => {
            wheelLock.current = false;
         }, 300);
      };

      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
   }, [total]);

   // Signed shortest distance from the active item (wraps around the ends),
   // so the rail behaves like an endless loop.
   const relOffset = (i: number) => {
      let off = (i - active) % total;
      if (off > total / 2) off -= total;
      if (off < -total / 2) off += total;
      return off;
   };

   const activeItem = testimonialData[active];

   return (
      <section id="testimonials">
         <h5>Peer Reviews and Recommendations</h5>
         <h2>Testimonials</h2>

         <div className="testimonials_layout" data-aos="fade-up">
            <div className="testimonial_rail" ref={railRef}>
               {testimonialData.map(({ avatar, name, title, source }, i) => {
                  const off = relOffset(i);
                  const dist = Math.abs(off);
                  const hidden = dist > VISIBLE_NEIGHBORS;

                  const scale = off === 0 ? 1 : dist === 1 ? 0.88 : 0.78;
                  const opacity = hidden ? 0 : off === 0 ? 1 : dist === 1 ? 0.7 : 0.35;
                  // Desktop: vertical rail bowed into a "(" arc — neighbors
                  // drift right as they get further from the active row.
                  const transform = isMobile
                     ? `translate(-50%, -50%) translateX(${off * RAIL_STEP_X}px) scale(${scale})`
                     : `translateY(-50%) translate(${dist * dist * 14}px, ${off * RAIL_STEP_Y}px) scale(${scale})`;

                  return (
                     <button
                        type="button"
                        key={i}
                        className={`rail_item ${off === 0 ? 'active' : ''}`}
                        style={{ transform, opacity, pointerEvents: hidden ? 'none' : 'auto' }}
                        onClick={() => setActive(i)}
                        tabIndex={hidden ? -1 : 0}
                        aria-label={`Show testimonial from ${name}`}
                     >
                        <span className="rail_avatar">
                           <img src={avatar} alt={name} />
                        </span>
                        <span className="rail_meta">
                           <span className="rail_name">{name}</span>
                           <span className="rail_sub">
                              {source !== 'LinkedIn' && <span className="star">&#9733;</span>}
                              {title}
                           </span>
                        </span>
                     </button>
                  );
               })}
            </div>

            {/* key=active retriggers the fade-in whenever the person changes */}
            <div className="testimonial_quote" key={active} ref={quoteGlare.ref} {...quoteGlare.handlers}>
               <span className="tilt_glare" aria-hidden="true" />
               <span className="quote_mark" aria-hidden="true">&ldquo;</span>
               <p className="quote_text">{activeItem.review}</p>

               <div className="quote_footer">
                  <span className="quote_client">
                     {activeItem.name} &middot; {activeItem.title}
                     {activeItem.date && (
                        <>
                           {' '}&middot; <time className="quote_date">{activeItem.date}</time>
                        </>
                     )}
                  </span>

                  <div className={`testimonial_source ${activeItem.source.toLowerCase()}_source`}>
                     {activeItem.source === 'LinkedIn' && (
                        <a
                           className="logo_and_text"
                           href={activeItem.link ?? linkedInRecommendations}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="View this recommendation on LinkedIn"
                        >
                           <img src={linkedInLogo} alt="LinkedIn" className="testimonial_logo" />
                           <h4 className="testimonial_source_text">LinkedIn</h4>
                        </a>
                     )}

                     {activeItem.source === 'UpWork' && (
                        <div className="logo_and_text">
                           <img src={upworkLogo} alt="Upwork" className="testimonial_logo" />
                           <h4 className="testimonial_source_text">UpWork</h4>
                        </div>
                     )}

                     {activeItem.source === 'Local' && (
                        <div className="logo_and_text">
                           <h4 className="testimonial_source_text">Local</h4>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Testimonials;
