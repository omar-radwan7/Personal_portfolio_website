
import React, { useEffect, useRef, useState } from 'react';

const RobotHead: React.FC = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
      
      const rect = robotRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;
      
      // Calculate relative mouse position
      const relativeX = (e.clientX - robotCenterX) / rect.width;
      const relativeY = (e.clientY - robotCenterY) / rect.height;
      
      // Limit eye movement range
      const maxMovement = 1.5;
      const eyeX = Math.max(-maxMovement, Math.min(maxMovement, relativeX * maxMovement));
      const eyeY = Math.max(-maxMovement, Math.min(maxMovement, relativeY * maxMovement));
      
      // Apply eye movement
      leftEyeRef.current.setAttribute('cx', String(20 + eyeX));
      leftEyeRef.current.setAttribute('cy', String(20 + eyeY));
      rightEyeRef.current.setAttribute('cx', String(44 + eyeX));
      rightEyeRef.current.setAttribute('cy', String(20 + eyeY));
      
      setMousePosition({ x: e.clientX, y: e.clientY });
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
        className="w-20 h-32 transition-transform duration-150 ease-out animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        {/* Robot SVG */}
        <svg
          width="80"
          height="128"
          viewBox="0 0 80 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Robot antenna */}
          <line
            x1="40"
            y1="8"
            x2="40"
            y2="2"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="40"
            cy="2"
            r="2"
            fill="#ff6b6b"
            className="animate-pulse"
          />
          
          {/* Robot head */}
          <rect
            x="16"
            y="8"
            width="48"
            height="32"
            rx="8"
            fill="url(#robotHeadGradient)"
            stroke="#4c51bf"
            strokeWidth="2"
          />
          
          {/* Robot eyes */}
          <circle
            ref={leftEyeRef}
            cx="20"
            cy="20"
            r="3"
            fill="#ffffff"
            className="transition-all duration-150 ease-out"
          />
          <circle
            ref={rightEyeRef}
            cx="44"
            cy="20"
            r="3"
            fill="#ffffff"
            className="transition-all duration-150 ease-out"
          />
          
          {/* Robot body */}
          <rect
            x="12"
            y="40"
            width="56"
            height="48"
            rx="12"
            fill="url(#robotBodyGradient)"
            stroke="#4c51bf"
            strokeWidth="2"
          />
          
          {/* Robot screen/chest panel */}
          <rect
            x="24"
            y="52"
            width="32"
            height="16"
            rx="4"
            fill="#1a202c"
            stroke="#4c51bf"
            strokeWidth="1"
          />
          
          {/* Screen lines */}
          <line x1="28" y1="56" x2="52" y2="56" stroke="#4ade80" strokeWidth="1" />
          <line x1="28" y1="60" x2="48" y2="60" stroke="#4ade80" strokeWidth="1" />
          <line x1="28" y1="64" x2="44" y2="64" stroke="#4ade80" strokeWidth="1" />
          
          {/* Robot arms */}
          <ellipse
            cx="6"
            cy="58"
            rx="6"
            ry="12"
            fill="url(#robotArmGradient)"
            stroke="#4c51bf"
            strokeWidth="2"
          />
          <ellipse
            cx="74"
            cy="58"
            rx="6"
            ry="12"
            fill="url(#robotArmGradient)"
            stroke="#4c51bf"
            strokeWidth="2"
          />
          
          {/* Robot base/legs */}
          <ellipse
            cx="40"
            cy="100"
            rx="24"
            ry="12"
            fill="url(#robotBaseGradient)"
            stroke="#4c51bf"
            strokeWidth="2"
          />
          
          {/* Base highlight */}
          <rect
            x="28"
            y="96"
            width="24"
            height="4"
            rx="2"
            fill="#e879f9"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="robotHeadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4c51bf" />
            </linearGradient>
            <linearGradient id="robotBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4c51bf" />
            </linearGradient>
            <linearGradient id="robotArmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4c51bf" />
            </linearGradient>
            <linearGradient id="robotBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default RobotHead;
