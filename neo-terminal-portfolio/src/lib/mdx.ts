import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Article } from '@/types';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

/**
 * Get all article slugs
 */
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get article data by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      readTime: stats.minutes,
      tags: data.tags || [],
      featured: data.featured || false,
      coverImage: data.coverImage,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Get all articles with optional filtering
 */
export async function getAllArticles(options?: {
  featured?: boolean;
  tag?: string;
  limit?: number;
}): Promise<Article[]> {
  const slugs = getAllArticleSlugs();
  const articles = await Promise.all(
    slugs.map((slug) => getArticleBySlug(slug))
  );

  let filteredArticles = articles.filter((article): article is Article => article !== null);

  // Apply filters
  if (options?.featured) {
    filteredArticles = filteredArticles.filter((article) => article.featured);
  }

  if (options?.tag) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tags.includes(options.tag!)
    );
  }

  // Sort by publish date (newest first)
  filteredArticles.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Apply limit
  if (options?.limit) {
    filteredArticles = filteredArticles.slice(0, options.limit);
  }

  return filteredArticles;
}

/**
 * Get all unique tags from articles
 */
export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles();
  const tags = new Set<string>();
  
  articles.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

/**
 * Get related articles based on tags
 */
export async function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): Promise<Article[]> {
  const currentArticle = await getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  const allArticles = await getAllArticles();
  
  // Filter out current article and calculate relevance score
  const scoredArticles = allArticles
    .filter((article) => article.slug !== currentSlug)
    .map((article) => {
      const commonTags = article.tags.filter((tag) =>
        currentArticle.tags.includes(tag)
      );
      return {
        article,
        score: commonTags.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);

  return scoredArticles;
}