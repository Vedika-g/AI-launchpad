import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, Compass } from 'lucide-react';
import { Quiz } from '../../types/quiz';

interface QuizResultViewProps {
  quiz: Quiz;
  score: number;
  total: number;
  percentage: number;
  selectedAnswers: Record<number, number>;
  onRetake: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  quiz,
  score,
  total,
  percentage,
  selectedAnswers,
  onRetake,
}) => {
  // Score message tiers from prompt requirements
  const getFeedback = (pct: number) => {
    if (pct >= 90) {
      return {
        tier: 'Excellent!',
        message: "You're becoming an AI power user.",
        color: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300',
      };
    }
    if (pct >= 70) {
      return {
        tier: 'Great job!',
        message: 'Keep exploring.',
        color: 'text-brand-600 dark:text-brand-400',
        badgeBg: 'bg-brand-100 dark:bg-brand-950/70 text-brand-800 dark:text-brand-300',
      };
    }
    if (pct >= 50) {
      return {
        tier: 'Good start!',
        message: 'Try again and improve.',
        color: 'text-amber-600 dark:text-amber-400',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300',
      };
    }
    return {
      tier: 'Keep learning!',
      message: "You've got this.",
      color: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300',
    };
  };

  const feedback = getFeedback(percentage);
  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Score Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Award size={40} />
        </div>

        <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${feedback.badgeBg}`}>
          {feedback.tier}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Your Score
        </h1>

        <div className="flex items-baseline justify-center gap-3 my-4">
          <span className="text-5xl sm:text-6xl font-black text-brand-600 dark:text-brand-400">
            {score} / {total}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-slate-400 dark:text-slate-500">
            ({percentage}%)
          </span>
        </div>

        <p className="text-lg font-medium text-slate-700 dark:text-slate-300 max-w-md mx-auto mb-8">
          "{feedback.message}"
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Retake Quiz</span>
          </button>

          <Link
            to="/quizzes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all hover:-translate-y-0.5"
          >
            <span>All Quizzes</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Compass size={16} />
            <span>Explore Tools</span>
          </Link>
        </div>
      </div>

      {/* Answer Explanations Section */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Question Review & Explanations
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review your answers and learn the key concepts behind each question.
          </p>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((q, idx) => {
            const userAnswerIndex = selectedAnswers[idx];
            const isCorrect = userAnswerIndex === q.correctAnswerIndex;
            const userAnswerText =
              userAnswerIndex !== undefined
                ? `${OPTION_LETTERS[userAnswerIndex]}. ${q.options[userAnswerIndex]}`
                : 'Not answered';
            const correctAnswerText = `${OPTION_LETTERS[q.correctAnswerIndex]}. ${q.options[q.correctAnswerIndex]}`;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      Q{idx + 1}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {q.question}
                    </h3>
                  </div>

                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 flex-shrink-0">
                      <CheckCircle2 size={13} /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 flex-shrink-0">
                      <XCircle size={13} /> Incorrect
                    </span>
                  )}
                </div>

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300'
                        : 'border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                      Your Answer:
                    </p>
                    <p className="font-semibold">{userAnswerText}</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                      Correct Answer:
                    </p>
                    <p className="font-semibold">{correctAnswerText}</p>
                  </div>
                </div>

                {/* Explanation Card */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800 text-sm">
                  <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Explanation:
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
