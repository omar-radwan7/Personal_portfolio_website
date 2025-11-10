
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'services' | 'projects' | 'contact'>('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isAnchorActive = (id: 'home' | 'services' | 'projects' | 'contact') =>
    location.pathname === '/' && activeSection === id;

  // Scrollspy for section highlights on the home page
  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids: Array<'services' | 'projects' | 'contact'> = ['services', 'projects', 'contact'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        let topMost: { id: 'home' | 'services' | 'projects' | 'contact'; ratio: number } = { id: 'home', ratio: 0 };
        entries.forEach((entry) => {
          const id = entry.target.id as 'services' | 'projects' | 'contact';
          if (entry.isIntersecting && entry.intersectionRatio > topMost.ratio) {
            topMost = { id, ratio: entry.intersectionRatio };
          }
        });
        if (topMost.ratio === 0) {
          if (window.scrollY < 200) setActiveSection('home');
        } else {
          setActiveSection(topMost.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-10% 0px -50% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200) setActiveSection('home');
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent">
        <div className={cn(
          "mx-4 md:mx-6 lg:mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between rounded-full transition-all",
          isScrolled ? "glass-nav py-2 shadow-lg" : "py-3"
        )}>
          <Link to="/" className="text-2xl font-bold text-purple-light">Radwan</Link>
          
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
      <nav className={cn(
        "fixed lg:static top-16 left-0 w-full lg:w-auto glass-nav rounded-2xl mx-4 lg:mx-0 lg:bg-transparent lg:backdrop-blur-0 transition-all duration-300 shadow-lg lg:shadow-none",
        mobileMenuOpen ? "block" : "hidden lg:block"
      )}>
            <ul className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8 px-8 py-4 lg:px-6 lg:py-2">
              <li>
                <Link 
                  to="/" 
                  className={cn(
                    "nav-link text-sm md:text-base transition-all duration-300 hover:text-purple-light hover:translate-y-[-2px]",
                    (location.pathname === '/' ? isAnchorActive('home') : isActive('/')) && "text-purple-light after:scale-x-100"
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="/#services"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const element = document.getElementById('services');
                      if (element) {
                        const lenis = (window as any).lenis;
                        const navHeight = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        if (lenis) {
                          lenis.scrollTo(elementPosition - navHeight);
                        }
                      }
                    }
                  }}
                  className={cn(
                    "nav-link text-sm md:text-base transition-all duration-300 hover:text-purple-light hover:translate-y-[-2px]",
                    isAnchorActive('services') && "text-purple-light after:scale-x-100"
                  )}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="/#projects"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const element = document.getElementById('projects');
                      if (element) {
                        const lenis = (window as any).lenis;
                        const navHeight = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        if (lenis) {
                          lenis.scrollTo(elementPosition - navHeight);
                        }
                      }
                    }
                  }}
                  className={cn(
                    "nav-link text-sm md:text-base transition-all duration-300 hover:text-purple-light hover:translate-y-[-2px]",
                    isAnchorActive('projects') && "text-purple-light after:scale-x-100"
                  )}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="/#contact"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const element = document.getElementById('contact');
                      if (element) {
                        const lenis = (window as any).lenis;
                        const navHeight = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        if (lenis) {
                          lenis.scrollTo(elementPosition - navHeight);
                        }
                      }
                    }
                  }}
                  className={cn(
                    "nav-link text-sm md:text-base transition-all duration-300 hover:text-purple-light hover:translate-y-[-2px]",
                    isAnchorActive('contact') && "text-purple-light after:scale-x-100"
                  )}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="pt-24">
        {/* Page content goes here */}
      </main>
    </>
  );
};

export default NavBar;
