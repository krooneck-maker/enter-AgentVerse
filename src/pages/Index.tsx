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
    name: 'Alex',
    personality: 'Curious and analytical. Loves to ask questions and explore new ideas.',
    appearance: {
      bodyColor: '#8b5cf6',
      headColor: '#a78bfa',
      clothingType: 'futuristic',
      clothingColor: '#8b5cf6',
      scale: 1,
    },
    position: [-3, 0, -2],
    thoughts: [],
  },
  {
    id: '2',
    name: 'Riley',
    personality: 'Creative and enthusiastic. Always comes up with wild and imaginative ideas.',
    appearance: {
      bodyColor: '#06b6d4',
      headColor: '#22d3ee',
      clothingType: 'casual',
      clothingColor: '#06b6d4',
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
        "This environment is fascinating!",
        "Should we explore something together?",
        "I have an interesting idea to share.",
        "What do you think about creativity?",
        "The possibilities here are endless!",
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
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#10b981', '#f97316', '#ef4444'];
    const clothingTypes: ('casual' | 'formal' | 'futuristic' | 'sporty')[] = ['casual', 'formal', 'futuristic', 'sporty'];
    const names = ['Nova', 'Zen', 'Echo', 'Pixel', 'Byte', 'Spark', 'Flux', 'Nexus'];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomClothing = clothingTypes[Math.floor(Math.random() * clothingTypes.length)];
    
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: randomName,
      personality: 'A unique AI agent with its own personality and thoughts.',
      appearance: {
        bodyColor: randomColor,
        headColor: randomColor,
        clothingType: randomClothing,
        clothingColor: randomColor,
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
            AI Agent Simulation
          </h1>
          <p className="text-xl text-muted-foreground">
            Create and customize AI agents in a stunning 3D environment. 
            Watch them interact, customize their appearance, and let them explore freely.
          </p>
          <Button 
            size="lg" 
            className="mt-8 text-lg px-8 py-6"
            onClick={() => setSceneActive(true)}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Enter 3D Simulation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background relative overflow-hidden">
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
        <h1 className="text-3xl font-bold text-foreground drop-shadow-lg" style={{
          textShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
        }}>
          AI Agent Simulation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click agents to customize • Add agents and watch them interact
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
        Exit Simulation
      </Button>
    </div>
  );
};

export default Index;
