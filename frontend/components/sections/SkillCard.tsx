'use client';

import { useEffect, useId, useRef } from 'react';
import type { Skill } from '@/lib/constants';
import { getSkillExperience } from '@/lib/skillExperience';

const MAX_TILT_DEG = 12;
const HOVER_SCALE = 1.05;

// Tilt only for a real mouse, and never when the visitor asked for less motion.
const tiltAllowed = () =>
   window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
   !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SkillCard = ({ skill }: { skill: Skill }) => {
   const cardRef = useRef<HTMLLIElement>(null);
   const frame = useRef(0);
   const pointer = useRef({ x: 0.5, y: 0.5 });
   const tiltOn = useRef(false);
   const tipId = useId();
   const experience = getSkillExperience(skill.name);

   useEffect(() => {
      tiltOn.current = tiltAllowed();
      const card = cardRef.current;
      if (!card) return;

      // Touch devices get a fade-in on scroll instead of tilt (see skills.css).
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               card.classList.add('is-revealed');
               observer.disconnect();
            }
         },
         { threshold: 0.2 }
      );
      observer.observe(card);

      return () => {
         observer.disconnect();
         cancelAnimationFrame(frame.current);
      };
   }, []);

   // Pointer position (0..1 across the card) → rotation. The card dips toward
   // the cursor: right of centre turns it around Y, above centre around X.
   const paint = () => {
      frame.current = 0;
      const card = cardRef.current;
      if (!card) return;
      const { x, y } = pointer.current;
      const rotateY = (x - 0.5) * 2 * MAX_TILT_DEG;
      const rotateX = (0.5 - y) * 2 * MAX_TILT_DEG;
      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${HOVER_SCALE})`;
      card.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
   };

   const handleMove = (e: React.MouseEvent<HTMLLIElement>) => {
      if (!tiltOn.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      pointer.current = {
         x: (e.clientX - rect.left) / rect.width,
         y: (e.clientY - rect.top) / rect.height,
      };
      if (!frame.current) frame.current = requestAnimationFrame(paint);
   };

   const handleEnter = () => {
      if (tiltOn.current) cardRef.current?.classList.add('is-tilting');
   };

   const handleLeave = () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      const card = cardRef.current;
      if (!card) return;
      card.classList.remove('is-tilting');
      card.style.transform = '';
   };

   return (
      <li
         ref={cardRef}
         className='skill_card'
         tabIndex={0}
         aria-describedby={experience ? tipId : undefined}
         onMouseEnter={handleEnter}
         onMouseMove={handleMove}
         onMouseLeave={handleLeave}
      >
         <img className='skill_card_logo' src={skill.image} alt='' loading='lazy' />
         <span className='skill_card_name'>{skill.name}</span>
         <span className='skill_card_glare' aria-hidden='true' />
         {experience && (
            // suppressHydrationWarning: "Present" roles are measured against
            // today, so the build-time duration can differ from the visitor's.
            <span className='skill_card_tip' role='tooltip' id={tipId}>
               <strong suppressHydrationWarning>{experience.duration}</strong>
               <span>{experience.companies.join(' · ')}</span>
            </span>
         )}
      </li>
   );
};

export default SkillCard;
