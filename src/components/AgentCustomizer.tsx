import { Agent, AgentAppearance } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { X, User, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AgentCustomizerProps {
  agent: Agent | null;
  onUpdate: (agent: Agent) => void;
  onClose: () => void;
}

const AURA_COLORS = [
  { name: 'Purple', value: '#a855f7' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Blue', value: '#3b82f6' },
];

const SKIN_TONES = [
  { name: 'Fair', value: '#ffd0a8' },
  { name: 'Light', value: '#e8b895' },
  { name: 'Medium', value: '#c68642' },
  { name: 'Tan', value: '#8d5524' },
  { name: 'Deep', value: '#5c3317' },
  { name: 'Dark', value: '#3d2516' },
];

const HAIR_COLORS = [
  { name: 'Black', value: '#1a1a1a' },
  { name: 'Brown', value: '#3d2817' },
  { name: 'Blonde', value: '#f4e4c1' },
  { name: 'Red', value: '#b84234' },
  { name: 'White', value: '#f0f0f0' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Purple', value: '#a855f7' },
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
    <Card className="absolute top-4 right-4 w-96 max-h-[90vh] overflow-y-auto p-6 bg-card/95 backdrop-blur-xl border-border z-10 shadow-intense">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          {agent.appearance.hasBody ? (
            <User className="w-5 h-5" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          Customize Agent
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="body" disabled={!agent.appearance.hasBody}>
            Body
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
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

          <div className="flex items-center justify-between">
            <Label htmlFor="hasBody">Physical Body</Label>
            <Switch
              id="hasBody"
              checked={agent.appearance.hasBody}
              onCheckedChange={(checked) => updateAppearance({ hasBody: checked })}
            />
          </div>

          <div>
            <Label>Aura Color</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {AURA_COLORS.map((color) => (
                <button
                  key={color.value}
                  className="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: color.value,
                    borderColor: agent.appearance.auraColor === color.value ? '#ffffff' : 'transparent',
                    boxShadow: agent.appearance.auraColor === color.value ? `0 0 10px ${color.value}` : 'none',
                  }}
                  onClick={() => updateAppearance({ auraColor: color.value })}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <Label>Glow Intensity</Label>
            <Slider
              value={[agent.appearance.glowIntensity]}
              onValueChange={([value]) => updateAppearance({ glowIntensity: value })}
              min={0.5}
              max={3}
              step={0.1}
              className="mt-2"
            />
            <div className="text-xs text-muted-foreground mt-1 text-center">
              {agent.appearance.glowIntensity.toFixed(1)}x
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
        </TabsContent>

        <TabsContent value="body" className="space-y-4 mt-4">
          <div>
            <Label>Skin Tone</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.value}
                  className="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: tone.value,
                    borderColor: agent.appearance.skinTone === tone.value ? '#ffffff' : 'transparent',
                  }}
                  onClick={() => updateAppearance({ skinTone: tone.value })}
                  title={tone.name}
                />
              ))}
            </div>
          </div>

          <div>
            <Label>Hair Style</Label>
            <Select
              value={agent.appearance.hairStyle || 'none'}
              onValueChange={(value: 'none' | 'short' | 'long' | 'wavy' | 'spiky' | 'bald') => 
                updateAppearance({ hairStyle: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="bald">Bald</SelectItem>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="wavy">Wavy</SelectItem>
                <SelectItem value="spiky">Spiky</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {agent.appearance.hairStyle && agent.appearance.hairStyle !== 'none' && agent.appearance.hairStyle !== 'bald' && (
            <div>
              <Label>Hair Color</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {HAIR_COLORS.map((color) => (
                  <button
                    key={color.value}
                    className="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110"
                    style={{
                      backgroundColor: color.value,
                      borderColor: agent.appearance.hairColor === color.value ? '#ffffff' : 'transparent',
                    }}
                    onClick={() => updateAppearance({ hairColor: color.value })}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <Label>Clothing Style</Label>
            <Select
              value={agent.appearance.clothingType || 'none'}
              onValueChange={(value: 'none' | 'casual' | 'formal' | 'futuristic' | 'sporty' | 'elegant') => 
                updateAppearance({ clothingType: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Basic</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="futuristic">Futuristic</SelectItem>
                <SelectItem value="sporty">Sporty</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Clothing Color</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {AURA_COLORS.map((color) => (
                <button
                  key={color.value}
                  className="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110"
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
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AgentCustomizer;
