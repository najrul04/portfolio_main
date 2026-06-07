import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineRocket,
} from 'react-icons/ai';
import { BiBook, BiNews } from 'react-icons/bi';
import { RiMessage2Line, RiServiceFill } from 'react-icons/ri';
import './Nav.css';

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#');
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    // Scroll-spy only makes sense on the home page (where the sections live).
    // From /blog or any other route the section IDs don't exist — querying them
    // would crash.
    if (!onHome) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const sectionIds = ['about', 'experience', 'skills0', 'portfolio', 'contact'];
      const sectionPositions = { '#': 0 };
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        // Some sections may render lazily — skip cleanly if missing instead of crashing.
        if (el) sectionPositions[`#${id}`] = el.offsetTop;
      }

      let visibleSection = '#';
      for (const section in sectionPositions) {
        if (scrollPosition >= sectionPositions[section]) {
          visibleSection = section;
        }
      }

      setActiveNav(visibleSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onHome]);

  // Hide the bottom dock on /blog and /admin. Blog has its own back button;
  // admin has its own header. The dock just adds visual noise on both.
  // MUST live below all hooks — early-returning before useEffect violates the
  // Rules of Hooks and crashes the whole tree on route change.
  if (
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/admin')
  ) {
    return null;
  }

  // Section links use href="/#section" so they work from any route:
  // on the home page the browser scrolls to the anchor; on /blog it navigates
  // home and then scrolls. Keeps anchor-based navigation intact for the existing sections.
  const sectionHref = (hash) => `/${hash}`;

  return (
    <div className="nav_container">
      <motion.nav
        initial={{ opacity: 0, x: '-12vw', y: 20 }}
        animate={{ opacity: 1, x: '-12vw', y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a
          title="Home"
          href={sectionHref('#')}
          onClick={() => setActiveNav('#')}
          className={onHome && activeNav === '#' ? 'active' : ''}
        >
          <AiOutlineHome />
        </a>
        <a
          title="About Me"
          href={sectionHref('#about')}
          onClick={() => setActiveNav('#about')}
          className={onHome && activeNav === '#about' ? 'active' : ''}
        >
          <AiOutlineUser />
        </a>
        <a
          title="Experience"
          href={sectionHref('#experience')}
          onClick={() => setActiveNav('#experience')}
          className={onHome && activeNav === '#experience' ? 'active' : ''}
        >
          <AiOutlineRocket />
        </a>
        <a
          title="Skills"
          href={sectionHref('#skills0')}
          onClick={() => setActiveNav('#skills0')}
          className={onHome && activeNav === '#skills0' ? 'active' : ''}
        >
          <BiBook />
        </a>
        <a
          title="Portfolio"
          href={sectionHref('#portfolio')}
          onClick={() => setActiveNav('#portfolio')}
          className={onHome && activeNav === '#portfolio' ? 'active' : ''}
        >
          <RiServiceFill />
        </a>
        <a
          title="Contact"
          href={sectionHref('#contact')}
          onClick={() => setActiveNav('#contact')}
          className={onHome && activeNav === '#contact' ? 'active' : ''}
        >
          <RiMessage2Line />
        </a>
        {/*
          Blog uses <Link> instead of <a> so React Router handles navigation
          (no full page reload). Public reading entry — admin lives at /admin
          (intentionally not linked here so visitors don't see an admin button).
        */}
        <Link
          to="/blog"
          title="Blog"
          className={location.pathname === '/blog' ? 'active' : ''}
        >
          <BiNews />
        </Link>
      </motion.nav>
    </div>
  );
};

export default Nav;
