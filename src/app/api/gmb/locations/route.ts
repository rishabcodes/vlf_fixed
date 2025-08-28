import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { gmbManager } from '@/services/gmb-optimization/gmb-manager';

// GET /api/gmb/locations - Get all GMB locations
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const locations = await gmbManager.getAllLocations();

    return NextResponse.json({
      success: true,
      locations: locations.map(location => ({
        id: location.id,
        name: location.name,
        address: location.address,
        phone: location.phone,
        website: location.website,
        category: location.category,
        coordinates: location.coordinates,
        services: location.services,
        hours: location.hours,
      })),
    });
  } catch (error) {
    logger.error('Failed to get GMB locations:', error);
    return NextResponse.json({ error: 'Failed to get locations' }, { status: 500 });
  }
}

// PUT /api/gmb/locations - Update location information
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { locationId, updates } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }

    await gmbManager.updateLocation(locationId, updates);

    return NextResponse.json({
      success: true,
      message: 'Location updated successfully',
    });
  } catch (error) {
    logger.error('Failed to update GMB location:', error);
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
  }
}
