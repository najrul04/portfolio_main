import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
// import Typical from 'react-typical'
import CTA from "./CTA";
import "./Header.css";
import HeaderSocials from "./HeaderSocials";
// import { Typewriter } from 'react-simple-typewriter'
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
// import videoBg from "../../assets/video_portfolio/videoBg1.m4v";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import { logos } from "../../constants";

import coffeeImage from "../../assets/coffee.webp";
import upWork from "../../assets/personal_links/upWork.webp";

const Header = () => {

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <header>
        <div>
          <div className="background_Logos">
            {logos.map((logo) => (
              <img
                key={logo.id}
                className="wiggle"
                src={logo.src}
                alt={logo.name}
              />
            ))}
          </div>
          <div>
            <a href="https://www.upwork.com/freelancers/~0164d34a597d34e0dd"  target="_blank">  
            <div className="upWork">
            <img src={upWork} alt="UpWork" />
            </div>
            </a>
          </div>
        </div>
        

        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          width="100vw"
          height="100vh"
          options={{
            fullScreen: {
              enable: false,
            },
            fpsLimit: 30,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 1.0,
                },
              },
            },
            particles: {
              "push": {
                "particles_nb": 2
              },
              "remove": {
                "particles_nb": 1
              },
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: false,
                  area: 805,
                },
                value: 50,
              },
              opacity: {
                value: 0.1,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },

            detectRetina: false,
          }}
        />

        <div className="container header_container">
          <div className="header_info">
            <motion.h2
              className="static_header_name"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Hello I'm{" "}
            </motion.h2>

            <h3
              style={{ color: "white", fontWeight: "bold", fontSize: "1.7rem" }}
            >
              {/* Style will be inherited from the parent element */}

              <Typewriter
                options={{
                  strings: ["Najrul", "a Full Stack Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>

            <div>
              <a href="#about">
                <div className="scroll-down"></div>
              </a>
              <a href="https://www.buymeacoffee.com/nazrul2517d" target="_blank">
                <img
                  src={coffeeImage}
                  className="coffee"
                  alt="coffee"
                  height={25}
                  width={25}
                />
              </a>
            </div>

            <CTA />
          </div>

          <HeaderSocials />
        </div>
      </header>
    </>
  );
};

export default Header;
