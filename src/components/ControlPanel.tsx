import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/agent';
import { Play, Pause, Plus, Trash2, MessageSquare } from 'lucide-react';

interface ControlPanelProps {
  isRunning: boolean;
  onToggleSimulation: () => void;
  onAddAgent: () => void;
  onRemoveAgent: () => void;
  messages: Message[];
  agentCount: number;
}

const ControlPanel = ({
  isRunning,
  onToggleSimulation,
  onAddAgent,
  onRemoveAgent,
  messages,
  agentCount,
}: ControlPanelProps) => {
  return (
    <Card className="absolute bottom-4 left-4 w-96 bg-card/95 backdrop-blur-xl border-border shadow-intense">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          AI Simulation Control
        </h3>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <Button
            onClick={onToggleSimulation}
            className="flex-1"
            variant={isRunning ? 'destructive' : 'default'}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button onClick={onAddAgent} variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
          <Button 
            onClick={onRemoveAgent} 
            variant="outline"
            disabled={agentCount === 0}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Agents: {agentCount} • Status: {isRunning ? 'Running' : 'Paused'}
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="text-sm font-semibold text-foreground mb-2">
          Agent Conversations
        </div>
        <ScrollArea className="h-48 rounded-lg border border-border bg-background/50 p-3">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">
                No conversations yet. Start the simulation!
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="text-xs">
                  <div className="font-semibold text-primary">{msg.agentName}</div>
                  <div className="text-foreground mt-1 pl-2 border-l-2 border-primary/30">
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default ControlPanel;
