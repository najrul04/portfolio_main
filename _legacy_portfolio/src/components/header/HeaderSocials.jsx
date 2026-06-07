import { motion } from 'framer-motion'
import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs'

const HeaderSocials = () => {
  return (
    <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 50 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
    className='header_socials'>

        <a href="https://www.linkedin.com/in/najrul04/" target="_blank" rel="noreferrer"><BsLinkedin /></a>
        <a href="https://github.com/najrul04" target="_blank" rel="noreferrer"><BsGithub/></a>
        <a href="https://www.instagram.com/najrul0423/?hl=en" target="_blank" rel="noreferrer"><BsInstagram/></a>

    </motion.div>
  )
}

export default HeaderSocials;