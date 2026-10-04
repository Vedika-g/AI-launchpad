
# 🚀 AI Launchpad

> **Discover AI. Learn Faster. Stay Ahead.**

AI Launchpad is a modern, responsive web application designed specifically for **college students, graduates, freshers, job seekers, and early-career professionals** to discover, understand, and learn about the rapidly expanding landscape of artificial intelligence tools.

Instead of getting overwhelmed by hundreds of unvetted AI marketing claims, AI Launchpad delivers clear, beginner-friendly explanations, honest pricing breakdowns, student-tailored use cases, interactive knowledge quizzes, and zero-setup browser bookmarking.

---

## 🌟 The Core Experience

```
DISCOVER → UNDERSTAND → TRY → QUIZ → SAVE
```

1. **Discover**: Browse 25+ curated AI tools across 10 structured career & academic categories.
2. **Understand**: Read zero-jargon breakdowns of what each tool does, why freshers should care, and practical prompt examples.
3. **Try**: 1-click links directly to official tool websites.
4. **Quiz**: Test and reinforce what you learned with 6 multiple-choice quizzes with in-depth question explanations.
5. **Save**: Bookmark favorite tools and track recently viewed items with persistent `localStorage`.

---

## ✨ Features

- **🔥 Curated 25+ AI Tool Database**: Hand-crafted profiles for ChatGPT, Claude, Gemini, Perplexity, NotebookLM, GitHub Copilot, Cursor, Canva AI, Gamma, Notion AI, Runway, ElevenLabs, Midjourney, Leonardo AI, Hugging Face, Google AI Studio, Grok, Grammarly, Otter.ai, DeepSeek, Replit, Lovable, Bolt.new, and Adobe Firefly.
- **🎯 Student & Fresher Value Focus**: Every tool includes a dedicated *"Why should a fresher care?"* analysis and a practical scenario prompt.
- **⚡ Instant Multi-Attribute Search**: Live search across tool names, taglines, categories, tags (e.g. `resume`, `coding`, `dsa`), and use cases.
- **🏷️ Robust Filtering & Sorting**: Filter by 10 Categories, Pricing tiers (*Free*, *Freemium*, *Free tier available*, *Paid*), and Difficulty levels (*Beginner*, *Intermediate*, *Advanced*), with sort options (*Trending*, *Newest*, *Alphabetical*).
- **🎓 Interactive Quiz System**: 6 quizzes (30 total questions) covering AI Basics, AI Tools, Productivity, Coding, Research, and Careers. Includes real-time progress indicators, score percentages, tier messages, and question-by-question explanations.
- **💡 Personalization & Onboarding**: "What are you interested in?" interest selector prioritizing relevant tools for getting a job, coding, AI/ML, data, productivity, content creation, or research.
- **❤️ LocalStorage Favorites & History**: Save tools with 1-click heart toggles that persist across browser reloads without requiring an account or backend database.
- **🌓 Dark & Light Modes**: High-contrast, polished dark theme with system preference detection and smooth transitions.
- **📱 100% Responsive Design**: Clean experience on mobile, tablet, laptop, and large desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Storage**: Client-side Browser `localStorage` (No server database required)

---

## 📁 Project Structure

```text
ai-launchpad/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── .gitignore
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component & route declarations
│   ├── index.css             # Tailwind base styles and utilities
│   ├── types/
│   │   ├── tool.ts           # Tool, Category, Pricing, and Difficulty interfaces
│   │   ├── quiz.ts           # Quiz, Question, and QuizResult interfaces
│   │   └── user.ts           # Onboarding & UserPreferences interfaces
│   ├── data/
│   │   ├── toolsData.ts      # 25+ rich AI tools seeded with deep fresher metadata
│   │   ├── categoriesData.ts # 10 category definitions with styling & metadata
│   │   └── quizzesData.ts    # 6 comprehensive quizzes with explanations
│   ├── hooks/
│   │   ├── useFavorites.ts   # localStorage hook for saved favorites
│   │   ├── useRecentlyViewed.ts # localStorage hook for recent tool views
│   │   ├── useTheme.ts       # Dark / Light theme toggle & DOM syncing
│   │   └── useOnboarding.ts  # Interest personalization storage & filtering
│   ├── utils/
│   │   └── searchFilter.ts   # Multi-field search, filtering & sorting logic
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx    # Header with live search, theme switch & mobile drawer
│   │   │   └── Footer.tsx    # Student-focused footer with navigation links
│   │   ├── common/
│   │   │   ├── Badge.tsx     # Reusable category, pricing, and difficulty badges
│   │   │   ├── FavoriteButton.tsx # Heart toggle with animation
│   │   │   └── EmptyState.tsx # Friendly empty states with action CTAs
│   │   ├── home/
│   │   │   ├── HeroSection.tsx # Tagline, dual CTAs, experience roadmap
│   │   │   ├── FresherStartSection.tsx # Curated 5 starter tools for newcomers
│   │   │   ├── OnboardingModal.tsx # "What are you interested in?" interest selector
│   │   │   ├── SectionHeader.tsx # Clean section header with "View all →"
│   │   │   └── RecentlyViewedSection.tsx # Recently viewed tools tray
│   │   ├── tools/
│   │   │   ├── ToolCard.tsx  # Interactive card with badges, tags & external links
│   │   │   ├── ToolGrid.tsx  # Responsive grid container
│   │   │   ├── SearchBar.tsx # Accessible search input with clear button
│   │   │   └── FilterPanel.tsx # Category, pricing, difficulty filter pills and reset
│   │   └── quiz/
│   │       ├── QuizCard.tsx  # Quiz overview card with question count & topic
│   │       ├── QuizRunner.tsx # Active question runner with progress bar
│   │       └── QuizResultView.tsx # Score percentage, tier message, question review & explanations
│   └── pages/
│       ├── HomePage.tsx      # Main landing & curated discovery dashboard
│       ├── ExplorePage.tsx   # Searchable & filterable directory of all AI tools
│       ├── ToolDetailPage.tsx # In-depth tool guide with examples & quiz links
│       ├── CategoriesPage.tsx # 10 interactive category cards
│       ├── QuizzesPage.tsx   # Quiz portal
│       ├── QuizActivePage.tsx # Individual quiz runner and review page
│       ├── FavoritesPage.tsx # Saved tools with empty state and quick actions
│       └── NotFoundPage.tsx  # 404 page with navigation fallbacks
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone or copy the project repository:
   ```bash
   git clone https://github.com/your-username/ai-launchpad.git
   cd ai-launchpad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Privacy & Security

- **Zero API Keys Required**: Does not rely on paid external API keys.
- **Zero Third-Party Trackers**: No trackers, ads, or analytics scripts.
- **Local Data Only**: All bookmarks, scores, and interest preferences remain securely stored in the user's browser `localStorage`.

---

## 📄 License

MIT License. Free to use, modify, and distribute for educational, personal, and career-building projects.
