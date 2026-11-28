'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import {
   VerticalTimeline,
   VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { experiences } from '@/lib/constants';
import { useTilt } from '@/lib/useTilt';
import SectionWrapper from '@/components/hoc/SectionWrapper';

interface Experience {
   title: string;
   company_name: string;
   company_location: string;
   flag: string;
   icon: string;
   iconBg: string;
   date: string;
   points: string[];
}

const ExperienceCard = ({ experience }: { experience: Experience }) => {
   // Gentle glass tilt (4deg, long text stays readable) + glare. The handlers
   // sit on our inner div; the tilt is applied to the library's content box
   // (its parent), which owns the card frame.
   const { ref: glareRef, targetRef, handlers } = useTilt<HTMLDivElement>({ maxTilt: 4, scale: 1.01 });
   useEffect(() => {
      targetRef.current = glareRef.current?.parentElement ?? null;
   }, [glareRef, targetRef]);
   return (
      <VerticalTimelineElement
         className='verticalTimeline'
         contentStyle={{
            background: '#030618',
            color: '#f0f0f0',
         }}
         contentArrowStyle={{ borderRight: '7px solid  #232631' }}
         date={experience.date}
         iconStyle={{ background: experience.iconBg, marginTop: '5px' }}
         icon={
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
               }}
            >
               <img
                  src={experience.icon}
                  alt={experience.company_name}
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }}
               />
            </div>
         }
      >
         <div ref={glareRef} {...handlers}>
         <span className='tilt_glare' aria-hidden='true' />
         <div>
            <h3 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 600 }}>
               {experience.title}
            </h3>
            <p style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
               {experience.company_name}
            </p>
            <p
               style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '10',
                  color: '#b76bf5',
               }}
            >
               {/* WHY explicit inline size: the global `img { width: 100% }`
                   reset would balloon the flag to the card width otherwise. */}
               <img
                  src={experience.flag}
                  alt=""
                  aria-hidden
                  style={{
                     display: 'inline-block',
                     width: '20px',
                     height: '15px',
                     objectFit: 'cover',
                     borderRadius: '2px',
                     marginRight: '8px',
                     verticalAlign: '-2px',
                  }}
               />
               {experience.company_location}
            </p>
         </div>

         <ul style={{ marginTop: '1.25rem', marginLeft: '1.25rem' }}>
            {experience.points.map((point, index) => (
               <li
                  key={`experience-point-${index}`}
                  style={{
                     color: 'rgba(255, 255, 255, 0.85)',
                     // WHY 300 + lineHeight + bigger margin: the bullet copy was
                     // inheriting Poppins 400, which reads heavy/cramped in white
                     // on the dark card. Light weight, roomy line-height and a
                     // larger gap between points make it readable and airy.
                     fontWeight: 300,
                     fontSize: '15px',
                     lineHeight: 1.75,
                     listStyleType: 'disc',
                     paddingLeft: '0.25rem',
                     marginBottom: '0.9rem',
                  }}
               >
                  {point}
               </li>
            ))}
         </ul>
         </div>
      </VerticalTimelineElement>
   );
};

// How many roles show before the "See more" button. The list is newest
// first, so the most relevant roles are always visible.
const VISIBLE_COUNT = 4;
const HEIGHT_MS = 700;

