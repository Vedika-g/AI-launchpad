import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, AlertOctagon } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-6">
        <AlertOctagon size={36} />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-3">
        404 - Page Not Found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-base mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all hover:-translate-y-0.5"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Compass size={16} />
          <span>Explore All Tools</span>
        </Link>
      </div>
    </div>
  );
};
