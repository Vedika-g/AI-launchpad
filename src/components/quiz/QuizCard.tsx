import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Clock, ArrowRight } from 'lucide-react';
import { Quiz } from '../../types/quiz';

interface QuizCardProps {
  quiz: Quiz;
  lastScore?: number | null;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, lastScore }) => {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-500/30 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
            {quiz.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock size={14} />
            <span>~{quiz.estimatedMinutes} mins</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
          {quiz.title}
        </h3>
        <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-3">
          {quiz.subtitle}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {quiz.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <HelpCircle size={15} />
          <span>{quiz.questions.length} Questions</span>
          {lastScore !== undefined && lastScore !== null && (
            <span className="ml-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              (Best: {lastScore}%)
            </span>
          )}
        </div>

        <Link
          to={`/quizzes/${quiz.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl text-white bg-brand-600 hover:bg-brand-700 shadow-sm shadow-brand-500/20 transition-all hover:translate-x-0.5"
        >
          <span>Take Quiz</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};
