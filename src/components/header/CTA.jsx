import { motion } from 'framer-motion'
import React from 'react'
import Resume from '../../assets/Resume.pdf'

const CTA = () => {
  return (
    <div className='cta'>
        <motion.a 
        target="_blank"
        initial={{x: '-100vw'}}
        animate={{x: 0 }} 
        transition={{ type: 'spring', bounce:0.3, duration: 2 }}
        href={Resume} download="Resume.pdf" className='btn'>Download Resume
        </motion.a>
        
        <motion.a
      initial={{x: '100vw'}}
      animate={{x: 0 }} 
      transition={{ type: 'spring', bounce:0.3, duration: 2 }}
         href="#contact" className='btn btn-primary'>Let's Talk</motion.a>
        </div>
  )
}

export default CTA;