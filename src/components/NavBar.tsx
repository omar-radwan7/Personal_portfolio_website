
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-navyDark/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
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
          "fixed lg:static top-16 left-0 w-full lg:w-auto bg-navyDark/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-0 transition-all duration-300 shadow-lg lg:shadow-none",
          mobileMenuOpen ? "block" : "hidden lg:block"
        )}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 p-6 lg:p-0">
            <li>
              <Link 
                to="/" 
                className={cn("nav-link", isActive('/') && "text-purple-light after:scale-x-100")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={cn("nav-link", isActive('/about') && "text-purple-light after:scale-x-100")}
              >
                About Me
              </Link>
            </li>
            <li>
              <a href="/#services" className="nav-link">Services</a>
            </li>
            <li>
              <a href="/#projects" className="nav-link">Projects</a>
            </li>
            <li>
              <a href="/#contact" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
