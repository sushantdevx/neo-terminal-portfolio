import { NextRequest, NextResponse } from 'next/server';
import { getMediumArticles } from '@/lib/medium-rss';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const articles = await getMediumArticles(username, limit);

    return NextResponse.json(
      { articles },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error in Medium API route:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
        articles: []
      },
      { status: 500 }
    );
  }
}