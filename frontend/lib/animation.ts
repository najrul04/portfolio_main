import type React from 'react';
import gsap from 'gsap';

// GSAP animation functions ported from the legacy portfolio.
// They touch the DOM (selectors / window) so they only run in the browser —
// imported exclusively by client components.

// Declare a general timeline to use in all the animation functions.

const tl = gsap.timeline();

// Preloader
//
// The intro VISUALS are pure CSS (styles/sections/preloader.css) so they run
// from the first painted frame — the old GSAP version only started after
// hydration, leaving the overlay frozen for 1-2s on cold loads. This function
// is just the JS tail: lock scrolling while the intro plays, then remove the
// overlay from the DOM once its own fade-out has finished.
//
// WHY animationend instead of a timer: the CSS animation clock starts at
// first paint, which JS cannot reliably reconstruct (a fixed timeout measured
// from the time origin ran early whenever paint lagged navigation start, so
// display:none cut the overlay off mid-fade — it "jumped" away instead of
// fading). The overlay's preloader-out animation is the source of truth for
// when the intro is over; a long timeout remains only as a safety net so the
// page can never stay scroll-locked.
// Guards against CONCURRENT runs only (StrictMode double-mounts the effect in
// dev). It resets on completion so navigating back to Home can replay the
// intro — the overlay only exists on the homepage (see PreLoader.tsx).

const PRELOADER_FALLBACK_MS = 9000;

let preloaderRunning = false;

export const preLoaderAnim = (): void => {
   if (preloaderRunning) return;

   const pre = document.querySelector('.preloader') as HTMLElement | null;
   if (!pre) return;

   const style = window.getComputedStyle(pre);
   // ≤1024px hides the overlay entirely (media query) — nothing to wait for.
   if (style.display === 'none') return;

   preloaderRunning = true;

   const finish = (): void => {
      document.body.style.overflowY = 'auto';
      pre.style.display = 'none';
      preloaderRunning = false;
   };

   // Hydration can land AFTER the CSS ending already played (visibility:hidden
   // is kept by `forwards`) — the animationend event is gone, so finish now.
   if (style.visibility === 'hidden') {
      finish();
      return;
   }

   document.body.style.overflowY = 'hidden';

   const fallback = window.setTimeout(() => {
      pre.removeEventListener('animationend', onEnd);
      finish();
   }, PRELOADER_FALLBACK_MS);

   // animationend bubbles up from the terminal line's typing/vaporize
   // animations too — only the overlay's own fade counts.
   const onEnd = (e: AnimationEvent): void => {
      if (e.target !== pre || e.animationName !== 'preloader-out') return;
      window.clearTimeout(fallback);
      pre.removeEventListener('animationend', onEnd);
      finish();
   };
   pre.addEventListener('animationend', onEnd);
};

export const openMenu = (): void => {
   const tl = gsap.timeline();
   tl.to('body', {
      duration: 0.1,
      css: { overflowY: 'hidden' },
      ease: 'power3.out',
   })
      .to('.hamburger-menu', {
         duration: 0.1,
         css: { display: 'block' },
      })
      .to('.header-item', {
         duration: 0.1,
         css: { background: 'none' },
      })
      .to('.cls-1', {
         duration: 0.1,
         delay: 0.3,
         css: { fill: '#ffffff' },
      })
      .to(
         ['.nav-secondary', '.nav-primary'],
         {
            duration: 0.8,
            height: '100%',
            transformOrigin: 'right top',
            stagger: {
               amount: 0.1,
            },
            ease: 'power3.inOut',
         },
         '-=.5'
      )
      .from(
         '.nav-link',
         {
            duration: 0.5,
            x: -80,
            opacity: 0,
            stagger: {
               amount: 0.5,
            },
            ease: 'Power3.in',
         },
         '-=.3'
      );

   // change cursor color when nav is open
   // tl.to(".cursor", {
   //   delay: -1,
   //   css: { className: "+=cursor-active" },
   // }).to(".cursor2", { delay: -1, css: { className: "+=cursor2-active" } });
};

