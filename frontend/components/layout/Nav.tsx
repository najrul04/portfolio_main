'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
   AiOutlineHome,
   AiOutlineUser,
   AiOutlineRocket,
} from 'react-icons/ai';
import { BiBook, BiNews } from 'react-icons/bi';
import { RiMessage2Line, RiServiceFill } from 'react-icons/ri';

// Home-page sections in page order, as the dock's hashes. '#' is the top.
const SECTION_IDS = ['about', 'experience', 'skills0', 'portfolio', 'contact'];

// Document-relative top of a section (getBoundingClientRect, not offsetTop:
// offsetTop is relative to the nearest positioned ancestor, so it reads wrong
// for sections nested inside wrappers).
const sectionTop = (hash: string) => {
   if (hash === '#') return 0;
   const el = document.getElementById(hash.slice(1));
   return el ? el.getBoundingClientRect().top + window.scrollY : null;
};

// Which section the reader is looking at: the last one whose top has passed a
// line 35% down the viewport. At the very bottom, the last section wins even
// if it is too short to reach that line.
const sectionInView = () => {
   const doc = document.documentElement;
   if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) return '#contact';
   const probe = window.scrollY + window.innerHeight * 0.35;
   let current = '#';
   for (const id of SECTION_IDS) {
      const top = sectionTop(`#${id}`);
      if (top !== null && probe >= top) current = `#${id}`;
   }
   return current;
};

