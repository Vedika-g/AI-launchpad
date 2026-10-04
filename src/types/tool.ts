export type Category =
  | 'Productivity'
  | 'Coding'
  | 'AI/ML'
  | 'Research'
  | 'Writing'
  | 'Design'
  | 'Video'
  | 'Audio'
  | 'Education'
  | 'Career';

export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Free tier available';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface PracticalExample {
  title: string;
  scenario: string;
  promptOrInput: string;
  expectedOutcome: string;
}

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  pricing: PricingType;
  difficulty: DifficultyLevel;
  features: string[];
  useCases: string[];
  pros: string[];
  limitations: string[];
  fresherBenefit: string;
  officialUrl: string;
  tags: string[];
  dateAdded: string; // ISO date format YYYY-MM-DD
  featured: boolean;
  trending?: boolean;
  freeTierDetails: string;
  practicalExample: PracticalExample;
  relevantQuizId?: string;
  iconName?: string;
  accentColor?: string;
}
