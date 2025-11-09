import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectsListClient from './ProjectsListClient';
import { getAllProjects, getAllCategories } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio of software development projects, open source contributions, and technical implementations',
  openGraph: {
    title: 'Projects | Neo-Terminal Portfolio',
    description: 'Portfolio of software development projects, open source contributions, and technical implementations',
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />

        {/* Page Header */}
        <div className="terminal-card mb-8 animate-fade-in">
          <div className="space-y-2">
            <p className="text-terminal-textMuted">
              <span className="terminal-prompt">¯</span> cd /projects
            </p>
            <div className="pl-4">
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Projects
              </h1>
              <p className="text-terminal-textMuted">
                Building solutions, one commit at a time
                <span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="terminal-card text-center animate-slide-up">
            <div className="text-2xl font-bold text-terminal-cyan">
              {projects.length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">
              Total Projects
            </div>
          </div>
          <div
            className="terminal-card text-center animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-2xl font-bold text-terminal-green">
              {projects.filter((p) => p.featured).length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Featured</div>
          </div>
          <div
            className="terminal-card text-center animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-2xl font-bold text-terminal-command">
              {categories.length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Categories</div>
          </div>
          <div
            className="terminal-card text-center animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="text-2xl font-bold text-terminal-cyan">
              {new Set(projects.flatMap((p) => p.techStack)).size}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">
              Technologies
            </div>
          </div>
        </div>

        {/* Projects List with Client-side Filtering */}
        <ProjectsListClient projects={projects} categories={categories} />

        {/* GitHub Integration Note */}
        <div className="terminal-card bg-terminal-bg mt-8 animate-fade-in">
          <div className="space-y-2">
            <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
              <span>🔗</span>
              GitHub Integration
            </h3>
            <div className="pl-6 space-y-2 text-sm text-terminal-textMuted">
              <p>
                Want to see my latest work? Check out my{' '}
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                >
                  GitHub profile
                </a>{' '}
                for more projects and contributions.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs">
                <span className="text-terminal-prompt">›</span>
                <span>
                  GitHub API integration available for real-time repository data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}