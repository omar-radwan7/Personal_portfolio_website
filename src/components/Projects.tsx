
import React from 'react';
import { Link } from 'react-router-dom';
import PingPongGame from './PingPongGame';
import BouncingQ from './BouncingQ';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-navyDark relative">
      <div className="section-container px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {/* Ping Pong Game Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full max-w-xs mx-auto">
            <div className="w-full bg-black flex items-center justify-center h-32">
              <div className="scale-50 w-full h-full">
                <PingPongGame />
              </div>
            </div>
            <div className="p-3 bg-[#1e2235] flex-grow">
              <p className="text-xs text-gray-400 mb-1">PingPong game With HTML, CSS & JavaScript</p>
              <h3 className="text-sm font-semibold mb-2">PingPong Game</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">JS</span>
                </div>
                <Link 
                  to="/project/pingpong" 
                  className="text-purple-light hover:text-purple text-xs"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Qorix AI Assistant Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full max-w-xs mx-auto">
            <div className="w-full bg-black flex items-center justify-center h-32">
              <div className="w-full h-full">
                <BouncingQ />
              </div>
            </div>
            <div className="p-3 bg-[#1e2235] flex-grow">
              <p className="text-xs text-gray-400 mb-1">Interactive AI Assistant with React</p>
              <h3 className="text-sm font-semibold mb-2">Qorix AI Assistant</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">TypeScript</span>
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Tailwind</span>
                </div>
                <Link 
                  to="/project/aimodel" 
                  className="text-purple-light hover:text-purple text-xs"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Weather App Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full max-w-xs mx-auto">
            <div className="w-full bg-[#1c2133] flex items-center justify-center h-32">
              <div className="text-center">
                <div className="flex justify-center items-center mb-1 text-white">
                  <i className="fas fa-cloud text-2xl"></i>
                  <i className="fas fa-thermometer-half text-lg ml-1"></i>
                </div>
                <h3 className="text-xs font-semibold">Weather Application</h3>
              </div>
            </div>
            <div className="p-3 bg-[#1e2235] flex-grow">
              <p className="text-xs text-gray-400 mb-1">Flutter & OpenWeatherMap API</p>
              <h3 className="text-sm font-semibold mb-2">Weather App</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Flutter</span>
                  <span className="px-1.5 py-0.5 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <Link 
                  to="/project/weather" 
                  className="text-purple-light hover:text-purple text-xs"
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
