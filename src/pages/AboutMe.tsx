
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import SatelliteCollisionDetection from '@/components/SatelliteCollisionDetection';
import profilePic from '@/assets/profile-pic.jpg';

const AboutMe: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
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
              <div className="glass-panel p-6 sticky top-24">
                <h1 className="text-3xl font-bold mb-6 title-gradient">About Me</h1>
                
                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple via-blue to-cyan rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <img 
                      src={profilePic} 
                      alt="Omar Radwan" 
                      className="relative w-48 h-48 rounded-full object-cover border-4 border-purple/30 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed">
                    I'm Omar Radwan, a Full Stack Developer studying Software Engineering at the University of Europe for Applied Sciences.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    I was born in Egypt on October 5th, 2004. I've always had an interest in how technology works and how it can be used to solve real problems. That curiosity led me toward software development.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    I focus on web development, cloud computing, and building scalable applications. I'm adaptable with modern tools and technologies, whether it's building full-stack applications, designing APIs, or optimizing performance.
                  </p>
                </div>
                
                {/* Download CV Button */}
                <a 
                  href="/Omar_Radwan_CV.pdf" 
                  download="Omar_Radwan_CV.pdf"
                  className="block w-full mb-4"
                >
                  <Button className="w-full bg-gradient-to-r from-purple via-blue to-cyan hover:opacity-90 transition-opacity text-white font-semibold py-3 shadow-lg shadow-purple/30">
                    <i className="fas fa-download mr-2"></i>
                    Download CV
                  </Button>
                </a>

                <div className="flex flex-wrap gap-2 mt-4">
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
              <div className="glass-panel p-6 md:p-8">
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
                      Aspiring Full Stack Developer with strong foundations in JavaScript, TypeScript, React, C, Java and Python. 
                      Skilled in building scalable web applications, integrating APIs, and delivering responsive designs. Quick learner 
                      with proven ability to collaborate in cross-functional teams, troubleshoot issues, and adapt to evolving requirements.
                    </p>
                  </div>
                  
                  {/* Technical Skills */}
                  <div>
                    <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Technical Skills</h3>
                    
                    {/* Programming Languages */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-purple-light">Programming Languages</h4>
                      <p className="text-gray-300">Python • Java • C++</p>
                    </div>
                    
                    {/* Web Development */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-purple-light">Web Development</h4>
                      <p className="text-gray-300">HTML5 • REST APIs • React.js • Vue.js • JavaScript • TypeScript • CSS • Bootstrap • User Experience Design</p>
                    </div>
                    
                    {/* Mobile Application */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-purple-light">Mobile Application</h4>
                      <p className="text-gray-300">Flutter • Kotlin • Golang</p>
                    </div>
                    
                    {/* Database & Cloud */}
                    <div>
                      <h4 className="font-medium mb-2 text-purple-light">Database & Cloud</h4>
                      <p className="text-gray-300">PostgreSQL • AWS Cloud Services • Cloud fundamentals • Cloud Architecture • MongoDB • MySQL</p>
                    </div>
                  </div>
                  
                  {/* Work Experience */}
                  <div>
                    <h3 className="text-xl font-semibold border-b border-purple/30 pb-2 mb-4">Work Experience</h3>
                    <div className="ml-0 md:ml-4">
                      <div className="mb-4">
                        <div className="flex justify-between items-center flex-wrap">
                          <h4 className="font-medium">Full Stack Developer Intern</h4>
                          <span className="text-purple-light text-sm">09/2025 – Present</span>
                        </div>
                        <p className="text-gray-400 mb-2">The Egyptian Ministry of Networking & The Applied Innovation Center - Full Time-Remotely</p>
                        <ul className="list-disc ml-5 text-gray-300">
                          <li>Developing and deploying full stack features using React.js, Node.js, and PostgreSQL.</li>
                          <li>Collaborating with designers and engineers in Agile sprints to deliver scalable solutions.</li>
                          <li>Implementing responsive UI components and optimizing app performance.</li>
                        </ul>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center flex-wrap">
                          <h4 className="font-medium">Data Engineer Internship</h4>
                          <span className="text-purple-light text-sm">05/2023 – 08/2023</span>
                        </div>
                        <p className="text-gray-400 mb-2">EBNY Real Estate – Cairo, Egypt - Full Time-On-Sight</p>
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
                    <div className="ml-0 md:ml-4 space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">3D Satellite Collision Detection</h4>
                        <p className="text-gray-400 text-sm mb-3">Real-time 3D visualization system for detecting potential satellite collisions in orbit</p>
                        <div className="mb-3">
                          <SatelliteCollisionDetection />
                        </div>
                        <ul className="list-disc ml-5 text-gray-300 text-sm mt-2">
                          <li>Developed an interactive 3D simulation using Three.js and React Three Fiber to visualize satellite trajectories and collision detection zones in real-time.</li>
                          <li>Implemented orbital mechanics algorithms to calculate satellite positions and predict potential collision scenarios with visual warning systems.</li>
                          <li>Created an immersive user experience with interactive camera controls, allowing users to explore the 3D space environment and observe satellite movements from multiple angles.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">SSH Keys Portal</h4>
                        <p className="text-gray-400 text-sm mb-2">Web-based portal for managing SSH keys in HPC environments</p>
                        <ul className="list-disc ml-5 text-gray-300 text-sm mt-2">
                          <li>Engineered a secure SSH key management portal utilizing Python, FastAPI, and SQLAlchemy, cutting user onboarding time by 87.5%, reducing deployment from 2 hours to just 15 minutes and saving countless hours for researchers.</li>
                          <li>Cross-platform developing experience via universal Makefile and bootstrap scripts; reproducible setup, SQL migrations, and health/status endpoints.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Trading App</h4>
                        <p className="text-gray-400 text-sm mb-2">Flutter stock market app with real-time financial data and portfolio tracking</p>
                        <ul className="list-disc ml-5 text-gray-300 text-sm mt-2">
                          <li>Developed a cross-platform stock market application using Flutter, achieving 99.9% uptime for the web version containerized with Docker and Nginx, ensuring reliable access to real-time financial data.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Web Portfolio Builder</h4>
                        <ul className="list-disc ml-5 text-gray-300 text-sm mt-2">
                          <li>Built a no‑code React portfolio builder (Vite + Tailwind) with dual modes (Blocks/Page), drag‑and‑drop sections, multi‑page management, theme presets, per‑section layout controls, customizable hero/highlights, and one‑click export to a runnable React project (JSZip/FileSaver); state via Context + useReducer.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Local Cloud Storage</h4>
                        <ul className="list-disc ml-5 text-gray-300 text-sm mt-2">
                          <li>A fully local Dropbox-style app built with Next.js, React, TailwindCSS, Node.js, Express, TypeScript, and SQLite, offering secure user authentication, drag-and-drop file uploads with automatic versioning, nested folders, a recycle bin, storage visualization, semantic search, and optional AI-powered file summarization and chat, all in a self-contained, portable system.</li>
                        </ul>
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
                          <span className="text-purple-light text-sm">09/2023 – Present</span>
                        </div>
                        <p className="text-gray-400">University of Europe for Applied Sciences – Potsdam, Germany</p>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center flex-wrap">
                          <h4 className="font-medium">High School Diploma: American Diploma</h4>
                          <span className="text-purple-light text-sm">09/2020 – 07/2023</span>
                        </div>
                        <p className="text-gray-400">Port Said American School – Giza, Egypt</p>
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
                          Foundational knowledge of AWS core services, cloud concepts & Architecture, security, and pricing models.
                        </p>
                      </div>
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
                          <div className="text-gray-400 text-sm">A2 (Still taking an Intensive German Course)</div>
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
    </PageTransition>
  );
};

export default AboutMe;
