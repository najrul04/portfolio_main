import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect } from 'react';
// import IMG1 from '../../assets/P1-E-Commerce.png';
import './Portfolio.css';

import  client1  from "../../assets/projects/1.png";
import  client2  from "../../assets/projects/2.png";
import  client3  from "../../assets/projects/3.png";
import  client4  from "../../assets/projects/4.png";
import  client5  from "../../assets/projects/5.png";
import  client6  from "../../assets/projects/6.png";

const data = [

  {
    id: 1,
    image: client1,
    title: 'Fitness World',
    github:'https://github.com/najrul04/gym_fitness',
    demo: 'https://web-fitness.netlify.app/',
    tag: '#ReactJS #RapidAPI #Material UI'
  },
  {

    id: 2,
    image: client2,
    title: 'Real Estate',
    github:"https://github.com/najrul04/real_estate",
    demo: "https://real-estate-zeta-lemon.vercel.app/",
    tag: '#NextJS #ChakraUI #RapidAPI'

  },  {

    id: 3,
    image: client3,
    title: 'Game Info',
    github:"https://github.com/najrul04/react_recap/tree/main/car-services",
    demo: "https://games-mart.web.app/",
    tag: '#ReactJS #Bootstrap #Firebase'

  },
  {

    id: 4,
    image: client4,
    title: 'Hospital',
    github:"https://github.com/najrul04/healthcare-website",
    demo: "https://gen-hospital.netlify.app/",
    tag: '#ReactJS #Firebase #MongoDB'

  },
  {

    id: 5,
    image: client5,
    title: 'ECommerce (Demo)',
    github:"https://github.com/najrul04/firebase_recap/tree/main/ECommerce-with-router",
    demo: "https://ecommerce-79009.firebaseapp.com/",
    tag: '#ReactJS #ReactRouter #Firebase'

  },

  {

    id: 6,
    image: client6,
    title: 'Temperature',
    github:"https://github.com/najrul04/temperature",
    demo: "https://temperature123.netlify.app/",
    tag: '#HTML #CSS #JavaScript'

  }

]

const Portfolio = () => {

 useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, [])

  return (
    <section id='portfolio'>
      
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio_container">

        {

            data.map(({id, image, title, github, demo, tag}) => {

                return(

                                      
                      <article data-aos="fade-up" 
                      whilehover={{scale:1.1}} key={id} className='portfolio_item'>

                      <div className="portfolio_item_image">

                        <img className='card_image' src={image} alt={title} />

                        <h3 style={{marginLeft: '12px'}}>{title}</h3>

                        <div className="portfolio_item_cta">

                        <a href= {github} rel='noreferrer' className='btn ' target="_blank">Github</a>
                        <a href={demo} rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

                        </div>
                        
                        <p className='tag_css'>{tag}</p>
                      </div>

                    </article>

                )

            })

        }


      </div>

    </section>
  )
}

export default Portfolio

