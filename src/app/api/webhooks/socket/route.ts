import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';

export async function POST(req: NextRequest) {
  apiLogger.request(req.method, req.url, {});

  try {
    const { event, data } = await req.json();

    // Handle different socket events
    switch (event) {
      case 'chat:message':
        // Handle chat message
        apiLogger.info('socket-chat-message', data);
        break;

      case 'call:status':
        // Handle call status update
        apiLogger.info('socket-call-status', data);
        break;

      case 'user:connected':
        // Handle user connection
        apiLogger.info('socket-user-connected', data);
        break;

      default:
        if (apiLogger.warn) {
          apiLogger.warn('socket-unknown-event', { event });
        } else {
          apiLogger.info('socket-unknown-event', { event });
        }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    apiLogger.error('socket-webhook', error as Error);
    return NextResponse.json({ error: 'Failed to process socket event' }, { status: 500 });
  }
}
