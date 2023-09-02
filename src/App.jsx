
import React, { useRef } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
// import Skills from './components/skills/Skills';
import Skills0 from './components/skills0/Skills0';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Portfolio from './components/portfolio/Portfolio';
// import Services from './components/services/Services'
import PreLoader from "./components/PreLoader/PreLoader";
import Testimonials from "./components/testimonials/Testimonials";
import Experience from './components/experience/Experience';
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

      <Header/>
      
      <Nav/>

      <About/>

      <Experience/>

      {/* <Skills/> */}

      <Skills0/>
      {/* <Services/> */}
      <Portfolio/>

      <Testimonials/>

      <Contact/>

      <Footer/>
    
    </>
  )
}

export default App;