import React, { useEffect, useRef } from 'react';

const ComputerMachine: React.FC = () => {
  const computerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking && computerRef.current) {
        window.requestAnimationFrame(() => {
          if (!computerRef.current) return;
          
          const rect = computerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const relativeX = (e.clientX - centerX) / rect.width;
          const relativeY = (e.clientY - centerY) / rect.height;
          
          const tiltX = relativeY * 2;
          const tiltY = relativeX * -2;
          
          computerRef.current.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
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
          {/* Left Gear */}
          <g className="gear gear-1" transform="translate(120, 150)">
            <circle cx="0" cy="0" r="20" fill="#4b5563" opacity="0.6" />
            <circle cx="0" cy="0" r="12" fill="#374151" />
            <rect x="-2" y="-25" width="4" height="10" fill="#4b5563" opacity="0.6" rx="1.5" />
            <rect x="-2" y="15" width="4" height="10" fill="#4b5563" opacity="0.6" rx="1.5" />
            <rect x="-25" y="-2" width="10" height="4" fill="#4b5563" opacity="0.6" rx="1.5" />
            <rect x="15" y="-2" width="10" height="4" fill="#4b5563" opacity="0.6" rx="1.5" />
            <circle cx="0" cy="0" r="5" fill="#6b7280" />
          </g>

          {/* Right Gear */}
          <g className="gear gear-2" transform="translate(380, 150)">
            <circle cx="0" cy="0" r="18" fill="#4b5563" opacity="0.6" />
            <circle cx="0" cy="0" r="11" fill="#374151" />
            <rect x="-2" y="-23" width="4" height="10" fill="#4b5563" opacity="0.6" rx="1.5" />
            <rect x="-2" y="13" width="4" height="10" fill="#4b5563" opacity="0.6" rx="1.5" />
            <rect x="-23" y="-2" width="10" height="4" fill="#4b5563" opacity="0.6" rx="1.5" />
            <rect x="13" y="-2" width="10" height="4" fill="#4b5563" opacity="0.6" rx="1.5" />
            <circle cx="0" cy="0" r="5" fill="#6b7280" />
          </g>

          {/* Mobile Phone */}
          <g className="mobile-phone">
            <rect x="80" y="240" width="60" height="110" rx="8" fill="#1e293b" />
            <rect x="85" y="245" width="50" height="95" rx="4" fill="#0f172a" />
            <rect x="88" y="250" width="44" height="70" rx="2" fill="#1e3a8a" />
            {/* Mobile screen content */}
            <rect x="92" y="255" width="18" height="12" rx="2" fill="#3b82f6" opacity="0.8" />
            <rect x="92" y="270" width="36" height="3" rx="1.5" fill="#10b981" opacity="0.7" />
            <rect x="92" y="277" width="28" height="3" rx="1.5" fill="#10b981" opacity="0.7" />
            <rect x="92" y="284" width="32" height="3" rx="1.5" fill="#10b981" opacity="0.7" />
            <rect x="92" y="295" width="15" height="15" rx="2" fill="#8b5cf6" opacity="0.6" className="mobile-icon" />
            <rect x="110" y="295" width="15" height="15" rx="2" fill="#06b6d4" opacity="0.6" className="mobile-icon" />
            {/* Home button */}
            <circle cx="110" cy="330" r="4" fill="#374151" />
          </g>

          {/* Main Monitor Frame */}
          <rect x="180" y="130" width="240" height="160" rx="15" fill="#1e293b" className="monitor-frame" />
          <rect x="190" y="140" width="220" height="130" rx="8" fill="#0f172a" className="monitor-bezel" />
          
          {/* Screen */}
          <rect x="200" y="150" width="200" height="110" rx="6" fill="url(#screenGrad)" className="screen" />
          
          {/* Screen Content */}
          <g className="screen-content">
            {/* Code Editor Window */}
            <rect x="210" y="160" width="90" height="60" rx="4" fill="#1e3a8a" opacity="0.8" />
            <line x1="215" y1="170" x2="245" y2="170" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <line x1="215" y1="180" x2="260" y2="180" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <line x1="215" y1="190" x2="240" y2="190" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <line x1="215" y1="200" x2="255" y2="200" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            
            {/* Code Symbol */}
            <g className="code-icon">
              <circle cx="340" cy="195" r="22" fill="#3b82f6" opacity="0.2" />
              <text x="340" y="205" fontSize="28" fill="#60a5fa" filter="url(#glow)" fontWeight="bold" textAnchor="middle">&lt;/&gt;</text>
            </g>
            
            {/* Small UI Elements */}
            <rect x="210" y="230" width="25" height="20" rx="3" fill="#3b82f6" opacity="0.6" className="ui-element" />
            <rect x="245" y="230" width="25" height="20" rx="3" fill="#8b5cf6" opacity="0.6" className="ui-element" />
            <rect x="280" y="230" width="25" height="20" rx="3" fill="#06b6d4" opacity="0.6" className="ui-element" />
          </g>

          {/* Monitor Stand */}
          <rect x="270" y="290" width="60" height="8" rx="4" fill="#334155" className="stand-neck" />
          <path d="M 280 298 L 285 298 L 288 330 L 282 330 Z" fill="#1e293b" />
          <path d="M 315 298 L 320 298 L 318 330 L 312 330 Z" fill="#1e293b" />
          <ellipse cx="300" cy="330" rx="45" ry="10" fill="#0f172a" className="stand-base" />
          <ellipse cx="300" cy="328" rx="40" ry="8" fill="#1e293b" />

          {/* Floating Elements */}
          {/* Cloud Icon */}
          <g className="cloud-icon">
            <path d="M 440 170 Q 440 158 452 158 Q 464 158 464 170 Q 476 170 476 186 Q 476 198 464 198 L 440 198 Q 428 198 428 186 Q 428 170 440 170" 
                  fill="url(#cloudGrad)" opacity="0.9" />
            <path d="M 452 178 L 452 190 M 446 184 L 452 190 L 458 184" 
                  stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Success Checkmark */}
          <g className="checkmark-box">
            <circle cx="460" cy="250" r="20" fill="#10b981" opacity="0.9" />
            <path d="M 452 250 L 458 256 L 470 244" 
                  stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Database Icon */}
          <g className="database-icon">
            <ellipse cx="70" cy="100" rx="25" ry="10" fill="#8b5cf6" opacity="0.8" />
            <rect x="45" y="100" width="50" height="25" fill="#8b5cf6" opacity="0.8" />
            <ellipse cx="70" cy="110" rx="25" ry="10" fill="#6d28d9" opacity="0.9" />
            <ellipse cx="70" cy="125" rx="25" ry="10" fill="#7c3aed" opacity="0.9" />
          </g>

          {/* Lightning Bolt */}
          <g className="lightning-bolt">
            <path d="M 435 310 L 425 330 L 435 330 L 430 345 L 445 325 L 435 325 Z" 
                  fill="#fbbf24" opacity="0.9" />
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

        {/* Flying Robot */}
        <div className="flying-robot">
          <svg viewBox="0 0 100 120" className="robot-svg">
            {/* Robot Head */}
            <rect x="30" y="10" width="40" height="40" rx="8" fill="#4f46e5" />
            <circle cx="40" cy="25" r="5" fill="#fff" />
            <circle cx="60" cy="25" r="5" fill="#fff" />
            <circle cx="40" cy="25" r="2" fill="#4f46e5" className="robot-eye-pupil" />
            <circle cx="60" cy="25" r="2" fill="#4f46e5" className="robot-eye-pupil" />
            {/* Antenna */}
            <line x1="50" y1="10" x2="50" y2="3" stroke="#6b7280" strokeWidth="2" />
            <circle cx="50" cy="3" r="3" fill="#ef4444" className="robot-antenna-ball" />
            
            {/* Robot Body */}
            <rect x="25" y="52" width="50" height="50" rx="10" fill="#6366f1" />
            
            {/* Screen */}
            <rect x="35" y="62" width="30" height="20" rx="4" fill="#1f2937" />
            <rect x="38" y="66" width="24" height="2" rx="1" fill="#10b981" className="screen-line" />
            <rect x="38" y="71" width="20" height="2" rx="1" fill="#10b981" className="screen-line" />
            <rect x="38" y="76" width="18" height="2" rx="1" fill="#10b981" className="screen-line" />
            
            {/* Arms */}
            <rect x="15" y="60" width="8" height="25" rx="4" fill="#4f46e5" />
            <rect x="77" y="60" width="8" height="25" rx="4" fill="#4f46e5" />
            
            {/* Jetpack flames */}
            <path d="M 40 102 L 35 112 L 40 108 Z" fill="#ff6b35" opacity="0.8" className="flame flame-1" />
            <path d="M 50 102 L 48 112 L 52 112 Z" fill="#ffa500" opacity="0.8" className="flame flame-2" />
            <path d="M 60 102 L 65 112 L 60 108 Z" fill="#ff6b35" opacity="0.8" className="flame flame-3" />
          </svg>
        </div>
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
          animation: dynamicBounce 2s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out;
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
          animation: subtlePulse 1.5s ease-in-out infinite;
        }

        .screen {
          animation: screenGlow 1s ease-in-out infinite;
        }

        .code-icon {
          animation: codePulse 1.2s ease-in-out infinite;
        }

        .checkmark-box {
          animation: checkPulse 1s ease-in-out infinite 0.3s;
        }

        .cloud-icon {
          animation: cloudFloat 1.5s ease-in-out infinite;
        }

        .ui-element {
          animation: uiPulse 1s ease-in-out infinite;
        }

        .ui-element:nth-child(2) {
          animation-delay: 0.2s;
        }

        .ui-element:nth-child(3) {
          animation-delay: 0.4s;
        }

        .stand-base {
          animation: standPulse 1.5s ease-in-out infinite;
        }

        .mobile-phone {
          animation: mobileFloat 2s ease-in-out infinite;
        }

        .mobile-icon {
          animation: iconPulse 1.5s ease-in-out infinite;
        }

        .database-icon {
          animation: databasePulse 1.8s ease-in-out infinite;
        }

        .lightning-bolt {
          animation: lightningFlash 1s ease-in-out infinite;
        }

        /* Gear Animations */
        .gear-1 {
          animation: rotateGear 4s linear infinite;
          transform-origin: 120px 150px;
        }

        .gear-2 {
          animation: rotateGearReverse 5s linear infinite;
          transform-origin: 380px 150px;
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
        @keyframes dynamicBounce {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-15px) scale(1.02);
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

        @keyframes codePulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.9;
            transform: scale(1.03);
          }
        }

        @keyframes uiPulse {
          0%, 100% { 
            opacity: 0.6;
          }
          50% { 
            opacity: 0.9;
          }
        }

        @keyframes standPulse {
          0%, 100% { 
            opacity: 1;
          }
          50% { 
            opacity: 0.85;
          }
        }

        @keyframes checkPulse {
          0%, 100% { 
            opacity: 0.9;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
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
            transform: translate(20px, -40px) scale(1.6);
            opacity: 1;
          }
        }

        @keyframes mobileFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
          }
          50% { 
            transform: translateY(-12px) rotate(-2deg);
          }
        }

        @keyframes iconPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes databasePulse {
          0%, 100% { 
            opacity: 0.8;
            transform: translateY(0);
          }
          50% { 
            opacity: 1;
            transform: translateY(-8px);
          }
        }

        @keyframes lightningFlash {
          0%, 100% { 
            opacity: 0.9;
            filter: brightness(1);
          }
          50% { 
            opacity: 1;
            filter: brightness(1.5) drop-shadow(0 0 8px #fbbf24);
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

        /* Flying Robot Styles */
        .flying-robot {
          position: absolute;
          width: 60px;
          height: 70px;
          animation: orbitAroundComputer 8s linear infinite;
          transform-origin: center;
          z-index: 10;
          filter: drop-shadow(0 4px 12px rgba(79, 70, 229, 0.4));
        }

        .robot-svg {
          width: 100%;
          height: 100%;
          animation: robotBob 1.5s ease-in-out infinite;
        }

        .robot-eye-pupil {
          animation: eyeMove 3s ease-in-out infinite;
        }

        .robot-antenna-ball {
          animation: antennaBlink 1s ease-in-out infinite;
        }

        .screen-line {
          animation: screenFlicker 2s ease-in-out infinite;
        }

        .screen-line:nth-child(2) {
          animation-delay: 0.3s;
        }

        .screen-line:nth-child(3) {
          animation-delay: 0.6s;
        }

        .flame {
          animation: flameFlicker 0.3s ease-in-out infinite;
        }

        .flame-1 {
          animation-delay: 0s;
        }

        .flame-2 {
          animation-delay: 0.1s;
        }

        .flame-3 {
          animation-delay: 0.2s;
        }

        @keyframes orbitAroundComputer {
          0% {
            top: 10%;
            left: 50%;
            transform: translate(-50%, 0) scale(0.8);
          }
          25% {
            top: 50%;
            left: 85%;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            top: 80%;
            left: 50%;
            transform: translate(-50%, -100%) scale(0.9);
          }
          75% {
            top: 50%;
            left: 15%;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            top: 10%;
            left: 50%;
            transform: translate(-50%, 0) scale(0.8);
          }
        }

        @keyframes robotBob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes eyeMove {
          0%, 100% {
            cx: 40;
          }
          50% {
            cx: 42;
          }
        }

        @keyframes antennaBlink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.3;
          }
        }

        @keyframes screenFlicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes flameFlicker {
          0%, 100% {
            opacity: 0.8;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.5;
            transform: scaleY(0.7);
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
