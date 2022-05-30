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

        <img src={IMG1} alt="Noble Peace Prize" />

        <h3>This is a portfolio item title</h3>

        <a href="https://github.com/achille04/noble-winners" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://nobel-price-winners.netlify.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img src={IMG2} alt="Football School" />

        <h3>This is a portfolio item title</h3>

        <a href="https://github.com/achille04/educational-website1" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://football-school.netlify.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img src={IMG3} alt="Pizza Place" />

        <h3>This is a portfolio item title</h3>

        <a href="https://github.com/achille04/pizza-delivery-server-side" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://pizza-delivery-ea5ce.web.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img src={IMG4} alt="Hospital" />

        <h3>This is a portfolio item title</h3>

        <a href="https://github.com/achille04/healthcare-website" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://gen-hospital.netlify.app/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img src={IMG5} alt="Noble Peace Prize" />

        <h3>This is a portfolio item title</h3>

        <p>WordPress Website</p>
        <a href="https://superfuturebrands.com/" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>


    <article className='portfolio_item'>

      <div className="portfolio_item_image">

        <img src={IMG6} alt="Noble Peace Prize" />

        <h3>This is a portfolio item title</h3>

        <a href="https://github.com/achille04/personal_portfolio" rel='noreferrer' className='btn' target="_blank">Github</a>
        <a href="https://achille04.github.io/personal_portfolio/index.html" rel='noreferrer' className='btn btn-primary' target="_blank">Live Demo</a>

      </div>

    </article>

      </div>

    </section>
  )
}

export default Portfolio