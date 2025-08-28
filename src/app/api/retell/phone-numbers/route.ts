import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { RETELL_CONFIG } from '@/services/retell/agent-config';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
// Retell API client
async function retellApiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${RETELL_CONFIG.apiUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${RETELL_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Retell API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// GET /api/retell/phone-numbers - List all phone numbers
export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get phone numbers from Retell
    const phoneNumbers = await retellApiRequest('/phone-numbers');

    // Get associated agent mappings from database
    const mappings = await prisma?.phoneNumber.findMany({
      where: {
        provider: 'RETELL',
      },
    });

    return NextResponse.json({
      phoneNumbers,
      mappings,
    });
  } catch (error) {
    logger.error('Error fetching Retell phone numbers:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to fetch phone numbers' }, { status: 500 });
  }
}

// POST /api/retell/phone-numbers - Create or update phone number
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      action,
      phoneNumber,
      agentId,
      inboundOnly = false,
      areaCode,
      metadata,
    } = await req.json();

    if (action === 'purchase') {
      // Purchase new phone number from Retell
      if (!areaCode) {
        return NextResponse.json({ error: 'Area code required for purchasing' }, { status: 400 });
      }

      const result = await retellApiRequest('/phone-numbers', {
        method: 'POST',
        body: JSON.stringify({
          area_code: areaCode,
          inbound_only: inboundOnly,
        }),
      });

      // Store in database
      if (prisma) {
        await prisma.phoneNumber.create({
          data: {
            number: result.phone_number,
            provider: 'RETELL',
            type: 'VOICE',
            capabilities: ['voice', 'sms'],
            active: true,
            metadata: {
              retellPhoneId: result.phone_id,
              agentId: agentId || null,
              ...metadata,
            },
          },
        });
      }

      logger.info('Purchased Retell phone number', {
        phoneNumber: result.phone_number,
        phoneId: result.phone_id,
      });

      return NextResponse.json({
        success: true,
        phoneNumber: result.phone_number,
        phoneId: result.phone_id,
        message: 'Phone number purchased successfully',
      });
    }

    if (action === 'assign-agent') {
      // Assign agent to existing phone number
      if (!phoneNumber || !agentId) {
        return NextResponse.json({ error: 'Phone number and agent ID required' }, { status: 400 });
      }

      // Update in Retell
      await retellApiRequest(`/phone-numbers/${phoneNumber}`, {
        method: 'PATCH',
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      // Update in database
      if (prisma) {
        await prisma.phoneNumber.update({
          where: { number: phoneNumber },
          data: {
            metadata: {
              agentId,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      }

      logger.info('Assigned agent to phone number', { phoneNumber, agentId });

      return NextResponse.json({
        success: true,
        message: 'Agent assigned successfully',
      });
    }

    if (action === 'configure-retell-integration') {
      // Configure Retell integration for existing number
      if (!phoneNumber) {
        return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
      }

      // Store the Retell configuration
      // Note: Voice calls are handled directly by Retell
      if (prisma) {
        await prisma.phoneNumber.update({
          where: { number: phoneNumber },
          data: {
            metadata: {
              retellIntegration: {
                enabled: true,
                webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/retell`,
                configuredAt: new Date().toISOString(),
              },
            },
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Retell integration configured',
        webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/retell`,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    logger.error('Error managing Retell phone numbers:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to manage phone numbers' }, { status: 500 });
  }
}

// DELETE /api/retell/phone-numbers - Release phone number
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const phoneNumber = searchParams.get('phoneNumber');

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
    }

    // Release from Retell
    await retellApiRequest(`/phone-numbers/${phoneNumber}`, {
      method: 'DELETE',
    });

    // Update database
    if (prisma) {
      await prisma.phoneNumber.update({
        where: { number: phoneNumber },
        data: {
          active: false,
          metadata: {
            releasedAt: new Date().toISOString(),
          },
        },
      });
    }

    logger.info('Released Retell phone number', { phoneNumber });

    return NextResponse.json({
      success: true,
      message: 'Phone number released successfully',
    });
  } catch (error) {
    logger.error('Error releasing Retell phone number:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to release phone number' }, { status: 500 });
  }
}
