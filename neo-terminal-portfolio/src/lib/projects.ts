import { Project, GitHubRepo } from '@/types';

// Mock project data - replace with your actual projects
export const projectsData: Project[] = [
  {
    id: 'neo-terminal-portfolio',
    title: 'Neo-Terminal Portfolio',
    description: 'A modern developer portfolio with terminal aesthetics, built with Next.js 14, TypeScript, and Tailwind CSS. Features include dark/light mode, interactive timeline, and AWS deployment.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/yourusername/neo-terminal-portfolio',
    liveUrl: 'https://yoursite.dev',
    imageUrl: '/projects/neo-terminal.png',
    featured: true,
  },
  {
    id: 'distributed-task-queue',
    title: 'Distributed Task Queue',
    description: 'High-performance distributed task queue system with priority scheduling, retry mechanisms, and real-time monitoring. Handles 10K+ tasks per second with fault tolerance.',
    techStack: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    category: 'Backend',
    githubUrl: 'https://github.com/yourusername/task-queue',
    featured: true,
  },
  {
    id: 'microservices-architecture',
    title: 'E-Commerce Microservices',
    description: 'Scalable microservices architecture for e-commerce platform with event-driven communication, API gateway, and service mesh implementation.',
    techStack: ['Node.js', 'MongoDB', 'RabbitMQ', 'Docker', 'Istio'],
    category: 'System Design',
    githubUrl: 'https://github.com/yourusername/ecommerce-microservices',
  },
  {
    id: 'react-state-library',
    title: 'React State Management Library',
    description: 'Lightweight and type-safe state management library for React applications. Zero dependencies, built-in DevTools support, and optimized for performance.',
    techStack: ['TypeScript', 'React', 'Jest', 'Rollup'],
    category: 'Open Source',
    githubUrl: 'https://github.com/yourusername/react-state-lib',
    liveUrl: 'https://npmjs.com/package/react-state-lib',
    featured: true,
  },
  {
    id: 'api-gateway',
    title: 'API Gateway with Rate Limiting',
    description: 'Custom API gateway implementation with intelligent rate limiting, request transformation, and multi-tenant support. Built for high-throughput scenarios.',
    techStack: ['Python', 'FastAPI', 'Redis', 'Nginx', 'Docker'],
    category: 'Backend',
    githubUrl: 'https://github.com/yourusername/api-gateway',
  },
  {
    id: 'realtime-collaboration',
    title: 'Real-time Collaboration Platform',
    description: 'WebSocket-based real-time collaboration platform with operational transformation for conflict resolution. Supports multiple document types and concurrent editing.',
    techStack: ['WebSocket', 'Node.js', 'React', 'MongoDB', 'Redis'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/yourusername/realtime-collab',
    liveUrl: 'https://collab-demo.dev',
  },
  {
    id: 'caching-strategy',
    title: 'Multi-Layer Caching System',
    description: 'Intelligent multi-layer caching system with automatic cache invalidation, CDN integration, and performance monitoring. Reduced API response time by 80%.',
    techStack: ['Redis', 'Memcached', 'CloudFront', 'Node.js'],
    category: 'System Design',
    githubUrl: 'https://github.com/yourusername/caching-system',
  },
  {
    id: 'cli-tool',
    title: 'Developer CLI Tool',
    description: 'Command-line interface tool for developers to automate common tasks, scaffolding projects, and managing configurations. Features interactive prompts and plugin system.',
    techStack: ['Node.js', 'Commander.js', 'Inquirer', 'Chalk'],
    category: 'Open Source',
    githubUrl: 'https://github.com/yourusername/dev-cli',
  },
];

// GitHub API integration
export async function getGitHubPinnedRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add your GitHub token for higher rate limits (optional)
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter(repo => !repo.fork); // Exclude forked repos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGitHubRepoDetails(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repo details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repo details:', error);
    return null;
  }
}

// Get all projects
export function getAllProjects(): Project[] {
  return projectsData;
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured);
}

// Get project by ID
export function getProjectById(id: string): Project | undefined {
  return projectsData.find(project => project.id === id);
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set(projectsData.map(project => project.category));
  return Array.from(categories);
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  return projectsData.filter(project => project.category === category);
}