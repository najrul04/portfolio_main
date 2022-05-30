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

          <h3>Frontend Development</h3>
          <div className="experience_content">

            <article className='experience_details'>

              <SiCheckmarx/>

              <h4>HTML5</h4>
              <small className='text-light'>Experienced</small>

            </article>

          </div>
          
        </div>

        <div className="experience_backend">



        </div>

      </div>
    </section>
  )
}

export default Experience