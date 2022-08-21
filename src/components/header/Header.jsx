import React from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
// import Typical from 'react-typical'
import ME from './../../assets/1.png'
import CTA from './CTA'
import './Header.css'
import HeaderSocials from './HeaderSocials'
// import { Typewriter } from 'react-simple-typewriter'

const Header = () => {

  
  return (
    <header>

      <div className="container header_container">

        <h2>Hello I'm </h2>

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

          <img src={ME} alt="MyPhoto"/>


        </div>

      </div>

    </header>
  )
}

export default Header