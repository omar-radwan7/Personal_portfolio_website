import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Glass background with purple tint */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-navyDark"></div>
        <div className="absolute inset-0 glass-section"></div>
        <div className="blur-blob blob-purple top-0 left-0 opacity-30"></div>
        <div className="blur-blob blob-cyan top-1/4 right-0 opacity-20"></div>
        <div className="blur-blob blob-pink bottom-1/4 left-1/3 opacity-25"></div>
      </div>
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
