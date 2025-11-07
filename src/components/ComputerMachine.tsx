import React, { useEffect, useRef } from 'react';

const ComputerMachine: React.FC = () => {
  const computerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!computerRef.current) return;
      
      const rect = computerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate tilt based on mouse position
      const relativeX = (e.clientX - centerX) / rect.width;
      const relativeY = (e.clientY - centerY) / rect.height;
      
      const tiltX = relativeY * 3;
      const tiltY = relativeX * -3;
      
      computerRef.current.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="computer-container">
      <div className="computer-machine" ref={computerRef}>
        {/* Main Computer Illustration */}
        <div className="computer-illustration">
          <img 
            src="/lovable-uploads/computer-illustration.png" 
            alt="Computer Development System"
            className="main-image"
          />
          
          {/* Animated Gears Overlay */}
          <div className="gear gear-1"></div>
          <div className="gear gear-2"></div>
          <div className="gear gear-3"></div>
          <div className="gear gear-4"></div>
          
          {/* Glow Effects */}
          <div className="screen-glow"></div>
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
          animation: slowBounce 4s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        /* Computer Illustration */
        .computer-illustration {
          width: 400px;
          height: 380px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 20px 50px rgba(139, 92, 246, 0.3));
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 2;
        }

        /* Animated Gears */
        .gear {
          position: absolute;
          background: radial-gradient(circle, #d1d5db 30%, transparent 30%);
          border-radius: 50%;
          z-index: 3;
          opacity: 0.9;
        }

        .gear::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          background: 
            conic-gradient(
              from 0deg,
              transparent 0deg 40deg,
              #9ca3af 40deg 50deg,
              transparent 50deg 90deg,
              #9ca3af 90deg 100deg,
              transparent 100deg 140deg,
              #9ca3af 140deg 150deg,
              transparent 150deg 190deg,
              #9ca3af 190deg 200deg,
              transparent 200deg 240deg,
              #9ca3af 240deg 250deg,
              transparent 250deg 290deg,
              #9ca3af 290deg 300deg,
              transparent 300deg 340deg,
              #9ca3af 340deg 350deg,
              transparent 350deg 360deg
            );
          border-radius: 50%;
        }

        .gear-1 {
          width: 50px;
          height: 50px;
          top: 8%;
          right: 10%;
          animation: rotateGear 8s linear infinite;
        }

        .gear-2 {
          width: 35px;
          height: 35px;
          bottom: 35%;
          left: 8%;
          animation: rotateGearReverse 6s linear infinite;
        }

        .gear-3 {
          width: 42px;
          height: 42px;
          top: 12%;
          left: 18%;
          animation: rotateGear 10s linear infinite;
        }

        .gear-4 {
          width: 38px;
          height: 38px;
          bottom: 30%;
          right: 15%;
          animation: rotateGearReverse 7s linear infinite;
        }

        .screen-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 280px;
          height: 200px;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 92, 246, 0.25) 0%,
            rgba(59, 130, 246, 0.15) 40%,
            transparent 70%
          );
          animation: glowPulse 3s ease-in-out infinite;
          z-index: 1;
          pointer-events: none;
          border-radius: 20px;
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
        @keyframes slowBounce {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-15px);
          }
        }

        @keyframes rotateGear {
          0% { 
            transform: rotate(0deg);
          }
          100% { 
            transform: rotate(360deg);
          }
        }

        @keyframes rotateGearReverse {
          0% { 
            transform: rotate(360deg);
          }
          100% { 
            transform: rotate(0deg);
          }
        }

        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.08);
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
          
          .computer-illustration {
            width: 280px;
            height: 260px;
          }

          .gear-1 {
            width: 35px;
            height: 35px;
          }

          .gear-2, .gear-3, .gear-4 {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default ComputerMachine;
