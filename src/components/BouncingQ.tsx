
import React, { useEffect, useRef } from 'react';

const BouncingQ: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Q parameters
    let x = canvas.width / 2;
    const radius = Math.min(canvas.width, canvas.height) / 6; // Even bigger Q
    
    // Animation parameters
    let time = 0;
    const amplitude = 30; // Height of bounce
    const period = 3; // Faster bounce (lower = faster)
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.fillStyle = '#1A1F2C'; // Darker purple background that fits website theme
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate y position with smooth sine wave for bouncing
      time += 0.012; // Faster animation speed
      const y = canvas.height / 2 + Math.sin(time / period) * amplitude;
      
      // Draw shadow
      const shadowY = canvas.height / 2 + 40;
      const shadowSize = radius * (0.8 - Math.abs(Math.sin(time / period)) * 0.3);
      ctx.beginPath();
      ctx.ellipse(x, shadowY, shadowSize, shadowSize / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();
      
      // Draw Q letter
      ctx.font = `bold ${radius * 2.5}px Arial`; // Even bigger letter
      ctx.fillStyle = '#9b87f5';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add glow effect
      ctx.shadowColor = '#9b87f5';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.fillText('Q', x, y);
      ctx.shadowBlur = 0; // Reset shadow for other elements
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full bg-[#1A1F2C]"
      style={{ display: 'block' }}
    />
  );
};

export default BouncingQ;
