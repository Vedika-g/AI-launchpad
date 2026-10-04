import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Category, PricingType, DifficultyLevel } from '../../types/tool';

interface FilterPanelProps {
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  selectedPricing: PricingType | 'All';
  onPricingChange: (pricing: PricingType | 'All') => void;
  selectedDifficulty: DifficultyLevel | 'All';
  onDifficultyChange: (difficulty: DifficultyLevel | 'All') => void;
  sortBy: 'trending' | 'newest' | 'name' | 'featured';
  onSortByChange: (sort: 'trending' | 'newest' | 'name' | 'featured') => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalResults: number;
}

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Productivity',
  'Coding',
  'AI/ML',
  'Research',
  'Writing',
  'Design',
  'Video',
  'Audio',
  'Education',
  'Career',
];

const PRICING_OPTIONS: (PricingType | 'All')[] = [
  'All',
  'Free',
  'Freemium',
  'Free tier available',
  'Paid',
];

const DIFFICULTY_OPTIONS: (DifficultyLevel | 'All')[] = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedPricing,
  onPricingChange,
  selectedDifficulty,
  onDifficultyChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  hasActiveFilters,
  totalResults,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-8 space-y-5">
      {/* Top Header Row with Active Counts and Clear Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-brand-600 dark:text-brand-400" />
          <h2 className="font-bold text-slate-900 dark:text-white text-base">
            Filter AI Tools
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
            {totalResults} {totalResults === 1 ? 'tool' : 'tools'} found
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                onSortByChange(
                  e.target.value as 'trending' | 'newest' | 'name' | 'featured'
                )
              }
              aria-label="Sort AI Tools"
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-none rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer"
            >
              <option value="trending">🔥 Trending First</option>
              <option value="newest">🆕 Recently Added</option>
              <option value="name">🔤 Alphabetical (A-Z)</option>
              <option value="featured">⭐ Featured</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <RotateCcw size={12} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Scrollable on small screens) */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing & Difficulty Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Pricing */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Pricing Model
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRICING_OPTIONS.map((price) => {
              const isActive = selectedPricing === price;
              return (
                <button
                  key={price}
                  type="button"
                  onClick={() => onPricingChange(price)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {price}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Difficulty Level
          </label>
          <div className="flex flex-wrap gap-1.5">
            {DIFFICULTY_OPTIONS.map((diff) => {
              const isActive = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => onDifficultyChange(diff)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
