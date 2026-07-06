import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personal_links } from '@/lib/constants';

const Footer = () => {
   return (
      <footer>
         <a href="#" className="footer_logo">
            {' '}
            MD Najrul Islam Sumon
         </a>

         <ul className="permalinks">
            <li>
               <a href="#">Home</a>
            </li>

            <li>
               <a href="#about">About</a>
            </li>

            <li>
               <a href="#experience">Experience</a>
            </li>

            <li>
               <a href="#skills0">Skills</a>
            </li>

            {/* <li><a href="#services">Servicesss</a></li> */}

            <li>
               <a href="#portfolio">Portfolio</a>
            </li>

            <li>
               <a href="#testimonials">Testimonials</a>
            </li>

            <li>
               <a href="#contact">Contact</a>
            </li>
         </ul>

         <div className="footer_socials">
            <div>
               <a
                  href="https://www.linkedin.com/in/najrul1704/"
                  target="_blank"
                  rel="noreferrer"
               >
                  <FaLinkedin />
               </a>
            </div>
            <div>
               <a href="https://x.com/MDNazru67844430" target="_blank" rel="noreferrer">
                  <FaTwitter />
               </a>
            </div>
            <div>
               <a href="https://github.com/najrul04" target="_blank" rel="noreferrer">
                  <FaGithub />
               </a>
            </div>
         </div>

         <div className="footer_copyright">
            <small>
               &copy; MD Najrul Islam Sumon. All rights reserved {new Date().getFullYear()}
            </small>

            <div className="personal_links">
               {personal_links.map((links) => (
                  <a key={links.id} href={links.url} target="_blank" title={links.text}>
                     <img src={links.icon} alt={links.name} />
                  </a>
               ))}
            </div>
         </div>
      </footer>
   );
};

export default Footer;
