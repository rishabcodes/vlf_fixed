import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import {
  RETELL_CONFIG,
  initializeRetellAgents,
  createRetellAgentConfig,
  VOICE_AGENTS,
} from '@/services/retell/agent-config';

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

// GET /api/retell/agents - List all configured agents
export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only admins can manage voice agents
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get agents from Retell
    const agents = await retellApiRequest('/agents');

    // Get local configurations
    const localConfigs = await initializeRetellAgents();

    return NextResponse.json({
      retellAgents: agents,
      localConfigs,
      configured: true,
      apiKeySet: !!RETELL_CONFIG.apiKey,
    });
  } catch (error) {
    logger.error('Error fetching Retell agents:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

// POST /api/retell/agents - Create or update agents
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, agentType } = await req.json();

    if (action === 'create') {
      if (!agentType || !VOICE_AGENTS[agentType as keyof typeof VOICE_AGENTS]) {
        return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
      }

      // Create agent configuration
      const config = createRetellAgentConfig(agentType);

      // Create agent in Retell
      const agent = await retellApiRequest('/agents', {
        method: 'POST',
        body: JSON.stringify(config),
      });

      logger.info('Created Retell agent', { agentType, agentId: agent.agent_id });

      return NextResponse.json({
        success: true,
        agent,
        message: `Successfully created ${agentType} agent`,
      });
    }

    if (action === 'create-all') {
      const results: Array<{
        agentType: string;
        success: boolean;
        agentId?: string;
        error?: string;
      }> = [];

      for (const [key] of Object.entries(VOICE_AGENTS)) {
        try {
          const config = createRetellAgentConfig(key as keyof typeof VOICE_AGENTS);
          const agent = await retellApiRequest('/agents', {
            method: 'POST',
            body: JSON.stringify(config),
          });

          results.push({
            agentType: key,
            success: true,
            agentId: agent.agent_id,
          });
        } catch (error) {
          logger.error(`Failed to create agent ${key}:`, errorToLogMeta(error));
          results.push({
            agentType: key,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      return NextResponse.json({
        results,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    logger.error('Error creating Retell agents:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to create agents' }, { status: 500 });
  }
}

// DELETE /api/retell/agents/:id - Delete an agent
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get('agentId');

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID required' }, { status: 400 });
    }

    await retellApiRequest(`/agents/${agentId}`, {
      method: 'DELETE',
    });

    logger.info('Deleted Retell agent', { agentId });

    return NextResponse.json({
      success: true,
      message: 'Agent deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting Retell agent:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}
