import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Quiz } from '../../types/quiz';

interface QuizRunnerProps {
  quiz: Quiz;
  currentIndex: number;
  selectedAnswers: Record<number, number>;
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  quiz,
  currentIndex,
  selectedAnswers,
  onSelectOption,
  onNext,
  onPrev,
  onSubmit,
}) => {
  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const selectedOptionIndex = selectedAnswers[currentIndex];
  const isAnswered = selectedOptionIndex !== undefined;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
      {/* Top Header & Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>
            Question <span className="text-brand-600 dark:text-brand-400 font-bold">{currentIndex + 1}</span> of{' '}
            {totalQuestions}
          </span>
          <span>{progressPercent}% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 dark:bg-brand-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Heading */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3.5 mb-10">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const letter = OPTION_LETTERS[idx] || `${idx + 1}`;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 text-slate-900 dark:text-white ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                {letter}
              </div>

              <div className="flex-1 pt-1 font-medium text-sm sm:text-base leading-relaxed">
                {option}
              </div>

              {isSelected && (
                <CheckCircle2
                  className="text-brand-600 dark:text-brand-400 mt-1 flex-shrink-0"
                  size={20}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isAnswered}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
              isAnswered
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 hover:-translate-y-0.5'
                : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed'
            }`}
          >
            <span>Submit Quiz</span>
            <CheckCircle2 size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!isAnswered}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
              isAnswered
                ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20 hover:-translate-y-0.5'
                : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed'
            }`}
          >
            <span>Next Question</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
