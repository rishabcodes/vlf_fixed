import { NextRequest, NextResponse } from 'next/server';
import { aiHealthChecker } from '@/lib/ai/health-check';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import type { AIHealthResponse, AITestRequest, AITestResult } from '@/types/api';

export const runtime = 'nodejs';
// GET /api/ai/health - Get AI services health status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';
    const diagnostics = searchParams.get('diagnostics') === 'true';

    // Basic health check
    const health = await aiHealthChecker.checkHealth();

    const response: AIHealthResponse = {
      status: health.status,
      timestamp: health.lastChecked,
      uptime: health.uptime,
      summary: {
        chatService: health.services.enhancedChat.available,
        translationService: health.services.translation.available,
        agentOrchestrator: health.services.agentOrchestrator.available,
        openaiConfigured: health.services.enhancedChat.openai,
        agentCount: health.services.agentOrchestrator.agentCount,
      },
    };

    // Add detailed information if requested
    if (detailed) {
      response.services = health.services;
    }

    // Add diagnostics if requested
    if (diagnostics) {
      const diagnosticsResults = await aiHealthChecker.performDiagnostics();
      response.diagnostics = diagnosticsResults;
    }

    // Summary is already included in the response object above

    // Log health check request
    logger.info('AI health check requested', {
      status: health.status,
      detailed,
      diagnostics,
      userAgent: request.headers.get('user-agent'),
    });

    // Set appropriate HTTP status based on health
    const httpStatus = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;

    return NextResponse.json(response, { status: httpStatus });
  } catch (error) {
    logger.error('AI health check API error:', errorToLogMeta(error));

    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
        summary: {
          chatService: false,
          translationService: false,
          agentOrchestrator: false,
          openaiConfigured: false,
          agentCount: 0,
        },
      },
      { status: 503 }
    );
  }
}

// POST /api/ai/health/test - Test AI services with custom input
export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en', testType = 'all' } = (await request.json()) as AITestRequest;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          error: 'Message is required and must be a string',
        },
        { status: 400 }
      );
    }

    const results: AITestResult = {
      timestamp: new Date().toISOString(),
      testMessage: message,
      language,
      testType,
      results: {},
      overallSuccess: false,
      successRate: 0,
    };

    // Test enhanced chat service - removed as service is no longer used
    if (testType === 'all' || testType === 'chat') {
      results.results.chat = {
        success: false,
        error: 'Chat service test not available - service removed',
      };
    }

    // Test translation service
    if (testType === 'all' || testType === 'translation') {
      try {
        const { aiTranslationService } = await import('@/lib/ai/translation-service');

        const targetLang = language === 'en' ? 'es' : 'en';
        const startTime = Date.now();
        const translation = await aiTranslationService.translateText(message, targetLang);

        results.results.translation = {
          success: true,
          responseTime: Date.now() - startTime,
          originalLanguage: language,
          targetLanguage: targetLang,
          translation,
        };
      } catch (error) {
        results.results.translation = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    // Test agent orchestrator - removed as service is no longer used
    if (testType === 'all' || testType === 'agents') {
      results.results.agents = {
        success: false,
        error: 'Agent orchestrator test not available - service removed',
      };
    }

    // Determine overall success
    const allTests = Object.values(results.results);
    const successfulTests = allTests.filter(test => test.success);

    results.overallSuccess = successfulTests.length === allTests.length;
    results.successRate = allTests.length > 0 ? successfulTests.length / allTests.length : 0;

    logger.info('AI service test completed', {
      testType,
      language,
      overallSuccess: results.overallSuccess,
      successRate: results.successRate,
    });

    return NextResponse.json(results);
  } catch (error) {
    logger.error('AI service test API error:', errorToLogMeta(error));

    return NextResponse.json(
      {
        error: 'Test failed',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
