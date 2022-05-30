import React from 'react'
import './Experience.css'
import {SiCheckmarx} from "react-icons/si"

const Experience = () => {
  return (
    <section id='experience'>
      <h5>What Skill I have</h5>
      <h2>My Experience</h2>

      <div className="container experience_container">

        <div className="experience_frontend">

          
        {/* ==================================== Frontend ================================ */}

          <h3>Frontend Development</h3>
          <div className="experience_content">

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>HTML5</h4>
              <small className='text-light'>Experienced</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>CSS3</h4>
              <small className='text-light'>Experienced</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>JavaScript</h4>
              <small className='text-light'>Intermediate</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>Bootstrap</h4>
              <small className='text-light'>Experienced</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>Tailwind</h4>
              <small className='text-light'>Intermediate</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>React</h4>
              <small className='text-light'>Intermediate</small>

            </article>

          </div>
          
        </div>

        {/* ==================================== BackEnd ================================ */}

        <div className="experience_backend">

        <h3>Backend Development</h3>
          <div className="experience_content">

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>Node JS</h4>
              <small className='text-light'>Intermediate</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>Mongo DB</h4>
              <small className='text-light'>Experienced</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>PHP</h4>
              <small className='text-light'>Intermediate</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>MySql</h4>
              <small className='text-light'>Basic</small>

            </article>

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>Python</h4>
              <small className='text-light'>Basic</small>

            </article>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Experience