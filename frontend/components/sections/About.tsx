'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { FiAward, FiUsers } from 'react-icons/fi';
import { ImFolderPlus } from 'react-icons/im';

const Me = '/assets/me.webp';

// First professional role (Vector Design US, January 2022). Years of experience
// are derived from this so the "X+ Years" badge ticks up every January on its own.
const CAREER_START_YEAR = 2022;
const getYearsWorking = (): number => new Date().getFullYear() - CAREER_START_YEAR;

const About = () => {
   // WHY state + effect: the page is statically prerendered, so the server HTML
   // carries the build-time year. Recomputing after mount keeps the number correct
   // even if no redeploy happens after New Year, without a hydration mismatch.
   const [yearsWorking, setYearsWorking] = useState<number>(getYearsWorking);

   useEffect(() => {
      setYearsWorking(getYearsWorking());
      AOS.init({
         duration: 1200,
      });
   }, []);

   return (
      <section className="about_section" data-aos="fade-up-left" id="about">
         <h5>Get To Know</h5>
         <h2>About Me</h2>

         <div className="container about_container">
            <div>
               <div className="about_me">
                  <img className="about_me_image" src={Me} alt="AboutPicture" />
               </div>
            </div>

            <div className="about_content">
               <div className="about_cards">
                  <article className="about_card">
                     <FiAward className="about_icon" />

                     <h5>Experience</h5>

                     <small>{yearsWorking}+ Years Working</small>
                  </article>

                  <article className="about_card">
                     <FiUsers className="about_icon" />

                     <h5>Clients</h5>

                     <small>30+ Worldwide</small>
                  </article>

                  <article className="about_card">
                     <ImFolderPlus className="about_icon" />

                     <h5>Projects</h5>

                     <small>70+ Completed</small>
                  </article>
               </div>

               <p>
                  An experienced Full Stack Developer with a strong foundation
                  in JavaScript, TypeScript, ReactJS, NextJS, NodeJS, ExpressJS,
                  TailwindCSS, Python and Django. Possesses excellent adaptability and can work
                  efficiently in both team and independent work environments,
                  with a strong drive to master legacy technologies and explore
                  new systems.
                  {/* An ambitious, enthusiastic front-end React developer with expertise in HTML, CSS, and JavaScript, along with libraries like React JS, Next JS, Bootstrap, Tailwind, and Material UI. <br /> <br /> I'm well-versed in Firebase, Node JS, Express JS, and MongoDB for server-side development. <br /> <br /> I'm passionate about crafting captivating and responsive web applications that deliver seamless user experiences */}
               </p>

               <a href="#contact" className="btn btn-primary">
                  Let&apos;s Talk
               </a>
            </div>
         </div>
      </section>
   );
};

export default About;
