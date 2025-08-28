import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { category, entityType, entityId, ids } = await request.json();

    // Build query based on provided filters
    const where: any = {};
    
    if (ids && Array.isArray(ids)) {
      where.id = { in: ids };
    }
    
    if (category) {
      where.category = category;
    }
    
    if (entityType) {
      where.entityType = entityType;
    }
    
    if (entityId) {
      where.entityId = entityId;
    }

    // Fetch images matching criteria
    const images = await prisma.image.findMany({
      where,
      select: {
        id: true,
        filename: true,
        alt: true,
        category: true,
        mimeType: true,
        width: true,
        height: true,
        entityType: true,
        entityId: true,
      },
    });

    // Map to response format with URLs
    const response = images.map(image => ({
      id: image.id,
      filename: image.filename,
      url: `/api/images/${image.id}`,
      thumbnailUrl: `/api/images/${image.id}?thumbnail=true`,
      alt: image.alt,
      category: image.category,
      width: image.width,
      height: image.height,
      mimeType: image.mimeType,
      entityType: image.entityType,
      entityId: image.entityId,
    }));

    return NextResponse.json({ images: response });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    // Don't disconnect shared Prisma instance
  }
}

// Get all images for a specific entity
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const entityType = url.searchParams.get('entityType');
    const entityId = url.searchParams.get('entityId');
    
    if (!entityType || !entityId) {
      return NextResponse.json(
        { error: 'entityType and entityId are required' },
        { status: 400 }
      );
    }

    const images = await prisma.image.findMany({
      where: {
        entityType,
        entityId,
      },
      select: {
        id: true,
        filename: true,
        alt: true,
        width: true,
        height: true,
        mimeType: true,
      },
    });

    const response = images.map(image => ({
      id: image.id,
      filename: image.filename,
      url: `/api/images/${image.id}`,
      thumbnailUrl: `/api/images/${image.id}?thumbnail=true`,
      alt: image.alt,
      width: image.width,
      height: image.height,
      mimeType: image.mimeType,
    }));

    return NextResponse.json({ images: response });
  } catch (error) {
    console.error('Error fetching entity images:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    // Don't disconnect shared Prisma instance
  }
}