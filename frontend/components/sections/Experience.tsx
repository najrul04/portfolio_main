'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import {
   VerticalTimeline,
   VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { experiences } from '@/lib/constants';
import SectionWrapper from '@/components/hoc/SectionWrapper';

interface Experience {
   title: string;
   company_name: string;
   company_location: string;
   icon: string;
   iconBg: string;
   date: string;
   points: string[];
}

const ExperienceCard = ({ experience }: { experience: Experience }) => {
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
         <div>
            <h3 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' }}>
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
      </VerticalTimelineElement>
   );
};

const Experience = () => {
   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

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
                --animate gate, so every card renders — matching the live site
                at rest. (The header still fades in via data-aos.) */}
            <VerticalTimeline animate={false}>
               {experiences.map((experience, index) => (
                  <ExperienceCard
                     key={`experience-${index}`}
                     experience={experience}
                  />
               ))}
            </VerticalTimeline>
         </div>
      </>
   );
};

export default SectionWrapper(Experience, 'work');
