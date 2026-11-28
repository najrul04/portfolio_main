'use client';

import { useEffect, useId, useState } from 'react';
import type { Skill } from '@/lib/constants';
import { getSkillExperience } from '@/lib/skillExperience';
import { useTilt } from '@/lib/useTilt';

const SkillCard = ({ skill }: { skill: Skill }) => {
   const { ref: cardRef, handlers } = useTilt<HTMLLIElement>({ maxTilt: 12, scale: 1.05 });
   const tipId = useId();
   // WHY state + effect: the page is statically prerendered, so the server HTML
   // carries durations measured at build time. Recomputing after mount measures
   // "Present" roles against the visitor's date, so "1+ year" becomes "2+ years"
   // on its own without a redeploy.
   const [experience, setExperience] = useState(() => getSkillExperience(skill.name));

   useEffect(() => {
      setExperience(getSkillExperience(skill.name));
   }, [skill.name]);

   useEffect(() => {
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
      return () => observer.disconnect();
   }, [cardRef]);

   return (
      <li
         ref={cardRef}
         className='skill_card'
         tabIndex={0}
         aria-describedby={experience ? tipId : undefined}
         {...handlers}
      >
         <img className='skill_card_logo' src={skill.image} alt='' loading='lazy' />
         <span className='skill_card_name'>{skill.name}</span>
         <span className='skill_card_glare' aria-hidden='true' />
         {experience && (
            <span className='skill_card_tip' role='tooltip' id={tipId}>
               <strong>{experience.duration}</strong>
               <span>{experience.companies.join(' · ')}</span>
            </span>
         )}
      </li>
   );
};

export default SkillCard;
