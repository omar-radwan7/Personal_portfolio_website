import React, { useEffect, useRef } from 'react';

const ComputerMachine: React.FC = () => {
  const computerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!computerRef.current) return;
      
      const rect = computerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const relativeX = (e.clientX - centerX) / rect.width;
      const relativeY = (e.clientY - centerY) / rect.height;
      
      const tiltX = relativeY * 2;
      const tiltY = relativeX * -2;
      
      computerRef.current.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="computer-container">
      <div className="computer-machine" ref={computerRef}>
        <svg viewBox="0 0 500 400" className="computer-svg">
          <defs>
            {/* Gradients */}
            <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#5b21b6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="codeWindowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3730a3', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Gears */}
          {/* Top Left Gear */}
          <g className="gear gear-1" transform="translate(80, 80)">
            <circle cx="0" cy="0" r="22" fill="#4b5563" />
            <circle cx="0" cy="0" r="14" fill="#374151" />
            <rect x="-3" y="-28" width="6" height="12" fill="#4b5563" rx="2" />
            <rect x="-3" y="16" width="6" height="12" fill="#4b5563" rx="2" />
            <rect x="-28" y="-3" width="12" height="6" fill="#4b5563" rx="2" />
            <rect x="16" y="-3" width="12" height="6" fill="#4b5563" rx="2" />
            <circle cx="0" cy="0" r="6" fill="#6b7280" />
          </g>

          {/* Bottom Left Gear (small) */}
          <g className="gear gear-2" transform="translate(110, 320)">
            <circle cx="0" cy="0" r="16" fill="#4b5563" />
            <circle cx="0" cy="0" r="10" fill="#374151" />
            <rect x="-2" y="-20" width="4" height="8" fill="#4b5563" rx="1.5" />
            <rect x="-2" y="12" width="4" height="8" fill="#4b5563" rx="1.5" />
            <rect x="-20" y="-2" width="8" height="4" fill="#4b5563" rx="1.5" />
            <rect x="12" y="-2" width="8" height="4" fill="#4b5563" rx="1.5" />
            <circle cx="0" cy="0" r="4" fill="#6b7280" />
          </g>

          {/* Top Right Gear (large) */}
          <g className="gear gear-3" transform="translate(420, 70)">
            <circle cx="0" cy="0" r="28" fill="#4b5563" />
            <circle cx="0" cy="0" r="18" fill="#374151" />
            <rect x="-4" y="-35" width="8" height="14" fill="#4b5563" rx="2" />
            <rect x="-4" y="21" width="8" height="14" fill="#4b5563" rx="2" />
            <rect x="-35" y="-4" width="14" height="8" fill="#4b5563" rx="2" />
            <rect x="21" y="-4" width="14" height="8" fill="#4b5563" rx="2" />
            <circle cx="0" cy="0" r="8" fill="#6b7280" />
          </g>

          {/* Bottom Right Gear */}
          <g className="gear gear-4" transform="translate(390, 310)">
            <circle cx="0" cy="0" r="20" fill="#4b5563" />
            <circle cx="0" cy="0" r="12" fill="#374151" />
            <rect x="-2.5" y="-25" width="5" height="10" fill="#4b5563" rx="2" />
            <rect x="-2.5" y="15" width="5" height="10" fill="#4b5563" rx="2" />
            <rect x="-25" y="-2.5" width="10" height="5" fill="#4b5563" rx="2" />
            <rect x="15" y="-2.5" width="10" height="5" fill="#4b5563" rx="2" />
            <circle cx="0" cy="0" r="5" fill="#6b7280" />
          </g>

          {/* Left Side Code Lines */}
          <g className="code-lines-left">
            <line x1="40" y1="180" x2="100" y2="180" stroke="#8b5cf6" strokeWidth="4" className="line-1" strokeLinecap="round" />
            <line x1="40" y1="200" x2="100" y2="200" stroke="#8b5cf6" strokeWidth="4" className="line-2" strokeLinecap="round" />
            <line x1="40" y1="220" x2="100" y2="220" stroke="#8b5cf6" strokeWidth="4" className="line-3" strokeLinecap="round" />
            <line x1="40" y1="240" x2="100" y2="240" stroke="#8b5cf6" strokeWidth="4" className="line-4" strokeLinecap="round" />
          </g>

          {/* Left Code Window with Gear Icon */}
          <g className="left-code-window">
            <rect x="130" y="150" width="80" height="100" rx="8" fill="url(#codeWindowGrad)" opacity="0.95" />
            {/* Code lines inside */}
            <line x1="140" y1="165" x2="170" y2="165" stroke="#06b6d4" strokeWidth="2" />
            <line x1="140" y1="175" x2="185" y2="175" stroke="#06b6d4" strokeWidth="2" />
            <line x1="140" y1="185" x2="175" y2="185" stroke="#06b6d4" strokeWidth="2" />
            <line x1="140" y1="195" x2="180" y2="195" stroke="#06b6d4" strokeWidth="2" />
            <line x1="140" y1="205" x2="165" y2="205" stroke="#06b6d4" strokeWidth="2" />
            
            {/* Small gear icon in window */}
            <g className="small-gear" transform="translate(165, 225)">
              <circle cx="0" cy="0" r="12" fill="#06b6d4" opacity="0.8" />
              <circle cx="0" cy="0" r="7" fill="#0891b2" />
              <rect x="-1.5" y="-15" width="3" height="6" fill="#06b6d4" rx="1" />
              <rect x="-1.5" y="9" width="3" height="6" fill="#06b6d4" rx="1" />
              <rect x="-15" y="-1.5" width="6" height="3" fill="#06b6d4" rx="1" />
              <rect x="9" y="-1.5" width="6" height="3" fill="#06b6d4" rx="1" />
              <circle cx="0" cy="0" r="3" fill="#67e8f9" />
            </g>
          </g>

          {/* Main Monitor */}
          <rect x="220" y="130" width="200" height="150" rx="12" fill="url(#monitorGrad)" className="monitor-base" />
          
          {/* Screen */}
          <rect x="232" y="142" width="176" height="110" rx="6" fill="url(#screenGrad)" className="screen" />
          
          {/* Code lines on screen */}
          <g className="screen-code">
            <line x1="245" y1="160" x2="280" y2="160" stroke="#10b981" strokeWidth="2" />
            <line x1="245" y1="170" x2="295" y2="170" stroke="#10b981" strokeWidth="2" />
            <line x1="245" y1="180" x2="275" y2="180" stroke="#10b981" strokeWidth="2" />
            <line x1="245" y1="190" x2="290" y2="190" stroke="#10b981" strokeWidth="2" />
            <line x1="245" y1="200" x2="285" y2="200" stroke="#10b981" strokeWidth="2" />
            <line x1="245" y1="210" x2="270" y2="210" stroke="#10b981" strokeWidth="2" />
            <line x1="245" y1="220" x2="295" y2="220" stroke="#10b981" strokeWidth="2" />
          </g>

          {/* Code Brackets Icon */}
          <g className="code-icon">
            <circle cx="320" cy="200" r="28" fill="#3b82f6" opacity="0.3" />
            <text x="320" y="212" fontSize="36" fill="#60a5fa" filter="url(#glow)" fontWeight="bold" textAnchor="middle">&lt;/&gt;</text>
          </g>

          {/* Bottom UI Buttons */}
          <g className="ui-buttons">
            <rect x="240" y="260" width="35" height="12" rx="2" fill="#3b82f6" opacity="0.7" />
            <rect x="285" y="260" width="35" height="12" rx="2" fill="#3b82f6" opacity="0.7" />
            <rect x="330" y="260" width="35" height="12" rx="2" fill="#3b82f6" opacity="0.7" />
          </g>

          {/* Monitor Stand */}
          <path d="M 285 280 L 295 280 L 300 310 L 280 310 Z" fill="#1e293b" />
          <ellipse cx="290" cy="310" rx="35" ry="8" fill="#0f172a" />

          {/* Right Side Cloud with Download */}
          <g className="cloud-icon">
            <path d="M 430 200 Q 430 185 445 185 Q 460 185 460 200 Q 475 200 475 220 Q 475 235 460 235 L 430 235 Q 415 235 415 220 Q 415 200 430 200" 
                  fill="url(#cloudGrad)" opacity="0.95" />
            <path d="M 445 210 L 445 225 M 438 218 L 445 225 L 452 218" 
                  stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Right Side Checkmark Box */}
          <g className="checkmark-box">
            <rect x="425" y="260" width="45" height="45" rx="8" fill="#10b981" opacity="0.95" />
            <path d="M 433 280 L 443 290 L 460 273" 
                  stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {/* Floating particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Ambient glow */}
        <div className="ambient-glow"></div>
      </div>

      <style>{`
        .computer-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .computer-machine {
          position: relative;
          animation: slowBounce 4s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .computer-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 15px 35px rgba(79, 70, 229, 0.4));
        }

        /* Animated Elements */
        .monitor-base {
          animation: subtlePulse 3s ease-in-out infinite;
        }

        .screen {
          animation: screenGlow 2s ease-in-out infinite;
        }

        .left-code-window {
          animation: windowFloat 3s ease-in-out infinite;
        }

        .code-icon {
          animation: codePulse 2s ease-in-out infinite;
        }

        .checkmark-box {
          animation: checkPulse 2s ease-in-out infinite 0.5s;
        }

        .code-lines-left .line-1 {
          animation: lineGlow 2s ease-in-out infinite;
        }

        .code-lines-left .line-2 {
          animation: lineGlow 2s ease-in-out infinite 0.2s;
        }

        .code-lines-left .line-3 {
          animation: lineGlow 2s ease-in-out infinite 0.4s;
        }

        .code-lines-left .line-4 {
          animation: lineGlow 2s ease-in-out infinite 0.6s;
        }

        .cloud-icon {
          animation: cloudFloat 3s ease-in-out infinite;
        }

        .small-gear {
          animation: rotateGear 4s linear infinite;
          transform-origin: 165px 225px;
        }

        /* Gear Animations */
        .gear-1 {
          animation: rotateGear 8s linear infinite;
          transform-origin: 80px 80px;
        }

        .gear-2 {
          animation: rotateGearReverse 6s linear infinite;
          transform-origin: 110px 320px;
        }

        .gear-3 {
          animation: rotateGear 10s linear infinite;
          transform-origin: 420px 70px;
        }

        .gear-4 {
          animation: rotateGearReverse 7s linear infinite;
          transform-origin: 390px 310px;
        }

        /* Particles */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ec4899;
          border-radius: 50%;
          animation: particleFloat 4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
        }

        .particle:nth-child(1) {
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          top: 25%;
          right: 15%;
          animation-delay: 1s;
          background: #8b5cf6;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
        }

        .particle:nth-child(3) {
          top: 50%;
          left: 15%;
          animation-delay: 2s;
        }

        .particle:nth-child(4) {
          top: 65%;
          right: 20%;
          animation-delay: 3s;
          background: #06b6d4;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
        }

        .particle:nth-child(5) {
          top: 35%;
          left: 5%;
          animation-delay: 1.5s;
        }

        .particle:nth-child(6) {
          top: 80%;
          right: 12%;
          animation-delay: 2.5s;
          background: #8b5cf6;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
        }

        /* Ambient Glow */
        .ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(79, 70, 229, 0.2) 0%,
            rgba(59, 130, 246, 0.15) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: ambientPulse 3s ease-in-out infinite;
          z-index: 0;
        }

        /* Keyframe Animations */
        @keyframes slowBounce {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-20px);
          }
        }

        @keyframes rotateGear {
          from { 
            transform: rotate(0deg);
          }
          to { 
            transform: rotate(360deg);
          }
        }

        @keyframes rotateGearReverse {
          from { 
            transform: rotate(360deg);
          }
          to { 
            transform: rotate(0deg);
          }
        }

        @keyframes subtlePulse {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.9;
          }
        }

        @keyframes screenGlow {
          0%, 100% { 
            filter: brightness(1);
          }
          50% { 
            filter: brightness(1.15);
          }
        }

        @keyframes windowFloat {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-5px);
          }
        }

        @keyframes codePulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.85;
            transform: scale(1.05);
          }
        }

        @keyframes checkPulse {
          0%, 100% { 
            opacity: 0.95;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes lineGlow {
          0%, 100% { 
            opacity: 0.5;
          }
          50% { 
            opacity: 1;
          }
        }

        @keyframes cloudFloat {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-10px);
          }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translate(15px, -35px) scale(1.4);
            opacity: 1;
          }
        }

        @keyframes ambientPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.5;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .computer-container {
            height: 350px;
            max-width: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default ComputerMachine;
