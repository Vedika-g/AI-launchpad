import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Zap,
  Code,
  Cpu,
  Search,
  PenTool,
  Palette,
  Video,
  Volume2,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES, CategoryInfo } from '../data/categoriesData';
import { TOOLS_DATA } from '../data/toolsData';

export const CategoriesPage: React.FC = () => {
  // Map icon string to Lucide icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap size={24} />;
      case 'Code':
        return <Code size={24} />;
      case 'Cpu':
        return <Cpu size={24} />;
      case 'Search':
        return <Search size={24} />;
      case 'PenTool':
        return <PenTool size={24} />;
      case 'Palette':
        return <Palette size={24} />;
      case 'Video':
        return <Video size={24} />;
      case 'Volume2':
        return <Volume2 size={24} />;
      case 'GraduationCap':
        return <GraduationCap size={24} />;
      case 'Briefcase':
        return <Briefcase size={24} />;
      default:
        return <Grid size={24} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <Grid size={14} />
          <span>Curated Disciplines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore by Category
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-2">
          Find the best AI tools tailored to your exact academic field, creative pursuit, or career goals.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat: CategoryInfo) => {
          const toolCount = TOOLS_DATA.filter((t) => t.category === cat.name).length;

          return (
            <Link
              key={cat.slug}
              to={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.bgLight} ${cat.bgDark} ${cat.color} shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {getIcon(cat.icon)}
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/60 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                  {cat.name}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span>Browse {cat.name} Tools</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
