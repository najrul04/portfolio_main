'use client';

import { motion } from 'framer-motion';

const CTA = () => {
   return (
      <div className="cta">
         <motion.a
            target="_blank"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            href="/Resume.pdf"
            download="Resume.pdf"
            className="btn"
         >
            Download Resume
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
