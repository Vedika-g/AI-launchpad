import { Category } from '../types/tool';

export interface CategoryInfo {
  name: Category;
  slug: string;
  description: string;
  icon: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Productivity',
    slug: 'productivity',
    description: 'AI tools for working and studying faster, automating tasks, and organizing thoughts.',
    icon: 'Zap',
    color: 'text-amber-500',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/30',
    borderLight: 'border-amber-200',
    borderDark: 'dark:border-amber-800/40',
  },
  {
    name: 'Coding',
    slug: 'coding',
    description: 'AI coding assistants, code generation, debugging, and software development agents.',
    icon: 'Code',
    color: 'text-blue-500',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/30',
    borderLight: 'border-blue-200',
    borderDark: 'dark:border-blue-800/40',
  },
  {
    name: 'AI/ML',
    slug: 'ai-ml',
    description: 'Platforms and sandboxes for AI/ML experimentation, model testing, and API building.',
    icon: 'Cpu',
    color: 'text-purple-500',
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-950/30',
    borderLight: 'border-purple-200',
    borderDark: 'dark:border-purple-800/40',
  },
  {
    name: 'Research',
    slug: 'research',
    description: 'AI engines for fact-grounded search, academic paper analysis, and source synthesis.',
    icon: 'Search',
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/30',
    borderLight: 'border-emerald-200',
    borderDark: 'dark:border-emerald-800/40',
  },
  {
    name: 'Writing',
    slug: 'writing',
    description: 'Grammar checking, document polishing, email drafting, and tone optimization tools.',
    icon: 'PenTool',
    color: 'text-cyan-500',
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-950/30',
    borderLight: 'border-cyan-200',
    borderDark: 'dark:border-cyan-800/40',
  },
  {
    name: 'Design',
    slug: 'design',
    description: 'AI image generators, vector art, UI mockups, and visual asset creators.',
    icon: 'Palette',
    color: 'text-pink-500',
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-950/30',
    borderLight: 'border-pink-200',
    borderDark: 'dark:border-pink-800/40',
  },
  {
    name: 'Video',
    slug: 'video',
    description: 'Generative AI video clips, script-to-video pipelines, and video editing helpers.',
    icon: 'Video',
    color: 'text-red-500',
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-950/30',
    borderLight: 'border-red-200',
    borderDark: 'dark:border-red-800/40',
  },
  {
    name: 'Audio',
    slug: 'audio',
    description: 'Voice synthesis, text-to-speech, transcription, and sound design generators.',
    icon: 'Volume2',
    color: 'text-orange-500',
    bgLight: 'bg-orange-50',
    bgDark: 'dark:bg-orange-950/30',
    borderLight: 'border-orange-200',
    borderDark: 'dark:border-orange-800/40',
  },
  {
    name: 'Education',
    slug: 'education',
    description: 'Interactive study assistants, audio overviews, notebook summaries, and flashcards.',
    icon: 'GraduationCap',
    color: 'text-indigo-500',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/30',
    borderLight: 'border-indigo-200',
    borderDark: 'dark:border-indigo-800/40',
  },
  {
    name: 'Career',
    slug: 'career',
    description: 'Resume optimization, mock interview simulations, cover letters, and career accelerators.',
    icon: 'Briefcase',
    color: 'text-teal-500',
    bgLight: 'bg-teal-50',
    bgDark: 'dark:bg-teal-950/30',
    borderLight: 'border-teal-200',
    borderDark: 'dark:border-teal-800/40',
  },
];
