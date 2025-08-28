import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      hasDatabase: !!process.env.DATABASE_URL,
      hasNextAuth: !!process.env.NEXTAUTH_SECRET,
      hasOpenAI: !!process.env.OPENAI_API_KEY,
    },
    build: {
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      deployment: process.env.VERCEL_URL || 'local',
    },
  });
}
