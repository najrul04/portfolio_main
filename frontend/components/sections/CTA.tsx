'use client';

import { motion } from 'framer-motion';

const CTA = () => {
   return (
      <div className="cta">
         {/* Opens the /resume viewer page in a new tab; the download itself
             happens there (view first, download if wanted). */}
         <motion.a
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            href="/resume"
            className="btn"
         >
            View Resume
         </motion.a>

         <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            href="#contact"
            className="btn btn-primary"
         >
            Let&apos;s Talk
         </motion.a>
      </div>
   );
};

export default CTA;
