import React from 'react'
import { CgFacebook } from 'react-icons/cg'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      
      <a href="#" className='footer_logo'> MD Najrul Islam Sumon</a>

      <ul className='permalinks'>

        <li><a href="#">Home</a></li>

        <li><a href="#about">About</a></li>

        <li><a href="#experience">Experience</a></li>

        <li><a href="#skills">Skills</a></li>

        {/* <li><a href="#services">Services</a></li> */}

        <li><a href="#portfolio">Portfolio</a></li>

        <li><a href="#testimonials">Testimonials</a></li>

        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="footer_socials">
        <div
        whilehover={{scale:1.1}}
        >
        <a href="https://www.facebook.com/nazrul2517/" target="_blank" rel='noreferrer'><CgFacebook/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://www.linkedin.com/in/najrul04/" target="_blank" rel='noreferrer'><FaLinkedin/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://www.instagram.com/najrul04/?hl=en" target="_blank" rel='noreferrer'><GrInstagram/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://twitter.com/najrul0" target="_blank" rel='noreferrer'><FaTwitter/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://github.com/najrul04" target="_blank" rel='noreferrer'><FaGithub/></a>
        </div>
      </div>

      <div className="footer_copyright">

        <small>&copy; MD Najrul Islam Sumon. All rights reserved {new Date().getFullYear()}</small>

      </div>

    </footer>
  )
}

export default Footer