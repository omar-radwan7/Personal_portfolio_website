import React from 'react';
import { Link } from 'react-router-dom';
import PingPongGame from './PingPongGame';
import BouncingQ from './BouncingQ';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-10 sm:py-12 bg-navyDark relative">
      <div className="section-container px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 title-gradient">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Project Card */}
          {[{
            title: 'PingPong Game',
            desc: 'PingPong game With HTML, CSS & JavaScript',
            tags: ['HTML', 'CSS', 'JS'],
            path: '/project/pingpong',
            component: <PingPongGame />,
          }, {
            title: 'Qorix AI Assistant',
            desc: 'Interactive AI Assistant with React',
            tags: ['React', 'TypeScript', 'Tailwind'],
            path: '/project/aimodel',
            component: <BouncingQ />,
          }, {
            title: 'Weather App',
            desc: 'Flutter & OpenWeatherMap API',
            tags: ['Flutter', 'API'],
            path: '/project/weather',
            component: (
              <div className="text-center text-white">
                <div className="flex justify-center items-center mb-1">
                  <i className="fas fa-cloud text-3xl"></i>
                  <i className="fas fa-thermometer-half text-xl ml-2"></i>
                </div>
                <h3 className="text-sm font-semibold">Weather Application</h3>
              </div>
            ),
          }].map((proj, i) => (
            <div key={i} className="bg-card rounded-md overflow-hidden shadow border border-purple/10 flex flex-col h-full">
              <div className="w-full bg-black flex items-center justify-center aspect-[16/10]">
                <div className="w-full h-full p-2">{proj.component}</div>
              </div>
              <div className="p-4 bg-[#1e2235] flex-grow text-sm">
                <p className="text-gray-400 mb-1">{proj.desc}</p>
                <h3 className="text-base font-semibold mb-2">{proj.title}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 flex-wrap">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">{tag}</span>
                    ))}
                  </div>
                  <Link to={proj.path} className="text-purple-light hover:text-purple text-xs">
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
