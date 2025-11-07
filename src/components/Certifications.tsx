import React from 'react';
import awsCert from '@/assets/cert-aws-real.jpg';
import metaCert from '@/assets/cert-meta-python.jpg';
import { ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    date: 'January 2025',
    hours: '20 hours',
    image: awsCert,
    verifyUrl: 'https://www.credly.com/go/pexk7bQr',
    description: 'Certificate of Completion for AWS Academy Graduate'
  },
  {
    title: 'Programming in Python',
    issuer: 'Meta (via Coursera)',
    date: 'January 2025',
    image: metaCert,
    verifyUrl: 'https://coursera.org/verify/EUT89W2S98K',
    description: 'Online non-credit course authorized by Meta'
  },
];

const Certifications: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="glass-card glass-clear rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple/20 group"
        >
          {/* Certificate Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/20">
            <img 
              src={cert.image} 
              alt={cert.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Certificate Info */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-light transition-colors line-clamp-2">
              {cert.title}
            </h3>
            <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
            <p className="text-xs text-gray-500 mb-2">{cert.date}</p>
            {cert.hours && (
              <p className="text-xs text-purple-light mb-3">{cert.hours}</p>
            )}
            
            {/* Verify Link */}
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify Certificate</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
