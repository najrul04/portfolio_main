import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
// import Typical from 'react-typical'
import CTA from "./CTA";
import "./Header.css";
import HeaderSocials from "./HeaderSocials";
// import { Typewriter } from 'react-simple-typewriter'
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import videoBg from "../../assets/video_portfolio/videoBg1.m4v";

const Header = () => {
  return (
    <header>
      <div className="container header_container">
        <div className="overlay"></div>
        <video autoPlay loop muted src={videoBg}></video>

        <div className="video_content">
          <motion.h2
            className="static_header_name"
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 3 }}
          >
            Hello I'm{" "}
          </motion.h2>

          <h3
            style={{ color: "white", fontWeight: "bold", fontSize: "1.7rem" }}
          >
            {/* Style will be inherited from the parent element */}

            <Typewriter
              options={{
                strings: ["Najrul", "React Developer"],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>

          <CTA />
        </div>

        {/* <h5 className="text-light">Front End Developer</h5> */}

        <HeaderSocials />

        <a href="#contact" className="scroll_down">
          <AiOutlineCaretDown />
        </a>

        {/*  
       
       <div className="me">

          <img src={ME} alt="MyPhoto" ></img>


        </div>
        
        */}
      </div>
    </header>
  );
};

export default Header;
