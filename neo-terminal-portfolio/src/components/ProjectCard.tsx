'use client';

import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Backend':
        return 'text-terminal-green border-terminal-green';
      case 'System Design':
        return 'text-terminal-cyan border-terminal-cyan';
      case 'Open Source':
        return 'text-terminal-command border-terminal-command';
      case 'Full Stack':
        return 'text-terminal-prompt border-terminal-prompt';
      default:
        return 'text-terminal-cyan border-terminal-cyan';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Backend':
        return '⚙️';
      case 'System Design':
        return '🏗️';
      case 'Open Source':
        return '🌟';
      case 'Full Stack':
        return '🚀';
      default:
        return '📦';
    }
  };

  return (
    <div
      className={`terminal-card group hover:scale-[1.02] transition-all duration-300 ${
        featured ? 'border-terminal-cyan' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Link href={`/projects/${project.id}`}>
              <h3 className="text-xl font-bold text-terminal-cyan group-hover:text-terminal-cyanDark transition-colors line-clamp-2">
                {project.title}
              </h3>
            </Link>
          </div>
          {featured && (
            <span className="flex-shrink-0 text-2xl" title="Featured Project">
              ⭐
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded text-xs font-semibold ${getCategoryColor(
              project.category
            )}`}
          >
            <span>{getCategoryIcon(project.category)}</span>
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-terminal-text text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-textMuted text-xs"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-terminal-textMuted text-xs">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-terminal-border">
          <Link
            href={`/projects/${project.id}`}
            className="terminal-button text-xs flex-1 text-center hover:scale-105 transition-transform"
          >
            <span className="text-terminal-prompt mr-1">›</span>
            View Details
          </Link>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-button text-xs p-2 hover:scale-110 transition-transform"
              aria-label="View on GitHub"
              title="View on GitHub"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-button text-xs p-2 hover:scale-110 transition-transform"
              aria-label="View Live Demo"
              title="View Live Demo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}