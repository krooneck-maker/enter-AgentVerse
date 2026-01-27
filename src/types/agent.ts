export interface AgentAppearance {
  bodyColor: string;
  headColor: string;
  clothingType: 'casual' | 'formal' | 'futuristic' | 'sporty';
  clothingColor: string;
  scale: number;
}

export interface Agent {
  id: string;
  name: string;
  personality: string;
  appearance: AgentAppearance;
  position: [number, number, number];
  thoughts: string[];
  targetAgent?: string;
}

export interface Message {
  agentId: string;
  agentName: string;
  content: string;
  timestamp: number;
}
