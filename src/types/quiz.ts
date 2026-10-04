export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate';
  estimatedMinutes: number;
  questions: QuizQuestion[];
  relatedToolIds: string[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  percentage: number;
  selectedAnswers: Record<number, number>; // questionIndex -> selectedOptionIndex
  completedAt: string;
}
