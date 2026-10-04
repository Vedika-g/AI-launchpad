import { Tool, Category, PricingType, DifficultyLevel } from '../types/tool';
import { Interest } from '../types/user';

export interface FilterOptions {
  searchQuery?: string;
  category?: Category | 'All';
  pricing?: PricingType | 'All';
  difficulty?: DifficultyLevel | 'All';
  sortBy?: 'trending' | 'newest' | 'name' | 'featured';
}

export function filterTools(tools: Tool[], options: FilterOptions): Tool[] {
  const query = (options.searchQuery || '').trim().toLowerCase();

  return tools.filter((tool) => {
    // 1. Search query matching
    if (query) {
      const matchName = tool.name.toLowerCase().includes(query);
      const matchTagline = tool.tagline.toLowerCase().includes(query);
      const matchDescription = tool.description.toLowerCase().includes(query);
      const matchCategory = tool.category.toLowerCase().includes(query);
      const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchUseCases = tool.useCases.some((uc) => uc.toLowerCase().includes(query));
      const matchFresher = tool.fresherBenefit.toLowerCase().includes(query);

      if (
        !matchName &&
        !matchTagline &&
        !matchDescription &&
        !matchCategory &&
        !matchTags &&
        !matchUseCases &&
        !matchFresher
      ) {
        return false;
      }
    }

    // 2. Category filter
    if (options.category && options.category !== 'All') {
      if (tool.category !== options.category) {
        return false;
      }
    }

    // 3. Pricing filter
    if (options.pricing && options.pricing !== 'All') {
      if (tool.pricing !== options.pricing) {
        return false;
      }
    }

    // 4. Difficulty filter
    if (options.difficulty && options.difficulty !== 'All') {
      if (tool.difficulty !== options.difficulty) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    switch (options.sortBy) {
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      case 'trending':
      default:
        if (a.trending !== b.trending) return a.trending ? -1 : 1;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
    }
  });
}

/**
 * Filter tools relevant to a user's selected interest
 */
export function getToolsForInterest(tools: Tool[], interest: Interest): Tool[] {
  switch (interest) {
    case 'Getting a job':
      return tools.filter((t) =>
        t.category === 'Career' ||
        t.tags.some((tag) => ['resume', 'interview', 'interview-prep', 'career'].includes(tag))
      );
    case 'Coding':
      return tools.filter((t) =>
        t.category === 'Coding' ||
        t.tags.some((tag) => ['developer', 'coding', 'vscode'].includes(tag))
      );
    case 'AI/ML':
      return tools.filter((t) =>
        t.category === 'AI/ML' ||
        t.tags.some((tag) => ['ai-ml', 'models', 'open-weights', 'api'].includes(tag))
      );
    case 'Data':
      return tools.filter((t) =>
        t.tags.some((tag) => ['data', 'analytics', 'spreadsheets', 'research', 'dsa'].includes(tag)) ||
        t.category === 'Research'
      );
    case 'Productivity':
      return tools.filter((t) =>
        t.category === 'Productivity' ||
        t.category === 'Education' ||
        t.tags.some((tag) => ['productivity', 'study', 'notes'].includes(tag))
      );
    case 'Content Creation':
      return tools.filter((t) =>
        t.category === 'Design' ||
        t.category === 'Video' ||
        t.category === 'Audio' ||
        t.category === 'Writing'
      );
    case 'Research':
      return tools.filter((t) =>
        t.category === 'Research' ||
        t.tags.some((tag) => ['citations', 'academic', 'search'].includes(tag))
      );
    default:
      return tools;
  }
}
