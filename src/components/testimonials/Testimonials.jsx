import React, { useEffect }  from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useInView } from 'react-intersection-observer';
import './Testimonials.css'
import { Navigation } from 'swiper'

import  client1  from "../../assets/clients/client1.jpg";
import  client2  from "../../assets/clients/client2.jpg";
import  client3  from "../../assets/clients/client3.jpg";

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
// import 'swiper/css/pagination'

const data = [

  {
      index: 1,
      avatar: client1,
      name: 'Shameh Rahman',
      review: "Very approachable and delivers the work reliably within the timelines maintaining good quality.",
      title: "EIT of Syska Hennessy Group, USA"

  },

  {

    index: 2,
      avatar: client2,
      name: 'Safwan Rahman',
      review: "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
      title: "MLS of Mount Sinai Health System, USA"

  }
  ,

  {

    index: 3,
      avatar: client3,
      name: 'Rimon Mustafa Kamal',
      review: "I've never met a web developer who truly cares about their clients' success like Najrul does.",
      title: "Businessman, Spain"

  }

]

const Testimonials = () => {
  
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, [])

  const {ref, inView} = useInView({
    threshold: 0.2
  });
  
  return (
    <section ref={ref} id='testimonials'>

    <h5>Review from Clients</h5>
    <h2>Testimonials</h2>

    <Swiper  data-aos="zoom-in-up" className="container testimonials_container" // install Swiper modules
      style={{overflowX: "visible"}}
      modules={[Navigation]}
      spaceBetween={30}
      navigation 
      breakpoints={{
        640: {
          slidesPerView: 1
        },
        // Adjust the breakpoints to your desired screen widths
        768: {
          slidesPerView: 2, // Show 1 slide on screens with width 768px and below (mobile)
        },
        1024: {
          slidesPerView: 3, // Show 3 slides on screens with width 1024px and above (desktop)
        },
      }}
     
      >

      {

          data.map(({avatar, name, review, title}, index) => {

            return(

              <SwiperSlide key={index} className="testimonial">

              <div className="client_avatar">
    
                <img src={avatar} />
                
              </div>
              
              <h4 className='client_name'>{name}</h4>
                <small className='client_review'>
    
                 {review}
    
                </small>
                <h5 className='client_title'>
                {title}
                </h5>
    
            </SwiperSlide>

            )

          })

      }
       
    </Swiper>
    </section>


  )
}

export default Testimonials;
