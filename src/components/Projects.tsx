
import React from 'react';
import PingPongGame from './PingPongGame';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-muted relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/lovable-uploads/1c923480-2b5b-46d5-b950-a39f43d28633.png" 
          alt="Wave Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Ping Pong Game Project */}
          <div className="bg-card rounded-lg overflow-hidden card-hover shadow-md border border-purple/10 flex flex-col h-full">
            <div className="p-3">
              <h3 className="text-lg font-semibold mb-1">PingPong Game</h3>
              <p className="text-gray-400 mb-2 text-xs">PingPong game With HTML, CSS & JavaScript</p>
              <div className="mb-3 h-20 flex items-center justify-center overflow-hidden">
                <PingPongGame />
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">JS</span>
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
          
          {/* Weather App Project */}
          <div className="bg-card rounded-lg overflow-hidden card-hover shadow-md border border-purple/10 flex flex-col h-full">
            <div className="p-3">
              <div className="flex justify-center items-center mb-2 text-purple-light text-3xl">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">Weather Application</h3>
              <p className="text-gray-400 mb-2 text-xs text-center">React & OpenWeatherMap API</p>
              <div className="flex justify-center mb-3 h-14">
                <span className="px-3 py-1 bg-purple/10 text-purple-light rounded text-sm flex items-center">Coming Soon</span>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-1">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <span className="text-gray-500 text-xs">In Development</span>
              </div>
            </div>
          </div>
          
          {/* Third project card */}
          <div className="bg-card rounded-lg overflow-hidden card-hover shadow-md border border-purple/10 flex flex-col h-full">
            <div className="p-3">
              <div className="flex justify-center items-center mb-2 text-purple-light text-3xl">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-center">Coming Soon</h3>
              <p className="text-gray-400 mb-2 text-xs text-center">Future Project</p>
              <div className="flex justify-center mb-3 h-14">
                <span className="px-3 py-1 bg-purple/10 text-purple-light rounded text-sm flex items-center">In Planning</span>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-1">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">TBD</span>
                </div>
                <span className="text-gray-500 text-xs">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
