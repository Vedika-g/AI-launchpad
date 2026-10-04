import React from 'react';
import { History, X } from 'lucide-react';
import { Tool } from '../../types/tool';
import { ToolCard } from '../tools/ToolCard';

interface RecentlyViewedSectionProps {
  recentTools: Tool[];
  isFavorite: (toolId: string) => boolean;
  onToggleFavorite: (toolId: string) => void;
  onClear: () => void;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  recentTools,
  isFavorite,
  onToggleFavorite,
  onClear,
}) => {
  if (recentTools.length === 0) return null;

  return (
    <section className="my-14 pt-8 border-t border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <History className="text-brand-600 dark:text-brand-400" size={22} />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Recently Viewed
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {recentTools.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {recentTools.slice(0, 4).map((tool) => (
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
    </section>
  );
};
