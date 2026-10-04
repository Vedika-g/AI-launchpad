import React, { useState, useEffect } from 'react';
import { HelpCircle, Award, CheckCircle2 } from 'lucide-react';
import { QUIZZES_DATA } from '../data/quizzesData';
import { QuizCard } from '../components/quiz/QuizCard';

export const QuizzesPage: React.FC = () => {
  // Read saved quiz scores from localStorage to show best scores
  const [completedScores, setCompletedScores] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai_launchpad_quiz_scores');
      if (saved) {
        setCompletedScores(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
          <HelpCircle size={14} />
          <span>Interactive Knowledge Check</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Test Your AI Knowledge
        </h1>
        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent mt-2">
          Learn it. Use it. Remember it.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
          Fast, beginner-friendly 5-question quizzes designed to test your understanding of
          the modern AI landscape, coding agents, prompt techniques, and career tools.
        </p>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUIZZES_DATA.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            lastScore={completedScores[quiz.id]}
          />
        ))}
      </div>

      {/* Motivation Banner */}
      <div className="mt-16 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center max-w-2xl mx-auto">
        <Award className="mx-auto text-brand-600 dark:text-brand-400 mb-3" size={32} />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Instant Answers & Concept Explanations
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Every quiz provides transparent explanations for every question so you learn the
          underlying principles even if you get an answer wrong.
        </p>
      </div>
    </div>
  );
};
