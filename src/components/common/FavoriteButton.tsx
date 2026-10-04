import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  size = 'md',
  showLabel = false,
}) => {
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const buttonPadding = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'px-4 py-2.5',
  };

  return (
    <button
      onClick={onToggle}
      type="button"
      title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 active:scale-95 ${buttonPadding[size]} ${
        isFavorite
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50'
          : 'bg-slate-100 text-slate-500 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition-colors duration-200 ${
          isFavorite ? 'fill-rose-500 text-rose-500' : 'stroke-current'
        }`}
      />
      {showLabel && (
        <span className="text-sm font-semibold">
          {isFavorite ? 'Saved in Favorites' : 'Save Tool'}
        </span>
      )}
    </button>
  );
};
