
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Let's work together</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-6 card-hover">
            <div className="w-14 h-14 bg-purple/20 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-phone text-purple-light text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Phone</h3>
            <p className="text-gray-400">+49 177 7588642</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 card-hover">
            <div className="w-14 h-14 bg-purple/20 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-envelope text-purple-light text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Email</h3>
            <a href="mailto:omarobrashy2004@gmail.com" className="text-gray-400 hover:text-purple-light transition-colors">
              omarobrashy2004@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
