import React from 'react'
import './Portfolio.css'
import IMG1 from '../../assets/P1 Noble.png' 
import IMG2 from '../../assets/P2 football.png' 
import IMG3 from '../../assets/P3 Pizza.png' 
import IMG4 from '../../assets/P4 Hospital.png' 
import IMG5 from '../../assets/p5 shop.png' 
import IMG6 from '../../assets/p6 anotherPortfolio.png' 

const Portfolio = () => {
  return (
    <section id='portfolio'>
      
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio_container">


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <h3>This is a portfolio item title</h3>

        <a href="https://github.com/achille04/noble-winners" className='btn' target="_blank">Github</a>
        <a href="https://nobel-price-winners.netlify.app/" className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>

      </div>

    </section>
  )
}

export default Portfolio