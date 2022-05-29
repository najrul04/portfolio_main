import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'

const HeaderSocials = () => {
  return (
    <div className='header_socials'>

        <a href="https://www.linkedin.com/in/najrul-islam/" target="_blank"><BsLinkedin /></a>
        <a href="https://github.com/achille04" target="_blank"><BsGithub/></a>
        <a href="https://www.instagram.com/nazrul_i04/?hl=en" target="_blank"><BsInstagram/></a>

    </div>
  )
}

export default HeaderSocials;