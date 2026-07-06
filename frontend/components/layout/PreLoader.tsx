'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { preLoaderAnim } from '@/lib/animation';

// The intro overlay belongs to the homepage ONLY. Every other route returns
// null — including during SSR (the pathname is known server-side), so /blog,
// /blog/[slug] and /admin never even ship the overlay markup: no intro, no
// blink, nothing to hide. Navigating back to Home remounts it and the intro
// plays again, which is the intended "welcome" behavior.
//
// The visuals (code rain, terminal typing, vaporize, overlay fade) are 100%
// CSS (preloader.css) so they animate from the FIRST PAINTED FRAME — the old
// GSAP/react-loader-spinner intro sat frozen for 1-2s until React hydrated.
// JS (preLoaderAnim) only locks scroll during the intro and removes the
// overlay from the DOM at the end.

const GLYPHS = '{}[]()<>=+*/#$_&|;:~^%?@01';

// WHY deterministic (index-derived, no Math.random): the columns render on
// the server too — random content would differ on the client and trip
// React's hydration mismatch warning.
const columnText = (col: number): string => {
   let text = '';
   for (let row = 0; row < 24; row++) {
      text += GLYPHS[(col * 7 + row * 13) % GLYPHS.length] + '\n';
   }
   // doubled so the -50% -> 0 translate loops seamlessly
   return text + text;
};

const COLUMN_COUNT = 18;

const columns = Array.from({ length: COLUMN_COUNT }, (_, i) => ({
   text: columnText(i),
   left: `${((i + 0.5) / COLUMN_COUNT) * 100}%`,
   // negative delay = every column is already mid-fall on the first frame
   delay: `-${((i * 53) % 70) / 10}s`,
   duration: `${6 + ((i * 37) % 50) / 10}s`,
   opacity: 0.3 + ((i * 29) % 40) / 100,
}));

const PreLoader = () => {
   const pathname = usePathname();
   const isHome = pathname === '/';

   useEffect(() => {
      if (isHome) preLoaderAnim();
   }, [isHome]);

   if (!isHome) return null;

   return (
      <div className="preloader">
         <div className="matrix_rain" aria-hidden="true">
            {columns.map((c, i) => (
               <span
                  key={i}
                  className="matrix_col"
                  style={{
                     left: c.left,
                     animationDelay: c.delay,
                     animationDuration: c.duration,
                     opacity: c.opacity,
                  }}
               >
                  {c.text}
               </span>
            ))}
         </div>
         <p className="preloader_terminal">
            <span className="preloader_prompt">&gt;&nbsp;</span>
            <span className="preloader_line">Dedicated. Passionate. Inquisitive.</span>
         </p>
      </div>
   );
};

export default PreLoader;
