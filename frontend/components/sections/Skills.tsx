'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { skills, type SkillCategory } from '@/lib/constants';
import SkillCard from '@/components/sections/SkillCard';

// "TECHNOLOGIES" tree: a root node with a trunk running down the middle and one
// branch per skill group (left/right alternating on desktop). Each group is a
// grid of 3D tilt cards (logo + name). Data comes from lib/constants.ts.
const Skills = () => {
   useEffect(() => {
      AOS.init({ duration: 1200 });
   }, []);

   return (
      <section id='skills0'>
         <div data-aos='fade-up' className='skills_heading'>
            <h5 style={{ color: 'rgba(255, 255, 255, 0.6)' }}>What are my</h5>
            <h2 style={{ color: '#b86df5' }}>Skills</h2>
         </div>

         <div className='skills_tree'>
            <div className='skills_root'>TECHNOLOGIES</div>

            <div className='skills_branches'>
               {skills.map((group: SkillCategory) => (
                  <div className='skills_group' key={group.id}>
                     <div className='skills_group_head'>
                        <h3 className='skills_group_title'>{group.title}</h3>
                     </div>
                     <ul className='skills_cards' aria-label={`${group.title} skills`}>
                        {group.skills.map((skill) => (
                           <SkillCard key={skill.id} skill={skill} />
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Skills;
