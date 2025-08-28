import { NextResponse } from 'next/server';
import { componentLogger as logger } from '@/lib/safe-logger';
// import { prisma } from '@/lib/prisma';
import RSS from 'rss';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

export async function GET() {
  try {
    // Create RSS feed
    const feed = new RSS({
      title: 'Vasquez Law Firm Blog',
      description: 'Legal insights and updates from Vasquez Law Firm',
      feed_url: `${baseUrl}/blog/rss.xml`,
      site_url: `${baseUrl}/blog`,
      image_url: `${baseUrl}/images/logo.png`,
      managingEditor: 'editor@vasquezlawnc.com',
      webMaster: 'webmaster@vasquezlawnc.com',
      copyright: `${new Date().getFullYear()} Vasquez Law Firm`,
      language: 'en',
      categories: ['Legal', 'Law', 'Immigration', 'Criminal Defense', 'Personal Injury'],
      pubDate: new Date().toUTCString(),
      ttl: 60,
    });

    // For static export, we'll return an empty feed
    // In production, this would fetch from the database
    const posts: any[] = [];

    // Add posts to feed
    posts.forEach(post => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${baseUrl}/blog/${post.slug}`,
        guid: post.id,
        categories: post.categories,
        date: post.publishedAt,
        author: post.author?.name || 'Vasquez Law Firm',
      });
    });

    const xml = feed.xml({ indent: true });

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    logger.error('Error generating RSS feed:', error);

    // Return empty RSS feed on error
    const emptyFeed = new RSS({
      title: 'Vasquez Law Firm Blog',
      description: 'Legal insights and updates from Vasquez Law Firm',
      feed_url: `${baseUrl}/blog/rss.xml`,
      site_url: `${baseUrl}/blog`,
    });

    return new NextResponse(emptyFeed.xml(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}
