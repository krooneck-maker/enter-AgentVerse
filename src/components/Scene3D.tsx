import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky } from '@react-three/drei';
import { Agent } from '@/types/agent';
import AgentModel from './AgentModel';

interface Scene3DProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

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
      
      {/* Simple grid lines */}
      <group position={[0, 0.01, 0]}>
        {Array.from({ length: 51 }, (_, i) => {
          const pos = -25 + i;
          return (
            <group key={i}>
              <mesh position={[pos, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.02, 0.01, 50]} />
                <meshBasicMaterial color={i % 5 === 0 ? '#a855f7' : '#334155'} opacity={i % 5 === 0 ? 0.6 : 0.3} transparent />
              </mesh>
              <mesh position={[0, 0, pos]} rotation={[0, 0, 0]}>
                <boxGeometry args={[50, 0.01, 0.02]} />
                <meshBasicMaterial color={i % 5 === 0 ? '#a855f7' : '#334155'} opacity={i % 5 === 0 ? 0.6 : 0.3} transparent />
              </mesh>
            </group>
          );
        })}
      </group>
      
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
