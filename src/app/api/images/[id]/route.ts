import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache headers for images (30 days)
const CACHE_CONTROL = 'public, max-age=2592000, immutable';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if requesting thumbnail
    const url = new URL(request.url);
    const thumbnail = url.searchParams.get('thumbnail') === 'true';
    
    // Fetch image from database
    const image = await prisma.image.findUnique({
      where: { id },
      select: {
        id: true,
        data: thumbnail ? false : true,
        thumbnail: thumbnail ? true : false,
        mimeType: true,
        filename: true,
        alt: true,
      },
    });

    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get the base64 data (either full image or thumbnail)
    const base64Data = thumbnail ? image.thumbnail : image.data;
    
    if (!base64Data) {
      return new NextResponse('Image data not available', { status: 404 });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Return image with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': image.mimeType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': CACHE_CONTROL,
        'X-Image-Alt': image.alt || image.filename,
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    // Don't disconnect shared Prisma instance
  }
}

// Get image by filename and category
export async function POST(request: NextRequest) {
  try {
    const { filename, category } = await request.json();
    
    if (!filename || !category) {
      return NextResponse.json(
        { error: 'Filename and category are required' },
        { status: 400 }
      );
    }

    // Fetch image by filename and category
    const image = await prisma.image.findUnique({
      where: {
        category_filename: {
          category,
          filename,
        },
      },
      select: {
        id: true,
        alt: true,
        width: true,
        height: true,
        mimeType: true,
      },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Return image metadata with URL
    return NextResponse.json({
      id: image.id,
      url: `/api/images/${image.id}`,
      thumbnailUrl: `/api/images/${image.id}?thumbnail=true`,
      alt: image.alt,
      width: image.width,
      height: image.height,
      mimeType: image.mimeType,
    });
  } catch (error) {
    console.error('Error finding image:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    // Don't disconnect shared Prisma instance
  }
}