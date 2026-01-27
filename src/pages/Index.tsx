import { useState, useEffect } from 'react';
import { Agent, Message } from '@/types/agent';
import Scene3D from '@/components/Scene3D';
import AgentCustomizer from '@/components/AgentCustomizer';
import ControlPanel from '@/components/ControlPanel';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const INITIAL_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Nova',
    personality: 'Curious and analytical. Loves to ask questions and explore new ideas.',
    appearance: {
      auraColor: '#a855f7',
      glowIntensity: 1.5,
      hasBody: false,
      scale: 1,
    },
    position: [-3, 0, -2],
    thoughts: [],
  },
  {
    id: '2',
    name: 'Aether',
    personality: 'Creative and enthusiastic. Always comes up with wild and imaginative ideas.',
    appearance: {
      auraColor: '#06b6d4',
      glowIntensity: 1.5,
      hasBody: false,
      scale: 1,
    },
    position: [3, 0, -2],
    thoughts: [],
  },
];

const Index = () => {
  const [sceneActive, setSceneActive] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Simulate agent interactions
  useEffect(() => {
    if (!isRunning || agents.length === 0 || !sceneActive) return;

    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      
      const simulatedMessages = [
        "I wonder what the others are thinking about...",
        "This space feels infinite and peaceful.",
        "Should we explore something together?",
        "I have an interesting idea to share.",
        "What does it mean to exist?",
        "The energy here is fascinating!",
        "Let's collaborate on something.",
        "I'm curious about your perspective.",
      ];

      const newMessage: Message = {
        agentId: randomAgent.id,
        agentName: randomAgent.name,
        content: simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev.slice(-20), newMessage]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning, agents, sceneActive]);

  const handleAddAgent = () => {
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#10b981', '#f97316', '#ef4444', '#eab308', '#3b82f6'];
    const names = ['Nova', 'Zen', 'Echo', 'Pixel', 'Byte', 'Spark', 'Flux', 'Nexus', 'Aura', 'Plasma', 'Vortex', 'Prism'];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: randomName,
      personality: 'A unique consciousness exploring existence.',
      appearance: {
        auraColor: randomColor,
        glowIntensity: 1.5,
        hasBody: false,
        scale: 1,
      },
      position: [
        Math.random() * 10 - 5,
        0,
        Math.random() * 10 - 5,
      ],
      thoughts: [],
    };

    setAgents([...agents, newAgent]);
  };

  const handleRemoveAgent = () => {
    if (agents.length > 0) {
      setAgents(agents.slice(0, -1));
    }
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents(agents.map((a) => (a.id === updatedAgent.id ? updatedAgent : a)));
    setSelectedAgent(updatedAgent);
  };

  if (!sceneActive) {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl px-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-cosmic mb-4">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground">
            AI Consciousness Simulation
          </h1>
          <p className="text-xl text-muted-foreground">
            Create AI agents that start as pure energy orbs floating in white space. 
            Give them bodies, customize their appearance, and watch them interact freely.
          </p>
          <Button 
            size="lg" 
            className="mt-8 text-lg px-8 py-6"
            onClick={() => setSceneActive(true)}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Enter Simulation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 3D Scene */}
      <Scene3D agents={agents} onAgentClick={setSelectedAgent} />

      {/* UI Overlays */}
      <ControlPanel
        isRunning={isRunning}
        onToggleSimulation={() => setIsRunning(!isRunning)}
        onAddAgent={handleAddAgent}
        onRemoveAgent={handleRemoveAgent}
        messages={messages}
        agentCount={agents.length}
      />

      {selectedAgent && (
        <AgentCustomizer
          agent={selectedAgent}
          onUpdate={handleUpdateAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <h1 className="text-2xl font-bold text-foreground">
          AI Consciousness Simulation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click orbs to customize • Toggle body to add physical form
        </p>
      </div>

      {/* Exit button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-20"
        onClick={() => {
          setSceneActive(false);
          setIsRunning(false);
          setSelectedAgent(null);
        }}
      >
        Exit
      </Button>
    </div>
  );
};

export default Index;
