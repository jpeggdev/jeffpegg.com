# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is jpeggdev's personal website built with Next.js 15, featuring a modern tech stack with dark/light theme support. The site showcases development work, technical skills, and will host articles about AI and technology.

## Key Development Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture & Tech Stack

**Framework**: Next.js 15.3.5 with App Router
- Uses latest React 19 with TypeScript 5 in strict mode
- Path aliases configured: `@/*` → `./src/*`

**Styling**: Tailwind CSS v4 (latest)
- Custom theme integration with CSS custom properties
- Dark/light mode via `next-themes` package
- Geist fonts (Sans & Mono) from Google Fonts

**Project Structure**:
```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Homepage with hero & skills
│   ├── about/page.tsx      # About page with detailed bio
│   ├── articles/page.tsx   # Articles page (placeholder content)
│   └── globals.css         # Global styles with theme variables
└── components/
    ├── Navigation.tsx      # Main navigation with active states
    ├── ThemeProvider.tsx   # next-themes wrapper component
    └── ThemeToggle.tsx     # Theme switching component
```

## Theme System

The site uses a custom Tailwind CSS v4 theme with next-themes:
- Default theme: dark
- System preference detection enabled
- CSS custom properties in `globals.css` define color variables
- Theme toggle in navigation header

## Content Management

**Current State**: Static content with placeholder articles
**Articles**: Located in `/articles` with "Coming Soon" placeholders
**Contact Info**: 
- GitHub: https://github.com/jpeggdev
- Twitter: https://x.com/theRealJeffPegg  
- Email: jeff.pegg@gmail.com

## Articles System

**Dynamic Content Management**: Articles are now managed through a TypeScript data structure in `src/lib/articles.ts`

**Article Structure**:
```typescript
type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown format
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published';
  readTime: number;
};
```

**Key Features**:
- Dynamic article listing with published articles only
- Individual article pages with markdown rendering
- Tag-based filtering support
- SEO-friendly URLs (`/articles/[id]`)
- Static generation for published articles

**Components**:
- `ArticleCard`: Article preview component for listings
- `MarkdownRenderer`: Client-side markdown to JSX converter

## Development Notes

- TypeScript strict mode enabled - no `any` types allowed
- ESLint configured with Next.js rules
- Uses newer React 19 features
- Responsive design with Tailwind breakpoints
- Component-based architecture with client/server component separation