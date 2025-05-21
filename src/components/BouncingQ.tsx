
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
    let y = canvas.height / 2;
    let dx = 2;
    let dy = -2;
    const radius = Math.min(canvas.width, canvas.height) / 10;
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Q letter
      ctx.font = `bold ${radius * 1.5}px Arial`;
      ctx.fillStyle = '#9b87f5';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Q', x, y);
      
      // Add glow effect
      ctx.shadowColor = '#9b87f5';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Add smaller dots around Q
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * (0.8 + Math.random() * 0.5);
        const dotX = x + Math.cos(angle) * distance;
        const dotY = y + Math.sin(angle) * distance;
        const dotSize = radius * 0.1;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(155, 135, 245, 0.6)';
        ctx.fill();
      }
      
      // Boundary check and position update
      if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx;
      }
      if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy;
      }
      
      // Add slight gravity effect
      dy += 0.05;
      if (y + radius > canvas.height) {
        dy = -dy * 0.8; // Bouncing effect with damping
      }
      
      x += dx;
      y += dy;
      
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
      className="w-full h-full bg-black"
      style={{ display: 'block' }}
    />
  );
};

export default BouncingQ;
