'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';
import { GAME_PORTFOLIO_URL } from '@/lib/constants';

// sessionStorage (not localStorage) so a visitor who closes the banner gets it
// back on their next visit, but it doesn't nag them again within this one.
const DISMISS_KEY = 'gameBannerDismissed';

// Floating pill at the top of the home page offering two ways in: the playable
// 3D portfolio game, or the regular (professional) site they're already on.
const GameBanner = () => {
   // WHY start hidden: the page is prerendered, and dismissal lives in the
   // browser. Showing only after mount avoids a flash for visitors who closed it.
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      let dismissed = false;
      try {
         dismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
      } catch {
         // Storage blocked (private mode etc.): just show the banner.
      }
      setVisible(!dismissed);
   }, []);

   const dismiss = () => {
      setVisible(false);
      try {
         sessionStorage.setItem(DISMISS_KEY, '1');
      } catch {
         // Ignore: banner still hides for this page view.
      }
   };

   if (!visible) return null;

   return (
      <aside className="game_banner" aria-label="Choose how to explore the portfolio">
         <IoGameControllerOutline className="game_banner_icon" aria-hidden="true" />
         <span className="game_banner_text">Want to explore my portfolio as a game?</span>
         <a
            className="game_banner_play"
            href={GAME_PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
         >
            Play NazTank
         </a>
         <button type="button" className="game_banner_stay" onClick={dismiss}>
            Stay professional
         </button>
         <button
            type="button"
            className="game_banner_close"
            onClick={dismiss}
            aria-label="Close banner"
         >
            <FiX />
         </button>
      </aside>
   );
};

export default GameBanner;
