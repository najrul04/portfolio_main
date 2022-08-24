import React from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { Typewriter } from 'react-simple-typewriter'
// import Typical from 'react-typical'
import ME from './../../assets/1.png'
import CTA from './CTA'
import './Header.css'
import HeaderSocials from './HeaderSocials'
// import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'

const Header = () => {

  
  return (
    <header>

      <motion.div
      initial={{y: '-100vw'}}
      animate={{y: 0 }} 
      transition={{ type: 'spring', bounce:0.3, duration: 2 }} className="container header_container">

      <motion.h2 
      initial={{x: '-100vw'}}
      animate={{x: 0 }} 
      transition={{ type: 'spring', bounce:0.3, duration: 3 }}
            >Hello I'm {' '} </motion.h2>
      
      
        
        <h3 style={{ color: 'white', fontWeight: 'bold',fontSize: '1.7rem' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['Najrul', 'Front End Developer']}
            loop={true}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h3>




{/*         <Typical
        steps={['Hello', 1000, 'Hello world!', 500]}
        loop={Infinity}
        wrapper="p"
      /> */}



        {/* <h5 className="text-light">Front End Developer</h5> */}

        <CTA/>

        <HeaderSocials/>

        <a href="#contact" className='scroll_down'><AiOutlineCaretDown/></a>
        <div className="me">

          <motion.img src={ME} alt="MyPhoto"initial={{scale:0}}
          animate={{scale:1} }
          transition={{ delay: 1.0}}  ></motion.img>


        </div>

      </motion.div>

    </header>
  )
}

export default Header