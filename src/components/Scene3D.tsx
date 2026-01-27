import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Sky } from '@react-three/drei';
import { Agent } from '@/types/agent';
import AgentModel from './AgentModel';
import * as THREE from 'three';
import { useMemo } from 'react';

interface Scene3DProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

// Custom grid component that works properly with R3F
const CustomGrid = () => {
  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const size = 50;
    const divisions = 50;
    const step = size / divisions;
    const halfSize = size / 2;

    for (let i = 0; i <= divisions; i++) {
      const position = -halfSize + i * step;
      const color = i % 5 === 0 ? '#a855f7' : '#334155';
      const opacity = i % 5 === 0 ? 0.6 : 0.3;

      // Vertical lines
      lines.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([position, 0.01, -halfSize, position, 0.01, halfSize])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={opacity} transparent />
        </line>
      );

      // Horizontal lines
      lines.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-halfSize, 0.01, position, halfSize, 0.01, position])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={opacity} transparent />
        </line>
      );
    }

    return lines;
  }, []);

  return <group>{gridLines}</group>;
};

const Scene3D = ({ agents, onAgentClick }: Scene3DProps) => {
  return (
    <Canvas
      shadows
      camera={{ position: [10, 8, 10], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
    >
      {/* Lighting setup - Unreal Engine style */}
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={new THREE.Vector2(2048, 2048)}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.8} color="#a855f7" />
      <pointLight position={[10, 5, 10]} intensity={0.6} color="#06b6d4" />
      
      {/* Environment for reflections */}
      <Environment preset="sunset" />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Custom Grid overlay */}
      <CustomGrid />
      
      {/* Contact shadows for realism */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={50}
        blur={2}
        far={10}
      />
      
      {/* Render all agents */}
      {agents.map((agent) => (
        <AgentModel 
          key={agent.id} 
          agent={agent} 
          onClick={() => onAgentClick(agent)}
        />
      ))}
      
      {/* Camera controls */}
      <OrbitControls 
        makeDefault
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
};

export default Scene3D;
