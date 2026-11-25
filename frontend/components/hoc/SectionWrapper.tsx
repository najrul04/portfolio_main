'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { staggerContainer } from '@/lib/motion';

// Framer-motion HOC, ported from the legacy StarWrapper. Wraps a section in a
// staggered fade-in container. Generic over the wrapped component's props so
// TS keeps them intact through the wrap.
const SectionWrapper = <P extends object>(
   Component: React.ComponentType<P>,
   idName: string,
): React.FC<P> =>
   function HOC(props: P) {
      return (
         <motion.section
            // WHY (0, 0): legacy called staggerContainer() with no args, which
            // produced staggerChildren: undefined / delayChildren: 0 — equivalent
            // to no extra stagger. Pass explicit zeros to keep that behavior.
            variants={staggerContainer(0, 0)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            // WHY no vertical padding: the global `section { margin-top }` is the
            // one gap between homepage sections. The old sm:py-16 stacked 64px on
            // top of it, so Experience had a much bigger gap above and below
            // than every other section.
            className='sm:px-16 px-6 max-w-7xl mx-auto relative z-0'
         >
            {/* Anchor only: zero-height so its &nbsp; line adds no spacing. */}
            <span className='hash-span block h-0 overflow-hidden' id={idName}>
               &nbsp;
            </span>

            <Component {...props} />
         </motion.section>
      );
   };

export default SectionWrapper;