const Nav = () => {
   const [activeNav, setActiveNav] = useState('#');
   const pathname = usePathname();
   const onHome = pathname === '/';
   // Set while a dock click is smooth-scrolling. The scroll-spy stands down
   // until it lands, so the highlight stays on the item that was clicked
   // instead of flickering through every section on the way.
   const scrollingTo = useRef<string | null>(null);
   const cancelScroll = useRef<() => void>(() => {});

   useEffect(() => {
      // Scroll-spy only makes sense on the home page (where the sections live).
      if (!onHome) return;

      let frame = 0;
      const handleScroll = () => {
         if (scrollingTo.current || frame) return;
         frame = requestAnimationFrame(() => {
            frame = 0;
            if (!scrollingTo.current) setActiveNav(sectionInView());
         });
      };

      // The reader grabbing the page mid-scroll cancels the click's scroll so
      // the spy takes over again right away.
      const userTookOver = () => cancelScroll.current();

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('wheel', userTookOver, { passive: true });
      window.addEventListener('touchstart', userTookOver, { passive: true });
      window.addEventListener('keydown', userTookOver);
      return () => {
         cancelAnimationFrame(frame);
         cancelScroll.current();
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('wheel', userTookOver);
         window.removeEventListener('touchstart', userTookOver);
         window.removeEventListener('keydown', userTookOver);
      };
   }, [onHome]);

   // Smooth-scroll to a section ourselves instead of relying on the browser's
   // anchor jump. Sections animate and images load while the page scrolls, so
   // the target can move mid-flight and the jump would stop short (Home landing
   // on About). We watch the scroll until it settles and correct the course
   // if the section moved, up to a few times.
   const goTo = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!onHome) return; // other routes: let /#section navigate home normally
      const initial = sectionTop(hash);
      if (initial === null) return;
      e.preventDefault();

      cancelScroll.current();
      setActiveNav(hash);
      scrollingTo.current = hash;
      history.replaceState(null, '', hash === '#' ? '/' : `/${hash}`);

      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scrollTo = (top: number) => window.scrollTo({ top, behavior: smooth ? 'smooth' : ('instant' as ScrollBehavior) });

      let frame = 0;
      let lastY = -1;
      let stillFrames = 0;
      let corrections = 0;
      const startedAt = performance.now();

      const finish = () => {
         cancelAnimationFrame(frame);
         scrollingTo.current = null;
         cancelScroll.current = () => {};
      };
      cancelScroll.current = finish;

      const watch = () => {
         const y = window.scrollY;
         stillFrames = Math.abs(y - lastY) < 1 ? stillFrames + 1 : 0;
         lastY = y;
         // ~8 frames without movement = the scroll has settled.
         if (stillFrames >= 8) {
            const target = sectionTop(hash) ?? 0;
            const maxY = document.documentElement.scrollHeight - window.innerHeight;
            const wanted = Math.min(Math.max(target, 0), maxY);
            if (Math.abs(y - wanted) > 4 && corrections < 3) {
               corrections++;
               stillFrames = 0;
               scrollTo(wanted);
            } else {
               finish();
               return;
            }
         }
         // Safety net: never hold the spy off for more than 4 seconds.
         if (performance.now() - startedAt > 4000) {
            finish();
            return;
         }
         frame = requestAnimationFrame(watch);
      };

      scrollTo(initial);
      frame = requestAnimationFrame(watch);
   };

   // Hide the bottom dock on the blog and the resume viewer. Both have their
   // own back link; the dock just adds visual noise and overlaps the content
   // (it floated right over the PDF on /resume).
   // (Admin keeps its own floating top-right pill instead of the dock.)
   // MUST live below all hooks — early-returning before useEffect violates the
   // Rules of Hooks and crashes the whole tree on route change.
   if (pathname.startsWith('/blog') || pathname === '/resume') return null;

   // Section links use href="/#section" so they work from any route:
   // on the home page the browser scrolls to the anchor; on /blog it navigates
   // home and then scrolls. Keeps anchor-based navigation intact for the existing sections.
   const sectionHref = (hash: string) => `/${hash}`;

   return (
      <>
         {/* The dock is display:none under 600px, which left phones with no
             way to reach the blog. This pill (top-right, home page only —
             admin has its own floating pill there) is shown by nav.css ONLY
             at mobile widths. */}
         {onHome && (
            <Link href="/blog" className="mobile_blog_link" title="Read the blog">
               <BiNews /> Blogs
            </Link>
         )}
         <div className="nav_container">
         <motion.nav
            initial={{ opacity: 0, x: '-12vw', y: 20 }}
            animate={{ opacity: 1, x: '-12vw', y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
         >
            <a
               title="Home"
               href={sectionHref('#')}
               onClick={goTo('#')}
               className={onHome && activeNav === '#' ? 'active' : ''}
            >
               <AiOutlineHome />
            </a>
            <a
               title="About Me"
               href={sectionHref('#about')}
               onClick={goTo('#about')}
               className={onHome && activeNav === '#about' ? 'active' : ''}
            >
               <AiOutlineUser />
            </a>
            <a
               title="Experience"
               href={sectionHref('#experience')}
               onClick={goTo('#experience')}
               className={onHome && activeNav === '#experience' ? 'active' : ''}
            >
               <AiOutlineRocket />
            </a>
            <a
               title="Skills"
               href={sectionHref('#skills0')}
               onClick={goTo('#skills0')}
               className={onHome && activeNav === '#skills0' ? 'active' : ''}
            >
               <BiBook />
            </a>
            <a
               title="Portfolio"
               href={sectionHref('#portfolio')}
               onClick={goTo('#portfolio')}
               className={onHome && activeNav === '#portfolio' ? 'active' : ''}
            >
               <RiServiceFill />
            </a>
            <a
               title="Contact"
               href={sectionHref('#contact')}
               onClick={goTo('#contact')}
               className={onHome && activeNav === '#contact' ? 'active' : ''}
            >
               <RiMessage2Line />
            </a>
            {/*
               Blog uses next/link <Link> instead of <a> so Next handles client-side
               navigation (no full page reload). Public reading entry — admin lives at
               /admin (intentionally not linked here so visitors don't see an admin button).
            */}
            <Link
               href="/blog"
               title="Blog"
               className={pathname === '/blog' ? 'active' : ''}
            >
               <BiNews />
            </Link>
         </motion.nav>
         </div>
      </>
   );
};

export default Nav;
