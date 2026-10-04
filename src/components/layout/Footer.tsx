import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Heart, BookOpen, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../../data/categoriesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
                <Rocket size={20} className="transform -rotate-12" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                AI Launchpad
              </span>
            </Link>

            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
              Discover AI. Learn Faster. Stay Ahead.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              The premier discovery and learning launchpad helping college students, freshers,
              and job seekers master modern AI tools without the marketing fluff.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <BookOpen size={13} />
                Built for students, graduates & future professionals.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Explore All Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Tool Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/quizzes"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Interactive Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  My Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/explore?category=${encodeURIComponent(cat.name)}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <ExternalLink size={12} className="opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AI Launchpad. 100% Free & Open Education Resource.</p>
          <p className="flex items-center gap-1">
            Empowering the next generation of builders and thinkers.
          </p>
        </div>
      </div>
    </footer>
  );
};
