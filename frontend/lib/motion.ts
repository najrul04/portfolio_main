import type { Variants } from 'framer-motion';

// Framer Motion animation variants, ported verbatim from the old portfolio.
// Pure factory functions — no browser APIs, safe to import anywhere.

type Direction = 'left' | 'right' | 'up' | 'down' | '';

export const textVariant = (delay: number): Variants => ({
   hidden: {
      y: -50,
      opacity: 0,
   },
   show: {
      y: 0,
      opacity: 1,
      transition: {
         type: 'spring',
         duration: 1.25,
         delay,
      },
   },
});

export const fadeIn = (
   direction: Direction,
   type: string,
   delay: number,
   duration: number,
): Variants => ({
   hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
   },
   show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
         type,
         delay,
         duration,
         ease: 'easeOut',
      },
   },
});

export const zoomIn = (delay: number, duration: number): Variants => ({
   hidden: {
      scale: 0,
      opacity: 0,
   },
   show: {
      scale: 1,
      opacity: 1,
      transition: {
         type: 'tween',
         delay,
         duration,
         ease: 'easeOut',
      },
   },
});

export const slideIn = (
   direction: Direction,
   type: string,
   delay: number,
   duration: number,
): Variants => ({
   hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
   },
   show: {
      x: 0,
      y: 0,
      transition: {
         type,
         delay,
         duration,
         ease: 'easeOut',
      },
   },
});

export const staggerContainer = (
   staggerChildren: number,
   delayChildren?: number,
): Variants => ({
   hidden: {},
   show: {
      transition: {
         staggerChildren,
         delayChildren: delayChildren || 0,
      },
   },
});
