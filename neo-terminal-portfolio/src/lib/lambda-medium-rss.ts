// Lambda Function: medium-rss-proxy
// This fetches Medium RSS server-side (no CORS issues)

import { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
  try {
    const username = event.queryStringParameters?.username;
    const limit = parseInt(event.queryStringParameters?.limit || '10', 10);

    if (!username) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Username is required' }),
      };
    }

    // Fetch directly from Medium RSS (server-side, no CORS)
    const mediumRssUrl = `https://medium.com/feed/@${username}`;
    const response = await fetch(mediumRssUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch Medium RSS feed');
    }

    const xmlText = await response.text();

    // Parse XML
    const items = extractArticles(xmlText, limit);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
      body: JSON.stringify({ articles: items }),
    };
  } catch (error) {
    console.error('Error fetching Medium RSS:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
        articles: [],
      }),
    };
  }
};

// Simple XML parser (no dependencies)
function extractArticles(xmlText: string, limit: number) {
  const articles: any[] = [];
  
  // Extract items using regex (simple parsing, no dependencies)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let count = 0;

  while ((match = itemRegex.exec(xmlText)) !== null && count < limit) {
    const itemContent = match[1];
    
    const title = extractTag(itemContent, 'title');
    const link = extractTag(itemContent, 'link');
    const pubDate = extractTag(itemContent, 'pubDate');
    const description = extractTag(itemContent, 'description');
    
    // Extract categories
    const categoryRegex = /<category>(.*?)<\/category>/g;
    const categories: string[] = [];
    let catMatch;
    while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
      categories.push(catMatch[1]);
    }
    
    // Clean description (remove HTML)
    const cleanDescription = description
      .replace(/<[^>]*>/g, '')
      .substring(0, 150)
      .trim() + '...';
    
    articles.push({
      title,
      link,
      pubDate,
      description: cleanDescription,
      categories,
    });
    
    count++;
  }
  
  return articles;
}

function extractTag(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 's');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}