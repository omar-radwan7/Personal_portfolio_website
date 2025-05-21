
import React from 'react';
import { Link } from 'react-router-dom';
import PingPongGame from './PingPongGame';
import BouncingQ from './BouncingQ';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-navyDark relative">
      <div className="section-container px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Ping Pong Game Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full">
            <div className="w-full bg-black flex items-center justify-center aspect-[4/3] sm:aspect-video">
              <PingPongGame />
            </div>
            <div className="p-4 sm:p-5 bg-[#1e2235] flex-grow">
              <p className="text-xs sm:text-sm text-gray-400">PingPong game With HTML, CSS & JavaScript</p>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">PingPong Game</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">JS</span>
                </div>
                <Link 
                  to="/project/pingpong" 
                  className="text-purple-light hover:text-purple text-xs sm:text-sm"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* AI Language Model Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full">
            <div className="w-full bg-black flex items-center justify-center aspect-[4/3] sm:aspect-video">
              <div className="w-full h-full">
                <BouncingQ />
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-[#1e2235] flex-grow">
              <p className="text-xs sm:text-sm text-gray-400">Interactive AI Assistant with React</p>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">AI Language Model</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">TypeScript</span>
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">Animation</span>
                </div>
                <Link 
                  to="/project/aimodel" 
                  className="text-purple-light hover:text-purple text-xs sm:text-sm"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Weather App Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full">
            <div className="w-full bg-[#1c2133] flex items-center justify-center aspect-[4/3] sm:aspect-video">
              <div className="text-center">
                <div className="flex justify-center items-center mb-2 text-white">
                  <i className="fas fa-cloud text-3xl sm:text-4xl md:text-5xl"></i>
                  <i className="fas fa-thermometer-half text-xl sm:text-2xl md:text-3xl ml-2"></i>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">Weather Application</h3>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-[#1e2235] flex-grow">
              <p className="text-xs sm:text-sm text-gray-400">React & OpenWeatherMap API</p>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Weather App</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 sm:gap-2">
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <Link 
                  to="/project/weather" 
                  className="text-purple-light hover:text-purple text-xs sm:text-sm"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
