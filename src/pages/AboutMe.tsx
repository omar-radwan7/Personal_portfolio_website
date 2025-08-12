
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const AboutMe: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-navyDark pt-20">
      <div className="section-container py-10 md:py-16">
        {/* Back to home button */}
        <Link to="/" className="inline-flex items-center text-purple-light hover:text-purple mb-8 transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* About Me Section - Updated text */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h1 className="text-3xl font-bold mb-6 title-gradient">About Me</h1>
              
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed">
                  I'm Omar Radwan, a student at the University of Europe studying Information Technology.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  I was born in Egypt on October 5th, 2004. I've always had an interest in how technology works and how it can be used to solve real problems. That curiosity led me toward software development.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  I focus on web development, AI, and cloud computing. I'm adaptable with AI tools and know how to use them to improve my work, whether it's writing code, learning new concepts, or building projects more efficiently.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-8">
                <a href="https://www.linkedin.com/in/omar-radwan-99794a27a" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="mailto:omarobrashy2004@gmail.com" className="social-icon">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="https://github.com/omar-radwan7" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* CV Section */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-8 text-center title-gradient">Curriculum Vitae</h2>
              
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">Omar Radwan</h3>
                  <p className="text-gray-400">+491777588642 - omarobrashy2004@gmail.com</p>
                  <div className="mt-2">
                    <p className="text-gray-400">
                      GitHub: 
                      <a href="https://github.com/omar-radwan7" target="_blank" rel="noopener noreferrer" className="text-purple-light ml-1">
                        https://github.com/omar-radwan7
                      </a>
                    </p>
                    <p className="text-gray-400">
                      LinkedIn: 
                      <a href="https://www.linkedin.com/in/omar-radwan-99794a27a" target="_blank" rel="noopener noreferrer" className="text-purple-light ml-1">
                        www.linkedin.com/in/omar-radwan-99794a27a
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Professional Summary */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Professional Summary</h3>
                  <p className="text-gray-300">
                    Aspiring Full Stack Software developer eager to learn and contribute. Quick learner with a 
                    strong foundation in coding and a focus on growth in dynamic environments.
                  </p>
                </div>
                
                {/* Work History */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Work History</h3>
                  <div className="ml-0 md:ml-4">
                    <div className="mb-4">
                      <div className="flex justify-between items-center flex-wrap">
                        <h4 className="font-medium">Software Developer Internship</h4>
                        <span className="text-purple-light text-sm">05/2023 – 08/2023</span>
                      </div>
                      <p className="text-gray-400 mb-2">EBNY Real Estate – Cairo, Egypt</p>
                      <ul className="list-disc ml-5 text-gray-300">
                        <li>Collaborated with teams to gather requirements and implement custom solutions.</li>
                        <li>Designed database systems to store and manage property data.</li>
                        <li>Verified and resolved bug reports and technical issues.</li>
                        <li>Developed solutions using Python and SQL databases.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Projects */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Projects</h3>
                  <div className="ml-0 md:ml-4 space-y-4">
                    <div>
                      <h4 className="font-medium">Qorix AI Assistant</h4>
                      <p className="text-gray-300">
                        React/TypeScript AI chat app with OpenRouter API integration.
                      </p>
                      <p className="text-gray-300 text-sm">
                        Technologies: React, TypeScript, JavaScript, OpenRouter API
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">NexoVPN</h4>
                      <p className="text-gray-300">
                        Django/React VPN application with WireGuard protocols and Docker deployment.
                      </p>
                      <p className="text-gray-300 text-sm">
                        Technologies: Python (Django), JavaScript (React), Docker, WireGuard
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">TradeWise</h4>
                      <p className="text-gray-300">
                        Flutter stock market app with real-time financial data and portfolio tracking.
                      </p>
                      <p className="text-gray-300 text-sm">
                        Technologies: Flutter, Dart, Financial APIs
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Education</h3>
                  <div className="ml-0 md:ml-4">
                    <div className="mb-4">
                      <div className="flex justify-between items-center flex-wrap">
                        <h4 className="font-medium">Bachelor of Science: Software Engineering</h4>
                        <span className="text-purple-light text-sm">09/2023 – Current</span>
                      </div>
                      <p className="text-gray-400">University of Europe for Applied Sciences – Potsdam, Brandenburg</p>
                    </div>
                  </div>
                </div>
                
                {/* Certifications */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Certifications</h3>
                  <div className="ml-0 md:ml-4 space-y-4">
                    <div>
                      <h4 className="font-medium">Meta Back End Professional Developer Certificate</h4>
                      <p className="text-gray-300">
                        Covers Python, SQL, APIs, Git, and Django, with a focus on building secure and scalable back-end systems.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">AWS Cloud Practitioner Essentials Certificate</h4>
                      <p className="text-gray-300">
                        Foundational knowledge of AWS core services, cloud concepts, security, and pricing models.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Skills</h3>
                  
                  {/* Programming Languages */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-purple-light">Programming Languages</h4>
                    <p className="text-gray-300">Python • Java • C Programming</p>
                  </div>
                  
                  {/* Web Development */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-purple-light">Web Development</h4>
                    <p className="text-gray-300">Django • REST APIs • React.js • Vue.js • JavaScript • TypeScript CSS • User Experience Design</p>
                  </div>
                  
                  {/* Database & Cloud */}
                  <div>
                    <h4 className="font-medium mb-2 text-purple-light">Database & Cloud</h4>
                    <p className="text-gray-300">PostgreSQL • AWS Cloud Services • Cloud fundamentals • Cloud Architecture</p>
                  </div>
                </div>
                
                {/* Languages */}
                <div>
                  <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Languages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="font-medium">Arabic</div>
                        <div className="text-gray-400 text-sm">Native</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="font-medium">English</div>
                        <div className="text-gray-400 text-sm">C1</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="font-medium">German</div>
                        <div className="text-gray-400 text-sm">A1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutMe;
