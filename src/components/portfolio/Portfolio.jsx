import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/core";
// import './styles.css';
// import IMG1 from '../../assets/P1-E-Commerce.png';
import "./Portfolio.css";

import {portfolio} from "../../constants";

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
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
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <Swiper
        data-aos="fade-up"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
      >
        {portfolio.map(({ id, gif, title, github, demo, tag }) => {
          return (
            <SwiperSlide
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: isMobile ? '56vh' : '70vh',
              margin: isMobile ? '0px' : 'auto',
              height: '56vh',
            }}
              whilehover={{ scale: 1.1 }}
              key={id}
            >
              <div className="portfolio_item_image">
                <img src={gif} alt={title} />
                <div className="portfolio_item_content">
                  <h3 style={{ textAlign: "center" }}>{title}</h3>

                  <div className="portfolio_item_cta">
                    <a
                      href={github}
                      rel="noreferrer"
                      className="btn "
                      target="_blank"
                    >
                      Github
                    </a>
                    <a
                      href={demo}
                      rel="noreferrer"
                      className="btn btn-primary"
                      target="_blank"
                    >
                      Live Demo
                    </a>
                  </div>

                  <p className="tag_css">{tag}</p>
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
