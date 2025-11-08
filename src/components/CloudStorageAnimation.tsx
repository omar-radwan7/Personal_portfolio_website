import React from 'react';

const CloudStorageAnimation: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-900/20 to-transparent">
      <div className="relative">
        {/* Cloud */}
        <div className="text-6xl text-blue-400">
          <i className="fas fa-cloud animate-pulse"></i>
        </div>
        
        {/* Files going up (upload) */}
        <div className="absolute -left-8 top-8 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0s' }}>
          <i className="fas fa-file text-purple-light text-xl opacity-70"></i>
        </div>
        
        <div className="absolute -right-8 top-10 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <i className="fas fa-file-image text-green-400 text-xl opacity-70"></i>
        </div>
        
        <div className="absolute -left-6 top-16 animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '1s' }}>
          <i className="fas fa-file-pdf text-red-400 text-lg opacity-70"></i>
        </div>
        
        {/* Database icon in center of cloud */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-database text-white text-2xl animate-pulse" style={{ animationDuration: '3s' }}></i>
        </div>
        
        {/* Folder icon */}
        <div className="absolute -right-6 top-4 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1.5s' }}>
          <i className="fas fa-folder text-yellow-400 text-xl opacity-70"></i>
        </div>
      </div>
    </div>
  );
};

export default CloudStorageAnimation;
