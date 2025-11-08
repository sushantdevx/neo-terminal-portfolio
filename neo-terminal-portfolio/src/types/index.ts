// Site configuration types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    medium?: string;
  };
  version: string;
  lastUpdated: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  external?: boolean;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: 'Backend' | 'System Design' | 'Open Source' | 'Full Stack';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

// Blog/Article types
export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
}

// GitHub types
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Theme types
export type Theme = 'dark' | 'light';

// Component prop types
export interface TerminalPromptProps {
  user?: string;
  path?: string;
  children?: React.ReactNode;
}

export interface TerminalOutputProps {
  children: React.ReactNode;
  className?: string;
}

export interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}
