import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect } from 'react';
// import IMG1 from '../../assets/P1-E-Commerce.png';
import './Portfolio.css';

const data = [

  {
    id: 1,
    image: "https://i.ibb.co/j3JsHXt/P1-E-Commerce.png",
    title: 'Ecommerce (Demo)',
    github:'https://github.com/najrul04/firebase_recap/tree/main/ECommerce-with-router',
    demo: 'https://ecommerce-79009.firebaseapp.com//'
  },
  {

    id: 2,
    image: "https://i.ibb.co/k9X4ngJ/P2-football.png",
    title: 'Football School',
    github:"https://github.com/najrul04/educational-website1",
    demo: "https://football-school.netlify.app/"

  },  {

    id: 6,
    image: "https://i.ibb.co/hZBK03M/p6-games-Site.png",
    title: 'Games',
    github:"https://github.com/najrul04/react_recap/tree/main/car-services",
    demo: "https://games-mart.web.app/"

  },
  {

    id: 3,
    image: "https://i.ibb.co/wgXC8P3/P3-Pizza.png",
    title: 'Pizza Place',
    github:"https://github.com/najrul04/pizza-delivery-server-side",
    demo: "https://pizza-delivery-ea5ce.web.app/"

  },
  {

    id: 4,
    image: "https://i.ibb.co/X318Bcg/P4-Hospital.png",
    title: 'Hospital',
    github:"https://github.com/najrul04/healthcare-website",
    demo: "https://gen-hospital.netlify.app/"

  },
  /* {

    id: 5,
    image: IMG5,
    title: 'WordPress Website',
    // github:"https://github.com/achille04/healthcare-website",
    demo: "https://superfuturebrands.com/"

  }, */

  {

    id: 7,
    image: "https://i.ibb.co/BNNj44t/p7-bike.png",
    title: 'Bike',
    github:"https://github.com/najrul04/bike-website-client-side",
    demo: "https://best-bike.web.app/"

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

            data.map(({id, image, title, github, demo}) => {

                return(

                                      
                      <article data-aos="fade-up" 
                      whilehover={{scale:1.1}} key={id} className='portfolio_item'>

                      <div className="portfolio_item_image">

                        <img className='card_image' src={image} alt={title} />

                        <h3>{title}</h3>

                        <div className="portfolio_item_cta">

                        <a href= {github} rel='noreferrer' className='btn ' target="_blank">Github</a>
                        <a href={demo} rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

                        </div>
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

