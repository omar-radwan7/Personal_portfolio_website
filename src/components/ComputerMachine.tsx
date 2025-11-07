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
      
      const tiltX = relativeY * 3;
      const tiltY = relativeX * -3;
      
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
        <svg viewBox="0 0 400 380" className="computer-svg">
          {/* Background gradient */}
          <defs>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="codeWindowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3730a3', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Monitor/Computer Base */}
          <rect x="80" y="150" width="240" height="180" rx="15" fill="url(#monitorGrad)" className="monitor-base" />
          
          {/* Screen */}
          <rect x="95" y="165" width="210" height="135" rx="8" fill="url(#screenGrad)" className="screen" />
          
          {/* Code Window */}
          <g className="code-window">
            <rect x="110" y="180" width="100" height="70" rx="6" fill="url(#codeWindowGrad)" opacity="0.9" />
            <line x1="118" y1="195" x2="145" y2="195" stroke="#10b981" strokeWidth="2" />
            <line x1="118" y1="205" x2="155" y2="205" stroke="#10b981" strokeWidth="2" />
            <line x1="118" y1="215" x2="138" y2="215" stroke="#10b981" strokeWidth="2" />
            <line x1="118" y1="225" x2="150" y2="225" stroke="#10b981" strokeWidth="2" />
            <line x1="118" y1="235" x2="142" y2="235" stroke="#10b981" strokeWidth="2" />
          </g>

          {/* Code Brackets Icon */}
          <g className="code-icon">
            <text x="225" y="230" fontSize="40" fill="#60a5fa" filter="url(#glow)" fontWeight="bold">&lt;/&gt;</text>
          </g>

          {/* Checkmark Box */}
          <g className="checkmark-box">
            <rect x="270" y="240" width="35" height="35" rx="6" fill="#10b981" opacity="0.9" />
            <path d="M 275 257 L 282 264 L 298 248" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Small UI Windows */}
          <g className="ui-windows">
            <rect x="110" y="260" width="45" height="30" rx="4" fill="#3b82f6" opacity="0.7" />
            <rect x="165" y="260" width="45" height="30" rx="4" fill="#3b82f6" opacity="0.7" />
            <rect x="220" y="260" width="45" height="30" rx="4" fill="#3b82f6" opacity="0.7" />
            <rect x="118" y="268" width="8" height="8" rx="2" fill="#60a5fa" />
            <rect x="128" y="268" width="8" height="8" rx="2" fill="#60a5fa" />
            <rect x="173" y="268" width="8" height="8" rx="2" fill="#60a5fa" />
            <rect x="183" y="268" width="8" height="8" rx="2" fill="#60a5fa" />
            <rect x="228" y="268" width="8" height="8" rx="2" fill="#60a5fa" />
            <rect x="238" y="268" width="8" height="8" rx="2" fill="#60a5fa" />
          </g>

          {/* Code Lines Left */}
          <g className="code-lines-left">
            <line x1="30" y1="200" x2="70" y2="200" stroke="#8b5cf6" strokeWidth="3" className="line-1" />
            <line x1="30" y1="215" x2="70" y2="215" stroke="#8b5cf6" strokeWidth="3" className="line-2" />
            <line x1="30" y1="230" x2="70" y2="230" stroke="#8b5cf6" strokeWidth="3" className="line-3" />
            <line x1="30" y1="245" x2="70" y2="245" stroke="#8b5cf6" strokeWidth="3" className="line-4" />
          </g>

          {/* Code Lines Right */}
          <g className="code-lines-right">
            <line x1="330" y1="200" x2="370" y2="200" stroke="#8b5cf6" strokeWidth="3" className="line-1" />
            <line x1="330" y1="215" x2="370" y2="215" stroke="#8b5cf6" strokeWidth="3" className="line-2" />
            <line x1="330" y1="230" x2="370" y2="230" stroke="#8b5cf6" strokeWidth="3" className="line-3" />
            <line x1="330" y1="245" x2="370" y2="245" stroke="#8b5cf6" strokeWidth="3" className="line-4" />
          </g>

          {/* Cloud Storage Icon */}
          <g className="cloud-icon">
            <path d="M 340 95 Q 340 85 350 85 Q 360 85 360 95 Q 370 95 370 105 Q 370 115 360 115 L 340 115 Q 330 115 330 105 Q 330 95 340 95" fill="#60a5fa" opacity="0.8" />
            <text x="345" y="107" fontSize="12" fill="white" fontWeight="bold">↓</text>
          </g>

          {/* Gear 1 - Top Right */}
          <g className="gear gear-1" transform="translate(340, 50)">
            <circle cx="0" cy="0" r="20" fill="#9ca3af" />
            <circle cx="0" cy="0" r="12" fill="#6b7280" />
            <rect x="-3" y="-25" width="6" height="10" fill="#9ca3af" rx="2" />
            <rect x="-3" y="15" width="6" height="10" fill="#9ca3af" rx="2" />
            <rect x="-25" y="-3" width="10" height="6" fill="#9ca3af" rx="2" />
            <rect x="15" y="-3" width="10" height="6" fill="#9ca3af" rx="2" />
            <rect x="-18" y="-18" width="8" height="6" fill="#9ca3af" rx="2" transform="rotate(-45)" />
            <rect x="12" y="-18" width="8" height="6" fill="#9ca3af" rx="2" transform="rotate(45)" />
            <rect x="-18" y="12" width="8" height="6" fill="#9ca3af" rx="2" transform="rotate(45)" />
            <rect x="12" y="12" width="8" height="6" fill="#9ca3af" rx="2" transform="rotate(-45)" />
            <circle cx="0" cy="0" r="5" fill="#d1d5db" />
          </g>

          {/* Gear 2 - Bottom Left */}
          <g className="gear gear-2" transform="translate(60, 290)">
            <circle cx="0" cy="0" r="18" fill="#9ca3af" />
            <circle cx="0" cy="0" r="10" fill="#6b7280" />
            <rect x="-2.5" y="-22" width="5" height="8" fill="#9ca3af" rx="2" />
            <rect x="-2.5" y="14" width="5" height="8" fill="#9ca3af" rx="2" />
            <rect x="-22" y="-2.5" width="8" height="5" fill="#9ca3af" rx="2" />
            <rect x="14" y="-2.5" width="8" height="5" fill="#9ca3af" rx="2" />
            <circle cx="0" cy="0" r="4" fill="#d1d5db" />
          </g>

          {/* Gear 3 - Top Left */}
          <g className="gear gear-3" transform="translate(70, 70)">
            <circle cx="0" cy="0" r="22" fill="#9ca3af" />
            <circle cx="0" cy="0" r="13" fill="#6b7280" />
            <rect x="-3" y="-27" width="6" height="10" fill="#9ca3af" rx="2" />
            <rect x="-3" y="17" width="6" height="10" fill="#9ca3af" rx="2" />
            <rect x="-27" y="-3" width="10" height="6" fill="#9ca3af" rx="2" />
            <rect x="17" y="-3" width="10" height="6" fill="#9ca3af" rx="2" />
            <circle cx="0" cy="0" r="5" fill="#d1d5db" />
          </g>

          {/* Gear 4 - Bottom Right */}
          <g className="gear gear-4" transform="translate(330, 280)">
            <circle cx="0" cy="0" r="16" fill="#9ca3af" />
            <circle cx="0" cy="0" r="9" fill="#6b7280" />
            <rect x="-2" y="-20" width="4" height="8" fill="#9ca3af" rx="2" />
            <rect x="-2" y="12" width="4" height="8" fill="#9ca3af" rx="2" />
            <rect x="-20" y="-2" width="8" height="4" fill="#9ca3af" rx="2" />
            <rect x="12" y="-2" width="8" height="4" fill="#9ca3af" rx="2" />
            <circle cx="0" cy="0" r="3.5" fill="#d1d5db" />
          </g>

          {/* Monitor Stand */}
          <rect x="175" y="330" width="50" height="30" rx="8" fill="#374151" />
          <rect x="150" y="355" width="100" height="15" rx="8" fill="#1f2937" />
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
          width: 400px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .computer-machine {
          position: relative;
          animation: slowBounce 4s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        .computer-svg {
          width: 400px;
          height: 380px;
          filter: drop-shadow(0 10px 30px rgba(79, 70, 229, 0.3));
        }

        /* Animated Elements */
        .monitor-base {
          animation: subtlePulse 3s ease-in-out infinite;
        }

        .screen {
          animation: screenGlow 2s ease-in-out infinite;
        }

        .code-window {
          animation: windowPulse 2.5s ease-in-out infinite;
        }

        .code-icon {
          animation: codeBounce 2s ease-in-out infinite;
        }

        .checkmark-box {
          animation: checkPulse 2s ease-in-out infinite 0.5s;
        }

        .code-lines-left .line-1,
        .code-lines-right .line-1 {
          animation: lineGlow 2s ease-in-out infinite;
        }

        .code-lines-left .line-2,
        .code-lines-right .line-2 {
          animation: lineGlow 2s ease-in-out infinite 0.2s;
        }

        .code-lines-left .line-3,
        .code-lines-right .line-3 {
          animation: lineGlow 2s ease-in-out infinite 0.4s;
        }

        .code-lines-left .line-4,
        .code-lines-right .line-4 {
          animation: lineGlow 2s ease-in-out infinite 0.6s;
        }

        .cloud-icon {
          animation: cloudFloat 3s ease-in-out infinite;
        }

        /* Gear Animations */
        .gear-1 {
          animation: rotateGear 8s linear infinite;
          transform-origin: 340px 50px;
        }

        .gear-2 {
          animation: rotateGearReverse 6s linear infinite;
          transform-origin: 60px 290px;
        }

        .gear-3 {
          animation: rotateGear 10s linear infinite;
          transform-origin: 70px 70px;
        }

        .gear-4 {
          animation: rotateGearReverse 7s linear infinite;
          transform-origin: 330px 280px;
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
          box-shadow: 0 0 8px rgba(236, 72, 153, 0.6);
        }

        .particle:nth-child(1) {
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          top: 30%;
          right: 15%;
          animation-delay: 1s;
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
        }

        .particle:nth-child(3) {
          top: 50%;
          left: 20%;
          animation-delay: 2s;
        }

        .particle:nth-child(4) {
          top: 70%;
          right: 25%;
          animation-delay: 3s;
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
        }

        .particle:nth-child(5) {
          top: 40%;
          left: 5%;
          animation-delay: 1.5s;
        }

        .particle:nth-child(6) {
          top: 85%;
          right: 10%;
          animation-delay: 2.5s;
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
        }

        /* Ambient Glow */
        .ambient-glow {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 350px;
          background: radial-gradient(
            circle,
            rgba(79, 70, 229, 0.15) 0%,
            rgba(59, 130, 246, 0.1) 40%,
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
            transform: translateY(-15px);
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
            opacity: 0.95;
          }
        }

        @keyframes screenGlow {
          0%, 100% { 
            filter: brightness(1);
          }
          50% { 
            filter: brightness(1.1);
          }
        }

        @keyframes windowPulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.95;
            transform: scale(1.02);
          }
        }

        @keyframes codeBounce {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-5px);
          }
        }

        @keyframes checkPulse {
          0%, 100% { 
            opacity: 0.9;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes lineGlow {
          0%, 100% { 
            opacity: 0.6;
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
            transform: translateY(-8px);
          }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: translate(10px, -30px) scale(1.3);
            opacity: 1;
          }
        }

        @keyframes ambientPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.6;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .computer-container {
            width: 280px;
            height: 400px;
          }
          
          .computer-svg {
            width: 280px;
            height: 266px;
          }
        }
      `}</style>
    </div>
  );
};

export default ComputerMachine;
