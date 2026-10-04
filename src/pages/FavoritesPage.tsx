import React, { useMemo } from 'react';
import { Heart, Compass, Trash2 } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { useFavorites } from '../hooks/useFavorites';
import { ToolGrid } from '../components/tools/ToolGrid';
import { EmptyState } from '../components/common/EmptyState';

export const FavoritesPage: React.FC = () => {
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();

  const favoriteTools = useMemo(() => {
    return favorites
      .map((id) => TOOLS_DATA.find((t) => t.id === id))
      .filter((t): t is (typeof TOOLS_DATA)[0] => Boolean(t));
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-3">
            <Heart size={14} className="fill-rose-500" />
            <span>Saved Bookmarks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            My Favorites
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Your personal toolkit of bookmarked AI tools saved in your browser storage.
          </p>
        </div>

        {favoriteTools.length > 0 && (
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            {favoriteTools.length} {favoriteTools.length === 1 ? 'saved tool' : 'saved tools'}
          </span>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteTools.length > 0 ? (
        <ToolGrid
          tools={favoriteTools}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <EmptyState
          icon={Heart}
          title="You haven't saved any AI tools yet."
          description="Browse our curated directory of 25+ AI tools and tap the heart icon to bookmark the tools you want to master."
          actionText="Explore AI Tools"
          actionHref="/explore"
        />
      )}
    </div>
  );
};
