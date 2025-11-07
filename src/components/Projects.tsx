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
          <div className="relative inline-flex gap-1 p-1.5 rounded-2xl bg-gradient-to-r from-purple/10 via-blue/10 to-cyan/10 backdrop-blur-sm border border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base
                    transition-all duration-300 flex items-center gap-2.5 overflow-hidden group
                    ${
                      isActive
                        ? 'bg-gradient-to-br from-purple via-blue to-cyan text-white shadow-xl shadow-purple/40 scale-105'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/20 via-blue/20 to-cyan/20 animate-pulse"></div>
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-300`} />
                  <span className="hidden sm:inline relative z-10">{tab.label}</span>
                  <span className="sm:hidden relative z-10">{tab.label.split(' ')[0]}</span>
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/0 via-blue/5 to-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              );
            })}
          </div>
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
