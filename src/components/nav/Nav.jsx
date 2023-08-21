import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineUser, AiOutlineRocket } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import { RiMessage2Line, RiServiceFill } from 'react-icons/ri'
import './Nav.css'

const Nav = () => {
  const [activeNav, setActiveNav] = useState("#")
  return (
    <div>
      
      <motion.nav 
      initial={{x: '-100vw'}}
      animate={{x: '-12vw' }} 
      transition={{ type: 'spring', bounce:0.3, duration: 3 }}
      >

        <a href="#" onClick={() => setActiveNav('#')} className={activeNav === "#" ? 'active' : ""}><AiOutlineHome/></a>

        <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === "#about" ? 'active' : ""}><AiOutlineUser/></a>

        <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === "#experience" ? 'active' : ""}><AiOutlineRocket/></a>

        <a href="#skills" onClick={() => setActiveNav('#skills')} className={activeNav === "#skills" ? 'active' : ""}><BiBook/></a>

        <a href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav === "#portfolio" ? 'active' : ""}><RiServiceFill/></a>

        <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === "#contact" ? 'active' : ""}><RiMessage2Line/></a> 

      </motion.nav>

    </div>
  )
}

export default Nav