export const closeMenu = (): void => {
   const tl = gsap.timeline();
   tl.to('body', {
      duration: 0.05,
      css: { overflowY: 'scroll' },
      ease: 'power3.inOut',
   })
      .to(['.nav-primary', '.nav-secondary'], {
         duration: 0.8,
         height: '0',
         transformOrigin: 'right top',
         stagger: {
            amount: 0.1,
         },
         ease: 'power3.inOut',
      })
      .to('.cls-1', {
         duration: 0.1,
         delay: -0.3,
         css: { fill: '#08e7f3' },
      })
      .to('.header-item', {
         duration: 0.5,
         css: { background: 'rgba(11,11,15,.8)' },
      })
      .to('.hamburger-menu', {
         duration: 0.05,
         css: { display: 'none' },
      });

   // tl.to(".cursor-active", {
   //   css: { className: "+=cursor" },
   // }).to(".cursor2-active", { css: { className: "+=cursor2" } });
};

// recurrent animations
export const fadeUp = (el: gsap.TweenTarget, delay = 0): void => {
   tl.from(el, {
      y: 150,
      duration: 1,
      delay,
      opacity: 0,
      ease: 'power3.Out',
   });
};

export const mobileLanding = (): void => {
   window.innerWidth < 763 &&
      tl.from('.landing__main2', {
         duration: 1,
         delay: 0,
         opacity: 0,
         y: 80,
         ease: 'expo.easeOut',
      });
};

const animateShapes = (): void => {
   const infiniteTl = gsap.timeline({
      repeat: -1,
   });
   infiniteTl
      .to('.shapes .shape', {
         duration: 4,
         rotate: 360,
         delay: -1,
         ease: 'power3.easeInOut',
         stagger: 2,
      })
      .to('.shapes .shape-3', {
         duration: 1,
         rotate: 360,
         delay: -2,
         ease: 'power3.easeInOut',
      })
      .to('.shapes .shape', {
         duration: 3,
         rotate: 0,
         ease: 'power3.easeInOut',
         stagger: 1,
      })
      .to('.shapes .shape', {
         duration: 1,
         opacity: 0,
         delay: -1,
         ease: 'power3.easeInOut',
         stagger: 1,
      })
      .to('.shapes .shape', {
         duration: 1.5,
         opacity: 1,
         ease: 'power3.easeInOut',
         stagger: 1,
      });
};

const animateMainShape = (): void => {
   const infiniteTl = gsap.timeline({
      repeat: -1,
   });
   infiniteTl
      .to('.shapes .main-circle', {
         duration: 6,
         x: -30,
         y: -50,
         ease: 'expo.easeOut',
      })
      .to('.shapes .main-circle', {
         duration: 6,
         x: -30,
         y: 50,
         ease: 'expo.easeOut',
      })
      .to('.shapes .main-circle', {
         duration: 4,
         x: 0,
         y: 0,
         ease: 'expo.easeOut',
      });
};

export const boxHover = (e: React.MouseEvent<HTMLElement>): void => {
   const tl = gsap.timeline();
   const target = e.target as HTMLElement;
   window.innerWidth >= 986 &&
      tl
         .to(target.querySelector('.link'), {
            duration: 0,
            opacity: 1,
         })
         .from(target.querySelectorAll('.box-anim'), {
            duration: 0.3,
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: 'Power3.easeOut',
         });
};

export const boxExit = (e: React.MouseEvent<HTMLElement>): void => {
   const target = e.target as HTMLElement;
   window.innerWidth >= 986 &&
      gsap.to(target.querySelector('.link'), {
         duration: 0,
         opacity: 0,
      });
};

export const fadeIn = (el: gsap.TweenTarget): void => {
   gsap.to(el, {
      duration: 2,
      opacity: 1,
      y: -60,
      ease: 'power4.out',
   });
};

export const fadeOut = (el: gsap.TweenTarget): void => {
   gsap.to(el, {
      duration: 1,
      opacity: 0,
      y: -20,
      ease: 'power4.out',
   });
};
