export type Interest =
  | 'Getting a job'
  | 'Coding'
  | 'AI/ML'
  | 'Data'
  | 'Productivity'
  | 'Content Creation'
  | 'Research';

export interface UserPreferences {
  interests: Interest[];
  hasCompletedOnboarding: boolean;
}
