import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect } from 'react'
import Me from '../../assets/2.jpg'
import './About.css'

const About = () => {


  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, [])

  return (
    <section  data-aos="fade-up-left" id='about'>
      
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about_container"
      
>

      {/* 
      
       initial={{x: '-30vw'}}
            animate={{x: 0 }} 
            transition={{ type: 'spring', bounce:0.3, duration: 3 }} className="about_me_image"
      
      */}

        <div>

          <div  className="about_me">

            <img 
            className='about_me_image' src={Me} alt="AboutPicture" />

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

            An ambitious, enthusiastic front-end React developer with expertise in HTML, CSS, and JavaScript, along with libraries like React JS, Next JS, Bootstrap, Tailwind, and Material UI. I'm well-versed in Firebase, Node JS, Express JS, and MongoDB for server-side development. I'm passionate about crafting captivating and responsive web applications that deliver seamless user experiences

            </p>

            {/* 
            
            
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{
               default: {
                 duration: 0.1,
                 ease: [0, 0.71, 0.2, 1.01]
               },
               scale: {
                 type: "spring", 
                 bounce:0.7
               }
             }} 
            
            */}

            <a href="#contact" className='btn btn-primary'>Let's Talk</a>

          </div>

      </div>

    </section>
  )
}

export default About;