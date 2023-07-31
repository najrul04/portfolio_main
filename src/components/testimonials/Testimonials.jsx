import React from 'react'
import client1 from '../../assets/client1.jpg'
import client2 from '../../assets/client2.jpg'
import client3 from '../../assets/client3.jpg'
import './Testimonials.css'

// import Swiper core and required modules
import { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
// import 'swiper/css/pagination'

const data = [

  {

      avatar: client1,
      name: 'Shameh Rahman',
      review: "Very approachable and delivers the work reliably within the timelines maintaining good quality.",
      title: "EIT of Syska Hennessy Group, USA"

  },

  {

      avatar: client2,
      name: 'Rimon Mustafa Kamal',
      review: "I've never met a web developer who truly cares about their clients' success like Najrul does.",
      title: "Businessman, Spain"

  },

  {

      avatar: client3,
      name: 'Christian Bale',
      review: "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
      title: "MLS of Mount Sinai Health System, USA"

  }

]

const Testimonials = () => {
  return (
    <section id='testimonials'>

    <h5>Review from Clients</h5>
    <h2>Testimonials</h2>

    <Swiper className="container testimonials_container" // install Swiper modules
      modules={[Navigation]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      // pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}>

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

/* 


        

 <article className="testimonial">

          <div className="client_avatar">

            <img src={client1} alt="Clients1" />
            
          </div>
          
          <h5 className='client_name'>Christian Bale</h5>
            <small className='client_review'>

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?

            </small>

        </article>

        <article className="testimonial">

          <div className="client_avatar">

            <img src={client1} alt="Clients1" />
            
          </div>
          
          <h5 className='client_name'>Christian Bale</h5>
            <small className='client_review'>

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?

            </small>

        </article>

        <article className="testimonial">

          <div className="client_avatar">

            <img src={client1} alt="Clients1" />
            
          </div>
          
          <h5 className='client_name'>Christian Bale</h5>
            <small className='client_review'>

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae consectetur recusandae?

            </small>

        </article>


*/