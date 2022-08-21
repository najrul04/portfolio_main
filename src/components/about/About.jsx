import React from 'react'
import Me from '../../assets/2.jpg'
import './About.css'

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
{/* 
            <article className='about_card'>

              <FiAward className='about_icon'/>

              <h5>Experience</h5>

              <small>3+ Years Working</small>

            </article>
             */}
{/* 
            <article className='about_card'>

              <FiUsers className='about_icon'/>

              <h5>Clients</h5>

              <small>200+ Worldwide</small>

            </article>
             */}
{/* 
            <article className='about_card'>

              <VscFolderLibrary className='about_icon'/>

              <h5>Projects</h5>

              <small>80+ Completed</small>

            </article>
 */}
            </div>

            <p>

            An ambitious, enthusiastic web developer is competent in JavaScript, Node JS, Express JS. Pixel perfect Responsive design using HTML, CSS, JavaScript with the help of its libraries like REACT JS, Bootstrap or Tailwind, or Material UI. For server-side Firebase, Node JS, Express JS, and Mongo DB for the database.

            </p>

            <a href="#contact" className='btn btn-primary'>Let's Talk</a>

          </div>

      </div>

    </section>
  )
}

export default About;