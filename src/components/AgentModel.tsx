import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Agent } from '@/types/agent';
import * as THREE from 'three';

interface AgentModelProps {
  agent: Agent;
  onClick: () => void;
}

const AgentModel = ({ agent, onClick }: AgentModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Idle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = agent.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getClothingGeometry = () => {
    switch (agent.appearance.clothingType) {
      case 'formal':
        return <boxGeometry args={[0.9, 1.4, 0.5]} />;
      case 'futuristic':
        return <cylinderGeometry args={[0.5, 0.45, 1.4, 8]} />;
      case 'sporty':
        return <capsuleGeometry args={[0.4, 1, 8, 16]} />;
      default:
        return <boxGeometry args={[0.8, 1.3, 0.4]} />;
    }
  };

  return (
    <group 
      ref={groupRef}
      position={agent.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      scale={agent.appearance.scale}
    >
      {/* Body (clothing) */}
      <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
        {getClothingGeometry()}
        <meshStandardMaterial 
          color={agent.appearance.clothingColor}
          roughness={0.6}
          metalness={0.3}
          emissive={hovered ? agent.appearance.clothingColor : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Head */}
      <mesh castShadow receiveShadow position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={agent.appearance.headColor}
          roughness={0.4}
          metalness={0.1}
          emissive={hovered ? agent.appearance.headColor : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.75, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, 1.75, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Name tag - Using Html instead of Text */}
      <Html position={[0, 2.5, 0]} center>
        <div style={{
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 'bold',
          textShadow: '0 0 4px #000000, 0 0 8px #000000',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          {agent.name}
        </div>
      </Html>
      
      {/* Glow effect when hovered */}
      {hovered && (
        <pointLight
          position={[0, 1, 0]}
          intensity={2}
          distance={5}
          color={agent.appearance.clothingColor}
        />
      )}
    </group>
  );
};

export default AgentModel;
