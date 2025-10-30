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
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const id = anchor.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          const navHeight = 80; // Approximate navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Handle direct navigation to hash
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          const navHeight = 80; // Approximate navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }, 500); // Small delay to ensure DOM is ready
    }
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
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
