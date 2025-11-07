import React from 'react';
import cppLogo from '@/assets/cpp-logo.png';
import golangLogo from '@/assets/golang-logo.png';

type TechItem = {
  name: string;
  color: string;
  logo?: string;
  icon?: string;
};

const techStack: TechItem[] = [
  { name: 'C++', logo: cppLogo, color: '#00599C' },
  { name: 'Golang', logo: golangLogo, color: '#00ADD8' },
  { name: 'Java', icon: 'fab fa-java', color: '#007396' },
  { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
  { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6' },
  { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
  { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
  { name: 'Node.js', icon: 'fab fa-node', color: '#339933' },
  { name: 'Flutter', icon: 'fas fa-mobile-alt', color: '#02569B' },
  { name: 'SQL', icon: 'fas fa-database', color: '#4479A1' },
  { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#FFCA28' },
  { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#06B6D4' },
  { name: 'HTML', icon: 'fab fa-html5', color: '#E44D26' },
  { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
  { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
  { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
];

const TechStack: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
      {techStack.map((tech, index) => (
        <div
          key={index}
          className="glass-card glass-clear rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 group"
        >
          <div className="relative">
            {tech.logo ? (
              <img 
                src={tech.logo} 
                alt={tech.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 group-hover:scale-110 mix-blend-lighten"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' }}
              />
            ) : (
              <i
                className={`${tech.icon} text-4xl md:text-5xl transition-all duration-300 group-hover:scale-110`}
                style={{ color: tech.color }}
              ></i>
            )}
            <div
              className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{ backgroundColor: tech.color }}
            ></div>
          </div>
          <span className="text-xs md:text-sm font-medium text-center text-gray-300 group-hover:text-white transition-colors">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
