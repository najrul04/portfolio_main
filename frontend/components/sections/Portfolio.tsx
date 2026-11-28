'use client';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
// WHY from 'swiper' (not 'swiper/modules'): swiper@9 only exports '.' and
// './react' — the '/modules' subpath doesn't exist until v11. Modules are
// registered via the <Swiper modules={[...]}> prop below.
import { EffectCoverflow, Pagination } from 'swiper';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { portfolio, PortfolioItem } from '@/lib/constants';
import PortfolioMedia from './PortfolioMedia';
import PortfolioModal from './PortfolioModal';
import { useTilt } from '@/lib/useTilt';

// Project card with a glass tilt (7deg) + glare. Kept small on purpose: the
// coverflow carousel already moves the cards in 3D.
const PortfolioCard = ({ item, onOpen }: { item: PortfolioItem; onOpen: () => void }) => {
   const { ref, targetRef, handlers } = useTilt<HTMLButtonElement>({ maxTilt: 7, scale: 1.03 });
   return (
      <button
         ref={ref}
         {...handlers}
         type='button'
         className='portfolio_card'
         onClick={onOpen}
         aria-label={`Open ${item.title} details`}
      >
         <div ref={targetRef as React.RefObject<HTMLDivElement>} className='portfolio_item_image tilt_card'>
            <PortfolioMedia
               src={item.cover ?? item.images[0]}
               title={item.title}
               imageCount={item.images.length}
               companyName={item.companyName}
               companyLogo={item.companyLogo}
            />
            <div className='portfolio_item_content'>
               <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
               <span className='portfolio_card_hint'>View project</span>
            </div>
            <span className='tilt_glare' aria-hidden='true' />
         </div>
      </button>
   );
};

// Cards stay minimal (cover image + title); the description, extra
// screenshots and links live in PortfolioModal, opened by clicking a card.
const Portfolio = () => {
   const [isMobile, setIsMobile] = useState(false);
   const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
   const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
   // WHY state (not reading swiper.isBeginning in render): Swiper mutates
   // those flags without re-rendering React — the buttons' disabled state
   // would go stale. onSlideChange keeps them in sync.
   const [atStart, setAtStart] = useState(true);
   const [atEnd, setAtEnd] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 720);
      };

      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
      AOS.init({
         duration: 1500,
      });
   }, []);

   return (
      <section id='portfolio'>
         <h5>My Recent Work</h5>
         <h2>Portfolio</h2>

         <Swiper
            data-aos='fade-up'
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
               // 50deg/100 swung the side cards' near edges off-screen; this
               // keeps the 3D feel with the whole card visible.
               rotate: 30,
               stretch: 0,
               depth: 220,
               modifier: 1,
               // Off: Swiper's shadow is a square black gradient over the whole
               // slide that ignores the card's rounded border, leaving hard dark
               // boxes and half-hidden border lines. Side cards dim in CSS instead.
               slideShadows: false,
            }}
            modules={[EffectCoverflow, Pagination]}
            onSwiper={setSwiper}
            onSlideChange={(s) => {
               setAtStart(s.isBeginning);
               setAtEnd(s.isEnd);
            }}
         >
            {portfolio.map((item) => {
               return (
                  <SwiperSlide
                     style={{
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: isMobile ? '56vh' : '70vh',
                        margin: isMobile ? '0px' : 'auto',
                     }}
                     key={item.id}
                  >
                     <PortfolioCard item={item} onOpen={() => setOpenItem(item)} />
                  </SwiperSlide>
               );
            })}
         </Swiper>

         {/* Desktop affordance: click through projects without swiping.
             Hidden on mobile (portfolio.css) where swiping is natural. */}
         <button
            type='button'
            className='portfolio_carousel_nav prev'
            onClick={() => swiper?.slidePrev()}
            disabled={atStart}
            aria-label='Previous project'
         >
            <AiOutlineLeft />
         </button>
         <button
            type='button'
            className='portfolio_carousel_nav next'
            onClick={() => swiper?.slideNext()}
            disabled={atEnd}
            aria-label='Next project'
         >
            <AiOutlineRight />
         </button>

         {openItem && (
            <PortfolioModal item={openItem} onClose={() => setOpenItem(null)} />
         )}
      </section>
   );
};

export default Portfolio;
