import { NextRequest, NextResponse } from 'next/server';

import { securityLogger } from '@/lib/safe-logger';
// Dynamic API route

const mockLatestBlogPosts = [
  {
    title: 'Understanding Your Rights After a Car Accident in North Carolina',
    slug: 'understanding-rights-car-accident-nc',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    excerpt:
      'Learn about your legal rights and what steps to take immediately following a car accident in NC.',
    category: 'Personal Injury',
    author: 'William Vasquez',
    readTime: '5 min read',
  },
  {
    title: '2024 Immigration Law Changes: What You Need to Know',
    slug: '2024-immigration-law-changes',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    excerpt: 'Stay updated on the latest immigration law changes affecting families and workers.',
    category: 'Immigration',
    author: 'Christopher Afanador',
    readTime: '7 min read',
  },
  {
    title: 'Workers Compensation Claims: A Complete Guide',
    slug: 'workers-compensation-complete-guide',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    excerpt: 'Everything you need to know about filing and winning workers compensation claims.',
    category: 'Workers Compensation',
    author: 'Judith Parkes',
    readTime: '8 min read',
  },
  {
    title: 'How to Choose the Right Criminal Defense Attorney',
    slug: 'choose-criminal-defense-attorney',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    excerpt: 'Key factors to consider when selecting a criminal defense lawyer for your case.',
    category: 'Criminal Defense',
    author: 'Mark Kelsey',
    readTime: '6 min read',
  },
  {
    title: 'Family Law Mediation vs. Court: Which is Right for You?',
    slug: 'family-law-mediation-vs-court',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    excerpt:
      'Compare the benefits and drawbacks of mediation versus traditional court proceedings.',
    category: 'Family Law',
    author: 'Jillian Baucom',
    readTime: '4 min read',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5');
    const category = searchParams.get('category');

    let filteredPosts = mockLatestBlogPosts;

    if (category) {
      filteredPosts = mockLatestBlogPosts.filter(
        post => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by date (most recent first) and limit results
    const latestPosts = filteredPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return NextResponse.json(latestPosts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'CDN-Cache-Control': 'max-age=3600',
        'Vercel-CDN-Cache-Control': 'max-age=3600',
      },
    });
  } catch (error) {
    securityLogger.error('Latest blog posts API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest blog posts' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
