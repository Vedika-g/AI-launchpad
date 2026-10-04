import React from 'react';
import { Target, Check, Sparkles, X, RotateCcw } from 'lucide-react';
import { Interest } from '../../types/user';

interface OnboardingModalProps {
  selectedInterests: Interest[];
  onToggleInterest: (interest: Interest) => void;
  onReset: () => void;
}

const INTEREST_OPTIONS: { label: Interest; icon: string; desc: string }[] = [
  { label: 'Getting a job', icon: '💼', desc: 'Resumes, interviews, ATS' },
  { label: 'Coding', icon: '🧑‍💻', desc: 'Assistants, editors, debugging' },
  { label: 'AI/ML', icon: '🧠', desc: 'Models, Hugging Face, APIs' },
  { label: 'Data', icon: '📊', desc: 'Analysis, sheets, algorithms' },
  { label: 'Productivity', icon: '⚡', desc: 'Note-taking, meetings, slides' },
  { label: 'Content Creation', icon: '🎨', desc: 'Art, video, audio, copy' },
  { label: 'Research', icon: '🔬', desc: 'Citations, papers, literature' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  selectedInterests,
  onToggleInterest,
  onReset,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="text-brand-600 dark:text-brand-400" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              What are you interested in?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Select one or more topics to personalize your AI tools feed. Saved in your browser.
          </p>
        </div>

        {selectedInterests.length > 0 && (
          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <RotateCcw size={12} />
            Reset My Interests
          </button>
        )}
      </div>

      {/* Interest Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {INTEREST_OPTIONS.map((item) => {
          const isSelected = selectedInterests.includes(item.label);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onToggleInterest(item.label)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-200 ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/80 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-2xl mb-1.5">{item.icon}</span>
              <span className="text-xs font-bold leading-tight line-clamp-1">
                {item.label}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                {item.desc}
              </span>
              {isSelected && (
                <span className="mt-2 inline-flex items-center gap-0.5 text-[10px] font-bold text-brand-600 dark:text-brand-400">
                  <Check size={11} /> Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
