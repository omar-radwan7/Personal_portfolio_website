
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const BouncingQ: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // High-DPI aware resize (crisp, smooth rendering)
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const cssWidth = parent.clientWidth;
      const cssHeight = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
      canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
      canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
      // Draw using CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation parameters
    let phase = 0; // radians
    const period = 2.4; // seconds per full bounce
    let last = performance.now();

    const getDims = () => ({
      w: canvas.clientWidth || canvas.width,
      h: canvas.clientHeight || canvas.height,
    });

    const draw = (now: number) => {
      const { w, h } = getDims();

      // Clear fully to keep canvas transparent and let parent background show
      ctx.clearRect(0, 0, w, h);

      // Update phase with real delta time for ultra-smooth motion
      const dt = Math.min(0.05, (now - last) / 1000); // clamp to avoid jumps
      last = now;
      phase += (2 * Math.PI * dt) / period;

      const centerX = w / 2;
      const centerY = h / 2;
      const baseRadius = Math.min(w, h) / (isMobile ? 8 : 6);
      const amplitude = Math.min(40, h * 0.08);
      const s = Math.sin(phase);
      const y = centerY + s * amplitude;
      const scale = 1 + 0.03 * Math.sin(phase + Math.PI / 4);

      // Shadow (soft, responsive)
      const shadowY = centerY + amplitude + 40;
      const squash = 0.8 - Math.abs(s) * 0.35;
      const shadowRx = baseRadius * (0.9 * squash);
      const shadowRy = shadowRx / 3.2;
      const grad = ctx.createRadialGradient(centerX, shadowY, 1, centerX, shadowY, shadowRx);
      grad.addColorStop(0, 'rgba(0,0,0,0.28)');
      grad.addColorStop(1, 'rgba(0,0,0,0.0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(centerX, shadowY, shadowRx, shadowRy, 0, 0, Math.PI * 2);
      ctx.fill();

      // Letter Q with subtle scale pulse and glow
      const fontSize = (isMobile ? baseRadius * 3 : baseRadius * 2.5) * scale;
      ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#9b87f5';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = '#9b87f5';

      ctx.save();
      ctx.translate(centerX, y);
      ctx.scale(scale, scale);
      ctx.fillText('Q', 0, 0);
      ctx.restore();

      ctx.shadowBlur = 0;
    };

    let raf = 0;
    const animate = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(animate);
    };

    if (prefersReduced) {
      // Static render centered if user prefers reduced motion
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);
  
  return (
    <div className="w-full h-full overflow-hidden rounded-t-2xl">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full bg-transparent"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default BouncingQ;
