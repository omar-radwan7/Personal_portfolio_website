
import React from 'react';
import PingPongGame from './PingPongGame';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-navyDark relative">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Ping Pong Game Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col">
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <PingPongGame />
            </div>
            <div className="p-5 bg-[#1e2235]">
              <p className="text-gray-400 text-sm">PingPong game With HTML, CSS & JavaScript</p>
              <h3 className="text-xl font-semibold mb-3">PingPong Game</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">JS</span>
                </div>
                <a 
                  href="https://github.com/omar-radwan7/PingPongGame" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-light hover:text-purple text-sm"
                >
                  More Details
                </a>
              </div>
            </div>
          </div>
          
          {/* Weather App Project */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10 flex flex-col">
            <div className="aspect-video w-full bg-[#1c2133] flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center items-center mb-2 text-white">
                  <i className="fas fa-cloud text-5xl"></i>
                  <i className="fas fa-thermometer-half text-3xl ml-2"></i>
                </div>
                <h3 className="text-lg font-semibold mb-1">Weather Application</h3>
              </div>
            </div>
            <div className="p-5 bg-[#1e2235]">
              <p className="text-gray-400 text-sm">React & OpenWeatherMap API</p>
              <h3 className="text-xl font-semibold mb-3">Weather App</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <span className="text-purple-light text-sm">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
