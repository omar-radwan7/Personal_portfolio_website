import React, { useEffect, useRef } from 'react';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Particle {
  pos: Vector3;
  vel: Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Satellite {
  pos: Vector3;
  vel: Vector3;
  angle: number;
  radius: number;
  speed: number;
  id: string;
  trail: Vector3[];
  destroyed: boolean;
  color: string;
}

const SatelliteCollision: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const satellitesRef = useRef<Satellite[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const collisionTimeRef = useRef(0);
  const cameraRef = useRef({ rotation: 0, zoom: 1, shake: 0 });

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

    // Initialize satellites in opposing orbits
    satellitesRef.current = [
      {
        pos: { x: 0, y: 0, z: 0 },
        vel: { x: 0, y: 0, z: 0 },
        angle: 0,
        radius: 120,
        speed: 0.015,
        id: 'ATLAS-7A',
        trail: [],
        destroyed: false,
        color: '#60a5fa'
      },
      {
        pos: { x: 0, y: 0, z: 0 },
        vel: { x: 0, y: 0, z: 0 },
        angle: Math.PI,
        radius: 120,
        speed: 0.018,
        id: 'COSMOS-2B',
        trail: [],
        destroyed: false,
        color: '#f472b6'
      },
      {
        pos: { x: 0, y: 0, z: 0 },
        vel: { x: 0, y: 0, z: 0 },
        angle: Math.PI * 0.5,
        radius: 150,
        speed: 0.012,
        id: 'IRIDIUM-33',
        trail: [],
        destroyed: false,
        color: '#34d399'
      }
    ];

    const project = (x: number, y: number, z: number) => {
      const perspective = 600;
      const rotY = cameraRef.current.rotation;
      
      // Rotate around Y axis
      const rotatedX = x * Math.cos(rotY) - z * Math.sin(rotY);
      const rotatedZ = x * Math.sin(rotY) + z * Math.cos(rotY);
      
      const scale = perspective / (perspective + rotatedZ);
      const zoom = cameraRef.current.zoom;
      
      const shake = cameraRef.current.shake;
      const shakeX = (Math.random() - 0.5) * shake;
      const shakeY = (Math.random() - 0.5) * shake;
      
      return {
        x: centerX + rotatedX * scale * zoom + shakeX,
        y: centerY + y * scale * zoom + shakeY,
        scale: scale * zoom,
        z: rotatedZ
      };
    };

    const drawStarfield = () => {
      // Nebula background
      const nebulaGradient = ctx.createRadialGradient(
        centerX + 100, centerY - 50, 0,
        centerX, centerY, Math.max(width, height) * 0.8
      );
      nebulaGradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
      nebulaGradient.addColorStop(0.4, 'rgba(59, 130, 246, 0.05)');
      nebulaGradient.addColorStop(0.7, 'rgba(16, 185, 129, 0.03)');
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 300; i++) {
        const x = (i * 73 % width);
        const y = (i * 137 % height);
        const size = Math.random() < 0.1 ? 1.2 : 0.5;
        const twinkle = Math.sin(timeRef.current * 0.05 + i) * 0.3 + 0.7;
        
        ctx.globalAlpha = twinkle * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawEarth = () => {
      const earthSize = 60;
      const earthProj = project(0, 0, 0);
      
      // Earth shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(earthProj.x, earthProj.y + 15, earthSize * earthProj.scale * 0.8, earthSize * earthProj.scale * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Atmosphere glow (multiple layers)
      for (let i = 0; i < 3; i++) {
        const atmoRadius = earthSize * earthProj.scale * (1.3 + i * 0.15);
        const atmoGradient = ctx.createRadialGradient(
          earthProj.x, earthProj.y, earthSize * earthProj.scale,
          earthProj.x, earthProj.y, atmoRadius
        );
        atmoGradient.addColorStop(0, `rgba(100, 180, 255, ${0.3 - i * 0.1})`);
        atmoGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
        
        ctx.fillStyle = atmoGradient;
        ctx.beginPath();
        ctx.arc(earthProj.x, earthProj.y, atmoRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earth body
      const earthGradient = ctx.createRadialGradient(
        earthProj.x - earthSize * earthProj.scale * 0.3,
        earthProj.y - earthSize * earthProj.scale * 0.3,
        0,
        earthProj.x,
        earthProj.y,
        earthSize * earthProj.scale
      );
      earthGradient.addColorStop(0, '#5da8ff');
      earthGradient.addColorStop(0.3, '#3b82f6');
      earthGradient.addColorStop(0.6, '#1e40af');
      earthGradient.addColorStop(1, '#0a1929');
      
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(earthProj.x, earthProj.y, earthSize * earthProj.scale, 0, Math.PI * 2);
      ctx.fill();

      // Cloud patterns
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(earthProj.x + 20 * earthProj.scale, earthProj.y - 15 * earthProj.scale, 12 * earthProj.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(earthProj.x - 25 * earthProj.scale, earthProj.y + 20 * earthProj.scale, 15 * earthProj.scale, 0, Math.PI * 2);
      ctx.fill();

      // Terminator line (day/night)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(earthProj.x, earthProj.y, earthSize * earthProj.scale, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.stroke();
    };

    const drawOrbitPath = (radius: number, color: string, opacity: number = 0.3) => {
      const segments = 64;
      ctx.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const proj = project(x, 0, z);
        
        if (i === 0) {
          ctx.moveTo(proj.x, proj.y);
        } else {
          ctx.lineTo(proj.x, proj.y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawSatellite = (sat: Satellite) => {
      if (sat.destroyed) return;

      const proj = project(sat.pos.x, sat.pos.y, sat.pos.z);
      if (proj.z > 300) return;

      const size = 8 * proj.scale;

      // Trail effect
      if (sat.trail.length > 0) {
        const trailGradient = ctx.createLinearGradient(
          proj.x, proj.y,
          project(sat.trail[0].x, sat.trail[0].y, sat.trail[0].z).x,
          project(sat.trail[0].x, sat.trail[0].y, sat.trail[0].z).y
        );
        trailGradient.addColorStop(0, `${sat.color}88`);
        trailGradient.addColorStop(1, `${sat.color}00`);

        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 2 * proj.scale;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(proj.x, proj.y);
        
        for (let i = 0; i < Math.min(sat.trail.length, 30); i++) {
          const trailProj = project(sat.trail[i].x, sat.trail[i].y, sat.trail[i].z);
          ctx.lineTo(trailProj.x, trailProj.y);
        }
        ctx.stroke();
      }

      // Satellite glow
      const glowGradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * 3);
      glowGradient.addColorStop(0, `${sat.color}44`);
      glowGradient.addColorStop(1, `${sat.color}00`);
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Solar panels (left)
      ctx.fillStyle = `${sat.color}80`;
      ctx.fillRect(proj.x - size * 2.5, proj.y - size * 0.5, size * 1.5, size);
      
      ctx.strokeStyle = sat.color;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(proj.x - size * 2.5 + (size * 1.5 / 3) * i, proj.y - size * 0.5);
        ctx.lineTo(proj.x - size * 2.5 + (size * 1.5 / 3) * i, proj.y + size * 0.5);
        ctx.stroke();
      }

      // Solar panels (right)
      ctx.fillStyle = `${sat.color}80`;
      ctx.fillRect(proj.x + size, proj.y - size * 0.5, size * 1.5, size);
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(proj.x + size + (size * 1.5 / 3) * i, proj.y - size * 0.5);
        ctx.lineTo(proj.x + size + (size * 1.5 / 3) * i, proj.y + size * 0.5);
        ctx.stroke();
      }

      // Main body
      const bodyGradient = ctx.createLinearGradient(
        proj.x - size * 0.6, proj.y - size * 0.6,
        proj.x + size * 0.6, proj.y + size * 0.6
      );
      bodyGradient.addColorStop(0, '#64748b');
      bodyGradient.addColorStop(0.5, '#94a3b8');
      bodyGradient.addColorStop(1, '#475569');
      
      ctx.fillStyle = bodyGradient;
      ctx.fillRect(proj.x - size * 0.6, proj.y - size * 0.6, size * 1.2, size * 1.2);

      // Highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(proj.x - size * 0.4, proj.y - size * 0.5, size * 0.6, size * 0.2);

      // Antenna
      ctx.strokeStyle = sat.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(proj.x, proj.y - size * 0.6);
      ctx.lineTo(proj.x, proj.y - size * 1.4);
      ctx.stroke();
      
      ctx.fillStyle = sat.color;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y - size * 1.5, size * 0.2, 0, Math.PI * 2);
      ctx.fill();

      // ID label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = `${9 * proj.scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(sat.id, proj.x, proj.y + size * 2);
    };

    const createExplosion = (pos: Vector3, color1: string, color2: string) => {
      // Flash
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI;
        const speed = Math.random() * 4 + 1;
        
        particlesRef.current.push({
          pos: { ...pos },
          vel: {
            x: Math.cos(angle) * Math.cos(elevation) * speed,
            y: Math.sin(elevation) * speed,
            z: Math.sin(angle) * Math.cos(elevation) * speed
          },
          life: 0,
          maxLife: Math.random() * 80 + 40,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? color1 : color2
        });
      }

      // Shockwave particles
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI * 0.3;
        
        particlesRef.current.push({
          pos: { ...pos },
          vel: {
            x: Math.cos(angle) * Math.cos(elevation) * 8,
            y: Math.sin(elevation) * 2,
            z: Math.sin(angle) * Math.cos(elevation) * 8
          },
          life: 0,
          maxLife: 30,
          size: 0.5,
          color: '#ffffff'
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height));
      bgGradient.addColorStop(0, '#0a0e27');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawStarfield();

      timeRef.current++;
      cameraRef.current.rotation += 0.002;

      // Decay camera shake
      if (cameraRef.current.shake > 0) {
        cameraRef.current.shake *= 0.9;
      }

      // Draw orbit paths
      satellitesRef.current.forEach(sat => {
        if (!sat.destroyed) {
          drawOrbitPath(sat.radius, sat.color, 0.2);
        }
      });

      drawEarth();

      // Update satellites
      let collisionDetected = false;
      satellitesRef.current.forEach((sat, i) => {
        if (sat.destroyed) return;

        sat.angle += sat.speed;
        sat.pos.x = Math.cos(sat.angle) * sat.radius;
        sat.pos.z = Math.sin(sat.angle) * sat.radius;
        sat.pos.y = Math.sin(sat.angle * 2) * 5;

        // Update trail
        sat.trail.unshift({ ...sat.pos });
        if (sat.trail.length > 30) {
          sat.trail.pop();
        }

        // Check collisions
        for (let j = i + 1; j < satellitesRef.current.length; j++) {
          const other = satellitesRef.current[j];
          if (other.destroyed) continue;

          const dx = sat.pos.x - other.pos.x;
          const dy = sat.pos.y - other.pos.y;
          const dz = sat.pos.z - other.pos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 10 && collisionTimeRef.current === 0) {
            collisionDetected = true;
            collisionTimeRef.current = timeRef.current;
            sat.destroyed = true;
            other.destroyed = true;
            
            const midPos = {
              x: (sat.pos.x + other.pos.x) / 2,
              y: (sat.pos.y + other.pos.y) / 2,
              z: (sat.pos.z + other.pos.z) / 2
            };
            
            createExplosion(midPos, sat.color, other.color);
            cameraRef.current.shake = 20;
          }
        }
      });

      // Draw satellites
      satellitesRef.current.forEach(sat => drawSatellite(sat));

      // Update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.pos.x += p.vel.x;
        p.pos.y += p.vel.y;
        p.pos.z += p.vel.z;
        p.life++;

        if (p.life >= p.maxLife) return false;

        const proj = project(p.pos.x, p.pos.y, p.pos.z);
        if (proj.z > 300) return true;

        const alpha = (1 - p.life / p.maxLife) * 0.8;
        const size = p.size * proj.scale;

        ctx.fillStyle = `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Reset after collision
      if (collisionTimeRef.current > 0 && timeRef.current - collisionTimeRef.current > 180) {
        if (particlesRef.current.length === 0) {
          collisionTimeRef.current = 0;
          satellitesRef.current = satellitesRef.current.map((sat, i) => ({
            ...sat,
            angle: i === 0 ? 0 : i === 1 ? Math.PI : Math.PI * 0.5,
            destroyed: false,
            trail: []
          }));
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const status = satellitesRef.current.some(s => s.destroyed) ? 'COLLISION DETECTED' : 'TRACKING ACTIVE';
  const statusColor = satellitesRef.current.some(s => s.destroyed) ? 'text-red-400' : 'text-emerald-400';

  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${satellitesRef.current.some(s => s.destroyed) ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className={statusColor}>{status}</span>
          </div>
          <div className="text-gray-400">
            3D TRAJECTORY ANALYSIS
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
          {satellitesRef.current.map((sat) => (
            <div key={sat.id} className={`bg-black/50 p-2 rounded border ${sat.destroyed ? 'border-red-500/50' : 'border-' + sat.color + '/50'}`}>
              <div className="font-semibold mb-1" style={{ color: sat.color }}>{sat.id}</div>
              <div className="text-gray-500">
                {sat.destroyed ? 'DESTROYED' : `ALT: ${sat.radius * 3.5}km`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SatelliteCollision;
