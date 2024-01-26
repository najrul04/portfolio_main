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
import react_logo from "../../assets/tech_logos/react.webp";
import ts_logo from "../../assets/tech_logos/ts.webp";
import next_logo from "../../assets/tech_logos/nextjs.webp";
import tailwind_logo from "../../assets/tech_logos/tailwind.webp";
import nodejs_logo from "../../assets/tech_logos/nodejs.webp";
import expressjs_logo from "../../assets/tech_logos/expressjs.webp";
import coffeeImage from "../../assets/coffee.webp";

const Header = () => {
  const logos = [
    { id: 1, name: "React", src: react_logo },
    { id: 2, name: "TypeScript", src: ts_logo },
    { id: 3, name: "NextJS", src: next_logo },
    { id: 4, name: "TailwindCSS", src: tailwind_logo },
    { id: 5, name: "NodeJS", src: nodejs_logo },
    { id: 6, name: "Express JS", src: expressjs_logo },
  ];

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <header>
        <div className="background_Logos">
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

          {/* <h1>ReactJS</h1> */}
          {/* <img className="wiggle" src={react_logo} alt="React" /> */}
          {/* <h1>TypeScript</h1> */}
          {/* <img className="wiggle" src={ts_logo} alt="TypeScript" /> */}
          {/* <h1 >NextJS</h1> */}
          {/* <img className="wiggle" src={next_logo} alt="NextJS" /> */}
          {/* <h1 >TailwindCSS</h1> */}
          {/* <img className="wiggle" src={tailwind_logo} alt="TailwindCSS" /> */}
          {/* <h1 >NodeJS</h1> */}
          {/* <img className="wiggle" src={nodejs_logo} alt="NodeJS" /> */}
          {/* <h1 >Express JS</h1> */}
          {/* <img className="wiggle" src={expressjs_logo} alt="ExpressJS" /> */}
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
            fpsLimit: 120,
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
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 5.0,
                },
              },
            },
            particles: {
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
                  enable: true,
                  area: 805,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },

            detectRetina: true,
          }}
        />

        <div className="container header_container">
          <div className="header_info">
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
              {/* <img
              className="coffeeImage"
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            /> */}
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
