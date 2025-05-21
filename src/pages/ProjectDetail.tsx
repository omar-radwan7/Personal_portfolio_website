
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';

// Project data structure
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: React.ReactNode;
  technologies: string[];
  githubLink?: string;
  status: 'complete' | 'coming-soon';
}

// Project data
const projectsData: Project[] = [
  {
    id: 'pingpong',
    title: 'PingPong Game',
    subtitle: 'PingPong game With HTML, CSS & JavaScript',
    description: 'An interactive and fun ping pong game built using vanilla JavaScript. The game features computer-controlled paddles, score tracking, and progressive difficulty as the ball speeds up with each hit. The clean UI and smooth animations make for an engaging gaming experience.',
    technologies: ['HTML', 'CSS', 'JS'],
    githubLink: 'https://github.com/omar-radwan7/PingPongGame',
    status: 'complete'
  },
  {
    id: 'aimodel',
    title: 'AI Language Model',
    subtitle: 'Interactive AI Assistant with React',
    description: 'A modern AI language assistant interface built with React. Features an interactive design with a bouncing "Q" animation representing the AI thinking process. This project demonstrates advanced animation techniques and responsive UI design principles.',
    technologies: ['React', 'TypeScript', 'Animation'],
    status: 'coming-soon'
  },
  {
    id: 'weather',
    title: 'Weather App',
    subtitle: 'React & OpenWeatherMap API',
    description: 'A responsive weather application that provides real-time weather information using the OpenWeatherMap API. Users can search for locations and view current weather conditions, forecasts, and meteorological data presented in an intuitive and visually appealing interface.',
    technologies: ['React', 'API'],
    status: 'coming-soon'
  }
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-navyDark flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you are looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center text-purple-light hover:text-purple">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navyDark flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <Link 
            to="/#projects" 
            className="inline-flex items-center text-purple-light hover:text-purple mb-6"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/#projects";
            }}
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Projects
          </Link>
          
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-purple/10">
            <div className="w-full bg-black aspect-video flex items-center justify-center">
              {project.image || (
                <div className="text-center">
                  {project.id === 'pingpong' ? (
                    <div className="w-full h-full bg-black">
                      {/* Placeholder for PingPong game */}
                      <div className="flex items-center justify-center h-full">
                        <div className="text-white text-xl">PingPong Game Preview</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center text-white">
                      <i className="fas fa-cloud text-5xl"></i>
                      <i className="fas fa-thermometer-half text-3xl ml-2"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-6 bg-[#1e2235]">
              <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">{project.title}</h1>
              
              <div className="flex gap-2 flex-wrap mb-6">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none mb-8">
                <p>{project.description}</p>
              </div>
              
              {project.status === 'complete' ? (
                <Button 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple hover:bg-purple-dark"
                  onClick={() => window.open(project.githubLink, '_blank')}
                >
                  Try It <ExternalLink className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
                  disabled
                >
                  Coming Soon <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
