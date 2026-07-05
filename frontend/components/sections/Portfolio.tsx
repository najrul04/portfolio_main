'use client';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// WHY from 'swiper' (not 'swiper/modules'): swiper@9 only exports '.' and
// './react' — the '/modules' subpath doesn't exist until v11. Modules are
// registered via the <Swiper modules={[...]}> prop below.
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { portfolio, PortfolioItem } from '@/lib/constants';
import PortfolioMedia from './PortfolioMedia';
import PortfolioModal from './PortfolioModal';

// Cards stay minimal (cover image + title); the description, extra
// screenshots and links live in PortfolioModal, opened by clicking a card.
const Portfolio = () => {
   const [isMobile, setIsMobile] = useState(false);
   const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);

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
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination]}
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
                     <button
                        type='button'
                        className='portfolio_item_image portfolio_card'
                        onClick={() => setOpenItem(item)}
                        aria-label={`Open ${item.title} details`}
                     >
                        <PortfolioMedia
                           src={item.cover ?? item.images[0]}
                           title={item.title}
                           imageCount={item.images.length}
                        />
                        <div className='portfolio_item_content'>
                           <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                           <span className='portfolio_card_hint'>View project</span>
                        </div>
                     </button>
                  </SwiperSlide>
               );
            })}
         </Swiper>

         {openItem && (
            <PortfolioModal item={openItem} onClose={() => setOpenItem(null)} />
         )}
      </section>
   );
};

export default Portfolio;
