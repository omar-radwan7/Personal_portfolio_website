import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';
import BouncingQ from '@/components/BouncingQ';
import PingPongGame from '@/components/PingPongGame';

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
    title: 'Qorix AI Assistant',
    subtitle: 'Interactive AI Assistant with React',
    description: 'Qorix AI Assistant is a modern, browser-based AI chat application built with TypeScript, React, and Tailwind CSS. It offers users an intuitive interface to interact with an AI assistant powered by the OpenRouter API, using the Deepseek model for intelligent conversations. Designed for privacy and simplicity, Qorix runs entirely client-side — with no backend or database — storing chat history, API keys, and settings securely in the browser\'s localStorage.\n\nUsers can ask questions, upload files for analysis, and manage their own API key directly in-app. Features include message history, file upload, rate limit indicators, dark/light mode support, and full mobile responsiveness. Qorix is ideal for developers and curious users who want a lightweight, flexible AI chat experience without relying on cloud-based user accounts or external storage.\n\nTo get started, users just need to sign up at OpenRouter.ai, create an API key, and paste it into the app settings. Simple, private, and fully in your control.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenRouter API'],
    githubLink: 'https://github.com/omar-radwan7/QorixAI_Lnaguage_Model',
    status: 'complete'
  },
  {
    id: 'tradewise',
    title: 'TradeWise',
    subtitle: 'Flutter Stock Market App with Real-time Data - Demo Version',
    description: 'TradeWise is a comprehensive stock market application built with Flutter that provides real-time financial data and market insights. This demo version showcases live stock data integration from Financial Model Prep API.\n\nKey Features:\n• Dark mode support for comfortable viewing\n• Real-time stock price data and market information\n• Interactive charts and financial visualizations\n• Clean, modern user interface\n• Responsive design for all devices\n• Live market data integration\n• Stock search and portfolio tracking\n• Cross-platform compatibility (iOS/Android)\n\nBuilt with Flutter/Dart and utilizing various technologies including HTML, JavaScript, C++, CSS, and CMake for optimal performance. The application demonstrates proficiency in mobile app development, API integration, and creating intuitive financial interfaces. TradeWise offers users a professional-grade experience for tracking market trends and making informed investment decisions.',
    technologies: ['Flutter', 'Dart', 'HTML', 'JavaScript', 'C++', 'CSS', 'CMake'],
    githubLink: 'https://github.com/omar-radwan7/Stock_Market_App',
    status: 'complete'
  },
  {
    id: 'weather',
    title: 'Weather App',
    subtitle: 'Flutter & OpenWeatherMap API',
    description: 'A responsive weather application that provides real-time weather information using the OpenWeatherMap API. Users can search for locations and view current weather conditions, forecasts, and meteorological data presented in an intuitive and visually appealing interface.',
    technologies: ['Flutter', 'API'],
    status: 'coming-soon'
  },
  {
    id: 'nexovpn',
    title: 'NexoVPN',
    subtitle: 'Django/React VPN with WireGuard & Docker',
    description: 'NexoVPN is a comprehensive VPN application featuring Django backend with React frontend, WireGuard protocols for secure connections, and Docker deployment. The application provides secure, private internet access with advanced features including whitelisted domains, real-time connection monitoring, and cloud architecture deployment.',
    technologies: ['Python', 'Django', 'React', 'JavaScript', 'Docker', 'WireGuard'],
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
            className="inline-flex items-center text-primary/80 hover:text-primary mb-6"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/#projects";
            }}
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Projects
          </Link>
          
          <div className={project.id === 'aimodel' ? "bg-card rounded-2xl overflow-hidden shadow-md border border-border/20" : "glass-panel rounded-2xl overflow-hidden shadow-lg border border-border/30"}>
            <div className="w-full aspect-video flex items-center justify-center bg-card/20 rounded-t-2xl overflow-hidden">
              {project.image || (
                <div className="text-center w-full h-full flex items-center justify-center">
                  {project.id === 'pingpong' ? (
                    <div className="w-full h-full">
                      <PingPongGame />
                    </div>
                  ) : project.id === 'aimodel' ? (
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <BouncingQ />
                    </div>
                  ) : project.id === 'tradewise' ? (
                    <div className="flex justify-center items-center text-foreground/90">
                      <i className="fas fa-chart-line text-5xl text-green-400 animate-pulse"></i>
                      <i className="fas fa-dollar-sign text-3xl ml-2 text-yellow-400 animate-bounce"></i>
                    </div>
                  ) : project.id === 'nexovpn' ? (
                    <div className="flex justify-center items-center text-foreground/90">
                      <i className="fas fa-shield-alt text-5xl text-blue-400 animate-pulse"></i>
                      <i className="fas fa-lock text-3xl ml-2 text-cyan-400 animate-bounce"></i>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center text-foreground/90 relative overflow-hidden">
                      <div className="relative">
                        <i className="fas fa-cloud text-6xl text-blue-300 animate-pulse"></i>
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-8 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                            <div className="w-1 h-10 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                            <div className="w-1 h-7 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-1 h-9 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                          </div>
                        </div>
                      </div>
                      <i className="fas fa-thermometer-half text-3xl ml-4 text-orange-400 animate-pulse"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-6 bg-card/20 rounded-b-2xl">
              <p className="text-sm text-muted-foreground mb-2">{project.subtitle}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">{project.title}</h1>
              
              <div className="flex gap-2 flex-wrap mb-6">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none mb-8 whitespace-pre-line">
                <p>{project.description}</p>
              </div>
              
              {project.status === 'complete' ? (
                <Button 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => window.open(project.githubLink, '_blank')}
                >
                  Try It <ExternalLink className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
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