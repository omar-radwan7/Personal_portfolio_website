import React, { useState } from 'react';
import ProjectsList from './ProjectsList';
import TechStack from './TechStack';
import Certifications from './Certifications';
import { Code, Award, FolderGit2 } from 'lucide-react';

type TabType = 'projects' | 'certifications' | 'techstack';

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  const tabs = [
    { id: 'projects' as TabType, label: 'Projects', icon: FolderGit2 },
    { id: 'certifications' as TabType, label: 'Certifications', icon: Award },
    { id: 'techstack' as TabType, label: 'Tech Stack', icon: Code },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-navyDark relative">
      <div className="section-container px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 title-gradient">
          Projects & Skills
        </h2>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 md:mb-12">
          <nav className="glass-nav rounded-full px-2 py-2 shadow-lg">
            <ul className="flex flex-row items-center gap-2 sm:gap-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base
                        transition-all duration-300 flex items-center gap-2
                        nav-link
                        ${
                          isActive
                            ? 'text-purple-light after:scale-x-100 bg-white/5'
                            : 'text-gray-300 hover:text-purple-light hover:translate-y-[-2px]'
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'projects' && <ProjectsList />}
          {activeTab === 'certifications' && <Certifications />}
          {activeTab === 'techstack' && <TechStack />}
        </div>
      </div>
    </section>
  );
};

export default Projects;
