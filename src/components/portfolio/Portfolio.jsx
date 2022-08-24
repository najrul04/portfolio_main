import { motion } from 'framer-motion'
import React from 'react'
import IMG1 from '../../assets/P1-Noble.png'
import IMG2 from '../../assets/P2-football.png'
import IMG3 from '../../assets/P3-Pizza.png'
import IMG4 from '../../assets/P4-Hospital.png'
import IMG5 from '../../assets/p5-shop.png'
import IMG6 from '../../assets/p6-anotherPortfolio.png'
import './Portfolio.css'

const data = [

  {
    id: 1,
    image: IMG1,
    title: 'Noble Peace Prize',
    github:'https://github.com/achille04/noble-winners',
    demo: 'https://nobel-price-winners.netlify.app/'
  },
  {

    id: 2,
    image: IMG2,
    title: 'Football School',
    github:"https://github.com/achille04/educational-website1",
    demo: "https://football-school.netlify.app/"

  },
  {

    id: 3,
    image: IMG3,
    title: 'Pizza Place',
    github:"https://github.com/achille04/pizza-delivery-server-side",
    demo: "https://pizza-delivery-ea5ce.web.app/"

  },
  {

    id: 4,
    image: IMG4,
    title: 'Hospital',
    github:"https://github.com/achille04/healthcare-website",
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

    id: 6,
    image: IMG6,
    title: 'Personal Portfolio',
    github:"https://github.com/achille04/personal_portfolio",
    demo: "https://achille04.github.io/personal_portfolio/index.html"

  }

]

const Portfolio = () => {
  return (
    <section id='portfolio'>
      
      <h5>My Recent Work</h5>
      <motion.h2
      initial={{x: '100vw'}}
      animate={{x: 0 }} 
      transition={{ type: 'spring', bounce:0.3, duration: 3 }}
      >Portfolio</motion.h2>

      <motion.div 
      initial={{y: '100vw'}}
      animate={{y: 0 }} 
      transition={{ type: 'spring', bounce:0.3, duration: 2 }}  className="container portfolio_container">

        {

            data.map(({id, image, title, github, demo}) => {

                return(

                                      
                      <motion.article
                      whileHover={{scale:1.1}} key={id} className='portfolio_item'>

                      <div className="portfolio_item_image">

                        <img width={500} height="300" src={image} alt={title} />

                        <h3>{title}</h3>

                        <div className="portfolio_item_cta">

                        <a href= {github} rel='noreferrer' className='btn' target="_blank">Github</a>
                        <a href={demo} rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

                        </div>

                      </div>

                    </motion.article>

                )

            })

        }


      <motion.article
      whileHover={{scale:1.1}}  className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG5} alt="WordPress Website" />

        <h3>WordPress Website</h3>

          <div className="portfolio_item_cta">

          <a href="https://superfuturebrands.com/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

          </div>

      </div>

      </motion.article>
    

      </motion.div>

    </section>
  )
}

export default Portfolio

/* 

<article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG2} alt="Football School" />

        <h3>Football School</h3>

        <div className="portfolio_item_cta">

        <a href="https://github.com/achille04/educational-website1" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://football-school.netlify.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

        </div>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG3} alt="Pizza Place" />

        <h3>Pizza Place</h3>

        <div className="portfolio_item_cta">

        <a href="https://github.com/achille04/pizza-delivery-server-side" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://pizza-delivery-ea5ce.web.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

        </div>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG4} alt="Hospital" />

        <h3>Hospital</h3>

        <div className="portfolio_item_cta">

        <a href="https://github.com/achille04/healthcare-website" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://gen-hospital.netlify.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

        </div>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG5} alt="WordPress Website" />

        <h3>WordPress Website</h3>

          <div className="portfolio_item_cta">

          <a href="https://superfuturebrands.com/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

          </div>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG6} alt="Noble Peace Prize" />

        <h3>Personal Portfolio</h3>

        <div className="portfolio_item_cta">

        <a href="https://github.com/achille04/personal_portfolio" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://achille04.github.io/personal_portfolio/index.html" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

        </div>

      </div>

    </article>

*/