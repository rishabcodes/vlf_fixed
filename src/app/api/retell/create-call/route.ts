import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/safe-logger';
import { createWebCall, getAgentId } from '@/lib/retell-sdk/client';

export async function POST(req: NextRequest) {
  try {
    const { language, agentId } = await req.json();
    
    // Determine agent ID - use provided or get from environment based on language
    const finalAgentId = agentId || getAgentId(language as 'en' | 'es');
    
    // Get the agent version from environment (use published version 18)
    const agentVersion = process.env.RETELL_AGENT_VERSION ? 
      parseInt(process.env.RETELL_AGENT_VERSION) : undefined;
    
    // Simplified call creation - match API docs exactly
    const callData = await createWebCall({
      agentId: finalAgentId,
      agentVersion: agentVersion, // Use published version 18
      // Don't add metadata or other fields unless absolutely necessary
    });
    
    // Log the response for debugging
    logger.info('Retell API response:', {
      has_access_token: !!callData.access_token,
      has_call_id: !!callData.call_id,
      call_id: callData.call_id,
      call_status: callData.call_status,
      call_type: callData.call_type,
    });
    
    // Check for potential issues
    if (callData.call_status === 'error' || callData.call_status === 'not_connected') {
      logger.error('Call created with error status:', callData.call_status);
    }
    
    // Return the essential fields for the client
    return NextResponse.json({
      access_token: callData.access_token, // Use snake_case as expected by SDK
      call_id: callData.call_id,
      call_status: callData.call_status,
      call_type: callData.call_type,
    });
  } catch (error) {
    logger.error('Failed to create Retell call:', error);
    return NextResponse.json(
      { error: 'Failed to create voice call' },
      { status: 500 }
    );
  }
}
