'use client';

import { useEffect } from 'react';
import { Dna } from 'react-loader-spinner';
import { preLoaderAnim } from '@/lib/animation';

const PreLoader = () => {
   useEffect(() => {
      preLoaderAnim();
   }, []);

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
