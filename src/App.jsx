import { useInView } from "framer-motion";
import React, { useRef } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Experience from './components/experience/Experience';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Portfolio from './components/portfolio/Portfolio';
// import Services from './components/services/Services'
import './../src/framerMotion/framerMotion.css';
import PreLoader from "./components/PreLoader/PreLoader";
// import Testimonials from "./components/testimonials/Testimonials";

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        {children}
      </span>
    </section>
  );
}

const App = () => {
  return (
    <>
    <PreLoader/>
    
     {/*  <Section><Header/></Section>
      <Section><Nav/></Section>
      <Section><About/></Section>
      <Section><Experience/></Section>
      <Section><Portfolio/></Section>
      <Section><Contact/></Section>
      <Section><Footer/></Section> */}
      <Header/>
      <Nav/>
      <About/>
      <Experience/>
      {/* <Services/> */}
      <Portfolio/>
      {/* <Testimonials/> */}
      <Contact/>
      <Footer/>
    
    </>
  )
}

export default App;