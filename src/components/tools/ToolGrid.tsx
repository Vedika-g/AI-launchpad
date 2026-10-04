import React from 'react';
import { Tool } from '../../types/tool';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  isFavorite: (toolId: string) => boolean;
  onToggleFavorite: (toolId: string) => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isFavorite={isFavorite(tool.id)}
          onToggleFavorite={(e) => {
            e.preventDefault();
            onToggleFavorite(tool.id);
          }}
        />
      ))}
    </div>
  );
};
