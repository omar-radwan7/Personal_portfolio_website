import React, { useEffect, useRef } from 'react';

interface Satellite {
  x: number;
  y: number;
  z: number;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  orbitTilt: number;
  color: string;
  warningZone: number;
}

const SatelliteCollision: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const satellitesRef = useRef<Satellite[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
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
        x: 0, y: 0, z: 0,
        radius: 6,
        orbitRadius: 80,
        orbitSpeed: 0.01,
        orbitAngle: 0,
        orbitTilt: 0.3,
        color: '#60A5FA',
        warningZone: 30
      },
      {
        x: 0, y: 0, z: 0,
        radius: 5,
        orbitRadius: 100,
        orbitSpeed: -0.015,
        orbitAngle: Math.PI / 2,
        orbitTilt: -0.2,
        color: '#A78BFA',
        warningZone: 28
      },
      {
        x: 0, y: 0, z: 0,
        radius: 7,
        orbitRadius: 65,
        orbitSpeed: 0.018,
        orbitAngle: Math.PI,
        orbitTilt: 0.5,
        color: '#F472B6',
        warningZone: 32
      },
      {
        x: 0, y: 0, z: 0,
        radius: 5,
        orbitRadius: 90,
        orbitSpeed: -0.012,
        orbitAngle: Math.PI * 1.5,
        orbitTilt: -0.4,
        color: '#34D399',
        warningZone: 29
      }
    ];

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw space background gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(rect.width, rect.height) / 2);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 50; i++) {
        const x = (i * 47) % rect.width;
        const y = (i * 73) % rect.height;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Earth
      const earthGradient = ctx.createRadialGradient(centerX - 5, centerY - 5, 0, centerX, centerY, 20);
      earthGradient.addColorStop(0, '#4A90E2');
      earthGradient.addColorStop(0.5, '#2E5F8A');
      earthGradient.addColorStop(1, '#1A3A5C');
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Earth highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX - 5, centerY - 5, 8, 0, Math.PI * 2);
      ctx.fill();

      const satellites = satellitesRef.current;

      // Update satellite positions
      satellites.forEach(sat => {
        sat.orbitAngle += sat.orbitSpeed;
        sat.x = Math.cos(sat.orbitAngle) * sat.orbitRadius;
        sat.y = Math.sin(sat.orbitAngle) * sat.orbitRadius * Math.cos(sat.orbitTilt);
        sat.z = Math.sin(sat.orbitAngle) * sat.orbitRadius * Math.sin(sat.orbitTilt);
      });

      // Sort satellites by z-index
      const sortedSatellites = [...satellites].sort((a, b) => a.z - b.z);

      // Draw orbits and check collisions
      satellites.forEach((sat, i) => {
        // Draw orbit path
        ctx.strokeStyle = `${sat.color}33`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const x = centerX + Math.cos(angle) * sat.orbitRadius;
          const y = centerY + Math.sin(angle) * sat.orbitRadius * Math.cos(sat.orbitTilt);
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();

        // Check for near collisions
        for (let j = i + 1; j < satellites.length; j++) {
          const other = satellites[j];
          const dx = sat.x - other.x;
          const dy = sat.y - other.y;
          const dz = sat.z - other.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < sat.warningZone) {
            // Draw warning connection
            const intensity = 1 - (distance / sat.warningZone);
            ctx.strokeStyle = `rgba(239, 68, 68, ${intensity * 0.6})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX + sat.x, centerY + sat.y);
            ctx.lineTo(centerX + other.x, centerY + other.y);
            ctx.stroke();

            // Draw warning zone
            ctx.strokeStyle = `rgba(239, 68, 68, ${intensity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(centerX + sat.x, centerY + sat.y, sat.warningZone, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      });

      // Draw satellites
      sortedSatellites.forEach(sat => {
        const screenX = centerX + sat.x;
        const screenY = centerY + sat.y;
        const scale = 1 + sat.z / 200;

        // Satellite glow
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, sat.radius * scale * 3);
        glowGradient.addColorStop(0, `${sat.color}88`);
        glowGradient.addColorStop(1, `${sat.color}00`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, sat.radius * scale * 3, 0, Math.PI * 2);
        ctx.fill();

        // Satellite body
        const satGradient = ctx.createRadialGradient(screenX - 1, screenY - 1, 0, screenX, screenY, sat.radius * scale);
        satGradient.addColorStop(0, sat.color);
        satGradient.addColorStop(1, '#1E293B');
        ctx.fillStyle = satGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, sat.radius * scale, 0, Math.PI * 2);
        ctx.fill();

        // Satellite panels
        ctx.fillStyle = `${sat.color}AA`;
        ctx.fillRect(screenX - sat.radius * scale * 2, screenY - 1 * scale, sat.radius * scale * 1.5, 2 * scale);
        ctx.fillRect(screenX + sat.radius * scale * 0.5, screenY - 1 * scale, sat.radius * scale * 1.5, 2 * scale);

        // Satellite highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(screenX - 1, screenY - 1, sat.radius * scale * 0.4, 0, Math.PI * 2);
        ctx.fill();
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
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="absolute top-2 left-2 text-xs text-white/60 font-mono bg-black/40 px-2 py-1 rounded">
        COLLISION DETECTION ACTIVE
      </div>
    </div>
  );
};

export default SatelliteCollision;