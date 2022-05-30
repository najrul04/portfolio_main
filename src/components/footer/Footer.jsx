import React from 'react'
import './Footer.css'
import {CgFacebook} from 'react-icons/cg'
import {GrInstagram} from 'react-icons/gr'
import {FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      
      <a href="#" className='footer_logo'> MD Najrul Islam Sumon</a>

      <ul className='permalinks'>

        <li><a href="#">Home</a></li>

        <li><a href="#about">About</a></li>

        <li><a href="#experience">Experience</a></li>

        <li><a href="#services">Services</a></li>

        <li><a href="#portfolio">Portfolio</a></li>

        <li><a href="#testimonials">Testimonials</a></li>

        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="footer_socials">
        <a href="https://www.facebook.com/nazrul2517/" target="_blank" rel='noreferrer'><CgFacebook/></a>
        <a href="https://www.instagram.com/nazrul_i04/?hl=en" target="_blank" rel='noreferrer'><GrInstagram/></a>
        <a href="https://twitter.com/najrul0" target="_blank" rel='noreferrer'><FaTwitter/></a>
      </div>

      <div className="footer_copyright">

        <small>&copy; MD Najrul Islam Sumon. All rights reserved</small>

      </div>

    </footer>
  )
}

export default Footer