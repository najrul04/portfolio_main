import React from 'react'
import { FaSass } from "react-icons/fa"
import { FcSettings } from "react-icons/fc"
import { SiBootstrap, SiCheckmarx, SiCss3, SiExpress, SiFirebase, SiHtml5, SiJavascript, SiMongodb, SiNodedotjs, SiPhp, SiReact, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si"
import './Experience.css'

const Experience = () => {
  return (
    <section id='experience'>

      {/* <h5>What Skill I have</h5> */}
      <h2>Skills</h2>

      <div className="container experience_container">

        <div className="experience_frontend">

          
        {/* ==================================== Frontend ================================ */}

          <h3>Frontend Development</h3>
          <div className="experience_content">

            <article className='experience_details'>

              <SiHtml5 className='experience_details_icons'/>

              <div>

              <h4>HTML5</h4>
              {/* <small className='text-light'>Experienced</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiCss3 className='experience_details_icons'/>

              <div>

              <h4>CSS3</h4>
              {/* <small className='text-light'>Experienced</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiJavascript className='experience_details_icons'/>

              <div>

              <h4>JavaScript</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiTypescript className='experience_details_icons'/>

              <div>

              <h4>TypeScript</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiBootstrap className='experience_details_icons'/>

              <div>

              <h4>Bootstrap</h4>
              {/* <small className='text-light'>Experienced</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiTailwindcss className='experience_details_icons'/>

              <div>

              <h4>Tailwind</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <FaSass className='experience_details_icons'/>

              <div>

              <h4>Sass</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiReact className='experience_details_icons'/>

              <div>

              <h4>React</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

            <SiRedux className='experience_details_icons'/>

              <div>

              <h4>Redux</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

          </div>
          
        </div>

        {/* ==================================== BackEnd ================================ */}

        <div className="experience_backend">

        <h3>Backend Development</h3>
          <div className="experience_content">

            <article className='experience_details'>

              <SiNodedotjs className='experience_details_icons'/>

              <div>

              <h4>Node JS</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

              <SiExpress className='experience_details_icons'/>

              <div>

              <h4>Express JS</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

              <SiMongodb className='experience_details_icons'/>

              <div>

              <h4>MongoDB</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

              <SiPhp className='experience_details_icons'/>

              <div>

              <h4>PHP</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='experience_details'>

              <SiFirebase className='experience_details_icons'/>

              <div>

              <h4>Firebase</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='experience_details'>

              <SiCheckmarx className='experience_details_icons'/>

              <div>

              <h4>NoSQL</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='experience_details'>

              <FcSettings className='experience_details_icons'/>

              <div>

              <h4>Rest Api</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Experience