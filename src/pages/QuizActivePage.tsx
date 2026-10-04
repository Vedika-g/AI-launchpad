import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { QUIZZES_DATA } from '../data/quizzesData';
import { QuizRunner } from '../components/quiz/QuizRunner';
import { QuizResultView } from '../components/quiz/QuizResultView';

export const QuizActivePage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();

  const quiz = useMemo(() => {
    return QUIZZES_DATA.find((q) => q.id.toLowerCase() === quizId?.toLowerCase());
  }, [quizId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If quiz is not found
  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Quiz not found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The quiz you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-md"
        >
          <ArrowLeft size={18} />
          <span>Back to All Quizzes</span>
        </Link>
      </div>
    );
  }

  // Answer selection handler
  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Submit quiz & calculate score
  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);

    // Persist score in localStorage
    try {
      const savedScores = JSON.parse(
        localStorage.getItem('ai_launchpad_quiz_scores') || '{}'
      );
      savedScores[quiz.id] = Math.max(savedScores[quiz.id] || 0, percentage);
      localStorage.setItem('ai_launchpad_quiz_scores', JSON.stringify(savedScores));
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate final score
  const score = quiz.questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswerIndex ? acc + 1 : acc;
  }, 0);
  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Back button */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Exit to Quizzes Directory</span>
        </Link>
      </div>

      {isSubmitted ? (
        <QuizResultView
          quiz={quiz}
          score={score}
          total={total}
          percentage={percentage}
          selectedAnswers={selectedAnswers}
          onRetake={handleRetake}
        />
      ) : (
        <div>
          <div className="max-w-3xl mx-auto mb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {quiz.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {quiz.title}
            </h1>
          </div>

          <QuizRunner
            quiz={quiz}
            currentIndex={currentIndex}
            selectedAnswers={selectedAnswers}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};
