
import React from 'react';
import PingPongGame from './PingPongGame';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-muted relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-10 bg-waves bg-no-repeat bg-cover"></div>
      <div className="wave-animation"></div>
      
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ping Pong Game Project - Now smaller */}
          <div className="bg-card rounded-xl overflow-hidden card-hover shadow-lg border border-purple/10">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">PingPong Game</h3>
              <p className="text-gray-400 mb-3 text-sm">PingPong game With HTML, CSS & JavaScript</p>
              <div className="mb-4 h-48 md:h-56">
                <PingPongGame />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">JavaScript</span>
                </div>
                <a 
                  href="https://github.com/omar-radwan7/PingPongGame" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple hover:text-purple-light text-xs"
                >
                  More Details
                </a>
              </div>
            </div>
          </div>
          
          {/* Weather App Project - Now smaller */}
          <div className="bg-card rounded-xl overflow-hidden card-hover shadow-lg border border-purple/10">
            <div className="p-4">
              <div className="flex justify-center items-center mb-3 text-purple-light text-4xl">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">Weather Application</h3>
              <p className="text-gray-400 mb-3 text-sm text-center">React & OpenWeatherMap API</p>
              <div className="flex justify-center mb-4 h-20">
                <span className="px-3 py-1 bg-purple/10 text-purple-light rounded text-sm flex items-center">Coming Soon</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <span className="text-gray-500 text-xs">In Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
