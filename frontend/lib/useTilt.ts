'use client';

import { useEffect, useRef } from 'react';

// Shared pointer effect for cards: an optional 3D tilt toward the cursor plus
// a glare position written to CSS vars (--glare-x / --glare-y). Updates go
// straight to the element's style inside requestAnimationFrame, so React never
// re-renders on mouse move. The element gets .is-tilting while hovered; the
// glare itself is a child styled in CSS (see .tilt_glare in globals).
// Optional targetRef: put the handlers on a flat outer element and tilt an
// inner one. Needed inside 3D contexts (the Swiper coverflow), where a tilting
// element dips behind other planes, loses the hover and resets in a loop.
//
// Tilt maths: the cursor's position across the card is 0..1 on each axis.
// Centred (minus 0.5) and doubled it becomes -1..1, times maxTilt gives the
// angle. Right of centre turns around Y, above centre around X, so the card
// dips toward the cursor.

interface TiltOptions {
   maxTilt?: number; // degrees; 0 = glare only, no movement
   scale?: number;
}

const finePointer = () =>
   window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
   !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useTilt = <T extends HTMLElement>({ maxTilt = 12, scale = 1.05 }: TiltOptions = {}) => {
   const ref = useRef<T>(null);
   const targetRef = useRef<HTMLElement | null>(null);
   const target = () => targetRef.current ?? ref.current;
   const frame = useRef(0);
   const pointer = useRef({ x: 0.5, y: 0.5 });
   const enabled = useRef(false);

   useEffect(() => {
      enabled.current = finePointer();
      return () => cancelAnimationFrame(frame.current);
   }, []);

   const paint = () => {
      frame.current = 0;
      const el = target();
      if (!el) return;
      const { x, y } = pointer.current;
      if (maxTilt > 0) {
         const rotateY = (x - 0.5) * 2 * maxTilt;
         const rotateX = (0.5 - y) * 2 * maxTilt;
         el.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
      }
      el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
   };

   const onMouseMove = (e: React.MouseEvent<T>) => {
      if (!enabled.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      pointer.current = {
         x: (e.clientX - rect.left) / rect.width,
         y: (e.clientY - rect.top) / rect.height,
      };
      if (!frame.current) frame.current = requestAnimationFrame(paint);
   };

   const onMouseEnter = () => {
      if (enabled.current) target()?.classList.add('is-tilting');
   };

   const onMouseLeave = () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      const el = target();
      if (!el) return;
      el.classList.remove('is-tilting');
      if (maxTilt > 0) el.style.transform = '';
   };

   return { ref, targetRef, handlers: { onMouseEnter, onMouseMove, onMouseLeave } };
};
