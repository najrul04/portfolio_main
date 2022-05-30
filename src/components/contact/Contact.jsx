import React from 'react'
import './Contact.css'
import {GrMail} from 'react-icons/gr'
import {BsMessenger} from 'react-icons/bs'
import {BsWhatsapp} from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from 'emailjs-com'

const Contact = () => {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rxncsm9', 'template_1ez5glo', form.current, 'JZRIOMXjgrzL_X9g-')

    e.target.reset()

      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <section id='contact'>
      
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact_container">

        <div className="contact_options">

          <article className="contact_option">

            <GrMail className='contact_option_icon'/>
            <h4>Email</h4>
            <h5>nazrul2517@gmail.com</h5>
            <a href="mailto:nazrul2517@gmail.com" target=" rel='noreferrer'_blank">Send a Mail</a>

          </article>

          <article className="contact_option">
            
            <BsMessenger className='contact_option_icon'/>
            <h4>Messenger</h4>
            <h5>MD Najrul Islam Sumon</h5>
            <a href="https://m.me/nazrul2517/" target="_blank" rel='noreferrer'>Send a Message</a>

          </article>
          
          <article className="contact_option">
            
            <BsWhatsapp className='contact_option_icon'/>
            <h4>WhatsApp</h4>
            <a href="https://api.whatsapp.com/send?phone=8801845393505" target="_blank" rel='noreferrer'>Send a Message</a>

          </article>

        </div>

        {/* =================== End of Contact Option ====================== */}

        <form ref={form} onSubmit={sendEmail}>

            <input type="text" name='name' placeholder='Your Full name' required />
            <input type="email" name='email' placeholder='Your Email' required />
            <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
            <button type='submit' className='btn btn-primary'>Send Message</button>

        </form>

      </div>

    </section>
  )
}

export default Contact