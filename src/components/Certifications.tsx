import React from 'react';

const certifications = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    icon: 'fab fa-aws',
    color: '#FF9900'
  },
  {
    title: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    date: '2023',
    icon: 'fab fa-google',
    color: '#4285F4'
  },
  {
    title: 'React Developer Certification',
    issuer: 'Meta',
    date: '2024',
    icon: 'fab fa-react',
    color: '#61DAFB'
  },
  {
    title: 'Full Stack Development',
    issuer: 'freeCodeCamp',
    date: '2023',
    icon: 'fab fa-free-code-camp',
    color: '#0A0A23'
  },
];

const Certifications: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="glass-card glass-clear rounded-lg p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 group"
        >
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <i
                className={`${cert.icon} text-4xl transition-all duration-300 group-hover:scale-110`}
                style={{ color: cert.color }}
              ></i>
              <div
                className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundColor: cert.color }}
              ></div>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-light transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
              <p className="text-xs text-gray-500">{cert.date}</p>
            </div>
            <div className="flex-shrink-0">
              <i className="fas fa-certificate text-purple-light text-xl opacity-70 group-hover:opacity-100 transition-opacity"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
