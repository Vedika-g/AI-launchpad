import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { Tool } from '../../types/tool';

interface FresherStartSectionProps {
  tools: Tool[];
}

export const FresherStartSection: React.FC<FresherStartSectionProps> = ({ tools }) => {
  // Required 5 starter tools from prompt
  const starterIds = ['chatgpt', 'gemini', 'perplexity', 'canva-ai', 'github-copilot'];
  const starterTools = starterIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t));

  return (
    <section className="bg-gradient-to-br from-indigo-900 via-brand-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 my-10 shadow-xl border border-indigo-800/40 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles size={14} />
              <span>Recommended Starter Pack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-indigo-200 text-sm sm:text-base mt-1 max-w-xl">
              <strong className="text-white font-bold">"I'm a fresher"</strong> — Here are the 5
              foundational AI tools that will give you an immediate boost in college and job hunting.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-white transition-colors"
          >
            <span>View All Tools</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 5 Starter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {starterTools.map((tool, idx) => (
            <div
              key={tool.id}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-400/20 text-indigo-200">
                    Step {idx + 1}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-300">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-indigo-100/80 line-clamp-2 mb-4 leading-relaxed">
                  {tool.tagline}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <Link
                  to={`/tools/${tool.id}`}
                  className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold py-2 px-3 rounded-xl bg-white text-slate-900 hover:bg-indigo-50 transition-colors"
                >
                  <span>Learn Tool</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1 text-[11px] text-indigo-200 hover:text-white py-1 transition-colors"
                >
                  <span>Try Website</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
