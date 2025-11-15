/**
 * Server-side Medium RSS feed parser
 * No API key required - parses Medium RSS directly
 */

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
  author: string;
  guid: string;
}

/**
 * Parse Medium RSS feed for a given username
 */
export async function getMediumArticles(
  username: string,
  limit: number = 10
): Promise<MediumArticle[]> {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const articles = parseRSSFeed(xmlText, limit);
    
    return articles;
  } catch (error) {
    console.error('Error fetching Medium RSS:', error);
    throw error;
  }
}

/**
 * Parse RSS XML to extract articles
 */
function parseRSSFeed(xmlText: string, limit: number): MediumArticle[] {
  const articles: MediumArticle[] = [];
  
  // Extract items using regex (simple parsing for RSS)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const items = xmlText.match(itemRegex) || [];
  
  for (let i = 0; i < Math.min(items.length, limit); i++) {
    const item = items[i];
    
    const article: MediumArticle = {
      title: extractTag(item, 'title'),
      link: extractTag(item, 'link'),
      pubDate: extractTag(item, 'pubDate'),
      description: cleanDescription(extractTag(item, 'description')),
      thumbnail: extractThumbnail(item),
      categories: extractCategories(item),
      author: extractTag(item, 'dc:creator') || extractTag(item, 'author'),
      guid: extractTag(item, 'guid'),
    };
    
    articles.push(article);
  }
  
  return articles;
}

/**
 * Extract content from XML tag
 */
function extractTag(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}(?:[^>]*)>([\\s\\S]*?)<\/${tagName}>`, 'i');
  const match = xml.match(regex);
  
  if (match && match[1]) {
    // Decode HTML entities and remove CDATA
    let content = match[1]
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .trim();
    
    // Decode common HTML entities
    content = content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    return content;
  }
  
  return '';
}

/**
 * Extract thumbnail image from content
 */
function extractThumbnail(item: string): string | undefined {
  // Try to get image from content:encoded or description
  const content = extractTag(item, 'content:encoded') || extractTag(item, 'description');
  
  // Look for img tag
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = content.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  // Try media:thumbnail
  const mediaThumbnail = extractTag(item, 'media:thumbnail');
  if (mediaThumbnail) {
    const urlMatch = mediaThumbnail.match(/url="([^"]+)"/i);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
  }
  
  return undefined;
}

/**
 * Extract categories/tags from item
 */
function extractCategories(item: string): string[] {
  const categoryRegex = /<category(?:[^>]*)>([^<]+)<\/category>/gi;
  const matches = item.matchAll(categoryRegex);
  
  const categories: string[] = [];
  for (const match of matches) {
    if (match[1]) {
      categories.push(match[1].trim());
    }
  }
  
  return categories;
}

/**
 * Clean description by removing HTML tags and truncating
 */
function cleanDescription(description: string, maxLength: number = 200): string {
  // Remove HTML tags
  let clean = description.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  clean = clean
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Trim whitespace
  clean = clean.replace(/\s+/g, ' ').trim();
  
  // Truncate
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength).trim() + '...';
  }
  
  return clean;
}

/**
 * Get Medium user profile info (basic)
 */
export async function getMediumProfile(username: string) {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const response = await fetch(rssUrl, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const xmlText = await response.text();
    
    return {
      name: extractTag(xmlText, 'title'),
      description: extractTag(xmlText, 'description'),
      link: extractTag(xmlText, 'link'),
    };
  } catch (error) {
    console.error('Error fetching Medium profile:', error);
    return null;
  }
}