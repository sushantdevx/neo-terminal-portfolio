'use client';

import Link from 'next/link';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <article
        className={`terminal-card group hover:scale-[1.02] transition-all ${
          featured ? 'md:col-span-2' : ''
        }`}
      >
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.featured && (
              <span className="px-2 py-1 bg-terminal-cyan/10 border border-terminal-cyan rounded text-terminal-cyan text-xs font-semibold">
                ⭐ Featured
              </span>
            )}
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-textMuted text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-terminal-cyan group-hover:text-terminal-cyanDark transition-colors">
            <span className="text-terminal-prompt mr-2">›</span>
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-terminal-textMuted line-clamp-3">
            {article.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-terminal-textMuted pt-2 border-t border-terminal-border">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{Math.ceil(article.readTime)} min read</span>
            </div>
            {article.tags.length > 3 && (
              <div className="flex items-center gap-2">
                <span>🏷️</span>
                <span>+{article.tags.length - 3} more</span>
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-terminal-cyan group-hover:text-terminal-cyanDark transition-colors pt-2">
            <span>Read article</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}