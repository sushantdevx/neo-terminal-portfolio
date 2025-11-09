'use client';

import { useState, useMemo } from 'react';
import { Article } from '@/types';
import ArticleCard from '@/components/ArticleCard';

interface ArticlesListClientProps {
  articles: Article[];
  allTags: string[];
}

export default function ArticlesListClient({ articles, allTags }: ArticlesListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'readTime'>('date');

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter((article) => article.tags.includes(selectedTag));
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else {
        return a.readTime - b.readTime;
      }
    });

    return sorted;
  }, [articles, searchQuery, selectedTag, sortBy]);

  const featuredArticles = filteredAndSortedArticles.filter((a) => a.featured);
  const regularArticles = filteredAndSortedArticles.filter((a) => !a.featured);

  return (
    <div className="space-y-8">
      {/* Filters & Search */}
      <div className="terminal-card space-y-4 animate-slide-up">
        {/* Search Bar */}
        <div className="space-y-2">
          <label htmlFor="search" className="text-terminal-cyan text-sm font-semibold flex items-center gap-2">
            <span>🔍</span>
            Search Articles
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or tag..."
              className="w-full px-4 py-3 bg-terminal-bg border border-terminal-border rounded text-terminal-text placeholder-terminal-textMuted focus:border-terminal-cyan focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-terminal-textMuted hover:text-terminal-cyan transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tag Filter */}
        <div className="space-y-2">
          <label className="text-terminal-cyan text-sm font-semibold flex items-center gap-2">
            <span>🏷️</span>
            Filter by Topic
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('all')}
              className={`terminal-button text-sm ${
                selectedTag === 'all' ? 'border-terminal-cyan text-terminal-cyan' : ''
              }`}
            >
              <span className="text-terminal-prompt mr-1">›</span>
              All ({articles.length})
            </button>
            {allTags.map((tag) => {
              const count = articles.filter((a) => a.tags.includes(tag)).length;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`terminal-button text-sm ${
                    selectedTag === tag ? 'border-terminal-cyan text-terminal-cyan' : ''
                  }`}
                >
                  #{tag} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Options */}
        <div className="space-y-2">
          <label className="text-terminal-cyan text-sm font-semibold flex items-center gap-2">
            <span>📊</span>
            Sort By
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`terminal-button text-sm ${
                sortBy === 'date' ? 'border-terminal-cyan text-terminal-cyan' : ''
              }`}
            >
              📅 Latest First
            </button>
            <button
              onClick={() => setSortBy('readTime')}
              className={`terminal-button text-sm ${
                sortBy === 'readTime' ? 'border-terminal-cyan text-terminal-cyan' : ''
              }`}
            >
              ⏱️ Quick Reads
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="pt-4 border-t border-terminal-border text-terminal-textMuted text-sm">
          <span className="text-terminal-prompt">›</span> Showing{' '}
          <span className="text-terminal-cyan font-semibold">
            {filteredAndSortedArticles.length}
          </span>{' '}
          {filteredAndSortedArticles.length === 1 ? 'article' : 'articles'}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedTag !== 'all' && ` in "${selectedTag}"`}
        </div>
      </div>

      {/* No Results */}
      {filteredAndSortedArticles.length === 0 && (
        <div className="terminal-card text-center py-12 animate-fade-in">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-terminal-cyan mb-2">
            No Articles Found
          </h3>
          <p className="text-terminal-textMuted mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('all');
            }}
            className="terminal-button"
          >
            <span className="text-terminal-prompt mr-2">›</span>
            Clear Filters
          </button>
        </div>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span>⭐</span>
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span>📝</span>
            {featuredArticles.length > 0 ? 'All Articles' : 'Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}