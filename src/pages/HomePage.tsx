import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Clock,
  Briefcase,
  Code,
  Cpu,
  Palette,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useOnboarding } from '../hooks/useOnboarding';
import { getToolsForInterest } from '../utils/searchFilter';
import { HeroSection } from '../components/home/HeroSection';
import { FresherStartSection } from '../components/home/FresherStartSection';
import { OnboardingModal } from '../components/home/OnboardingModal';
import { RecentlyViewedSection } from '../components/home/RecentlyViewedSection';
import { SectionHeader } from '../components/home/SectionHeader';
import { ToolGrid } from '../components/tools/ToolGrid';

export const HomePage: React.FC = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { recentlyViewedIds, clearRecentlyViewed } = useRecentlyViewed();
  const { interests, toggleInterest, resetPreferences } = useOnboarding();

  // Trending AI Tools (4 to 6 tools)
  const trendingTools = useMemo(() => {
    return TOOLS_DATA.filter((t) => t.trending || t.featured).slice(0, 6);
  }, []);

  // Recently Added tools (sorted by dateAdded)
  const recentlyAddedTools = useMemo(() => {
    return [...TOOLS_DATA]
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 6);
  }, []);

  // Category specific slices
  const jobSeekerTools = useMemo(() => {
    return TOOLS_DATA.filter(
      (t) =>
        t.category === 'Career' ||
        t.tags.some((tag) => ['resume', 'interview', 'career', 'writing'].includes(tag))
    ).slice(0, 6);
  }, []);

  const developerTools = useMemo(() => {
    return TOOLS_DATA.filter((t) => t.category === 'Coding').slice(0, 6);
  }, []);

  const dataAndAiTools = useMemo(() => {
    return TOOLS_DATA.filter(
      (t) => t.category === 'AI/ML' || t.tags.includes('models') || t.tags.includes('dsa')
    ).slice(0, 6);
  }, []);

  const creatorTools = useMemo(() => {
    return TOOLS_DATA.filter(
      (t) =>
        t.category === 'Design' ||
        t.category === 'Video' ||
        t.category === 'Audio'
    ).slice(0, 6);
  }, []);

  // Personalized interest recommendations
  const personalizedTools = useMemo(() => {
    if (interests.length === 0) return [];
    const matched = new Set<string>();
    const list: typeof TOOLS_DATA = [];
    interests.forEach((interest) => {
      const results = getToolsForInterest(TOOLS_DATA, interest);
      results.forEach((t) => {
        if (!matched.has(t.id)) {
          matched.add(t.id);
          list.push(t);
        }
      });
    });
    return list.slice(0, 6);
  }, [interests]);

  // Recently viewed resolved tools
  const recentlyViewedTools = useMemo(() => {
    return recentlyViewedIds
      .map((id) => TOOLS_DATA.find((t) => t.id === id))
      .filter((t): t is (typeof TOOLS_DATA)[0] => Boolean(t));
  }, [recentlyViewedIds]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Curated Fresher Starter Pack */}
        <FresherStartSection tools={TOOLS_DATA} />

        {/* Personalized Interest Selector */}
        <OnboardingModal
          selectedInterests={interests}
          onToggleInterest={toggleInterest}
          onReset={resetPreferences}
        />

        {/* Dynamic Personalized Section (Only shows if user selected interests) */}
        {personalizedTools.length > 0 && (
          <section className="bg-brand-50/40 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-800/40 rounded-3xl p-6 sm:p-8">
            <SectionHeader
              title="Tailored for Your Interests"
              subtitle={`Showing tools prioritized for: ${interests.join(', ')}`}
              icon={<Sparkles className="text-brand-600 dark:text-brand-400" size={24} />}
              viewAllLink="/explore"
              viewAllText="Explore all matching"
            />
            <ToolGrid
              tools={personalizedTools}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {/* 🔥 Trending AI Tools */}
        <section>
          <SectionHeader
            title="🔥 Trending AI Tools"
            subtitle="The most talked-about AI tools taking off in the industry right now."
            icon={<Flame className="text-amber-500" size={24} />}
            viewAllLink="/explore"
            viewAllText="View all trending →"
          />
          <ToolGrid
            tools={trendingTools}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {/* 🆕 Recently Added */}
        <section>
          <SectionHeader
            title="🆕 Recently Added"
            subtitle="Fresh tools indexed in AI Launchpad to keep you up to date."
            icon={<Clock className="text-sky-500" size={24} />}
            viewAllLink="/explore"
            viewAllText="View all latest →"
          />
          <ToolGrid
            tools={recentlyAddedTools}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {/* 💼 AI Tools for Job Seekers */}
        <section>
          <SectionHeader
            title="💼 AI Tools for Job Seekers"
            subtitle="Resume enhancers, interview prep, cover letter polishers, and company research engines."
            icon={<Briefcase className="text-teal-500" size={24} />}
            viewAllLink="/explore?category=Career"
            viewAllText="View all career tools →"
          />
          <ToolGrid
            tools={jobSeekerTools}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {/* 🧑‍💻 AI Tools for Developers */}
        <section>
          <SectionHeader
            title="🧑‍💻 AI Tools for Developers"
            subtitle="Coding assistants, multi-file editors, WebContainers, and algorithmic companions."
            icon={<Code className="text-blue-500" size={24} />}
            viewAllLink="/explore?category=Coding"
            viewAllText="View all coding tools →"
          />
          <ToolGrid
            tools={developerTools}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {/* 📊 AI Tools for Data & AI */}
        <section>
          <SectionHeader
            title="📊 AI Tools for Data & AI"
            subtitle="Open-source model hubs, AI sandboxes, fine-tuning environments, and datasets."
            icon={<Cpu className="text-purple-500" size={24} />}
            viewAllLink="/explore?category=AI/ML"
            viewAllText="View all AI/ML tools →"
          />
          <ToolGrid
            tools={dataAndAiTools}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {/* 🎨 AI Tools for Creators */}
        <section>
          <SectionHeader
            title="🎨 AI Tools for Creators"
            subtitle="Generative image design, realistic voice synthesis, presentation makers, and video."
            icon={<Palette className="text-pink-500" size={24} />}
            viewAllLink="/explore?category=Design"
            viewAllText="View all creative tools →"
          />
          <ToolGrid
            tools={creatorTools}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {/* Quiz Banner CTA */}
        <section className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <HelpCircle size={44} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Test Your AI Knowledge
          </h2>
          <p className="text-brand-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Learn it. Use it. Remember it. Take 5-minute interactive quizzes on AI basics, coding, research, and career tools.
          </p>
          <Link
            to="/quizzes"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-brand-900 bg-white hover:bg-brand-50 shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Quizzes</span>
            <ArrowRight size={18} />
          </Link>
        </section>

        {/* Recently Viewed Tools */}
        <RecentlyViewedSection
          recentTools={recentlyViewedTools}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onClear={clearRecentlyViewed}
        />
      </main>
    </div>
  );
};
