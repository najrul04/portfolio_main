import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useInView } from "react-intersection-observer";
import "./Testimonials.css";

// Client Pictures

import client1 from "../../assets/clients/client1.webp";
import client2 from "../../assets/clients/client2.webp";
import client3 from "../../assets/clients/client3.webp";
import client4 from "../../assets/clients/client4.webp";

// Where they have given me the reviews

import linkedInLogo from "../../assets/LinkedIn.png";
import upworkLogo from "../../assets/UpWork.png";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import StarRating from "./StarRating";
import "swiper/swiper-bundle.min.css";
// import 'swiper/css/pagination'

const data = [
  {
    index: 1,
    avatar: client1,
    name: "Jacob Knotek",
    review: `Najrul went above and beyond to make this project a success. He worked with me on all aspects of this app: design, bug fixes, new features, UX, performance, and even marketing. He offered suggestions on what could be improved, and provided extra ideas and support, even after he reached his hour limit for the week!

      Any time I'd give Najrul a task, he'd deliver it faster than I needed, and put in 2x the effort I expected. He was always available to hop on a call for me to clarify things.
      
      I've hired many freelancers over the years, and I have *never* had an experience as great as this. Najrul truly cares about the quality of his work, and goes to great lengths to make sure you're happy with his performance.
      
      He's now my first choice whenever I need a developer. I will absolutely continue working with him in the future!`,
    title: "Senior Developer, USA",

    source: "UpWork",
  },

  {
    index: 2,
    avatar: client2,
    name: " Shameh Rahman",
    review:
      "Very approachable and delivers the work reliably within the timelines maintaining good quality.",
    title: "MLS of Mount Sinai Health System, USA",

    source: "LinkedIn",
  },
  {
    index: 3,
    avatar: client3,
    name: "Rimon Mustafa Kamal",
    review:
      "I've never met a web developer who truly cares about their clients' success like Najrul does.",
    title: "Businessman, Spain",

    source: "Local",
  },
  {
    index: 4,
    avatar: client4,
    name: "Safwan Rahman",
    review:
      "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
    title: "MLS of Mount Sinai Health System, USA",

    source: "Local",
  },
];

SwiperCore.use([Pagination]);

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <section ref={ref} id="testimonials">
      <h5>Review from Clients</h5>
      <h2>Testimonials</h2>

      <Swiper
        data-aos="zoom-in-up"
        className="container testimonials_container" // install Swiper modules
        style={{ overflowX: "visible" }}
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
{data.map(({ avatar, name, review, title, source }, index) => {
  return (
    <SwiperSlide key={index} className="testimonial">
      <div className="client_avatar">
        <img src={avatar} alt={name} />
      </div>

      <h4 className="client_name">{name}</h4>

      {source !== "LinkedIn" && (
        <span>
          <StarRating />
        </span>
      )}

      <small className="client_review">{review}</small>
      <h5 className="client_title">{title}</h5>

      <div className={`testimonial_source ${source.toLowerCase()}_source`}>
        {source === "LinkedIn" && (
          <div className="logo_and_text">
            <img
              src={linkedInLogo}
              alt="LinkedIn"
              className="testimonial_logo linkedin_logo" // Added a class for LinkedIn logo
            />
            <h4 className="testimonial_source_text">LinkedIn</h4>
          </div>
        )}

        {source === "UpWork" && (
          <div className="logo_and_text">
            <img
              src={upworkLogo}
              alt="Upwork"
              className="testimonial_logo upwork_logo" // Added a class for Upwork logo
            />
            <h4 className="testimonial_source_text">UpWork</h4>
          </div>
        )}

        {source === "Local" && (
          
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
