import { Agent, AgentAppearance } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface AgentCustomizerProps {
  agent: Agent | null;
  onUpdate: (agent: Agent) => void;
  onClose: () => void;
}

const COLORS = [
  { name: 'Purple', value: '#a855f7' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Blue', value: '#3b82f6' },
];

const AgentCustomizer = ({ agent, onUpdate, onClose }: AgentCustomizerProps) => {
  if (!agent) return null;

  const updateAppearance = (updates: Partial<AgentAppearance>) => {
    onUpdate({
      ...agent,
      appearance: { ...agent.appearance, ...updates },
    });
  };

  return (
    <Card className="absolute top-4 right-4 w-80 p-6 bg-card/95 backdrop-blur-xl border-border z-10 shadow-intense">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-foreground">Customize Agent</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={agent.name}
            onChange={(e) => onUpdate({ ...agent, name: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="personality">Personality</Label>
          <Textarea
            id="personality"
            value={agent.personality}
            onChange={(e) => onUpdate({ ...agent, personality: e.target.value })}
            className="mt-1 min-h-[80px]"
            placeholder="Describe the agent's personality..."
          />
        </div>

        <div>
          <Label>Clothing Type</Label>
          <Select
            value={agent.appearance.clothingType}
            onValueChange={(value: 'casual' | 'formal' | 'futuristic' | 'sporty') => 
              updateAppearance({ clothingType: value })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="futuristic">Futuristic</SelectItem>
              <SelectItem value="sporty">Sporty</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Clothing Color</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                className="w-12 h-12 rounded-lg border-2 transition-all hover:scale-110"
                style={{
                  backgroundColor: color.value,
                  borderColor: agent.appearance.clothingColor === color.value ? '#ffffff' : 'transparent',
                }}
                onClick={() => updateAppearance({ clothingColor: color.value })}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Head Color</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {COLORS.map((color) => (
              <button
                key={color.value}
                className="w-12 h-12 rounded-lg border-2 transition-all hover:scale-110"
                style={{
                  backgroundColor: color.value,
                  borderColor: agent.appearance.headColor === color.value ? '#ffffff' : 'transparent',
                }}
                onClick={() => updateAppearance({ headColor: color.value })}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Scale</Label>
          <Slider
            value={[agent.appearance.scale]}
            onValueChange={([value]) => updateAppearance({ scale: value })}
            min={0.5}
            max={2}
            step={0.1}
            className="mt-2"
          />
          <div className="text-xs text-muted-foreground mt-1 text-center">
            {agent.appearance.scale.toFixed(1)}x
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AgentCustomizer;
