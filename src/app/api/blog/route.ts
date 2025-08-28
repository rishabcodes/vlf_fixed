import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const language = searchParams.get('language') || 'en';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: {
      status: string;
      language: string;
      practiceArea?: string;
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' };
        content?: { contains: string; mode: 'insensitive' };
        excerpt?: { contains: string; mode: 'insensitive' };
      }>;
    } = {
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
          featuredImage: true,
          practiceArea: true,
          category: true,
          language: true,
          publishedAt: true,
          readTime: true,
          author: true,
          keywords: true,
          seoScore: true,
        },
      }),
      getPrismaClient().blogPost.count({ where }),
    ]);

    // Increment view count for returned posts
    await Promise.all(
      posts.map(post =>
        getPrismaClient().blogPost.update({
          where: { id: post.id },
          data: { viewCount: { increment: 1 } },
        })
      )
    );

    // Transform posts to ensure practiceArea is set
    const transformedPosts = posts.map(post => ({
      ...post,
      practiceArea: post.practiceArea || post.category || 'general',
    }));

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    apiLogger.error('blog-list', error as Error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // This would typically require authentication
    // For now, we'll create a draft post

    const post = await getPrismaClient().blogPost.create({
      data: {
        ...data,
        status: 'draft',
        slug: generateSlug(data.title),
        readTime: Math.ceil(data.content.split(' ').length / 200),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    apiLogger.error('blog-create', error as Error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}
