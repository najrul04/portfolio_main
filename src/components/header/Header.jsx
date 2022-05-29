import React from 'react'
import './Header.css'
import CTA from './CTA'
import ME from './../../assets/1.png'
import HeaderSocials from './HeaderSocials'
import {AiOutlineCaretDown} from 'react-icons/ai'

const Header = () => {
  return (
    <header>

      <div className="container header_container">

        <h5>Hello I'm </h5>

        <h1>MD Najrul Islam Sumon</h1>

        <h5 className="text-light">Front End Developer</h5>

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