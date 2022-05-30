import React from 'react'
import './Services.css'
import {HiOutlineCheck} from 'react-icons/hi'

const Services = () => {
  return (
    <section id='services'>
      
        <h5>What I Offer</h5>

        <div className="container services_container">

          <article className='service'>

            <div className="service_head">

              {/* ========================== Wordpress Development========================== */}

              <h3>Wordpress Development</h3>

            </div>

            <ul className="service_list">

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

            </ul>

          </article>

          {/* ========================== Web Development========================== */}

          
          <article className='service'>

            <div className="service_head">

              <h3>Web Development</h3>

            </div>

            <ul className="service_list">

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

            </ul>

          </article>


          {/* ========================== React Development========================== */}

          
          <article className='service'>

            <div className="service_head">

              <h3>React Development</h3>

            </div>

            <ul className="service_list">

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

              <li>

                <HiOutlineCheck className='service_list_icon'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              </li>

            </ul>

          </article>


        </div>

    </section>
  )
}

export default Services