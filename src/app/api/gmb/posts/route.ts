import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { gmbManager } from '@/services/gmb-optimization/gmb-manager';
import { prisma } from '@/lib/prisma-safe';
import { z } from 'zod';
import type { GMBPost } from '@prisma/client';
import type {
  GMBPostRequest,
  GMBPostResponse,
  GMBPostsListResponse,
  GMBPostMedia,
  GMBPostCallToAction,
  GMBPostEvent,
  GMBPostOffer,
} from '@/types/api';

// GET /api/gmb/posts - Get GMB posts for a location
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('locationId');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: { locationId?: string } = {};
    if (locationId) {
      where.locationId = locationId;
    }

    const posts = await prisma.gMBPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });

    const response: GMBPostsListResponse = {
      success: true,
      posts: posts.map(
        (post: GMBPost): GMBPostResponse => ({
          id: post.id,
          locationId: post.locationId,
          type: post.type,
          title: post.title,
          content: post.content,
          media: JSON.parse((post.media as string) || '[]') as GMBPostMedia[],
          callToAction: JSON.parse((post.callToAction as string) || '{}') as GMBPostCallToAction,
          event: JSON.parse((post.event as string) || '{}') as GMBPostEvent,
          offer: JSON.parse((post.offer as string) || '{}') as GMBPostOffer,
          publishedAt: post.publishedAt,
        })
      ),
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Failed to get GMB posts:', error);
    return NextResponse.json({ error: 'Failed to get posts' }, { status: 500 });
  }
}

// POST /api/gmb/posts - Create a new GMB post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as GMBPostRequest;

    const schema = z.object({
      locationId: z.string(),
      type: z.enum(['update', 'event', 'offer', 'product', 'covid19']),
      title: z.string().max(300),
      content: z.string().max(1500),
      media: z
        .array(
          z.object({
            type: z.enum(['image', 'video']),
            url: z.string().url(),
            altText: z.string().optional(),
          })
        )
        .optional(),
      callToAction: z
        .object({
          type: z.enum(['book', 'order', 'shop', 'learn_more', 'sign_up', 'call']),
          url: z.string().url().optional(),
        })
        .optional(),
      event: z
        .object({
          title: z.string(),
          startDate: z.string().transform(str => new Date(str)),
          endDate: z.string().transform(str => new Date(str)),
        })
        .optional(),
      offer: z
        .object({
          title: z.string(),
          description: z.string(),
          terms: z.string(),
          startDate: z.string().transform(str => new Date(str)),
          endDate: z.string().transform(str => new Date(str)),
          couponCode: z.string().optional(),
        })
        .optional(),
    });

    const validatedData = schema.parse(body);

    // Create the post using GMB manager
    await gmbManager.createCustomPost(validatedData.locationId, validatedData);

    return NextResponse.json({
      success: true,
      message: 'GMB post created successfully',
    });
  } catch (error) {
    logger.error('Failed to create GMB post:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid post data',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
