'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
}

interface MediumFeedProps {
  username: string;
  maxArticles?: number;
  className?: string;
}

export default function MediumFeed({ 
  username, 
  maxArticles = 3,
  className = '' 
}: MediumFeedProps) {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call Lambda function (which fetches from https://medium.com/feed/@username)
        const apiEndpoint = "https://ipazohfwg9.execute-api.us-east-1.amazonaws.com/prod/medium";
        
        if (!apiEndpoint) {
          throw new Error('MEDIUM_API_ENDPOINT not configured');
        }

        const response = await fetch(`${apiEndpoint}?username=${username}&limit=${maxArticles}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Medium articles');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        // Clean CDATA tags from articles (Medium RSS includes these)
        const cleanedArticles = (data.articles || []).map((article: MediumArticle) => ({
          ...article,
          title: article.title
            .replace(/<!\[CDATA\[/g, '')
            .replace(/\]\]>/g, '')
            .trim(),
          categories: article.categories.map((cat: string) =>
            cat
              .replace(/<!\[CDATA\[/g, '')
              .replace(/\]\]>/g, '')
              .trim()
          ),
        }));

        setArticles(cleanedArticles);
      } catch (err) {
        console.error('Error fetching Medium feed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchMediumFeed();
  }, [username, maxArticles]);

  if (loading) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-4">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>📝</span>
            Latest from Medium
          </h3>
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-terminal-bg border border-terminal-border rounded p-4">
                <div className="h-4 bg-terminal-border rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-terminal-border rounded w-full mb-2"></div>
                <div className="h-3 bg-terminal-border rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-3">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>📝</span>
            Latest from Medium
          </h3>
          <div className="terminal-card bg-terminal-bg border-terminal-error">
            <div className="flex items-start gap-2">
              <span className="text-terminal-error">✕</span>
              <div>
                <p className="text-terminal-error font-semibold mb-1">
                  Unable to load articles
                </p>
                <p className="text-terminal-textMuted text-sm">{error}</p>
                <a
                  href={`https://medium.com/@${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-sm mt-2 inline-block"
                >
                  Visit Medium profile directly →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-3">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>📝</span>
            Latest from Medium
          </h3>
          <p className="text-terminal-textMuted text-sm">
            No articles found. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`terminal-card ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>📝</span>
            Latest from Medium
          </h3>
          <a
            href={`https://medium.com/@${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-textMuted hover:text-terminal-cyan text-xs transition-colors"
          >
            View all →
          </a>
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block terminal-card bg-terminal-bg hover:border-terminal-cyan transition-all group"
            >
              <div className="space-y-2">
                {/* Title */}
                <h4 className="text-terminal-text font-semibold group-hover:text-terminal-cyan transition-colors line-clamp-2">
                  <span className="text-terminal-prompt mr-1">›</span>
                  {article.title}
                </h4>

                {/* Description */}
                {/* <p className="text-terminal-textMuted text-sm line-clamp-2">
                  {article.description}
                </p> */}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-terminal-textMuted pt-2 border-t border-terminal-border">
                  <time dateTime={article.pubDate}>
                    {formatDate(article.pubDate)}
                  </time>
                  <span className="flex items-center gap-1">
                    Read on Medium
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </div>

                {/* Categories */}
                {article.categories && article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {article.categories.slice(0, 3).map((category, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-terminal-bg border border-terminal-border rounded text-terminal-cyan text-xs"
                      >
                        #{category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Terminal Output Style Footer */}
        <div className="terminal-card bg-terminal-bg">
          <div className="font-mono text-xs text-terminal-textMuted">
            <p>
              <span className="text-terminal-prompt">¯</span> Fetched {articles.length} article
              {articles.length !== 1 ? 's' : ''} from Medium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}