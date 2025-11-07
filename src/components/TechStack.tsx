import React from 'react';
import cppLogo from '@/assets/cpp-logo.png';
import golangLogo from '@/assets/golang-logo.png';

type TechItem = {
  name: string;
  color: string;
  logo?: string;
  icon?: string;
};

type TechCategory = {
  title: string;
  items: TechItem[];
};

const techCategories: TechCategory[] = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
      { name: 'Java', icon: 'fab fa-java', color: '#007396' },
      { name: 'C++', logo: cppLogo, color: '#00599C' },
    ]
  },
  {
    title: 'Web Development',
    items: [
      { name: 'HTML5', icon: 'fab fa-html5', color: '#E44D26' },
      { name: 'REST APIs', icon: 'fas fa-plug', color: '#10b981' },
      { name: 'React.js', icon: 'fab fa-react', color: '#61DAFB' },
      { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#42b883' },
      { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
      { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6' },
      { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3' },
      { name: 'UX Design', icon: 'fas fa-paint-brush', color: '#ec4899' },
    ]
  },
  {
    title: 'Mobile Application',
    items: [
      { name: 'Flutter', icon: 'fas fa-mobile-alt', color: '#02569B' },
      { name: 'Kotlin', icon: 'fas fa-code', color: '#7F52FF' },
      { name: 'Golang', logo: golangLogo, color: '#00ADD8' },
    ]
  },
  {
    title: 'Database & Cloud',
    items: [
      { name: 'PostgreSQL', icon: 'fas fa-database', color: '#336791' },
      { name: 'AWS Cloud', icon: 'fab fa-aws', color: '#FF9900' },
      { name: 'Cloud Architecture', icon: 'fas fa-cloud', color: '#4285F4' },
      { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47A248' },
      { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
    ]
  },
];

const TechStack: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {techCategories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-purple-light">
            {category.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {category.items.map((tech, index) => (
              <div
                key={index}
                className="glass-card glass-clear rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 group"
              >
                <div className="relative">
                  {tech.logo ? (
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 group-hover:scale-110"
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
        </div>
      ))}
    </div>
  );
};

export default TechStack;
