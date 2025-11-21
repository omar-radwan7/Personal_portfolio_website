import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SatelliteData {
  id: string;
  angle: number;
  radius: number;
  speed: number;
  color: string;
  altitude: number;
  destroyed: boolean;
}

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012;
    }
  });

  // Create Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Ocean
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Continents
    ctx.fillStyle = '#10b981';
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(280, 140, 40, 50, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Europe/Asia
    ctx.beginPath();
    ctx.ellipse(320, 100, 80, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(130, 110, 30, 60, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(115, 175, 35, 50, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(400, 180, 25, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Cloud texture
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 20 + 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhongMaterial 
          map={earthTexture}
          shininess={15}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 32, 32]} />
        <meshPhongMaterial 
          map={cloudTexture}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const Satellite = ({ 
  data, 
  onCollision 
}: { 
  data: SatelliteData; 
  onCollision: (id: string, pos: THREE.Vector3) => void;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const trailPoints = useRef<THREE.Vector3[]>([]);

  useFrame(() => {
    if (meshRef.current && !data.destroyed) {
      data.angle += data.speed;
      
      const x = Math.cos(data.angle) * data.radius;
      const y = Math.sin(data.angle * 1.3) * 0.3;
      const z = Math.sin(data.angle) * data.radius;
      
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.02;
      
      // Update trail
      trailPoints.current.unshift(new THREE.Vector3(x, y, z));
      if (trailPoints.current.length > 30) {
        trailPoints.current.pop();
      }

      onCollision(data.id, new THREE.Vector3(x, y, z));
    }
  });

  if (data.destroyed) return null;

  return (
    <group ref={meshRef}>
      {/* Trail line */}
      {trailPoints.current.length > 1 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={trailPoints.current.length}
              array={new Float32Array(trailPoints.current.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={data.color} transparent opacity={0.4} />
        </line>
      )}

      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Solar panels */}
      <mesh position={[-0.25, 0, 0]}>
        <boxGeometry args={[0.2, 0.25, 0.02]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0.25, 0, 0]}>
        <boxGeometry args={[0.2, 0.25, 0.02]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      <mesh position={[0, 0.23, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight color={data.color} intensity={0.3} distance={1} />
    </group>
  );
};

const Particles = ({ 
  position, 
  colors 
}: { 
  position: THREE.Vector3; 
  colors: string[];
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const velocities = useRef<THREE.Vector3[]>([]);
  const life = useRef(0);

  useEffect(() => {
    // Initialize particles
    const vels: THREE.Vector3[] = [];
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = Math.random() * 0.08 + 0.02;
      
      vels.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      ));
    }
    velocities.current = vels;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < velocities.current.length; i++) {
        positions[i * 3] += velocities.current[i].x;
        positions[i * 3 + 1] += velocities.current[i].y;
        positions[i * 3 + 2] += velocities.current[i].z;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      life.current += 1;
      if (pointsRef.current.material instanceof THREE.PointsMaterial) {
        pointsRef.current.material.opacity = Math.max(0, 1 - life.current / 100);
      }
    }
  });

  const particleGeometry = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    
    const color1 = new THREE.Color(colors[0]);
    const color2 = new THREE.Color(colors[1] || colors[0]);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      const color = Math.random() > 0.5 ? color1 : color2;
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    return geometry;
  }, [position, colors]);

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
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

const CameraController = () => {
  const { camera } = useThree();
  
  useFrame(() => {
    const time = Date.now() * 0.0001;
    camera.position.x = Math.cos(time) * 8;
    camera.position.z = Math.sin(time) * 8;
    camera.position.y = 3 + Math.sin(time * 0.5) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
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
      destroyed: false
    },
    {
      id: 'COSMOS-2B',
      angle: Math.PI,
      radius: 3.5,
      speed: 0.012,
      color: '#f472b6',
      altitude: 418,
      destroyed: false
    },
    {
      id: 'IRIDIUM-33',
      angle: Math.PI * 0.5,
      radius: 4,
      speed: 0.008,
      color: '#34d399',
      altitude: 445,
      destroyed: false
    }
  ]);

  const [explosion, setExplosion] = useState<{
    position: THREE.Vector3;
    colors: string[];
  } | null>(null);

  const positions = useRef<Map<string, THREE.Vector3>>(new Map());

  const handleCollision = (id: string, pos: THREE.Vector3) => {
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
            setSatellites(prev => prev.map(s => 
              s.id === id1 || s.id === id2 ? { ...s, destroyed: true } : s
            ));
            
            const midPoint = new THREE.Vector3()
              .addVectors(pos1, pos2)
              .multiplyScalar(0.5);
            
            setExplosion({
              position: midPoint,
              colors: [sat1.color, sat2.color]
            });

            setTimeout(() => {
              setExplosion(null);
              setSatellites(prev => prev.map((s, idx) => ({
                ...s,
                destroyed: false,
                angle: idx === 0 ? 0 : idx === 1 ? Math.PI : Math.PI * 0.5
              })));
            }, 3000);
          }
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      <Earth />
      
      {satellites.map(sat => (
        <Satellite
          key={sat.id}
          data={sat}
          onCollision={handleCollision}
        />
      ))}

      {explosion && (
        <Particles
          position={explosion.position}
          colors={explosion.colors}
        />
      )}

      <CameraController />
    </>
  );
};

const SatelliteCollision: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      <Canvas
        camera={{ position: [8, 3, 8], fov: 60 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>

      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-4 backdrop-blur-sm pointer-events-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400">3D TRACKING ACTIVE</span>
          </div>
          <div className="text-gray-400">ORBITAL SIMULATION</div>
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
