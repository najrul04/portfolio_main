import React, { useEffect }  from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useInView } from 'react-intersection-observer';
import './Testimonials.css'
import { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
// import 'swiper/css/pagination'

const data = [

  {

      avatar: "https://i.ibb.co/Q9v3P8w/client1.jpg",
      name: 'Shameh Rahman',
      review: "Very approachable and delivers the work reliably within the timelines maintaining good quality.",
      title: "EIT of Syska Hennessy Group, USA"

  },

  {

      avatar: "https://i.ibb.co/2hmhqK5/client2.jpg",
      name: 'Rimon Mustafa Kamal',
      review: "I've never met a web developer who truly cares about their clients' success like Najrul does.",
      title: "Businessman, Spain"

  }
  ,

  {

      avatar: "https://i.ibb.co/fQnWyHZ/client3.jpg",
      name: 'Safwan Rahman',
      review: "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
      title: "MLS of Mount Sinai Health System, USA"

  }
  ,

  {

      avatar: "https://i.ibb.co/fQnWyHZ/client3.jpg",
      name: 'Safwan Rahman',
      review: "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
      title: "MLS of Mount Sinai Health System, USA"

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
