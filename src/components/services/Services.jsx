import Aos from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React, { useEffect } from 'react';
import { HiOutlineCheck } from 'react-icons/hi';
import './Services.css';

const Services = () => {
  useEffect(() => {
    Aos.init({})
  }, [])
  return (
    <section id='services'>
      
        <h5>What I Offer</h5>

        <div className="container services_container">

          <article className='service'>

            <div data-aos="fade-up" data-aos-duration="1000" className="service_head">

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

            <div data-aos-duration="3000" data-aos="fade-up" className="service_head">

              <h3>Web Development</h3>

            </div>

            <ul className="service_list">II

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