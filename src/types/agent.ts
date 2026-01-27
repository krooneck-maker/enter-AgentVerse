export interface AgentAppearance {
  // Core appearance
  auraColor: string;
  glowIntensity: number;
  
  // Body customization (optional)
  hasBody: boolean;
  skinTone?: string;
  hairStyle?: 'none' | 'short' | 'long' | 'wavy' | 'spiky' | 'bald';
  hairColor?: string;
  clothingType?: 'none' | 'casual' | 'formal' | 'futuristic' | 'sporty' | 'elegant';
  clothingColor?: string;
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
