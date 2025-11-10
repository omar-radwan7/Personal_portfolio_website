import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useLocation } from 'react-router-dom';

const Index: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle direct navigation to hash
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          const lenis = (window as any).lenis;
          if (lenis) {
            lenis.scrollTo(element, { offset: -80, duration: 1.2 });
          }
        }
      }, 500);
    }
  }, [location]);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-navyDark">
        <Hero />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
