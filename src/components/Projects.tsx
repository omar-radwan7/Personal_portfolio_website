
import React from 'react';
import { Link } from 'react-router-dom';
import PingPongGame from './PingPongGame';
import BouncingQ from './BouncingQ';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-navyDark relative">
      <div className="section-container px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {/* Ping Pong Game Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full">
            <div className="w-full bg-black flex items-center justify-center aspect-video">
              <PingPongGame />
            </div>
            <div className="p-6 bg-[#1e2235] flex-grow">
              <p className="text-sm text-gray-400">PingPong game With HTML, CSS & JavaScript</p>
              <h3 className="text-xl font-semibold mb-3">PingPong Game</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">JS</span>
                </div>
                <Link 
                  to="/project/pingpong" 
                  className="text-purple-light hover:text-purple text-sm"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Qorix AI Assistant Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full">
            <div className="w-full bg-black flex items-center justify-center aspect-video">
              <div className="w-full h-full">
                <BouncingQ />
              </div>
            </div>
            <div className="p-6 bg-[#1e2235] flex-grow">
              <p className="text-sm text-gray-400">Interactive AI Assistant with React</p>
              <h3 className="text-xl font-semibold mb-3">Qorix AI Assistant</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">TypeScript</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">Tailwind</span>
                </div>
                <Link 
                  to="/project/aimodel" 
                  className="text-purple-light hover:text-purple text-sm"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Weather App Project - Updated Flutter instead of React */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col h-full lg:col-span-2 lg:max-w-md lg:mx-auto">
            <div className="w-full bg-[#1c2133] flex items-center justify-center aspect-video">
              <div className="text-center">
                <div className="flex justify-center items-center mb-2 text-white">
                  <i className="fas fa-cloud text-4xl md:text-5xl"></i>
                  <i className="fas fa-thermometer-half text-2xl md:text-3xl ml-2"></i>
                </div>
                <h3 className="text-lg font-semibold mb-1">Weather Application</h3>
              </div>
            </div>
            <div className="p-6 bg-[#1e2235] flex-grow">
              <p className="text-sm text-gray-400">Flutter & OpenWeatherMap API</p>
              <h3 className="text-xl font-semibold mb-3">Weather App</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">Flutter</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <Link 
                  to="/project/weather" 
                  className="text-purple-light hover:text-purple text-sm"
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
