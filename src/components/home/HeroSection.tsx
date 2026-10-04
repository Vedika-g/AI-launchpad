import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, HelpCircle, Sparkles, CheckCircle2, TrendingUp, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/80">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-400/10 via-indigo-500/10 to-teal-400/10 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Audience Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 dark:bg-brand-950/70 text-brand-800 dark:text-brand-300 text-xs sm:text-sm font-semibold mb-6 border border-brand-200 dark:border-brand-800/60 shadow-sm animate-pulse">
          <Sparkles size={14} className="text-brand-600 dark:text-brand-400" />
          <span>Curated for Students, Freshers & Job Seekers</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Discover AI.{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
            Learn Faster.
          </span>{' '}
          Stay Ahead.
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Explore the AI tools shaping today's careers, understand what they do,
          and learn which ones are worth your time.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass size={20} />
            <span>Explore AI Tools</span>
          </Link>

          <Link
            to="/quizzes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <HelpCircle size={20} />
            <span>Take a Quiz</span>
          </Link>
        </div>

        {/* Core Value Progression: DISCOVER -> UNDERSTAND -> TRY -> QUIZ -> SAVE */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            The AI Launchpad Experience
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              1. Discover
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              2. Understand
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              3. Try
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              4. Quiz
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              5. Save
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
