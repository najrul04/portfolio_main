import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineRocket,
} from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { RiMessage2Line, RiServiceFill } from 'react-icons/ri';
import './Nav.css';

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#');

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll position
      const scrollPosition = window.scrollY;

      // Define the positions of your sections
      const sectionPositions = {
        '#': 0, // Home
        '#about': document.getElementById('about').offsetTop,
        '#experience': document.getElementById('experience').offsetTop,
        '#skills0': document.getElementById('skills0').offsetTop, // Updated for "Skills0"
        '#portfolio': document.getElementById('portfolio').offsetTop,
        '#contact': document.getElementById('contact').offsetTop,
      };

      // Determine the currently visible section
      let visibleSection = '#';
      for (const section in sectionPositions) {
        if (scrollPosition >= sectionPositions[section]) {
          visibleSection = section;
        }
      }

      // Update the activeNav state
      setActiveNav(visibleSection);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <motion.nav
        initial={{ x: '-100vw' }}
        animate={{ x: '-12vw' }}
        transition={{ type: 'spring', bounce: 0.3, duration: 3 }}
      >
        <a
          title="Home"
          href="#"
          onClick={() => setActiveNav('#')}
          className={activeNav === '#' ? 'active' : ''}
        >
          <AiOutlineHome />
        </a>
        <a
          title="About Me"
          href="#about"
          onClick={() => setActiveNav('#about')}
          className={activeNav === '#about' ? 'active' : ''}
        >
          <AiOutlineUser />
        </a>
        <a
          title="Experience"
          href="#experience"
          onClick={() => setActiveNav('#experience')}
          className={activeNav === '#experience' ? 'active' : ''}
        >
          <AiOutlineRocket />
        </a>
        <a
          title="Skills"
          href="#skills0" // Updated to match the id of "Skills0"
          onClick={() => setActiveNav('#skills0')} // Updated to match the id of "Skills0"
          className={activeNav === '#skills0' ? 'active' : ''}
        >
          <BiBook />
        </a>
        <a
          title="Portfolio"
          href="#portfolio"
          onClick={() => setActiveNav('#portfolio')}
          className={activeNav === '#portfolio' ? 'active' : ''}
        >
          <RiServiceFill />
        </a>
        <a
          title="Contact"
          href="#contact"
          onClick={() => setActiveNav('#contact')}
          className={activeNav === '#contact' ? 'active' : ''}
        >
          <RiMessage2Line />
        </a>
      </motion.nav>
    </div>
  );
};

export default Nav;
