import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Lightbulb,
  Check,
  AlertTriangle,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { CategoryBadge, PricingBadge, DifficultyBadge } from '../components/common/Badge';
import { FavoriteButton } from '../components/common/FavoriteButton';
import { ToolCard } from '../components/tools/ToolCard';

export const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { recordView } = useRecentlyViewed();

  const tool = useMemo(() => {
    return TOOLS_DATA.find((t) => t.id.toLowerCase() === id?.toLowerCase());
  }, [id]);

  // Record this tool in recently viewed
  useEffect(() => {
    if (tool) {
      recordView(tool.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [tool, recordView]);

  // Related tools in same category
  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return TOOLS_DATA.filter((t) => t.id !== tool.id && t.category === tool.category).slice(0, 3);
  }, [tool]);

  // Error handling: Tool not found
  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Tool not found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          The tool you are looking for does not exist in our directory or may have been renamed.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/20"
        >
          <ArrowLeft size={18} />
          <span>Back to Explore</span>
        </Link>
      </div>
    );
  }

  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Explore Directory</span>
        </Link>
      </div>

      {/* Main Tool Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Logo & Meta */}
          <div className="flex items-start sm:items-center gap-5">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-white shadow-lg flex-shrink-0"
              style={{ backgroundColor: tool.accentColor || '#0c8fe9' }}
            >
              {initials}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                  {tool.name}
                </h1>
                {tool.trending && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                    <Sparkles size={12} /> Trending
                  </span>
                )}
              </div>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                {tool.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <CategoryBadge category={tool.category} size="md" />
                <PricingBadge pricing={tool.pricing} size="md" />
                <DifficultyBadge difficulty={tool.difficulty} size="md" />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap md:flex-col items-stretch gap-3 flex-shrink-0">
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5"
            >
              <span>Try Official Website</span>
              <ExternalLink size={16} />
            </a>

            <FavoriteButton
              isFavorite={isFavorite(tool.id)}
              onToggle={() => toggleFavorite(tool.id)}
              size="lg"
              showLabel={true}
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-10">
        {/* Section 1: What is it? */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>What is it?</span>
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {tool.description}
          </p>
        </section>

        {/* Section 2: Why should a fresher care? */}
        <section className="bg-gradient-to-br from-indigo-50/70 via-brand-50/40 to-teal-50/50 dark:from-indigo-950/40 dark:via-brand-950/30 dark:to-slate-900 border border-indigo-200/60 dark:border-indigo-800/40 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-indigo-600 dark:text-indigo-400" size={24} />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why should a fresher care?
            </h2>
          </div>
          <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {tool.fresherBenefit}
          </p>
        </section>

        {/* Section 3: What can you use it for? */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5">
            What can you use it for?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {tool.useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div className="w-6 h-6 rounded-lg bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Key Features */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5">
            Key Features
          </h2>
          <ul className="space-y-3">
            {tool.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle2
                  className="text-brand-600 dark:text-brand-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 5: Free vs Paid Access Model */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Free vs Paid Model
          </h2>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Current Access Tier:
              </span>
              <PricingBadge pricing={tool.pricing} size="sm" />
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
              {tool.freeTierDetails}
            </p>
          </div>
        </section>

        {/* Section 6 & 7: Pros & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Check className="text-emerald-500" size={22} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pros</h2>
            </div>
            <ul className="space-y-3">
              {tool.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Limitations */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-rose-500" size={22} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Limitations</h2>
            </div>
            <ul className="space-y-3">
              {tool.limitations.map((limit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Section 8: Practical Student / Fresher Example */}
        {tool.practicalExample && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-brand-600 dark:text-brand-400" size={22} />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Practical Student Example: {tool.practicalExample.title}
              </h2>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Scenario: {tool.practicalExample.scenario}
            </p>

            <div className="space-y-4">
              {/* Prompt / Input */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-sans">
                  Sample Prompt / Action:
                </span>
                "{tool.practicalExample.promptOrInput}"
              </div>

              {/* Expected Outcome */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-sm text-emerald-900 dark:text-emerald-300">
                <span className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-emerald-700 dark:text-emerald-400">
                  Expected Outcome:
                </span>
                {tool.practicalExample.expectedOutcome}
              </div>
            </div>
          </section>
        )}

        {/* Section 9 & 10: Try It + Test Yourself CTAs */}
        <section className="bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Ready to try {tool.name}?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base max-w-lg">
              Visit their official platform and test your skills with a quick interactive quiz.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 w-full md:w-auto">
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-white text-brand-900 hover:bg-brand-50 shadow-md transition-all hover:-translate-y-0.5"
            >
              <span>Try this tool →</span>
              <ExternalLink size={16} />
            </a>

            <Link
              to={tool.relevantQuizId ? `/quizzes/${tool.relevantQuizId}` : '/quizzes'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-brand-700/80 hover:bg-brand-700 text-white border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <HelpCircle size={16} />
              <span>Take a quick quiz</span>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Similar {tool.category} Tools
              </h3>
              <Link
                to={`/explore?category=${encodeURIComponent(tool.category)}`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
              >
                <span>View all {tool.category}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((relTool) => (
                <ToolCard
                  key={relTool.id}
                  tool={relTool}
                  isFavorite={isFavorite(relTool.id)}
                  onToggleFavorite={(e) => {
                    e.preventDefault();
                    toggleFavorite(relTool.id);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
