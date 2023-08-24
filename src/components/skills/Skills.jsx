import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect } from 'react';
import { FcSettings } from "react-icons/fc";
import { SiBootstrap, SiCheckmarx, SiCss3, SiExpress, SiFirebase, SiHtml5, SiJavascript, SiMongodb, SiNodedotjs, SiPhp, SiReact, SiReactrouter, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import './Skills.css';

const Skills = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, [])
  
  return (
    <section
   id='skills'>

      <h5>What are my</h5>
      <h2>Skills</h2>

      <div 
      className="container skills_container">


        <div data-aos="fade-right" className="skills_frontend">

          
        {/* ==================================== Frontend ================================ */}

          <h3>Frontend Development</h3>
          <div className="skills_content">

            <article className='skills_details'>

              <SiHtml5 className='skills_details_icons'/>

              <div>

              <h4>HTML5</h4>
              {/* <small className='text-light'>Mark Up Language</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiCss3 className='skills_details_icons'/>

              <div>

              <h4>CSS3</h4>
              {/* <small className='text-light'>skillsd</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiJavascript className='skills_details_icons'/>

              <div>

              <h4>JavaScript</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiTypescript className='skills_details_icons'/>

              <div>

              <h4>TypeScript</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiBootstrap className='skills_details_icons'/>

              <div>

              <h4>Bootstrap</h4>
              {/* <small className='text-light'>skillsd</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiTailwindcss className='skills_details_icons'/>

              <div>

              <h4>Tailwind</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <TbBrandNextjs className='skills_details_icons'/>

              <div>

              <h4>Next JS</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiReact className='skills_details_icons'/>

              <div>

              <h4>React</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

            <article className='skills_details'>

            <SiRedux className='skills_details_icons'/>

              <div>

              <h4>Redux</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>
            <article className='skills_details'>

            <SiReactrouter className='skills_details_icons'/>

              <div>

              <h4>React Router</h4>
              {/* <small className='text-light'>Intermediate</small> */}

              </div>

            </article>

          </div>
          
        </div>

        {/* ==================================== BackEnd ================================ */} 


        <div data-aos="fade-left" className="skills_backend">

        <h3>Backend Development</h3>
          <div className="skills_content">

            <article className='skills_details'>

              <SiNodedotjs className='skills_details_icons'/>

              <div>

              <h4>Node JS</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='skills_details'>

              <SiExpress className='skills_details_icons'/>

              <div>

              <h4>Express JS</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='skills_details'>

              <SiMongodb className='skills_details_icons'/>

              <div>

              <h4>MongoDB</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='skills_details'>

              <SiPhp className='skills_details_icons'/>

              <div>

              <h4>PHP</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='skills_details'>

              <SiFirebase className='skills_details_icons'/>

              <div>

              <h4>Firebase</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='skills_details'>

              <SiCheckmarx className='skills_details_icons'/>

              <div>

              <h4>NoSQL</h4>
              {/* <small className='text-light'>Basic</small> */}

              </div>

            </article>

            <article className='skills_details'>

              <FcSettings className='skills_details_icons'/>

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

export default Skills