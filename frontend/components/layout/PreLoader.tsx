'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Dna } from 'react-loader-spinner';
import { preLoaderAnim } from '@/lib/animation';

// The intro overlay belongs to the homepage ONLY. Every other route returns
// null — including during SSR (the pathname is known server-side), so /blog,
// /blog/[slug] and /admin never even ship the overlay markup: no intro, no
// blink, nothing to hide. Navigating back to Home remounts it and the intro
// plays again, which is the intended "welcome" behavior.
const PreLoader = () => {
   const pathname = usePathname();
   const isHome = pathname === '/';

   useEffect(() => {
      if (isHome) preLoaderAnim();
   }, [isHome]);

   if (!isHome) return null;

   return (
      <div className="preloader">
         <div className="texts-container">
            <span>Dedicated,</span>
            <span>Passionate,</span>
            <span>Inquisitive</span>
            <Dna
               visible={true}
               height="80"
               width="80"
               ariaLabel="dna-loading"
               wrapperStyle={{}}
               wrapperClass="dna-wrapper"
            />
         </div>
      </div>
   );
};

export default PreLoader;
