import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { rssFeedMonitor } from '@/lib/rss/feed-monitor';

// Dynamic API route for live news using centralized RSS feed configuration

interface NewsItem {
  id: string;
  title: string;
  titleEs: string | null;
  url: string;
  date: string;
  category: string;
  urgent: boolean;
  excerpt: string;
  source?: string;
  live?: boolean;
}

async function fetchLiveNews(category: string, limit: number): Promise<NewsItem[]> {
  try {
    // Use the centralized RSS feed monitor
    const feedItems = await rssFeedMonitor.fetchByCategory(
      category === 'all' ? undefined : category
    );

    // Convert feed items to news items
    const newsItems: NewsItem[] = feedItems.slice(0, limit).map((item, index) => ({
      id: `live-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title,
      titleEs: null, // Would need translation service
      url: item.link,
      date: item.pubDate,
      category: item.feedCategory,
      urgent: isUrgent(item.title),
      excerpt: (item.contentSnippet || '').substring(0, 150) + '...',
      source: item.feedName,
      live: true,
    }));

    return newsItems;
  } catch (error) {
    logger.error('Error fetching live news:', errorToLogMeta(error));
    return [];
  }
}

function isUrgent(title: string): boolean {
  const urgentKeywords = [
    'breaking',
    'urgent',
    'immediate',
    'deadline',
    'expires',
    'emergency',
    'alert',
  ];
  return urgentKeywords.some(keyword => title.toLowerCase().includes(keyword));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'immigration';
    const limit = parseInt(searchParams.get('limit') || '10');
    const locale = searchParams.get('locale') || 'en';

    logger.info(`News ticker request: category=${category}, limit=${limit}, locale=${locale}`);

    let newsItems: NewsItem[] = [];

    // Try to get from database first
    try {
      const posts = await prisma.blogPost.findMany({
        where: {
          category: category,
          publishedAt: {
            lte: new Date(),
            not: null,
          },
          status: 'published',
        },
        select: {
          id: true,
          title: true,
          titleEs: true,
          slug: true,
          excerpt: true,
          excerptEs: true,
          publishedAt: true,
          category: true,
          metadata: true,
        },
        orderBy: [
          {
            publishedAt: 'desc',
          },
        ],
        take: limit,
      });

      // Format for news ticker
      newsItems = posts.map(post => ({
        id: post.id,
        title: post.title,
        titleEs: post.titleEs,
        url: `/blog/${post.slug}`,
        date: post.publishedAt ? post.publishedAt.toISOString() : new Date().toISOString(),
        category: post.category,
        urgent: (post.metadata as Record<string, unknown>)?.urgent === true || false,
        excerpt:
          locale === 'es'
            ? post.excerptEs || post.excerpt || 'Read more about this immigration update'
            : post.excerpt || 'Read more about this immigration update',
      }));

      logger.info(`Fetched ${newsItems.length} news items from database`);
    } catch (dbError) {
      logger.warn('Database unavailable, fetching live news:', errorToLogMeta(dbError));

      // If database fails, fetch live news from RSS feeds
      newsItems = await fetchLiveNews(category, limit);
      logger.info(`Fetched ${newsItems.length} live news items from RSS feeds`);
    }

    // If we still don't have news, use static fallback
    if (newsItems.length === 0) {
      logger.info('Using static news items');
      const staticNews = [
        {
          id: 'static-1',
          title: 'New USCIS Fee Schedule Takes Effect April 2024',
          titleEs: 'Nuevo Programa de Tarifas del USCIS Entra en Vigor en Abril 2024',
          url: '/blog/uscis-fee-changes-2024',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'Important changes to immigration application fees',
        },
        {
          id: 'static-2',
          title: 'Extended TPS Designation for Venezuelan Nationals',
          titleEs: 'Designación de TPS Extendida para Nacionales Venezolanos',
          url: '/blog/tps-venezuela-extension',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: false,
          excerpt: 'Temporary Protected Status extended through 2025',
        },
        {
          id: 'static-3',
          title: 'H-1B Registration Period Opens March 2024',
          titleEs: 'Período de Registro H-1B Abre en Marzo 2024',
          url: '/blog/h1b-registration-2024',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'Annual H-1B visa lottery registration now open',
        },
        {
          id: 'static-4',
          title: 'New Immigration Court Procedures in North Carolina',
          titleEs: 'Nuevos Procedimientos en la Corte de Inmigración en Carolina del Norte',
          url: '/blog/nc-immigration-court-updates',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: false,
          excerpt: 'Important changes for immigration court proceedings',
        },
        {
          id: 'static-5',
          title: 'DACA Renewal Applications - Act Now',
          titleEs: 'Solicitudes de Renovación de DACA - Actúe Ahora',
          url: '/blog/daca-renewal-reminder',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'Critical deadline approaching for DACA renewals',
        },
      ];

      return NextResponse.json(
        {
          posts: staticNews.slice(0, limit),
          source: 'static',
          total: staticNews.length,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        }
      );
    }

    // Determine data source for response
    const isLive = newsItems.some(item => item.live);
    const source = isLive ? 'live-rss' : 'database';

    return NextResponse.json(
      {
        posts: newsItems,
        source: source,
        total: newsItems.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'CDN-Cache-Control': 'max-age=300',
          'Vercel-CDN-Cache-Control': 'max-age=300',
        },
      }
    );
  } catch (error) {
    logger.error('Error fetching news ticker items:', errorToLogMeta(error));

    // Return static fallback on error
    const fallbackNews = [
      {
        id: 'fallback-1',
        title: 'Immigration Law Updates - Call 1-844-YO-PELEO',
        titleEs: 'Actualizaciones de Inmigración - Llame 1-844-YO-PELEO',
        url: '/contact',
        date: new Date().toISOString(),
        category: 'immigration',
        urgent: true,
        excerpt: 'Get the latest immigration updates',
      },
    ];

    return NextResponse.json(
      {
        posts: fallbackNews,
        source: 'fallback',
        error: 'Using fallback data',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  }
}
