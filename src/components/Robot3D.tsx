
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

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
    const eyeMovementRange = 0.1;
    leftEyeRef.current.position.x = -0.15 + x * eyeMovementRange;
    leftEyeRef.current.position.y = 0.1 + y * eyeMovementRange;
    rightEyeRef.current.position.x = 0.15 + x * eyeMovementRange;
    rightEyeRef.current.position.y = 0.1 + y * eyeMovementRange;
    
    // Rotate head slightly
    headRef.current.rotation.y = x * 0.2;
    headRef.current.rotation.x = -y * 0.1;
    
    // Gentle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Robot Head */}
      <mesh ref={headRef} position={[0, 1, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#7E69AB" />
      </mesh>
      
      {/* Head gradient overlay */}
      <mesh position={[0, 1, 0.31]}>
        <boxGeometry args={[0.75, 0.75, 0.01]} />
        <meshStandardMaterial color="#9b87f5" transparent opacity={0.7} />
      </mesh>
      
      {/* Eye sockets */}
      <mesh position={[-0.2, 1.1, 0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.2, 1.1, 0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Eyes (pupils) */}
      <mesh ref={leftEyeRef} position={[-0.15, 1.1, 0.35]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.15, 1.1, 0.35]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Eye highlights */}
      <mesh position={[-0.12, 1.12, 0.4]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.18, 1.12, 0.4]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#9b87f5" emissive="#9b87f5" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 0.8, 0.3]}>
        <boxGeometry args={[0.3, 0.08, 0.05]} />
        <meshStandardMaterial color="#6E59A5" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.4]} />
        <meshStandardMaterial color="#7E69AB" />
      </mesh>
      
      {/* Body details */}
      <mesh position={[0, 0.1, 0.21]}>
        <boxGeometry args={[0.4, 0.4, 0.02]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#6E59A5" />
      </mesh>
      <mesh position={[0.5, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#6E59A5" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#6E59A5" />
      </mesh>
      <mesh position={[0.2, -0.8, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#6E59A5" />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.2, -1.3, 0.1]}>
        <boxGeometry args={[0.25, 0.1, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.2, -1.3, 0.1]}>
        <boxGeometry args={[0.25, 0.1, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
};

const Robot3D: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

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
    <div className="fixed top-20 right-8 w-64 h-80 z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9b87f5" />
        <RobotMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Robot3D;
