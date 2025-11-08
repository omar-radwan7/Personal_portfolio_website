
import React, { useEffect, useRef, useState } from 'react';

const RobotHead: React.FC = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
      
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth, optimized updates
      rafRef.current = requestAnimationFrame(() => {
        if (!robotRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
        
        const rect = robotRef.current.getBoundingClientRect();
        const robotCenterX = rect.left + rect.width / 2;
        const robotCenterY = rect.top + rect.height / 2;
        
        // Calculate relative mouse position
        const relativeX = (e.clientX - robotCenterX) / rect.width;
        const relativeY = (e.clientY - robotCenterY) / rect.height;
        
        // Limit eye movement range
        const maxMovement = 3;
        const eyeX = Math.max(-maxMovement, Math.min(maxMovement, relativeX * maxMovement));
        const eyeY = Math.max(-maxMovement, Math.min(maxMovement, relativeY * maxMovement));
        
        // Apply eye movement with GPU acceleration (translate3d)
        const transform = `translate3d(${eyeX}px, ${eyeY}px, 0)`;
        leftEyeRef.current.style.transform = transform;
        rightEyeRef.current.style.transform = transform;
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="robot-container">
      <div className="robot" ref={robotRef}>
        {/* Robot Head */}
        <div className="robot-head">
          <div className="robot-eyes">
            <div className="eye left-eye">
              <div ref={leftEyeRef} className="eye-pupil"></div>
            </div>
            <div className="eye right-eye">
              <div ref={rightEyeRef} className="eye-pupil"></div>
            </div>
          </div>
          <div className="robot-antenna">
            <div className="antenna-ball"></div>
          </div>
        </div>
        
        {/* Robot Body */}
        <div className="robot-body">
          <div className="body-screen">
            <div className="screen-line"></div>
            <div className="screen-line"></div>
            <div className="screen-line"></div>
          </div>
        </div>
        
        {/* Robot Arms */}
        <div className="robot-arm left-arm">
          <div className="arm-segment upper-arm"></div>
          <div className="arm-segment lower-arm"></div>
          <div className="robot-hand"></div>
        </div>
        
        <div className="robot-arm right-arm">
          <div className="arm-segment upper-arm"></div>
          <div className="arm-segment lower-arm"></div>
          <div className="robot-hand"></div>
        </div>
        
        {/* Robot Base */}
        <div className="robot-base">
          <div className="base-ring"></div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Glow effect */}
      <div className="robot-glow"></div>

      <style>{`
        .robot-container {
          position: relative;
          width: 400px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .robot {
          position: relative;
          animation: float 3s ease-in-out infinite;
          transform-style: preserve-3d;
          scale: 1.3;
          will-change: transform;
        }

        /* Robot Head */
        .robot-head {
          width: 80px;
          height: 80px;
          background: linear-gradient(145deg, #4f46e5, #3730a3);
          border-radius: 15px;
          position: relative;
          margin: 0 auto;
          box-shadow: 
            0 8px 32px rgba(79, 70, 229, 0.3),
            inset 0 2px 8px rgba(255, 255, 255, 0.1);
          animation: headBob 2s ease-in-out infinite;
        }

        .robot-eyes {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100%;
          padding: 0 15px;
        }

        .eye {
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          position: relative;
          animation: blink 3s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .eye-pupil {
          width: 6px;
          height: 6px;
          background: #4f46e5;
          border-radius: 50%;
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .robot-antenna {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 15px;
          background: #6b7280;
        }

        .antenna-ball {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: antennaBlink 1.5s infinite;
        }

        /* Robot Body */
        .robot-body {
          width: 100px;
          height: 120px;
          background: linear-gradient(145deg, #6366f1, #4338ca);
          border-radius: 20px;
          margin: 10px auto;
          position: relative;
          box-shadow: 
            0 12px 40px rgba(99, 102, 241, 0.3),
            inset 0 2px 8px rgba(255, 255, 255, 0.1);
        }

        .body-screen {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 40px;
          background: #1f2937;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 8px;
        }

        .screen-line {
          height: 2px;
          background: #10b981;
          border-radius: 1px;
          animation: screenFlicker 2s ease-in-out infinite;
        }

        .screen-line:nth-child(2) {
          animation-delay: 0.3s;
          width: 80%;
        }

        .screen-line:nth-child(3) {
          animation-delay: 0.6s;
          width: 60%;
        }

        /* Robot Arms */
        .robot-arm {
          position: absolute;
          top: 100px;
        }

        .left-arm {
          left: -40px;
          animation: leftArmWave 3s ease-in-out infinite;
        }

        .right-arm {
          right: -40px;
          animation: rightArmWave 3s ease-in-out infinite 1.5s;
        }

        .upper-arm {
          width: 25px;
          height: 40px;
          background: linear-gradient(145deg, #6366f1, #4338ca);
          border-radius: 12px;
          margin-bottom: 5px;
        }

        .lower-arm {
          width: 20px;
          height: 35px;
          background: linear-gradient(145deg, #4f46e5, #3730a3);
          border-radius: 10px;
          margin-bottom: 5px;
        }

        .robot-hand {
          width: 15px;
          height: 15px;
          background: #6b7280;
          border-radius: 50%;
        }

        /* Robot Base */
        .robot-base {
          width: 120px;
          height: 40px;
          background: linear-gradient(145deg, #374151, #1f2937);
          border-radius: 20px;
          margin: 10px auto 0;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .base-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 8px;
          background: linear-gradient(90deg, #ec4899, #8b5cf6);
          border-radius: 4px;
          animation: baseGlow 2s ease-in-out infinite;
        }

        /* Particles */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ec4899;
          border-radius: 50%;
          animation: particleFloat 4s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          top: 40%;
          right: 10%;
          animation-delay: 1s;
        }

        .particle:nth-child(3) {
          top: 60%;
          left: 20%;
          animation-delay: 2s;
        }

        .particle:nth-child(4) {
          top: 80%;
          right: 20%;
          animation-delay: 3s;
        }

        /* Glow Effect */
        .robot-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(5deg); }
        }

        @keyframes headBob {
          0%, 100% { transform: rotateX(0deg); }
          50% { transform: rotateX(10deg); }
        }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        @keyframes antennaBlink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }

        @keyframes screenFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes leftArmWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }

        @keyframes rightArmWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }

        @keyframes baseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-30px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes glowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .robot-container {
            width: 250px;
            height: 350px;
          }
          
          .robot {
            scale: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default RobotHead;
