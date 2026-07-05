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

import { portfolio } from '@/lib/constants';
import PortfolioMedia from './PortfolioMedia';

// Loading/pause/error behavior for the gif previews lives in PortfolioMedia —
// each slide owns its state. (The old shared loadingGif/loadedCount approach
// left spinners on loaded slides and blank cards on failed gifs.)
const Portfolio = () => {
   const [isMobile, setIsMobile] = useState(false);

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
            {portfolio.map(({ id, gif, title, description, github, demo, tag }) => {
               return (
                  <SwiperSlide
                     style={{
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: isMobile ? '56vh' : '70vh',
                        margin: isMobile ? '0px' : 'auto',
                     }}
                     key={id}
                  >
                     <div className='portfolio_item_image'>
                        <PortfolioMedia gif={gif} title={title} />
                        <div className='portfolio_item_content'>
                           <h3 style={{ textAlign: 'center' }}>{title}</h3>

                           {description && (
                              <p className='portfolio_item_desc'>{description}</p>
                           )}

                           <div className='portfolio_item_cta'>
                              <a
                                 href={github}
                                 rel='noreferrer'
                                 className='btn '
                                 target='_blank'
                              >
                                 Github
                              </a>
                              <a
                                 href={demo}
                                 rel='noreferrer'
                                 className='btn btn-primary'
                                 target='_blank'
                              >
                                 Live Demo
                              </a>
                           </div>

                           <p className='tag_css'>{tag}</p>
                        </div>
                     </div>
                  </SwiperSlide>
               );
            })}
         </Swiper>
      </section>
   );
};

export default Portfolio;
