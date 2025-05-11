
import React from 'react';
import PingPongGame from './PingPongGame';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Ping Pong Game Project */}
          <div className="bg-card rounded-xl overflow-hidden card-hover">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">PingPong Game</h3>
              <p className="text-gray-400 mb-4">PingPong game With HTML, CSS & JavaScript</p>
              <div className="mb-6">
                <PingPongGame />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">JavaScript</span>
                </div>
                <a 
                  href="https://github.com/omar-radwan7/PingPongGame" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple hover:text-purple-light text-sm"
                >
                  More Details
                </a>
              </div>
            </div>
          </div>
          
          {/* Weather App Project */}
          <div className="bg-card rounded-xl overflow-hidden card-hover">
            <div className="p-6">
              <div className="flex justify-center items-center mb-4 text-purple-light text-5xl">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Weather Application</h3>
              <p className="text-gray-400 mb-4 text-center">React & OpenWeatherMap API</p>
              <div className="flex justify-center mb-4">
                <span className="px-3 py-1 bg-purple/10 text-purple-light rounded">Coming Soon</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <span className="text-gray-500 text-sm">In Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
