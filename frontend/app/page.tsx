import Header from '@/components/sections/Header';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
// Home-only (not in layout.tsx): the game offer makes no sense on /blog or /admin.
import GameBanner from '@/components/layout/GameBanner';

// Home page — same section order as the old Vite App.jsx <Home>. This is a
// server component that simply composes the (mostly client) section components;
// the global chrome (PreLoader + Nav) is rendered once in app/layout.tsx.
export default function HomePage() {
   return (
      <>
         <GameBanner />
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
}
