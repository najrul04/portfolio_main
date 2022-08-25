import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Me from '../../assets/2.jpg'
import './About.css'

const About = () => {

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
        animation.start({x: '-100vw'})
      }
    }, [inView]);

  return (
    <section
    ref={ref} id='about'>
      
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <motion.div className="container about_container"
      
      animate={animation}
>

      {/* 
      
       initial={{x: '-30vw'}}
            animate={{x: 0 }} 
            transition={{ type: 'spring', bounce:0.3, duration: 3 }} className="about_me_image"
      
      */}

        <div>

          <div  className="about_me">

            <img 
            src={Me} alt="AboutPicture" />

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

            <motion.p 
            initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{
               default: {
                 duration: 7,
                 ease: [0, 0.71, 0.2, 1.01]
               },
               scale: {
                 type: "spring", 
                 bounce:0.7
               }
             }}>

            An ambitious, enthusiastic web developer is competent in JavaScript, Node JS, Express JS. Pixel perfect Responsive design using HTML, CSS, JavaScript with the help of its libraries like REACT JS, Bootstrap or Tailwind, or Material UI. For server-side Firebase, Node JS, Express JS, and Mongo DB for the database.

            </motion.p>

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

            <motion.a 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{
               default: {
                 duration: 5,
                 ease: [0, 0.71, 0.2, 1.01]
               },
               scale: {
                 type: "spring", 
                 bounce:0.7
               }
             }}  href="#contact" className='btn btn-primary'>Let's Talk</motion.a>

          </div>

      </motion.div>

    </section>
  )
}

export default About;