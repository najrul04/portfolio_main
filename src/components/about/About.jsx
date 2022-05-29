import React from 'react'
import './About.css'
import Me from '../../assets/2.jpg'
import {FiAward} from 'react-icons/fi'

const About = () => {
  return (
    <section id='about'>
      
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about_container">

        <div className="about_me">

          <div className="about_me_image">

            <img src={Me} alt="AboutPicture" />

          </div>

        </div>

          <div className="about_content">

            <div className="about_cards">

            <article className='about_card'>

              <FiAward className='about_icon'/>

              <h5>Experience</h5>

              <small>3+ Years Working</small>

            </article>

            </div>

          </div>

      </div>

    </section>
  )
}

export default About;