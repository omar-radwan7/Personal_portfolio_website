import React, { useEffect, useRef } from 'react';

const ComputerMachine: React.FC = () => {
  const computerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!computerRef.current) return;
      
      const rect = computerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate tilt based on mouse position
      const relativeX = (e.clientX - centerX) / rect.width;
      const relativeY = (e.clientY - centerY) / rect.height;
      
      const tiltX = relativeY * 5;
      const tiltY = relativeX * -5;
      
      computerRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="computer-container">
      <div className="computer-machine" ref={computerRef}>
        {/* Computer Screen */}
        <div className="computer-screen">
          <img 
            src="/lovable-uploads/22613a69-c9ad-4df8-b776-728a1fb26cea.png" 
            alt="Computer System"
            className="screen-image"
          />
          <div className="screen-glow"></div>
          <div className="scan-line" ref={scanLineRef}></div>
          <div className="screen-flicker"></div>
        </div>
        
        {/* Computer Stand/Base */}
        <div className="computer-base">
          <div className="base-neck"></div>
          <div className="base-platform">
            <div className="status-light"></div>
          </div>
        </div>
      </div>
      
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
          animation: float 4s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        /* Computer Screen */
        .computer-screen {
          width: 320px;
          height: 240px;
          background: linear-gradient(145deg, #1a1a2e, #0f0f1e);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 0 40px rgba(139, 92, 246, 0.4),
            0 0 80px rgba(236, 72, 153, 0.2),
            inset 0 2px 8px rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(139, 92, 246, 0.3);
        }

        .screen-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 1;
          animation: screenPulse 3s ease-in-out infinite;
        }

        .screen-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(139, 92, 246, 0.2) 0%,
            transparent 60%
          );
          animation: glowPulse 2s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139, 92, 246, 0.8) 50%,
            transparent 100%
          );
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
          animation: scanMove 3s linear infinite;
          z-index: 3;
          pointer-events: none;
        }

        .screen-flicker {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(139, 92, 246, 0.05);
          animation: flicker 0.15s infinite;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
        }

        /* Computer Base */
        .computer-base {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }

        .base-neck {
          width: 60px;
          height: 40px;
          background: linear-gradient(145deg, #2d2d44, #1a1a2e);
          border-radius: 8px;
          position: relative;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .base-platform {
          width: 200px;
          height: 30px;
          background: linear-gradient(145deg, #374151, #1f2937);
          border-radius: 15px;
          margin-top: 5px;
          position: relative;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 2px 8px rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-light {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #ec4899, #8b5cf6);
          border-radius: 2px;
          animation: statusPulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
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
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(139, 92, 246, 0.15) 0%,
            rgba(236, 72, 153, 0.1) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: ambientPulse 3s ease-in-out infinite;
          z-index: 0;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-20px);
          }
        }

        @keyframes screenPulse {
          0%, 100% { 
            filter: brightness(1);
          }
          50% { 
            filter: brightness(1.1);
          }
        }

        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes scanMove {
          0% { 
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes flicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.1; }
        }

        @keyframes statusPulse {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
            opacity: 1;
          }
          50% { 
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
            opacity: 0.7;
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
            opacity: 0.7;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .computer-container {
            width: 280px;
            height: 400px;
          }
          
          .computer-screen {
            width: 240px;
            height: 180px;
          }

          .base-platform {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default ComputerMachine;
