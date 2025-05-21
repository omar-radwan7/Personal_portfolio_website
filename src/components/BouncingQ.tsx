
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
    const radius = Math.min(canvas.width, canvas.height) / 8; // Increased size
    
    // Animation parameters
    let time = 0;
    const amplitude = 30; // Height of bounce
    const period = 3; // Speed of bounce (higher = slower)
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.fillStyle = '#1A1F2C'; // Darker purple background that fits website theme
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate y position with smooth sine wave for bouncing
      time += 0.01;
      const y = canvas.height / 2 + Math.sin(time / period) * amplitude;
      
      // Draw shadow
      const shadowY = canvas.height / 2 + 40;
      const shadowSize = radius * (0.8 - Math.abs(Math.sin(time / period)) * 0.3);
      ctx.beginPath();
      ctx.ellipse(x, shadowY, shadowSize, shadowSize / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();
      
      // Draw Q letter
      ctx.font = `bold ${radius * 2}px Arial`; // Bigger letter
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
      
      // Add smaller dots around Q
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * (0.8 + Math.random() * 0.5);
        const dotX = x + Math.cos(angle) * distance;
        const dotY = y + Math.sin(angle) * distance;
        const dotSize = radius * 0.12; // Slightly bigger dots
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(155, 135, 245, 0.6)';
        ctx.fill();
      }
      
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
