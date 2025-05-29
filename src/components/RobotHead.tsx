
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
      const maxMovement = 2;
      const eyeX = Math.max(-maxMovement, Math.min(maxMovement, relativeX * maxMovement));
      const eyeY = Math.max(-maxMovement, Math.min(maxMovement, relativeY * maxMovement));
      
      // Apply eye movement
      leftEyeRef.current.setAttribute('cx', String(22 + eyeX));
      leftEyeRef.current.setAttribute('cy', String(28 + eyeY));
      rightEyeRef.current.setAttribute('cx', String(42 + eyeX));
      rightEyeRef.current.setAttribute('cy', String(28 + eyeY));
      
      // Slight head rotation based on mouse position
      const headRotation = relativeX * 5; // Subtle rotation
      robotRef.current.style.transform = `rotate(${headRotation}deg)`;
      
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
        className="w-16 h-16 transition-transform duration-150 ease-out"
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
            className="animate-pulse"
          />
          
          {/* Eye sockets */}
          <circle
            cx="22"
            cy="28"
            r="6"
            fill="#1a1a2e"
            stroke="#6E59A5"
            strokeWidth="1"
          />
          <circle
            cx="42"
            cy="28"
            r="6"
            fill="#1a1a2e"
            stroke="#6E59A5"
            strokeWidth="1"
          />
          
          {/* Robot eyes (pupils that move) */}
          <circle
            ref={leftEyeRef}
            cx="22"
            cy="28"
            r="3"
            fill="#00ff88"
            className="transition-all duration-150 ease-out"
          />
          <circle
            ref={rightEyeRef}
            cx="42"
            cy="28"
            r="3"
            fill="#00ff88"
            className="transition-all duration-150 ease-out"
          />
          
          {/* Eye highlights */}
          <circle
            cx="23"
            cy="27"
            r="1"
            fill="#ffffff"
            opacity="0.8"
          />
          <circle
            cx="43"
            cy="27"
            r="1"
            fill="#ffffff"
            opacity="0.8"
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
          
          {/* Mouth highlight */}
          <rect
            x="28"
            y="41"
            width="8"
            height="1"
            rx="0.5"
            fill="#9b87f5"
            opacity="0.6"
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
