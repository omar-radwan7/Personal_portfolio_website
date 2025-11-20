import React, { useEffect, useRef } from 'react';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Debris {
  pos: Vector3;
  vel: Vector3;
  rot: Vector3;
  rotVel: Vector3;
  size: number;
  life: number;
  maxLife: number;
}

interface Satellite {
  pos: Vector3;
  vel: Vector3;
  rot: Vector3;
  destroyed: boolean;
  id: string;
  altitude: number;
  velocity: number;
}

const SatelliteCollision: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const satellitesRef = useRef<Satellite[]>([]);
  const debrisRef = useRef<Debris[]>([]);
  const timeRef = useRef(0);
  const collisionOccurred = useRef(false);
  const rotationRef = useRef({ x: 0.3, y: 0 });

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

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize satellites on collision course
    satellitesRef.current = [
      {
        pos: { x: -100, y: -20, z: 50 },
        vel: { x: 0.8, y: 0.15, z: -0.1 },
        rot: { x: 0, y: 0, z: 0 },
        destroyed: false,
        id: 'SAT-A2401',
        altitude: 420,
        velocity: 7.66
      },
      {
        pos: { x: 90, y: 15, z: -40 },
        vel: { x: -0.75, y: -0.18, z: 0.12 },
        rot: { x: 0, y: 0, z: 0 },
        destroyed: false,
        id: 'SAT-B7823',
        altitude: 418,
        velocity: 7.68
      }
    ];

    const project3D = (pos: Vector3, rotation: { x: number; y: number }): { x: number; y: number; scale: number } => {
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      let x = pos.x;
      let y = pos.y * cosX - pos.z * sinX;
      let z = pos.y * sinX + pos.z * cosX;

      const tempX = x;
      x = x * cosY + z * sinY;
      z = -tempX * sinY + z * cosY;

      const perspective = 400;
      const scale = perspective / (perspective + z);

      return {
        x: centerX + x * scale * 2.5,
        y: centerY + y * scale * 2.5,
        scale: scale
      };
    };

    const drawSatellite = (sat: Satellite, rotation: { x: number; y: number }) => {
      const proj = project3D(sat.pos, rotation);
      if (proj.scale <= 0) return;

      const size = 12 * proj.scale;

      // Shadow/depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(proj.x - size * 0.6, proj.y + size * 1.5, size * 1.2, size * 0.3);

      // Solar panels
      ctx.save();
      ctx.translate(proj.x, proj.y);
      ctx.rotate(sat.rot.z);

      // Left panel
      const panelGradient1 = ctx.createLinearGradient(-size * 2.5, -size * 0.8, -size * 2.5, size * 0.8);
      panelGradient1.addColorStop(0, '#1a3a5a');
      panelGradient1.addColorStop(0.5, '#2a5a8a');
      panelGradient1.addColorStop(1, '#1a3a5a');
      ctx.fillStyle = panelGradient1;
      ctx.fillRect(-size * 2.5, -size * 0.8, size * 1.8, size * 1.6);
      
      // Panel grid
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.3)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-size * 2.5 + (size * 1.8 / 4) * i, -size * 0.8);
        ctx.lineTo(-size * 2.5 + (size * 1.8 / 4) * i, size * 0.8);
        ctx.stroke();
      }

      // Right panel
      const panelGradient2 = ctx.createLinearGradient(size * 0.7, -size * 0.8, size * 0.7, size * 0.8);
      panelGradient2.addColorStop(0, '#1a3a5a');
      panelGradient2.addColorStop(0.5, '#2a5a8a');
      panelGradient2.addColorStop(1, '#1a3a5a');
      ctx.fillStyle = panelGradient2;
      ctx.fillRect(size * 0.7, -size * 0.8, size * 1.8, size * 1.6);
      
      // Panel grid
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(size * 0.7 + (size * 1.8 / 4) * i, -size * 0.8);
        ctx.lineTo(size * 0.7 + (size * 1.8 / 4) * i, size * 0.8);
        ctx.stroke();
      }

      // Main body - metallic
      const bodyGradient = ctx.createLinearGradient(-size * 0.6, -size * 0.6, size * 0.6, size * 0.6);
      bodyGradient.addColorStop(0, '#4a5568');
      bodyGradient.addColorStop(0.3, '#718096');
      bodyGradient.addColorStop(0.7, '#a0aec0');
      bodyGradient.addColorStop(1, '#4a5568');
      ctx.fillStyle = bodyGradient;
      ctx.fillRect(-size * 0.6, -size * 0.6, size * 1.2, size * 1.2);

      // Body details
      ctx.fillStyle = '#2d3748';
      ctx.fillRect(-size * 0.5, -size * 0.5, size, size);
      
      // Panels on body
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(-size * 0.4, -size * 0.4, size * 0.8, size * 0.3);
      ctx.fillRect(-size * 0.4, size * 0.1, size * 0.8, size * 0.3);

      // Antenna
      ctx.strokeStyle = '#cbd5e0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.6);
      ctx.lineTo(0, -size * 1.2);
      ctx.stroke();
      
      ctx.fillStyle = '#e53e3e';
      ctx.beginPath();
      ctx.arc(0, -size * 1.3, size * 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(-size * 0.3, -size * 0.5, size * 0.5, size * 0.15);

      ctx.restore();

      sat.rot.z += 0.01;
    };

    const createDebrisField = (pos: Vector3, vel: Vector3) => {
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI * 0.5;
        const speed = Math.random() * 2 + 0.5;
        
        debrisRef.current.push({
          pos: { ...pos },
          vel: {
            x: vel.x + Math.cos(angle) * Math.cos(elevation) * speed,
            y: vel.y + Math.sin(elevation) * speed,
            z: vel.z + Math.sin(angle) * Math.cos(elevation) * speed
          },
          rot: {
            x: Math.random() * Math.PI * 2,
            y: Math.random() * Math.PI * 2,
            z: Math.random() * Math.PI * 2
          },
          rotVel: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            z: (Math.random() - 0.5) * 0.2
          },
          size: Math.random() * 4 + 1,
          life: 0,
          maxLife: Math.random() * 180 + 120
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      timeRef.current++;

      // Deep space background
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height));
      bgGradient.addColorStop(0, '#000811');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Realistic stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 200; i++) {
        const x = (i * 67 % width);
        const y = (i * 97 % height);
        const size = (i % 3) === 0 ? 0.8 : 0.4;
        ctx.globalAlpha = 0.6 + (i % 4) * 0.1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Earth with realistic atmosphere
      const earthSize = 40;
      const earthGradient = ctx.createRadialGradient(
        centerX - earthSize * 0.3, 
        centerY - earthSize * 0.3, 
        0, 
        centerX, 
        centerY, 
        earthSize
      );
      earthGradient.addColorStop(0, '#4a90e2');
      earthGradient.addColorStop(0.4, '#2171c9');
      earthGradient.addColorStop(0.7, '#1557a0');
      earthGradient.addColorStop(1, '#0a2e52');
      
      // Atmosphere glow
      const atmoGradient = ctx.createRadialGradient(centerX, centerY, earthSize, centerX, centerY, earthSize * 1.4);
      atmoGradient.addColorStop(0, 'rgba(100, 180, 255, 0.4)');
      atmoGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
      ctx.fillStyle = atmoGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthSize * 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthSize, 0, Math.PI * 2);
      ctx.fill();

      // Cloud layer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(centerX + 10, centerY - 15, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX - 15, centerY + 10, 10, 0, Math.PI * 2);
      ctx.fill();

      rotationRef.current.y += 0.002;

      const satellites = satellitesRef.current;

      // Update satellites
      satellites.forEach((sat, i) => {
        if (sat.destroyed) return;

        sat.pos.x += sat.vel.x;
        sat.pos.y += sat.vel.y;
        sat.pos.z += sat.vel.z;

        // Check collision
        for (let j = i + 1; j < satellites.length; j++) {
          const other = satellites[j];
          if (other.destroyed) continue;

          const dx = sat.pos.x - other.pos.x;
          const dy = sat.pos.y - other.pos.y;
          const dz = sat.pos.z - other.pos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 15 && !collisionOccurred.current) {
            collisionOccurred.current = true;
            sat.destroyed = true;
            other.destroyed = true;
            const midPos = {
              x: (sat.pos.x + other.pos.x) / 2,
              y: (sat.pos.y + other.pos.y) / 2,
              z: (sat.pos.z + other.pos.z) / 2
            };
            const midVel = {
              x: (sat.vel.x + other.vel.x) / 2,
              y: (sat.vel.y + other.vel.y) / 2,
              z: (sat.vel.z + other.vel.z) / 2
            };
            createDebrisField(midPos, midVel);
          }
        }
      });

      // Reset simulation
      if (collisionOccurred.current && debrisRef.current.length === 0) {
        collisionOccurred.current = false;
        satellitesRef.current = [
          {
            pos: { x: -100, y: -20, z: 50 },
            vel: { x: 0.8, y: 0.15, z: -0.1 },
            rot: { x: 0, y: 0, z: 0 },
            destroyed: false,
            id: 'SAT-A2401',
            altitude: 420,
            velocity: 7.66
          },
          {
            pos: { x: 90, y: 15, z: -40 },
            vel: { x: -0.75, y: -0.18, z: 0.12 },
            rot: { x: 0, y: 0, z: 0 },
            destroyed: false,
            id: 'SAT-B7823',
            altitude: 418,
            velocity: 7.68
          }
        ];
      }

      // Draw satellites
      satellites.forEach(sat => {
        if (!sat.destroyed) {
          drawSatellite(sat, rotationRef.current);
        }
      });

      // Update and draw debris
      debrisRef.current = debrisRef.current.filter(debris => {
        debris.pos.x += debris.vel.x;
        debris.pos.y += debris.vel.y;
        debris.pos.z += debris.vel.z;
        debris.rot.x += debris.rotVel.x;
        debris.rot.y += debris.rotVel.y;
        debris.rot.z += debris.rotVel.z;
        debris.life++;

        if (debris.life >= debris.maxLife) return false;

        const proj = project3D(debris.pos, rotationRef.current);
        if (proj.scale <= 0) return true;

        const alpha = 1 - (debris.life / debris.maxLife);
        
        ctx.save();
        ctx.translate(proj.x, proj.y);
        ctx.rotate(debris.rot.z);
        
        ctx.fillStyle = `rgba(180, 180, 180, ${alpha})`;
        ctx.fillRect(-debris.size * proj.scale / 2, -debris.size * proj.scale / 2, debris.size * proj.scale, debris.size * proj.scale);
        
        ctx.restore();

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
    <div className="w-full h-full relative bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-400">COLLISION ALERT</span>
          </div>
          <span>TRACKING: 2 OBJECTS</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-3 text-[9px] font-mono">
          <div className="bg-black/40 p-2 rounded border border-blue-500/30">
            <div className="text-blue-400 mb-1">SAT-A2401</div>
            <div className="text-gray-500">ALT: 420km | VEL: 7.66km/s</div>
          </div>
          <div className="bg-black/40 p-2 rounded border border-pink-500/30">
            <div className="text-pink-400 mb-1">SAT-B7823</div>
            <div className="text-gray-500">ALT: 418km | VEL: 7.68km/s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteCollision;