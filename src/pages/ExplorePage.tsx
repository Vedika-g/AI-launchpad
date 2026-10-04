import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { Category, PricingType, DifficultyLevel } from '../types/tool';
import { filterTools } from '../utils/searchFilter';
import { useFavorites } from '../hooks/useFavorites';
import { SearchBar } from '../components/tools/SearchBar';
import { FilterPanel } from '../components/tools/FilterPanel';
import { ToolGrid } from '../components/tools/ToolGrid';
import { EmptyState } from '../components/common/EmptyState';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Read initial values from URL query parameters
  const queryParam = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') as Category) || 'All';
  const pricingParam = (searchParams.get('pricing') as PricingType) || 'All';
  const difficultyParam = (searchParams.get('difficulty') as DifficultyLevel) || 'All';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(categoryParam);
  const [selectedPricing, setSelectedPricing] = useState<PricingType | 'All'>(pricingParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>(difficultyParam);
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'name' | 'featured'>('trending');

  // Keep state synced with URL changes (e.g. if user navigates via navbar search or category link)
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const price = searchParams.get('pricing');
    const diff = searchParams.get('difficulty');

    if (q !== null && q !== searchQuery) setSearchQuery(q);
    if (cat !== null && cat !== selectedCategory) setSelectedCategory(cat as Category);
    if (price !== null && price !== selectedPricing) setSelectedPricing(price as PricingType);
    if (diff !== null && diff !== selectedDifficulty) setSelectedDifficulty(diff as DifficultyLevel);
  }, [searchParams]);

  // Sync state back to URL params
  const updateParams = (
    newQuery: string,
    newCat: Category | 'All',
    newPrice: PricingType | 'All',
    newDiff: DifficultyLevel | 'All'
  ) => {
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set('q', newQuery.trim());
    if (newCat !== 'All') params.set('category', newCat);
    if (newPrice !== 'All') params.set('pricing', newPrice);
    if (newDiff !== 'All') params.set('difficulty', newDiff);
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateParams(val, selectedCategory, selectedPricing, selectedDifficulty);
  };

  const handleCategoryChange = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    updateParams(searchQuery, cat, selectedPricing, selectedDifficulty);
  };

  const handlePricingChange = (price: PricingType | 'All') => {
    setSelectedPricing(price);
    updateParams(searchQuery, selectedCategory, price, selectedDifficulty);
  };

  const handleDifficultyChange = (diff: DifficultyLevel | 'All') => {
    setSelectedDifficulty(diff);
    updateParams(searchQuery, selectedCategory, selectedPricing, diff);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPricing('All');
    setSelectedDifficulty('All');
    setSortBy('trending');
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== 'All' ||
    selectedPricing !== 'All' ||
    selectedDifficulty !== 'All';

  // Filtered tools
  const filteredTools = useMemo(() => {
    return filterTools(TOOLS_DATA, {
      searchQuery,
      category: selectedCategory,
      pricing: selectedPricing,
      difficulty: selectedDifficulty,
      sortBy,
    });
  }, [searchQuery, selectedCategory, selectedPricing, selectedDifficulty, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <Compass size={14} />
          <span>Curated AI Tools Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore AI Tools
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-2 max-w-2xl">
          Search and filter verified AI tools for coding, resumes, design, productivity, and academic research.
        </p>
      </div>

      {/* Live Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by tool name, tags (e.g. resume, coding, python), use cases, or benefits..."
        />
      </div>

      {/* Filter and Sorting Panel */}
      <FilterPanel
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedPricing={selectedPricing}
        onPricingChange={handlePricingChange}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={handleDifficultyChange}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        totalResults={filteredTools.length}
      />

      {/* Results or Empty State */}
      {filteredTools.length > 0 ? (
        <ToolGrid
          tools={filteredTools}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <EmptyState
          title="No results found"
          description={`We couldn't find any tools matching your criteria${
            searchQuery ? ` for "${searchQuery}"` : ''
          }. Try adjusting your keywords or clearing your active filters.`}
          actionText="Clear All Filters"
          onAction={handleClearFilters}
        />
      )}
    </div>
  );
};
