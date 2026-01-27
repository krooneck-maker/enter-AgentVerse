import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sphere } from '@react-three/drei';
import { Agent } from '@/types/agent';
import * as THREE from 'three';

interface AgentModelProps {
  agent: Agent;
  onClick: () => void;
}

const AgentModel = ({ agent, onClick }: AgentModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = agent.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      groupRef.current.rotation.y += 0.01;
    }
  });

  const renderPlasmaOrb = () => {
    return (
      <>
        {/* Core plasma sphere */}
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial
            color={agent.appearance.auraColor}
            emissive={agent.appearance.auraColor}
            emissiveIntensity={agent.appearance.glowIntensity}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Outer glow layer */}
        <Sphere args={[0.7, 32, 32]}>
          <meshBasicMaterial
            color={agent.appearance.auraColor}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Energy particles */}
        <Sphere args={[0.9, 16, 16]}>
          <meshBasicMaterial
            color={agent.appearance.auraColor}
            transparent
            opacity={0.1}
            wireframe
          />
        </Sphere>
        
        {/* Point light for glow effect */}
        <pointLight
          position={[0, 0, 0]}
          intensity={hovered ? 3 : 2}
          distance={5}
          color={agent.appearance.auraColor}
        />
      </>
    );
  };

  const getHairGeometry = () => {
    switch (agent.appearance.hairStyle) {
      case 'short':
        return <sphereGeometry args={[0.45, 16, 16]} />;
      case 'long':
        return <cylinderGeometry args={[0.4, 0.3, 0.8, 16]} />;
      case 'wavy':
        return <sphereGeometry args={[0.5, 16, 16]} />;
      case 'spiky':
        return <coneGeometry args={[0.5, 0.6, 8]} />;
      case 'bald':
      case 'none':
      default:
        return null;
    }
  };

  const getClothingGeometry = () => {
    switch (agent.appearance.clothingType) {
      case 'casual':
        return <boxGeometry args={[0.8, 1.3, 0.4]} />;
      case 'formal':
        return <boxGeometry args={[0.9, 1.4, 0.5]} />;
      case 'futuristic':
        return <cylinderGeometry args={[0.5, 0.45, 1.4, 8]} />;
      case 'sporty':
        return <capsuleGeometry args={[0.4, 1, 8, 16]} />;
      case 'elegant':
        return <cylinderGeometry args={[0.4, 0.6, 1.5, 8]} />;
      case 'none':
      default:
        return <boxGeometry args={[0.7, 1.2, 0.35]} />;
    }
  };

  const renderHumanoidBody = () => {
    return (
      <>
        {/* Body/Torso */}
        <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
          {getClothingGeometry()}
          <meshStandardMaterial 
            color={agent.appearance.clothingColor || agent.appearance.auraColor}
            roughness={0.6}
            metalness={0.3}
            emissive={hovered ? (agent.appearance.clothingColor || agent.appearance.auraColor) : '#000000'}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
        
        {/* Head */}
        <mesh castShadow receiveShadow position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color={agent.appearance.skinTone || '#ffd0a8'}
            roughness={0.4}
            metalness={0.1}
            emissive={hovered ? agent.appearance.auraColor : '#000000'}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
        
        {/* Hair */}
        {agent.appearance.hairStyle && agent.appearance.hairStyle !== 'none' && agent.appearance.hairStyle !== 'bald' && (
          <mesh position={[0, agent.appearance.hairStyle === 'long' ? 2.2 : 2.1, 0]}>
            {getHairGeometry()}
            <meshStandardMaterial 
              color={agent.appearance.hairColor || '#3d2817'}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        )}
        
        {/* Eyes */}
        <mesh position={[-0.15, 1.75, 0.35]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive={agent.appearance.auraColor} 
            emissiveIntensity={0.5} 
          />
        </mesh>
        <mesh position={[0.15, 1.75, 0.35]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive={agent.appearance.auraColor} 
            emissiveIntensity={0.5} 
          />
        </mesh>
        
        {/* Subtle aura glow around body */}
        {hovered && (
          <pointLight
            position={[0, 1, 0]}
            intensity={1.5}
            distance={4}
            color={agent.appearance.auraColor}
          />
        )}
      </>
    );
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
      {agent.appearance.hasBody ? renderHumanoidBody() : renderPlasmaOrb()}
      
      {/* Name tag */}
      <Html position={[0, agent.appearance.hasBody ? 2.8 : 1.5, 0]} center>
        <div style={{
          color: '#333333',
          fontSize: '14px',
          fontWeight: 'bold',
          textShadow: '0 0 4px #ffffff, 0 0 8px #ffffff',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
        }}>
          {agent.name}
        </div>
      </Html>
    </group>
  );
};

export default AgentModel;
