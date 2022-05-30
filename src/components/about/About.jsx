import React from 'react'
import './About.css'
import Me from '../../assets/2.jpg'
import {FiAward} from 'react-icons/fi'
import {FiUsers} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'

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

            <article className='about_card'>

              <FiUsers className='about_icon'/>

              <h5>Clients</h5>

              <small>200+ Wprlwide</small>

            </article>

            <article className='about_card'>

              <VscFolderLibrary className='about_icon'/>

              <h5>Projects</h5>

              <small>80+ Completed</small>

            </article>

            </div>

            <p>

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla praesentium nemo assumenda voluptatem similique totam repudiandae molestiae atque! Facilis iure incidunt tenetur tempore soluta consequatur expedita optio corrupti voluptatibus sequi?

            </p>

            <a href="#contact" className='btn btn-primary'>Let's Talk</a>

          </div>

      </div>

    </section>
  )
}

export default About;