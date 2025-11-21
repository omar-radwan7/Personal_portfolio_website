import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PingPongGame from './PingPongGame';
import BouncingQ from './BouncingQ';
import CloudStorageAnimation from './CloudStorageAnimation';
import SatelliteCollision from './SatelliteCollision';

type FilterType = 'all' | 'difficulty' | 'techstack';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type TechCategory = 'web' | 'mobile' | 'systems' | 'fullstack';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  difficulty: DifficultyLevel;
  techCategory: TechCategory;
  animation?: React.ComponentType;
  icon?: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'satellite',
    title: 'Satellite Collision Detection',
    subtitle: 'Real-time 3D orbital collision detection system',
    description: '3D C++ simulation with OpenGL, Keplerian physics, and real-time debris analysis at 60 FPS',
    technologies: ['C++', 'OpenGL', 'Three.js'],
    difficulty: 'advanced',
    techCategory: 'systems',
    animation: SatelliteCollision,
    link: '/project/satellite-collision'
  },
  {
    id: 'localcloud',
    title: 'LocalCloud',
    subtitle: 'Local Cloud Storage Emulator - Fullstack',
    description: 'Self-hosted Dropbox alternative with versioning, AI search, and drag-drop uploads',
    technologies: ['Node.js', 'Next.js', 'TypeScript'],
    difficulty: 'advanced',
    techCategory: 'fullstack',
    animation: CloudStorageAnimation,
    link: '/project/localcloud'
  },
  {
    id: 'tradewise',
    title: 'TradeWise',
    subtitle: 'Flutter Stock Market App with Real-time Data',
    description: 'Cross-platform trading app with 99.9% uptime, Docker deployment, and live market data',
    technologies: ['Flutter', 'Dart', 'API'],
    difficulty: 'advanced',
    techCategory: 'mobile',
    icon: 'fas fa-chart-line',
    link: '/project/tradewise'
  },
  {
    id: 'portfolio-builder',
    title: 'Portfolio Builder',
    subtitle: 'No-code React portfolio builder with export',
    description: 'Drag-and-drop builder with dual modes, theme presets, and one-click React export',
    technologies: ['React', 'Vite', 'Tailwind'],
    difficulty: 'intermediate',
    techCategory: 'web',
    icon: 'fas fa-layer-group',
    link: '/project/portfolio-builder'
  },
  {
    id: 'qorix',
    title: 'Qorix AI Assistant',
    subtitle: 'Interactive AI Assistant with React',
    description: 'AI-powered chatbot with natural language processing and smooth animations',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    difficulty: 'intermediate',
    techCategory: 'web',
    animation: BouncingQ,
    link: '/project/aimodel'
  },
  {
    id: 'weather',
    title: 'Weather App',
    subtitle: 'Flutter & OpenWeatherMap API',
    description: 'Real-time weather application with location services and forecast data',
    technologies: ['Flutter', 'API'],
    difficulty: 'intermediate',
    techCategory: 'mobile',
    icon: 'fas fa-cloud',
    link: '/project/weather'
  },
  {
    id: 'pingpong',
    title: 'PingPong Game',
    subtitle: 'PingPong game With HTML, CSS & JavaScript',
    description: 'Classic arcade game built with vanilla JavaScript and canvas rendering',
    technologies: ['HTML', 'CSS', 'JS'],
    difficulty: 'beginner',
    techCategory: 'web',
    animation: PingPongGame,
    link: '/project/pingpong'
  }
];

const ProjectsList: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedTech, setSelectedTech] = useState<TechCategory | 'all'>('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'difficulty') {
      return selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
    }
    if (filter === 'techstack') {
      return selectedTech === 'all' || project.techCategory === selectedTech;
    }
    return true;
  });

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'advanced': return 'text-red-400 bg-red-400/10 border-red-400/30';
    }
  };

  const getTechCategoryIcon = (category: TechCategory) => {
    switch (category) {
      case 'web': return 'fas fa-globe';
      case 'mobile': return 'fas fa-mobile-alt';
      case 'systems': return 'fas fa-microchip';
      case 'fullstack': return 'fas fa-layer-group';
    }
  };

  const getTechCategoryLabel = (category: TechCategory) => {
    switch (category) {
      case 'web': return 'Web Development';
      case 'mobile': return 'Mobile Development';
      case 'systems': return 'Systems Programming';
      case 'fullstack': return 'Full Stack';
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            setFilter('all');
            setSelectedDifficulty('all');
            setSelectedTech('all');
          }}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-purple to-blue text-white shadow-lg'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setFilter('difficulty')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'difficulty'
              ? 'bg-gradient-to-r from-purple to-blue text-white shadow-lg'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          By Difficulty
        </button>
        <button
          onClick={() => setFilter('techstack')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'techstack'
              ? 'bg-gradient-to-r from-purple to-blue text-white shadow-lg'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          By Tech Stack
        </button>
      </div>

      {/* Sub-filters */}
      {filter === 'difficulty' && (
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedDifficulty === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All Levels
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedDifficulty === 'beginner'
                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-star mr-1"></i>
            Beginner
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedDifficulty === 'intermediate'
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-star mr-1"></i>
            <i className="fas fa-star mr-1"></i>
            Intermediate
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedDifficulty === 'advanced'
                ? 'bg-red-400/20 text-red-400 border border-red-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-star mr-1"></i>
            <i className="fas fa-star mr-1"></i>
            <i className="fas fa-star mr-1"></i>
            Advanced
          </button>
        </div>
      )}

      {filter === 'techstack' && (
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTech('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTech === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedTech('web')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTech === 'web'
                ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-globe mr-2"></i>
            Web Development
          </button>
          <button
            onClick={() => setSelectedTech('mobile')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTech === 'mobile'
                ? 'bg-purple-400/20 text-purple-400 border border-purple-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-mobile-alt mr-2"></i>
            Mobile Development
          </button>
          <button
            onClick={() => setSelectedTech('systems')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTech === 'systems'
                ? 'bg-orange-400/20 text-orange-400 border border-orange-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-microchip mr-2"></i>
            Systems Programming
          </button>
          <button
            onClick={() => setSelectedTech('fullstack')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTech === 'fullstack'
                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-layer-group mr-2"></i>
            Full Stack
          </button>
        </div>
      )}

      {/* Project Count */}
      <div className="text-center text-gray-400 text-sm">
        Showing <span className="text-purple-light font-semibold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-card glass-clear rounded-md overflow-hidden flex flex-col h-full group hover:scale-105 transition-transform duration-300">
            {/* Project Preview */}
            <div className="w-full flex items-center justify-center aspect-[16/10] bg-transparent overflow-hidden">
              {project.animation ? (
                <div className="w-full h-full">
                  <project.animation />
                </div>
              ) : project.icon ? (
                <div className="text-center text-white">
                  <div className="flex justify-center items-center mb-1">
                    <i className={`${project.icon} text-3xl text-purple-light animate-pulse`}></i>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Project Info */}
            <div className="p-4 flex-grow text-sm border-t border-foreground/10">
              <div className="flex items-start justify-between mb-2">
                <p className="text-gray-400 text-xs">{project.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
              </div>
              
              <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                {project.title}
                <i className={`${getTechCategoryIcon(project.techCategory)} text-xs text-gray-500`}></i>
              </h3>
              
              <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.description}</p>
              
              <div className="flex gap-2 flex-wrap items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-purple/20 text-purple-light rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to={project.link}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple to-blue hover:from-purple-light hover:to-blue-light rounded-md text-xs font-medium text-white transition-all shadow-md hover:shadow-lg"
                >
                  More Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
