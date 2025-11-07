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
          <div className="glass-card glass-clear rounded-lg p-1 inline-flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base
                    transition-all duration-300 flex items-center gap-2
                    ${
                      activeTab === tab.id
                        ? 'bg-purple text-white shadow-lg shadow-purple/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
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
