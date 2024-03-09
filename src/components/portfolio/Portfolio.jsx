import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import React, { useEffect } from "react";
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

import client1 from "../../assets/projects/1.webp";
import client2 from "../../assets/projects/2.webp";
import client3 from "../../assets/projects/3.webp";
import client4 from "../../assets/projects/4.webp";
import client5 from "../../assets/projects/5.webp";
import client6 from "../../assets/projects/6.webp";

const data = [
  {
    id: 1,
    gif: "https://i.ibb.co/h7RCTC2/Fitness.gif",
    title: "Fitness World",
    github: "https://github.com/najrul04/gym_fitness",
    demo: "https://web-fitness.netlify.app/",
    tag: "#ReactJS #RapidAPI #Material UI",
  },
  {
    id: 2,
    gif: "https://i.ibb.co/h7RCTC2/Fitness.gif",
    title: "Real Estate",
    github: "https://github.com/najrul04/real_estate",
    demo: "https://real-estate-zeta-lemon.vercel.app/",
    tag: "#NextJS #ChakraUI #RapidAPI",
  },
  {
    id: 3,
    gif: client3,
    title: "Game Info",
    github: "https://github.com/najrul04/react_recap/tree/main/car-services",
    demo: "https://games-mart.web.app/",
    tag: "#ReactJS #Bootstrap #Firebase",
  },
  {
    id: 4,
    gif: client4,
    title: "Hospital",
    github: "https://github.com/najrul04/healthcare-website",
    demo: "https://gen-hospital.netlify.app/",
    tag: "#ReactJS #Firebase #MongoDB",
  },
  {
    id: 5,
    gif: client5,
    title: "ECommerce (Demo)",
    github:
      "https://github.com/najrul04/firebase_recap/tree/main/ECommerce-with-router",
    demo: "https://ecommerce-79009.firebaseapp.com/",
    tag: "#ReactJS #ReactRouter #Firebase",
  },

  {
    id: 6,
    gif: client6,
    title: "Temperature",
    github: "https://github.com/najrul04/temperature",
    demo: "https://temperature123.netlify.app/",
    tag: "#HTML #CSS #JavaScript",
  },
];

const Portfolio = () => {
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
        {data.map(({ id, gif, title, github, demo, tag }) => {
          return (
            <SwiperSlide
              style={{ marginBottom: "20px" }}
              whilehover={{ scale: 1.1 }}
              key={id}
            >
              <div className="portfolio_item_image">
                <img src={gif} alt={title} />
                {/* <iframe src="https://jumpshare.com/embed/IhaOUAOLr4sbSUvlk7Nw" frameborder="0" width="640" height="289" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
                 */}
                <div className="portfolio_item_content">
                  <h3 style={{ marginLeft: "12px" }}>{title}</h3>

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

      {/*     <Swiper
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
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      >
      <SwiperSlide>
          <img src="https://swiperjs.com/demos/gifs/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/gifs/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/gifs/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/gifs/nature-4.jpg" />
        </SwiperSlide>
      </Swiper> */}
    </section>
  );
};

export default Portfolio;
