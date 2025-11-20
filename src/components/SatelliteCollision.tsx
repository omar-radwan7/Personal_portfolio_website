import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Satellite {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  destroyed: boolean;
  color: string;
  trail: { x: number; y: number; z: number; alpha: number }[];
}

const SatelliteCollision: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const satellitesRef = useRef<Satellite[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const collisionTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();

    const centerX = canvas.width / (2 * window.devicePixelRatio);
    const centerY = canvas.height / (2 * window.devicePixelRatio);

    // Initialize satellites
    satellitesRef.current = [
      {
        x: -80, y: -40, z: 0,
        vx: 1.2, vy: 0.3, vz: 0.1,
        radius: 8,
        destroyed: false,
        color: '#60A5FA',
        trail: []
      },
      {
        x: 70, y: 30, z: 10,
        vx: -1.1, vy: -0.35, vz: -0.08,
        radius: 7,
        destroyed: false,
        color: '#F472B6',
        trail: []
      }
    ];

    const createExplosion = (x: number, y: number, z: number, color: string) => {
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        const elevation = (Math.random() - 0.5) * Math.PI;
        
        particlesRef.current.push({
          x, y, z,
          vx: Math.cos(angle) * Math.cos(elevation) * speed,
          vy: Math.sin(angle) * Math.cos(elevation) * speed,
          vz: Math.sin(elevation) * speed,
          life: 1,
          maxLife: Math.random() * 60 + 40,
          size: Math.random() * 3 + 1,
          color
        });
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      timeRef.current++;

      // Animated background
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(rect.width, rect.height) / 2);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bgGradient.addColorStop(0.5, 'rgba(7, 12, 25, 0.98)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Animated stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 100; i++) {
        const x = (i * 47 + timeRef.current * 0.1) % rect.width;
        const y = (i * 73) % rect.height;
        const twinkle = Math.sin(timeRef.current * 0.05 + i) * 0.5 + 0.5;
        ctx.globalAlpha = twinkle * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw Earth with atmosphere
      const earthGradient = ctx.createRadialGradient(centerX - 8, centerY - 8, 0, centerX, centerY, 30);
      earthGradient.addColorStop(0, '#5BA3E8');
      earthGradient.addColorStop(0.4, '#3A7BC8');
      earthGradient.addColorStop(0.7, '#2A5F9E');
      earthGradient.addColorStop(1, '#1A3F6E');
      
      // Atmosphere glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#4A90E2';
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 45);
      glowGradient.addColorStop(0, 'rgba(74, 144, 226, 0.3)');
      glowGradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
      ctx.fill();

      const satellites = satellitesRef.current;
      let collision = false;

      // Update satellites
      satellites.forEach((sat, i) => {
        if (sat.destroyed) return;

        sat.x += sat.vx;
        sat.y += sat.vy;
        sat.z += sat.vz;

        // Add trail
        sat.trail.unshift({ x: sat.x, y: sat.y, z: sat.z, alpha: 1 });
        if (sat.trail.length > 30) sat.trail.pop();
        sat.trail.forEach((t, idx) => {
          t.alpha = 1 - (idx / sat.trail.length);
        });

        // Check collision
        for (let j = i + 1; j < satellites.length; j++) {
          const other = satellites[j];
          if (other.destroyed) continue;

          const dx = sat.x - other.x;
          const dy = sat.y - other.y;
          const dz = sat.z - other.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < sat.radius + other.radius && collisionTimeRef.current === 0) {
            collision = true;
            collisionTimeRef.current = timeRef.current;
            sat.destroyed = true;
            other.destroyed = true;
            createExplosion((sat.x + other.x) / 2, (sat.y + other.y) / 2, (sat.z + other.z) / 2, sat.color);
            createExplosion((sat.x + other.x) / 2, (sat.y + other.y) / 2, (sat.z + other.z) / 2, other.color);
          }
        }

        // Bounce off boundaries
        if (Math.abs(sat.x) > 120) sat.vx *= -1;
        if (Math.abs(sat.y) > 100) sat.vy *= -1;
      });

      // Reset after collision
      if (collisionTimeRef.current > 0 && timeRef.current - collisionTimeRef.current > 120) {
        collisionTimeRef.current = 0;
        particlesRef.current = [];
        satellitesRef.current = [
          {
            x: -80, y: -40, z: 0,
            vx: 1.2, vy: 0.3, vz: 0.1,
            radius: 8,
            destroyed: false,
            color: '#60A5FA',
            trail: []
          },
          {
            x: 70, y: 30, z: 10,
            vx: -1.1, vy: -0.35, vz: -0.08,
            radius: 7,
            destroyed: false,
            color: '#F472B6',
            trail: []
          }
        ];
      }

      // Draw trajectories and satellites
      satellites.forEach(sat => {
        if (sat.destroyed) return;

        const screenX = centerX + sat.x;
        const screenY = centerY + sat.y;
        const scale = 1 + sat.z / 150;

        // Draw trail
        ctx.lineWidth = 2;
        for (let i = 0; i < sat.trail.length - 1; i++) {
          const t1 = sat.trail[i];
          const t2 = sat.trail[i + 1];
          const scale1 = 1 + t1.z / 150;
          const scale2 = 1 + t2.z / 150;
          
          ctx.strokeStyle = `${sat.color}${Math.floor(t1.alpha * 100).toString(16).padStart(2, '0')}`;
          ctx.beginPath();
          ctx.moveTo(centerX + t1.x, centerY + t1.y);
          ctx.lineTo(centerX + t2.x, centerY + t2.y);
          ctx.stroke();
        }

        // Satellite outer glow
        const outerGlow = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, sat.radius * scale * 4);
        outerGlow.addColorStop(0, `${sat.color}66`);
        outerGlow.addColorStop(1, `${sat.color}00`);
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(screenX, screenY, sat.radius * scale * 4, 0, Math.PI * 2);
        ctx.fill();

        // Satellite body
        ctx.shadowBlur = 15;
        ctx.shadowColor = sat.color;
        const satGradient = ctx.createRadialGradient(screenX - 2, screenY - 2, 0, screenX, screenY, sat.radius * scale);
        satGradient.addColorStop(0, sat.color);
        satGradient.addColorStop(0.6, sat.color);
        satGradient.addColorStop(1, '#1E293B');
        ctx.fillStyle = satGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, sat.radius * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Solar panels
        ctx.fillStyle = `${sat.color}DD`;
        const panelWidth = sat.radius * scale * 2;
        const panelHeight = sat.radius * scale * 0.5;
        ctx.fillRect(screenX - sat.radius * scale - panelWidth, screenY - panelHeight / 2, panelWidth, panelHeight);
        ctx.fillRect(screenX + sat.radius * scale, screenY - panelHeight / 2, panelWidth, panelHeight);

        // Panel details
        ctx.strokeStyle = `${sat.color}66`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          const x1 = screenX - sat.radius * scale - panelWidth + (panelWidth / 3) * i;
          const x2 = screenX + sat.radius * scale + (panelWidth / 3) * i;
          ctx.moveTo(x1, screenY - panelHeight / 2);
          ctx.lineTo(x1, screenY + panelHeight / 2);
          ctx.moveTo(x2, screenY - panelHeight / 2);
          ctx.lineTo(x2, screenY + panelHeight / 2);
          ctx.stroke();
        }

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(screenX - 2, screenY - 2, sat.radius * scale * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.life++;

        const lifeRatio = 1 - (p.life / p.maxLife);
        if (lifeRatio <= 0) return false;

        const screenX = centerX + p.x;
        const screenY = centerY + p.y;
        const scale = 1 + p.z / 150;

        ctx.fillStyle = `${p.color}${Math.floor(lifeRatio * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="absolute top-2 left-2 text-xs text-green-400 font-mono bg-black/60 px-3 py-1.5 rounded border border-green-400/30">
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
        COLLISION TRACKING SYSTEM ACTIVE
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-cyan-400 font-mono bg-black/60 px-3 py-1.5 rounded border border-cyan-400/30">
        3D TRAJECTORY ANALYSIS
      </div>
    </div>
  );
};

export default SatelliteCollision;