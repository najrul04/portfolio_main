import React from 'react'
import './Testimonials.css'
import client1 from '../../assets/C1.jpg'
import client2 from '../../assets/C1.jpg'
import client3 from '../../assets/C1.jpg'
import client4 from '../../assets/C1.jpg'

// import Swiper core and required modules
import { Pagination, Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination';

const data = [

  {

      avatar: client1,
      name: 'Christian Bale',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur atque aut dolorem officiis quae mollitia! Doloremque quibusdam assumenda repellat inventore sed voluptatibus autem est ut cumque nesciunt, quod ducimus recusandae1111111111111111.'

  },

  {

      avatar: client2,
      name: 'Christian Bale',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur atque aut dolorem officiis quae mollitia! Doloremque quibusdam assumenda repellat inventore sed voluptatibus autem est ut cumque nesciunt, quod ducimus recusandae2222222222222222222.'

  },

  {

      avatar: client3,
      name: 'Christian Bale',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur atque aut dolorem officiis quae mollitia! Doloremque quibusdam assumenda repellat inventore sed voluptatibus autem est ut cumque nesciunt, quod ducimus recusandae33333333333333333333.'

  },

  {

      avatar: client4,
      name: 'Christian Bale',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur atque aut dolorem officiis quae mollitia! Doloremque quibusdam assumenda repellat inventore sed voluptatibus autem est ut cumque nesciunt, quod ducimus recusandae444444444444.'

  }

]

const Testimonials = () => {
  return (
    <section id='testimonials'>

    <h5>Review from Clients</h5>
    <h2>Testimonials</h2>

    <Swiper className="container testimonials_container" // install Swiper modules
      modules={[Navigation, Pagination]}
      spaceBetween={40}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}>

      {

          data.map(({avatar, name, review}, index) => {

            return(

              <SwiperSlide key={index} className="testimonial">

              <div className="client_avatar">
    
                <img src={avatar} />
                
              </div>
              
              <h5 className='client_name'>{name}</h5>
                <small className='client_review'>
    
                 {review}
    
                </small>
    
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