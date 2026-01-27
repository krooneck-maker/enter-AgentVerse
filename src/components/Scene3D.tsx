import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Agent } from '@/types/agent';
import AgentModel from './AgentModel';

interface Scene3DProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

const Scene3D = ({ agents, onAgentClick }: Scene3DProps) => {
  return (
    <Canvas
      camera={{ position: [0, 5, 15], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}
    >
      {/* Soft ambient lighting for white space */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#a855f7" />
      
      {/* Minimal grid (optional, very subtle) */}
      <gridHelper args={[30, 30, '#e0e0e0', '#f0f0f0']} position={[0, -2, 0]} />
      
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
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default Scene3D;
