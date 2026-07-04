'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useInView } from 'react-intersection-observer';
import { testimonialData } from '@/lib/constants';
// Where they have given me the reviews

import { Swiper, SwiperSlide } from 'swiper/react';
// WHY from 'swiper': swiper@9 only exports '.' and './react' (no '/modules'
// subpath until v11). Modules are registered via the <Swiper modules={[...]}>
// prop below, so no SwiperCore.use() call is needed.
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import StarRating from './StarRating';

const linkedInLogo = '/assets/LinkedIn.webp';
const upworkLogo = '/assets/UpWork.webp';

const Testimonials = () => {
   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

   const { ref } = useInView({
      threshold: 0.2,
   });

   return (
      <section ref={ref} id="testimonials">
         <h5>Peer Reviews and Recommendations</h5>
         <h2>Testimonials</h2>

         <Swiper
            data-aos="zoom-in-up"
            className="container testimonials_container" // install Swiper modules
            style={{ overflowX: 'hidden' }}
            modules={[Pagination]}
            spaceBetween={30}
            pagination={{ clickable: true }} // Enable clickable pagination
            /* breakpoints={{
        640: {
          slidesPerView: 1
        },
        // Adjust the breakpoints to your desired screen widths
        768: {
          slidesPerView: 2, // Show 1 slide on screens with width 768px and below (mobile)
        },
        1024: {
          slidesPerView: 1, // Show 3 slides on screens with width 1024px and above (desktop)
        },
      }} */
         >
            {testimonialData.map(({ avatar, name, review, title, source }, index) => {
               return (
                  <SwiperSlide key={index} className="testimonial">
                     <div className="client_avatar">
                        <img src={avatar} alt={name} />
                     </div>

                     <h4 className="client_name">{name}</h4>

                     {source !== 'LinkedIn' && (
                        <span>
                           <StarRating />
                        </span>
                     )}

                     <small className="client_review">{review}</small>
                     <h5 className="client_title">{title}</h5>

                     <div className={`testimonial_source ${source.toLowerCase()}_source`}>
                        {source === 'LinkedIn' && (
                           <div className="logo_and_text">
                              <img
                                 src={linkedInLogo}
                                 alt="LinkedIn"
                                 className="testimonial_logo linkedin_logo" // Added a class for LinkedIn logo
                              />
                              <h4 className="testimonial_source_text">LinkedIn</h4>
                           </div>
                        )}

                        {source === 'UpWork' && (
                           <div className="logo_and_text">
                              <img
                                 src={upworkLogo}
                                 alt="Upwork"
                                 className="testimonial_logo upwork_logo" // Added a class for Upwork logo
                              />
                              <h4 className="testimonial_source_text">UpWork</h4>
                           </div>
                        )}

                        {source === 'Local' && (
                           <div className="logo_and_text">
                              <h4 className="testimonial_source_text">Local</h4>
                           </div>
                        )}
                     </div>
                  </SwiperSlide>
               );
            })}
         </Swiper>
      </section>
   );
};

export default Testimonials;
