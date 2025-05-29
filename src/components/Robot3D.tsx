
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

interface RobotMeshProps {
  mousePosition: { x: number; y: number };
}

const RobotMesh: React.FC<RobotMeshProps> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !leftEyeRef.current || !rightEyeRef.current || !headRef.current) return;
    
    // Convert mouse position to 3D coordinates
    const x = (mousePosition.x / window.innerWidth) * 2 - 1;
    const y = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    // Move eyes to follow mouse
    const eyeMovementRange = 0.08;
    leftEyeRef.current.position.x = -0.15 + x * eyeMovementRange;
    leftEyeRef.current.position.y = 0.05 + y * eyeMovementRange;
    rightEyeRef.current.position.x = 0.15 + x * eyeMovementRange;
    rightEyeRef.current.position.y = 0.05 + y * eyeMovementRange;
    
    // Rotate head slightly
    headRef.current.rotation.y = x * 0.1;
    headRef.current.rotation.x = -y * 0.05;
    
    // Gentle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Face visor */}
      <mesh position={[0, 0.8, 0.35]}>
        <boxGeometry args={[0.7, 0.5, 0.1]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.15, 0.85, 0.41]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.15, 0.85, 0.41]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Top antenna */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[0, 1.32, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.4]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Chest panel */}
      <mesh position={[0, 0.1, 0.21]}>
        <boxGeometry args={[0.4, 0.5, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Central button */}
      <mesh position={[0, 0.1, 0.23]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff2222" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.45, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.45, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.45, -0.1, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.45, -0.1, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, -0.65, 0]}>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.15, -0.65, 0]}>
        <boxGeometry args={[0.12, 0.6, 0.12]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.15, -1.05, 0.05]}>
        <boxGeometry args={[0.18, 0.08, 0.25]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, -1.05, 0.05]}>
        <boxGeometry args={[0.18, 0.08, 0.25]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Robot3D: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${isMobile ? 'w-24 h-32' : 'w-64 h-80'}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#00ffff" />
        <pointLight position={[0, 3, 3]} intensity={0.6} color="#ffffff" />
        <spotLight position={[0, -5, 2]} intensity={1} color="#ff00ff" angle={0.3} />
        <RobotMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Robot3D;
