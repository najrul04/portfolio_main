import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
import "./Portfolio.css";
import { portfolio } from "../../constants";

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loadingGif, setLoadingGif] = useState(null); // State to track loading GIF
  const [loadedCount, setLoadedCount] = useState(0); // State to track number of loaded GIFs

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  SwiperCore.use([Pagination]);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyGif = entry.target;
            lazyGif.src = lazyGif.dataset.src;
            setLoadingGif(lazyGif.dataset.src); // Set loading GIF
            observer.current.unobserve(lazyGif);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.1 }
    )
  );

  useEffect(() => {
    const gifs = document.querySelectorAll(".lazy-gif");
    gifs.forEach((gif) => {
      observer.current.observe(gif);
    });

    return () => observer.current.disconnect();
  }, []);

  const handleGifLoad = () => {
    setLoadedCount((prevCount) => prevCount + 1); // Increment loaded GIF count
    if (loadedCount + 1 === portfolio.length) {
      setLoadingGif(null); // Hide loading spinner when all GIFs are loaded
    }
  };
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
        modules={[EffectCoverflow, Pagination]}
      >
        {portfolio.map(({ id, gif, title, github, demo, tag }, index) => {
          return (
            <SwiperSlide
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: isMobile ? "56vh" : "70vh",
                margin: isMobile ? "0px" : "auto",
                width: isMobile ? "56vh" : "70vh",
              }}
              whilehover={{ scale: 1.1 }}
              key={id}
            >
              <div className="portfolio_item_image">
                {/* Loading spinner */}
                {loadingGif && loadingGif === gif && (
                  <div className="loading-spinner">
                    <svg
                      aria-hidden="true"
                      className="spinner_svg"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height={50}
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    
                  </div>
                )}
                {/* Lazy-loaded image */}
                <img
                  src={""} // Empty src initially
                  data-src={gif} // Use data-src for lazy loading
                  alt={title}
                  className="lazy-gif" // Add lazy-gif class
                  onLoad={handleGifLoad} // Call handleGifLoad when image is loaded
                />
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
