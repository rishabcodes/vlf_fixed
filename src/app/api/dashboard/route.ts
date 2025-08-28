import { NextRequest, NextResponse } from 'next/server';

import { apiLogger } from '@/lib/safe-logger';
// Mock data for the live dashboard
const mockDashboardData = {
  agents: [
    {
      id: 'seo-agent-001',
      name: 'SEO Content Creator',
      task: 'Generating blog post about personal injury law',
      status: 'working' as const,
      progress: 75,
      lastActivity: new Date(),
      performance: {
        success: 124,
        errors: 2,
        efficiency: 98,
      },
    },
    {
      id: 'social-agent-002',
      name: 'Social Media Manager',
      task: 'Posting to LinkedIn about recent case win',
      status: 'working' as const,
      progress: 45,
      lastActivity: new Date(Date.now() - 5 * 60000),
      performance: {
        success: 89,
        errors: 1,
        efficiency: 95,
      },
    },
    {
      id: 'review-agent-003',
      name: 'Review Response Bot',
      task: 'Responding to Google review',
      status: 'completed' as const,
      progress: 100,
      lastActivity: new Date(Date.now() - 2 * 60000),
      performance: {
        success: 67,
        errors: 0,
        efficiency: 100,
      },
    },
    {
      id: 'lead-agent-004',
      name: 'Lead Qualification Agent',
      task: 'Analyzing new contact form submission',
      status: 'working' as const,
      progress: 30,
      lastActivity: new Date(Date.now() - 1 * 60000),
      performance: {
        success: 156,
        errors: 3,
        efficiency: 97,
      },
    },
    {
      id: 'content-agent-005',
      name: 'Legal Content Analyst',
      task: 'Monitoring federal register updates',
      status: 'idle' as const,
      progress: 0,
      lastActivity: new Date(Date.now() - 15 * 60000),
      performance: {
        success: 234,
        errors: 1,
        efficiency: 99,
      },
    },
  ],
  metrics: {
    visitorCount: Math.floor(Math.random() * 50) + 20,
    conversationsActive: Math.floor(Math.random() * 8) + 3,
    reviewsToday: Math.floor(Math.random() * 12) + 5,
    contentCreated: Math.floor(Math.random() * 20) + 15,
    rankingChanges: Math.floor(Math.random() * 5) + 2,
    socialEngagement: Math.floor(Math.random() * 150) + 100,
    leadGeneration: Math.floor(Math.random() * 25) + 18,
    conversionRate: Math.floor(Math.random() * 15) + 12,
  },
  recentActivity: [
    {
      id: `activity-${Date.now()}-1`,
      type: 'content' as const,
      message: 'New blog post published: "Understanding Immigration Law Changes"',
      timestamp: new Date(Date.now() - 2 * 60000),
      success: true,
      details: 'SEO optimized, 1,200 words, 5 target keywords',
    },
    {
      id: `activity-${Date.now()}-2`,
      type: 'review' as const,
      message: 'Responded to 5-star Google review from Maria Rodriguez',
      timestamp: new Date(Date.now() - 5 * 60000),
      success: true,
      details: 'Professional, grateful response posted',
    },
    {
      id: `activity-${Date.now()}-3`,
      type: 'lead' as const,
      message: 'New qualified lead captured from personal injury landing page',
      timestamp: new Date(Date.now() - 8 * 60000),
      success: true,
      details: 'Auto-sent to GHL, follow-up scheduled',
    },
    {
      id: `activity-${Date.now()}-4`,
      type: 'social' as const,
      message: 'Posted case result to LinkedIn with 40% engagement increase',
      timestamp: new Date(Date.now() - 12 * 60000),
      success: true,
      details: '25 likes, 8 comments, 3 shares in first hour',
    },
    {
      id: `activity-${Date.now()}-5`,
      type: 'seo' as const,
      message: 'Moved up 3 positions for "Charlotte immigration lawyer"',
      timestamp: new Date(Date.now() - 15 * 60000),
      success: true,
      details: 'Now ranking #4, increased click-through by 12%',
    },
  ],
  systemHealth: {
    uptime: 99.9,
    performance: 97,
    errors: 2,
    lastUpdate: new Date(),
  },
};

export async function GET(_request: NextRequest) {
  try {
    // Add some randomization to make it feel more live
    const data = {
      ...mockDashboardData,
      metrics: {
        ...mockDashboardData.metrics,
        visitorCount: Math.floor(Math.random() * 50) + 20,
        conversationsActive: Math.floor(Math.random() * 8) + 3,
        socialEngagement: Math.floor(Math.random() * 150) + 100,
      },
      recentActivity: mockDashboardData.recentActivity.map((activity, index) => ({
        ...activity,
        timestamp: new Date(Date.now() - (index + 1) * 3 * 60000), // Space activities 3 minutes apart
      })),
    };

    return NextResponse.json(data);
  } catch (error) {
    apiLogger.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { type, action } = body;

    if (type === 'refresh') {
      // Simulate refreshing data
      return NextResponse.json({ success: true, message: 'Data refreshed' });
    }

    if (type === 'agent_control') {
      // Simulate agent control
      return NextResponse.json({
        success: true,
        message: `Agent ${action} completed`,
      });
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
  } catch (error) {
    apiLogger.error('Dashboard POST error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
