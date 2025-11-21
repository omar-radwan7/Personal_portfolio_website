import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface SatelliteData {
  id: string;
  angle: number;
  radius: number;
  speed: number;
  color: string;
  altitude: number;
  destroyed: boolean;
  trail: THREE.Vector3[];
}

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  // Create Earth texture procedurally
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Ocean base
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add continents (simplified)
    ctx.fillStyle = '#10b981';
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(520, 280, 80, 100, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Europe/Asia
    ctx.beginPath();
    ctx.ellipse(600, 200, 150, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(250, 220, 60, 120, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(220, 350, 70, 100, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(780, 360, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Add white clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Earth */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshPhongMaterial 
          map={earthTexture}
          shininess={25}
          specular={new THREE.Color(0x333333)}
        />
      </Sphere>

      {/* Atmosphere */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const Satellite = ({ 
  data, 
  onPositionUpdate 
}: { 
  data: SatelliteData; 
  onPositionUpdate: (id: string, pos: THREE.Vector3) => void;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Line>(null!);

  useFrame(() => {
    if (meshRef.current && !data.destroyed) {
      data.angle += data.speed;
      
      const x = Math.cos(data.angle) * data.radius;
      const y = Math.sin(data.angle * 1.3) * 0.3;
      const z = Math.sin(data.angle) * data.radius;
      
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.02;
      
      onPositionUpdate(data.id, new THREE.Vector3(x, y, z));
    }
  });

  // Create trail line object
  const trailLine = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.LineBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.4
    });
    
    return new THREE.Line(geometry, material);
  }, [data.color]);

  // Update trail
  useFrame(() => {
    if (trailRef.current && meshRef.current && !data.destroyed) {
      const positions = trailRef.current.geometry.attributes.position.array as Float32Array;
      
      // Shift trail positions
      for (let i = positions.length - 3; i >= 3; i -= 3) {
        positions[i] = positions[i - 3];
        positions[i + 1] = positions[i - 2];
        positions[i + 2] = positions[i - 1];
      }
      
      // Add new position
      positions[0] = meshRef.current.position.x;
      positions[1] = meshRef.current.position.y;
      positions[2] = meshRef.current.position.z;
      
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (data.destroyed) return null;

  return (
    <group ref={meshRef}>
      {/* Trail */}
      <primitive ref={trailRef} object={trailLine} />

      {/* Satellite body */}
      <mesh>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Solar panels - left */}
      <mesh position={[-0.25, 0, 0]}>
        <boxGeometry args={[0.2, 0.3, 0.02]} />
        <meshStandardMaterial
          color={data.color}
          metalness={0.6}
          roughness={0.3}
          emissive={data.color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Solar panels - right */}
      <mesh position={[0.25, 0, 0]}>
        <boxGeometry args={[0.2, 0.3, 0.02]} />
        <meshStandardMaterial
          color={data.color}
          metalness={0.6}
          roughness={0.3}
          emissive={data.color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Antenna tip */}
      <mesh position={[0, 0.23, 0]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight color={data.color} intensity={0.5} distance={1} />
    </group>
  );
};

const Particles = ({ 
  position, 
  color1, 
  color2 
}: { 
  position: THREE.Vector3; 
  color1: string; 
  color2: string;
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>();

  const [particleGeometry, particleCount] = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    
    const color1Obj = new THREE.Color(color1);
    const color2Obj = new THREE.Color(color2);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      const color = Math.random() > 0.5 ? color1Obj : color2Obj;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = Math.random() * 0.05 + 0.02;

      vels[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vels[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vels[i * 3 + 2] = Math.cos(phi) * speed;
    }

    velocities.current = vels;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return [geometry, count];
  }, [position, color1, color2]);

  useFrame(() => {
    if (particlesRef.current && velocities.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities.current[i * 3];
        positions[i * 3 + 1] += velocities.current[i * 3 + 1];
        positions[i * 3 + 2] += velocities.current[i * 3 + 2];
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Scene = () => {
  const [satellites, setSatellites] = useState<SatelliteData[]>([
    {
      id: 'ATLAS-7A',
      angle: 0,
      radius: 3.5,
      speed: 0.01,
      color: '#60a5fa',
      altitude: 420,
      destroyed: false,
      trail: []
    },
    {
      id: 'COSMOS-2B',
      angle: Math.PI,
      radius: 3.5,
      speed: 0.012,
      color: '#f472b6',
      altitude: 418,
      destroyed: false,
      trail: []
    },
    {
      id: 'IRIDIUM-33',
      angle: Math.PI * 0.5,
      radius: 4,
      speed: 0.008,
      color: '#34d399',
      altitude: 445,
      destroyed: false,
      trail: []
    }
  ]);

  const [explosion, setExplosion] = useState<{
    position: THREE.Vector3;
    color1: string;
    color2: string;
  } | null>(null);

  const positions = useRef<Map<string, THREE.Vector3>>(new Map());

  const handlePositionUpdate = (id: string, pos: THREE.Vector3) => {
    positions.current.set(id, pos.clone());
  };

  // Check collisions
  useFrame(() => {
    const posArray = Array.from(positions.current.entries());
    
    for (let i = 0; i < posArray.length; i++) {
      for (let j = i + 1; j < posArray.length; j++) {
        const [id1, pos1] = posArray[i];
        const [id2, pos2] = posArray[j];
        
        const distance = pos1.distanceTo(pos2);
        
        if (distance < 0.5) {
          const sat1 = satellites.find(s => s.id === id1);
          const sat2 = satellites.find(s => s.id === id2);
          
          if (sat1 && sat2 && !sat1.destroyed && !sat2.destroyed) {
            // Collision!
            setSatellites(prev => prev.map(s => 
              s.id === id1 || s.id === id2 ? { ...s, destroyed: true } : s
            ));
            
            const midPoint = new THREE.Vector3()
              .addVectors(pos1, pos2)
              .multiplyScalar(0.5);
            
            setExplosion({
              position: midPoint,
              color1: sat1.color,
              color2: sat2.color
            });

            // Reset after delay
            setTimeout(() => {
              setExplosion(null);
              setSatellites(prev => prev.map((s, idx) => ({
                ...s,
                destroyed: false,
                angle: idx === 0 ? 0 : idx === 1 ? Math.PI : Math.PI * 0.5,
                trail: []
              })));
            }, 3000);
          }
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Earth />
      
      {satellites.map(sat => (
        <Satellite
          key={sat.id}
          data={sat}
          onPositionUpdate={handlePositionUpdate}
        />
      ))}

      {explosion && (
        <Particles
          position={explosion.position}
          color1={explosion.color1}
          color2={explosion.color2}
        />
      )}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const SatelliteCollision: React.FC = () => {
  const [status, setStatus] = useState<'TRACKING' | 'COLLISION'>('TRACKING');

  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      <Canvas
        camera={{ position: [8, 3, 8], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-4 backdrop-blur-sm pointer-events-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${status === 'COLLISION' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className={status === 'COLLISION' ? 'text-red-400' : 'text-emerald-400'}>
              {status === 'COLLISION' ? 'COLLISION DETECTED' : 'TRACKING ACTIVE'}
            </span>
          </div>
          <div className="text-gray-400">
            3D ORBITAL SIMULATION
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 backdrop-blur-sm pointer-events-none">
        <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
          <div className="bg-black/50 p-2 rounded border border-blue-500/50">
            <div className="text-blue-400 font-semibold mb-1">ATLAS-7A</div>
            <div className="text-gray-500">ALT: 420km</div>
          </div>
          <div className="bg-black/50 p-2 rounded border border-pink-500/50">
            <div className="text-pink-400 font-semibold mb-1">COSMOS-2B</div>
            <div className="text-gray-500">ALT: 418km</div>
          </div>
          <div className="bg-black/50 p-2 rounded border border-emerald-500/50">
            <div className="text-emerald-400 font-semibold mb-1">IRIDIUM-33</div>
            <div className="text-gray-500">ALT: 445km</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteCollision;
