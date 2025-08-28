/**
 * SEO Hub API Routes - SIMPLIFIED BLOG SYSTEM
 * Only handles blog generation - no social media or GMB
 */

import { NextRequest, NextResponse } from 'next/server';
import { blogOrchestrator } from '@/new-seo-agents/production/simple-blog-orchestrator';
import { CostTracker } from '@/new-seo-agents';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

/**
 * GET /api/seo-hub
 * Get system status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    
    switch (action) {
      case 'status':
        const status = blogOrchestrator.getStatus();
        const costTracker = CostTracker.getInstance();
        
        return NextResponse.json({
          success: true,
          data: {
            ...status,
            budget: {
              today: costTracker.getTodayCost(),
              month: costTracker.getMonthCost()
            },
            message: 'Blog generation system status'
          }
        });
        
      case 'cost-report':
        const days = parseInt(searchParams.get('days') || '7');
        const report = CostTracker.getInstance().getReport(days);
        return NextResponse.json({ success: true, data: report });
        
      default:
        const defaultStatus = blogOrchestrator.getStatus();
        return NextResponse.json({
          success: true,
          data: defaultStatus
        });
    }
  } catch (error) {
    logger.error('[SEO Hub API] GET error:', errorToLogMeta(error));
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seo-hub
 * Control the blog generation system
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, params } = body;
    
    switch (action) {
      case 'start':
        await blogOrchestrator.start();
        return NextResponse.json({
          success: true,
          data: {
            message: '✅ Blog generation system started',
            details: 'Generating 3 posts per week (Mon/Wed/Fri)',
            status: blogOrchestrator.getStatus()
          }
        });
        
      case 'stop':
        await blogOrchestrator.stop();
        return NextResponse.json({
          success: true,
          data: {
            message: 'Blog generation system stopped',
            isRunning: false
          }
        });
        
      case 'generate':
        // Manual blog generation
        if (!params) {
          return NextResponse.json(
            { success: false, error: 'Parameters required for manual generation' },
            { status: 400 }
          );
        }
        
        const post = await blogOrchestrator.generateOnDemand({
          topic: params.topic,
          practiceArea: params.practiceArea,
          keywords: params.keywords
        });
        
        return NextResponse.json({
          success: true,
          data: {
            message: 'Blog post generated successfully',
            post: {
              id: post.id,
              title: post.title,
              slug: post.slug,
              practiceArea: post.practiceArea,
              publishedAt: post.publishedAt
            }
          }
        });
        
      case 'generate-now':
        // Generate a single post immediately
        const immediatePost = await blogOrchestrator.generateSinglePost();
        return NextResponse.json({
          success: true,
          data: {
            message: 'Blog post generated immediately',
            post: immediatePost
          }
        });
        
      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('[SEO Hub API] POST error:', errorToLogMeta(error));
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
