import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { Tool } from '../../types/tool';
import { CategoryBadge, PricingBadge, DifficultyBadge } from '../common/Badge';
import { FavoriteButton } from '../common/FavoriteButton';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
}) => {
  // First letter or monogram for logo badge
  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <div className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-brand-500/30 dark:hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1">
      {/* Top row: Icon/Logo, Name, Favorite Button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-md flex-shrink-0"
              style={{
                backgroundColor: tool.accentColor || '#0c8fe9',
              }}
            >
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {tool.name}
                </h3>
                {tool.trending && (
                  <span
                    className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
                    title="Trending Tool"
                  >
                    <Sparkles size={11} /> Trending
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {tool.category}
              </p>
            </div>
          </div>

          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
            size="sm"
          />
        </div>

        {/* Short description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {tool.tagline}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          <CategoryBadge category={tool.category} size="sm" />
          <PricingBadge pricing={tool.pricing} size="sm" />
          <DifficultyBadge difficulty={tool.difficulty} size="sm" />
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <Link
          to={`/tools/${tool.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
        >
          View Details
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit official ${tool.name} website`}
          className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-2"
        >
          <span>Try Site</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};
