import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const language = searchParams.get('language') || 'en';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: any = {
      status: 'published',
      language,
    };

    if (category && category !== 'all') {
      where.practiceArea = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      getPrismaClient().blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          practiceArea: true,
          author: true,
          featuredImage: true,
          publishedAt: true,
          readTime: true,
          seoScore: true,
          viewCount: true,
          language: true,
          tags: true,
        },
      }),
      getPrismaClient().blogPost.count({ where }),
    ]);

    const response = {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    apiLogger.error('Failed to fetch blog posts', { error });
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