const Experience = () => {
   const [expanded, setExpanded] = useState(false);
   const hiddenCount = Math.max(0, experiences.length - VISIBLE_COUNT);
   const shown = expanded ? experiences : experiences.slice(0, VISIBLE_COUNT);
   // Height animation for "See more" / "Show less". The timeline's height is
   // pinned in px and transitioned, then released back to auto, so the list
   // slides open (and shut) instead of snapping.
   const wrapRef = useRef<HTMLDivElement>(null);
   const fromHeight = useRef<number | null>(null);
   const collapsedHeight = useRef(0);
   const animating = useRef(false);

   const reducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

   const animateHeight = (from: number, to: number, done?: () => void) => {
      const el = wrapRef.current;
      if (!el) return done?.();
      animating.current = true;
      el.style.overflow = 'hidden';
      el.style.height = `${from}px`;
      void el.offsetHeight; // commit the start height before transitioning
      el.style.transition = `height ${HEIGHT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      el.style.height = `${to}px`;
      window.setTimeout(() => {
         done?.();
         el.style.transition = '';
         el.style.height = '';
         el.style.overflow = '';
         animating.current = false;
      }, HEIGHT_MS);
   };

   useLayoutEffect(() => {
      const el = wrapRef.current;
      if (!el) return;
      if (!expanded) collapsedHeight.current = el.offsetHeight;
      if (expanded && fromHeight.current !== null) {
         const from = fromHeight.current;
         fromHeight.current = null;
         animateHeight(from, el.offsetHeight);
      }
   }, [expanded]);

   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

   useEffect(() => {
      // Scroll reveal for the timeline cards (odd slide in from the left,
      // even from the right — see experience.css). The library's own reveal
      // is unusable here (see the animate={false} comment below), so a plain
      // IntersectionObserver adds the class the CSS transitions key off.
      const cards = document.querySelectorAll<HTMLElement>(
         '.verticalTimeline.vertical-timeline-element'
      );
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('timeline-card-visible');
                  observer.unobserve(entry.target);
               }
            });
         },
         // fire once ~15% of a card is visible, slightly before it reaches
         // the viewport bottom so the slide reads as "arriving"
         { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      // Already-revealed cards are skipped, so only the newly shown ones
      // (after "See more") get observed and slide in.
      cards.forEach((card) => {
         if (!card.classList.contains('timeline-card-visible')) observer.observe(card);
      });

      return () => observer.disconnect();
      // WHY expanded in deps: "See more" mounts new cards that start hidden
      // (opacity 0 in experience.css) until the observer reveals them.
   }, [expanded]);

   const toggle = () => {
      if (animating.current) return;
      const el = wrapRef.current;
      if (!expanded) {
         if (el && !reducedMotion()) fromHeight.current = el.offsetHeight;
         setExpanded(true);
         return;
      }
      // Collapsing removes a lot of height; bring the reader back to the
      // section so they aren't left staring at whatever was below it.
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      if (!el || reducedMotion()) {
         setExpanded(false);
         return;
      }
      animateHeight(el.offsetHeight, collapsedHeight.current, () => setExpanded(false));
   };

   return (
      <>
         {/* WHY no `variants`: legacy passed textVariant() to a plain <div>, which
             is a no-op (only motion.* components consume variants). The data-aos
             fade-up is what actually animates this header. */}
         <div data-aos='fade-up' id='experience'>
            <p style={{ textAlign: 'center' }}>What I have done so far</p>
            <h2 style={{ textAlign: 'center', color: '#b86df5' }}>
               Work Experience
            </h2>
         </div>

         <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column' }}>
            {/* WHY animate={false}: the library hides each element (is-hidden →
                visibility:hidden under .vertical-timeline--animate) until its
                internal scroll sensor reveals it. That sensor doesn't fire under
                the Next.js App Router, so the cards stayed invisible (only the
                line showed). Disabling the library's animation removes the
                --animate gate, so every card renders. The scroll entrance is
                ours instead: the IntersectionObserver above adds
                .timeline-card-visible and experience.css slides each card in
                from its own side of the timeline. */}
            <div ref={wrapRef} style={{ display: 'flow-root' }}>
               <VerticalTimeline
                  animate={false}
                  className={expanded ? 'experience-expanded' : undefined}
               >
                  {shown.map((experience, index) => (
                     <ExperienceCard
                        key={`experience-${index}`}
                        experience={experience}
                     />
                  ))}
               </VerticalTimeline>
            </div>

            {hiddenCount > 0 && (
               <button
                  type='button'
                  className='btn experience_more_btn'
                  onClick={toggle}
                  aria-expanded={expanded}
               >
                  {expanded ? 'Show less' : `See ${hiddenCount} more roles`}
               </button>
            )}
         </div>
      </>
   );
};

export default SectionWrapper(Experience, 'work');
