import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import IMG1 from '../../assets/P1-Noble.png'
import IMG2 from '../../assets/P2-football.png'
import IMG3 from '../../assets/P3-Pizza.png'
import IMG4 from '../../assets/P4-Hospital.png'
import IMG6 from '../../assets/p6-gamesSite.png'
import IMG7 from '../../assets/p7-bike.png'
import './Portfolio.css'

const data = [

  {
    id: 1,
    image: IMG1,
    title: 'Noble Prize',
    github:'https://github.com/najrul04/noble-winners',
    demo: 'https://nobel-price-winners.netlify.app/'
  },
  {

    id: 2,
    image: IMG2,
    title: 'Football School',
    github:"https://github.com/najrul04/educational-website1",
    demo: "https://football-school.netlify.app/"

  },  {

    id: 6,
    image: IMG6,
    title: 'Games',
    github:"https://github.com/najrul04/react_recap/tree/main/car-services",
    demo: "https://games-mart.web.app/"

  },
  {

    id: 3,
    image: IMG3,
    title: 'Pizza Place',
    github:"https://github.com/najrul04/pizza-delivery-server-side",
    demo: "https://pizza-delivery-ea5ce.web.app/"

  },
  {

    id: 4,
    image: IMG4,
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
    image: IMG7,
    title: 'Bike',
    github:"https://github.com/najrul04/bike-website-client-side",
    demo: "https://best-bike.web.app/"

  }

]

const Portfolio = () => {

  const {ref, inView} = useInView({
    threshold: 0.2
  });

  const animation = useAnimation();

  useEffect(() => {
    if(inView){
        animation.start({
          x:0, 
          transition: {
            type: 'spring', duration: 3, bounce: 0.3
          }
        })
    }
    if(!inView){
      console.log('Is it working', inView)
      animation.start({x: '-100vw'})
    }
  }, [inView]);

  return (
    <section ref={ref} id='portfolio'>
      
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      {/* 
      
      initial={{y: '100vw'}}
      animate={{y: 0 }} 
      transition={{ type: 'spring', bounce:0.3, duration: 2 }} 
      
      */}

      <motion.div  animate={animation}  className="container portfolio_container">

        {

            data.map(({id, image, title, github, demo}) => {

                return(

                                      
                      <motion.article
                      whileHover={{scale:1.1}} key={id} className='portfolio_item'>

                      <div className="portfolio_item_image">

                        <img className='card_image' src={image} alt={title} />

                        <h3>{title}</h3>

                        <div className="portfolio_item_cta">

                        <a href= {github} rel='noreferrer' className='btn' target="_blank">Github</a>
                        <a href={demo} rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

                        </div>
                        {/* width={500} height="400" */}
                      </div>

                    </motion.article>

                )

            })

        }


{/*       <motion.article
      whileHover={{scale:1.1}}  className='portfolio_item'>

      <div className="portfolio_item_image">

        <img width={500} height="300"  src={IMG5} alt="WordPress Website" />

        <h3>WordPress Website</h3>

          <div className="portfolio_item_cta">

          <a href="https://superfuturebrands.com/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

          </div>

      </div>

      </motion.article> */}
    

      </motion.div>

    </section>
  )
}

export default Portfolio

