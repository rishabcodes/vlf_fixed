import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { syndicationEngine } from '@/services/content-syndication/syndication-engine';

// GET /api/syndication/platforms - List available platforms
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all registered platforms
    const platforms = syndicationEngine.getPlatforms();
    const platformList = Array.from(platforms.entries()).map(([id, config]) => ({
      id,
      name: config.name,
      type: config.type,
      enabled: config.enabled,
      autoPublish: config.autoPublish,
      contentTypes: config.contentTypes,
      hasCredentials: !!(config.apiKey || config.apiSecret),
    }));

    return NextResponse.json({ success: true, platforms: platformList });
  } catch (error) {
    logger.error('Failed to get platforms:', error);
    return NextResponse.json({ error: 'Failed to get platforms' }, { status: 500 });
  }
}

// PUT /api/syndication/platforms - Update platform configuration
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { platformId, config } = body;

    if (!platformId) {
      return NextResponse.json({ error: 'Platform ID is required' }, { status: 400 });
    }

    // Update platform configuration
    const success = syndicationEngine.updatePlatform(platformId, config);

    if (!success) {
      return NextResponse.json({ error: 'Platform not found' }, { status: 404 });
    }

    // Save to database if needed
    // await prisma.platformConfig.upsert(...)

    return NextResponse.json({
      success: true,
      platform: {
        id: platformId,
        ...config,
      },
    });
  } catch (error) {
    logger.error('Failed to update platform:', error);
    return NextResponse.json({ error: 'Failed to update platform' }, { status: 500 });
  }
}
