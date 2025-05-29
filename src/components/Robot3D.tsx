
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
    const eyeMovementRange = 0.15;
    leftEyeRef.current.position.x = -0.25 + x * eyeMovementRange;
    leftEyeRef.current.position.y = 0.1 + y * eyeMovementRange;
    rightEyeRef.current.position.x = 0.25 + x * eyeMovementRange;
    rightEyeRef.current.position.y = 0.1 + y * eyeMovementRange;
    
    // Rotate head slightly
    headRef.current.rotation.y = x * 0.1;
    headRef.current.rotation.x = -y * 0.05;
    
    // Gentle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Head (Round Helmet) */}
      <mesh ref={headRef} position={[0, 1, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.1} roughness={0.3} />
      </mesh>
      
      {/* Head Inner Ring */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.2} />
      </mesh>
      
      {/* Dark Visor/Face Area */}
      <mesh position={[0, 1, 0.1]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Eyes (Glowing Cyan) */}
      <mesh ref={leftEyeRef} position={[-0.25, 1.1, 0.5]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.25, 1.1, 0.5]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Eye Glow Effect */}
      <mesh position={[-0.25, 1.1, 0.52]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh position={[0.25, 1.1, 0.52]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.6}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Cute Smile */}
      <mesh position={[0, 0.75, 0.6]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Body (Main Torso) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1.2]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Body Panel */}
      <mesh position={[0, 0.1, 0.65]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Red Button on Chest */}
      <mesh position={[0, 0.1, 0.7]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#ff3333" 
          emissive="#ff0000" 
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.8, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.8]} />
        <meshStandardMaterial color="#00aaaa" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.8, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.8]} />
        <meshStandardMaterial color="#00aaaa" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.8, -0.2, 0]}>
        <sphereGeometry args={[0.18]} />
        <meshStandardMaterial color="#00aaaa" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.8, -0.2, 0]}>
        <sphereGeometry args={[0.18]} />
        <meshStandardMaterial color="#00aaaa" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.25, -1, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 1]} />
        <meshStandardMaterial color="#00aaaa" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, -1, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 1]} />
        <meshStandardMaterial color="#00aaaa" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.25, -1.7, 0.1]}>
        <boxGeometry args={[0.3, 0.15, 0.5]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, -1.7, 0.1]}>
        <boxGeometry args={[0.3, 0.15, 0.5]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Floating Shadow */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.2}
        />
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
    <div className="fixed top-20 right-8 w-72 h-96 z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
        <RobotMesh mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default Robot3D;
