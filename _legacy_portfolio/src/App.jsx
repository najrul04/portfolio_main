import React from 'react';
import { Routes, Route } from 'react-router-dom';

import About from './components/about/About';
import Contact from './components/contact/Contact';
import Skills from './components/skills/Skills';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Portfolio from './components/portfolio/Portfolio';
import PreLoader from './components/PreLoader/PreLoader';
import Testimonials from './components/testimonials/Testimonials';
import Experience from './components/experience/Experience';

import Blog, { BlogPost } from './pages/Blog';
import Admin from './pages/Admin';

const Home = () => (
   <>
      <Header />
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
   </>
);

// Why /admin lives alongside /blog (not /blog/admin or similar):
// it's a separate concern (post management), and a top-level route makes
// it cleanly bookmark-able and easy to gate independently if we ever
// move it behind a different host or subdomain.
const App = () => (
   <>
      <PreLoader />
      <Nav />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/blog" element={<Blog />} />
         <Route path="/blog/:slug" element={<BlogPost />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
   </>
);

export default App;
