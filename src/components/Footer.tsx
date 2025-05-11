
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-card">
      <div className="section-container">
        <p className="text-center mb-6">
          CopyRights @ <span className="text-purple-light font-medium">Omar Radwan</span>
        </p>
        
        <div className="flex justify-center space-x-8">
          <a href="https://www.linkedin.com/in/omar-radwan-99794a27a" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:omarobrashy2004@gmail.com" className="social-icon">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://github.com/omar-radwan7" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.instagram.com/omarobrashy/?__pwa=1#" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
