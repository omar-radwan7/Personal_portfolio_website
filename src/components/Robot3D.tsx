
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
    
    // Move eyes to follow mouse with correct positioning
    const eyeMovementRange = 0.08;
    leftEyeRef.current.position.x = -0.15 + x * eyeMovementRange;
    leftEyeRef.current.position.y = 0.05 + y * eyeMovementRange;
    rightEyeRef.current.position.x = 0.15 + x * eyeMovementRange;
    rightEyeRef.current.position.y = 0.05 + y * eyeMovementRange;
    
    // Rotate head slightly
    headRef.current.rotation.y = x * 0.1;
    headRef.current.rotation.x = -y * 0.05;
    
    // Gentle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Head (Round like in the image) */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f8f8f8" metalness={0.1} roughness={0.2} />
      </mesh>
      
      {/* Face visor area */}
      <mesh position={[0, 0.8, 0.35]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Eyes - positioned like in the reference image */}
      <mesh ref={leftEyeRef} position={[-0.15, 0.85, 0.45]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#40e0d0" 
          emissive="#40e0d0" 
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.15, 0.85, 0.45]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#40e0d0" 
          emissive="#40e0d0" 
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Small antenna */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial 
          color="#40e0d0" 
          emissive="#40e0d0" 
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.8]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.2} roughness={0.3} />
      </mesh>
      
      {/* Chest panel */}
      <mesh position={[0, 0.1, 0.38]}>
        <cylinderGeometry args={[0.25, 0.25, 0.03]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.4} roughness={0.2} />
      </mesh>
      
      {/* Central button */}
      <mesh position={[0, 0.1, 0.42]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff2222" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.5]} />
        <meshStandardMaterial color="#40e0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.5, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.5]} />
        <meshStandardMaterial color="#40e0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.5, -0.1, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#40e0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.5, -0.1, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#40e0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, -0.65, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.6]} />
        <meshStandardMaterial color="#40e0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.15, -0.65, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.6]} />
        <meshStandardMaterial color="#40e0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.15, -1.05, 0.05]}>
        <boxGeometry args={[0.18, 0.08, 0.25]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, -1.05, 0.05]}>
        <boxGeometry args={[0.18, 0.08, 0.25]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.2} />
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
    <div className={`fixed ${isMobile ? 'top-16 right-2 w-32 h-40' : 'top-20 right-8 w-48 h-64'} z-10`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#40e0d0" />
        <pointLight position={[0, 3, 3]} intensity={0.4} color="#ffffff" />
        <RobotMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Robot3D;
