
import React, { useEffect, useRef, useState } from 'react';

const RobotHead: React.FC = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current) return;
      
      const rect = robotRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;
      
      // Calculate angle from robot to mouse
      const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
      const rotationDegrees = (angle * 180) / Math.PI;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Apply rotation to the robot head
      if (robotRef.current) {
        robotRef.current.style.transform = `rotate(${rotationDegrees + 90}deg)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      <div 
        ref={robotRef}
        className="w-16 h-16 transition-transform duration-200 ease-out"
      >
        {/* Robot Head SVG */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Robot head body */}
          <rect
            x="8"
            y="16"
            width="48"
            height="40"
            rx="8"
            fill="url(#robotGradient)"
            stroke="#6E59A5"
            strokeWidth="2"
          />
          
          {/* Robot antenna */}
          <line
            x1="32"
            y1="16"
            x2="32"
            y2="8"
            stroke="#9b87f5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="32"
            cy="8"
            r="2"
            fill="#9b87f5"
          />
          
          {/* Robot eyes */}
          <circle
            cx="22"
            cy="28"
            r="4"
            fill="#00ff88"
            className="animate-pulse"
          />
          <circle
            cx="42"
            cy="28"
            r="4"
            fill="#00ff88"
            className="animate-pulse"
          />
          
          {/* Robot mouth */}
          <rect
            x="26"
            y="40"
            width="12"
            height="4"
            rx="2"
            fill="#6E59A5"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b87f5" />
              <stop offset="100%" stopColor="#7E69AB" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default RobotHead;
