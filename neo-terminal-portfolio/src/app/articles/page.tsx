import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticlesListClient from './ArticlesListClient';
import { getAllArticles, getAllTags } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Technical articles, tutorials, and insights on software development',
  openGraph: {
    title: 'Articles | Neo-Terminal Portfolio',
    description: 'Technical articles, tutorials, and insights on software development',
  },
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const tags = await getAllTags();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />

        {/* Page Header */}
        <div className="terminal-card mb-8 animate-fade-in">
          <div className="space-y-2">
            <p className="text-terminal-textMuted">
              <span className="terminal-prompt">¯</span> cd /articles
            </p>
            <div className="pl-4">
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Articles
              </h1>
              <p className="text-terminal-textMuted">
                Technical writings, tutorials, and insights
                <span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="terminal-card text-center animate-slide-up">
            <div className="text-2xl font-bold text-terminal-cyan">
              {articles.length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Total Articles</div>
          </div>
          <div className="terminal-card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-2xl font-bold text-terminal-green">
              {articles.filter(a => a.featured).length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Featured</div>
          </div>
          <div className="terminal-card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl font-bold text-terminal-command">
              {tags.length}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Topics</div>
          </div>
          <div className="terminal-card text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl font-bold text-terminal-cyan">
              {Math.ceil(articles.reduce((acc, a) => acc + a.readTime, 0))}
            </div>
            <div className="text-xs text-terminal-textMuted mt-1">Min Read Time</div>
          </div>
        </div>

        {/* Articles List with Client-side Filtering */}
        <ArticlesListClient articles={articles} allTags={tags} />
      </div>
    </div>
  );
}