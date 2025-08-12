
import React from 'react';
import { Link } from 'react-router-dom';
import PingPongGame from './PingPongGame';
import BouncingQ from './BouncingQ';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-navyDark relative">
      <div className="section-container px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 title-gradient">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Ping Pong Game */}
          <div className="glass-card rounded-md overflow-hidden flex flex-col h-full">
            <div className="w-full bg-black flex items-center justify-center aspect-[16/10]">
              <PingPongGame />
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md flex-grow text-sm">
              <p className="text-gray-400 mb-1">PingPong game With HTML, CSS & JavaScript</p>
              <h3 className="text-base font-semibold mb-2">PingPong Game</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">HTML</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">CSS</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">JS</span>
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

          {/* Qorix AI Assistant */}
          <div className="glass-card rounded-md overflow-hidden flex flex-col h-full">
            <div className="w-full flex items-center justify-center aspect-[16/10] bg-background/40 backdrop-blur-md">
              <div className="w-full h-full p-2">
                <BouncingQ />
              </div>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md flex-grow text-sm">
              <p className="text-gray-400 mb-1">Interactive AI Assistant with React</p>
              <h3 className="text-base font-semibold mb-2">Qorix AI Assistant</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">TypeScript</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Tailwind</span>
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

          {/* TradeWise Stock Market App */}
          <div className="glass-card rounded-md overflow-hidden flex flex-col h-full">
            <div className="w-full bg-background/40 backdrop-blur-md flex items-center justify-center aspect-[16/10]">
              <div className="text-center text-white">
                <div className="flex justify-center items-center mb-1">
                  <i className="fas fa-chart-line text-3xl text-green-400 animate-pulse"></i>
                  <i className="fas fa-dollar-sign text-xl ml-2 text-yellow-400 animate-bounce"></i>
                </div>
                <h3 className="text-sm font-semibold">TradeWise</h3>
                <p className="text-xs text-gray-400 mt-1">Demo Version</p>
              </div>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md flex-grow text-sm">
              <p className="text-gray-400 mb-1">Flutter Stock Market App with Real-time Data</p>
              <h3 className="text-base font-semibold mb-2">TradeWise</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Flutter</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Dart</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">API</span>
                </div>
                <Link
                  to="/project/tradewise"
                  className="text-purple-light hover:text-purple text-xs"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>

          {/* Weather App */}
          <div className="glass-card rounded-md overflow-hidden flex flex-col h-full">
            <div className="w-full bg-background/40 backdrop-blur-md flex items-center justify-center aspect-[16/10]">
              <div className="text-center text-white">
                <div className="flex justify-center items-center mb-1">
                  <i className="fas fa-cloud text-3xl animate-pulse"></i>
                  <i className="fas fa-thermometer-half text-xl ml-2 animate-bounce"></i>
                </div>
                <h3 className="text-sm font-semibold">Weather Application</h3>
              </div>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md flex-grow text-sm">
              <p className="text-gray-400 mb-1">Flutter & OpenWeatherMap API</p>
              <h3 className="text-base font-semibold mb-2">Weather App</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Flutter</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">API</span>
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

          {/* NexoVPN App */}
          <div className="glass-card rounded-md overflow-hidden flex flex-col h-full">
            <div className="w-full bg-background/40 backdrop-blur-md flex items-center justify-center aspect-[16/10]">
              <div className="text-center text-white">
                <div className="flex justify-center items-center mb-1">
                  <i className="fas fa-shield-alt text-3xl text-blue-400 animate-pulse"></i>
                  <i className="fas fa-lock text-xl ml-2 text-cyan-400 animate-bounce"></i>
                </div>
                <h3 className="text-sm font-semibold">NexoVPN</h3>
                <p className="text-xs text-gray-400 mt-1">Secure Connection</p>
              </div>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md flex-grow text-sm">
              <p className="text-gray-400 mb-1">Django/React VPN with WireGuard & Docker</p>
              <h3 className="text-base font-semibold mb-2">NexoVPN</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Python</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">React</span>
                  <span className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">Docker</span>
                </div>
                <Link
                  to="/project/nexovpn"
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
