import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface SatelliteProps {
  radius: number;
  speed: number;
  color: string;
  phase: number;
}

const Satellite: React.FC<SatelliteProps> = ({ radius, speed, color, phase }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Vector3[]>([]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + phase;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Trail
      width={0.5}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Trail>
  );
};

const Earth: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#1a5fb4"
        emissive="#0d47a1"
        emissiveIntensity={0.3}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
};

const CollisionZone: React.FC<{ radius: number }> = ({ radius }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 0.9;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color="#ff0000"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
};

const Stars: React.FC = () => {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};

const SatelliteCollisionDetection: React.FC = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90e2" />
        
        <Stars />
        <Earth />
        
        {/* Multiple satellites with different orbits */}
        <Satellite radius={3} speed={0.5} color="#00ff88" phase={0} />
        <Satellite radius={3.5} speed={0.6} color="#ff0088" phase={Math.PI} />
        <Satellite radius={4} speed={0.4} color="#ffaa00" phase={Math.PI / 2} />
        <Satellite radius={4.5} speed={0.55} color="#00aaff" phase={Math.PI * 1.5} />
        
        {/* Collision detection zones */}
        <CollisionZone radius={3.2} />
        <CollisionZone radius={4.2} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default SatelliteCollisionDetection;
