'use client';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { BsMessenger, BsWhatsapp } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
   useEffect(() => {
      AOS.init({
         duration: 1200,
      });
   }, []);

   const { ref } = useInView({
      threshold: 0.2,
   });

   const form = useRef<HTMLFormElement>(null);
   const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

   const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.current || status === 'sending') return;

      setStatus('sending');

      const data = new FormData(form.current);

      try {
         const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: data.get('name'),
               email: data.get('email'),
               message: data.get('message'),
               company: data.get('company'),
            }),
         });

         if (!res.ok) throw new Error(`Contact API responded ${res.status}`);

         setStatus('success');
         // WHY: reset only on success so a failed message isn't wiped out
         form.current?.reset();
      } catch (error) {
         console.error('Contact form send failed:', error);
         setStatus('error');
      }
   };

   return (
      <section ref={ref} id="contact">
         <h5>Get In Touch</h5>
         <h2>Contact Me</h2>

         <div data-aos="zoom-out" className="container contact_container">
            <div className="contact_options">
               <article className="contact_option">
                  <GrMail className="contact_option_icon" />
                  <h4>Email</h4>
                  <h5>nazrul2517@gmail.com</h5>
                  <a href="mailto:nazrul2517@gmail.com" target="_blank" rel="noreferrer">
                     Send a Mail
                  </a>
               </article>

               <article className="contact_option">
                  <BsMessenger className="contact_option_icon" />
                  <h4>Messenger</h4>
                  <h5>MD Najrul Islam Sumon</h5>
                  <a href="https://m.me/nazrul2517/" target="_blank" rel="noreferrer">
                     Send a Message
                  </a>
               </article>

               <article className="contact_option">
                  <BsWhatsapp className="contact_option_icon" />
                  <h4>WhatsApp</h4>
                  <h5>01845393505</h5>
                  <a
                     href="https://api.whatsapp.com/send?phone=8801845393505"
                     target="_blank"
                     rel="noreferrer"
                  >
                     Send a Message
                  </a>
               </article>
            </div>

            {/* =================== End of Contact Option ====================== */}

            <form ref={form} onSubmit={sendEmail}>
               <input type="text" name="name" placeholder="Your Full name" required />
               <input type="email" name="email" placeholder="Your Email" required />
               {/* WHY: honeypot — hidden from humans, bots fill it and get silently dropped */}
               <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="contact_honeypot"
               />
               <textarea name="message" rows={7} placeholder="Your Message" required></textarea>
               <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
               </button>
               {status === 'success' && (
                  <p className="contact_status contact_status_success" role="status">
                     Message sent. Thank you, I will get back to you soon.
                  </p>
               )}
               {status === 'error' && (
                  <p className="contact_status contact_status_error" role="status">
                     Something went wrong and your message was not sent. Please email me directly
                     at nazrul2517@gmail.com.
                  </p>
               )}
            </form>
         </div>
      </section>
   );
};

export default Contact;
