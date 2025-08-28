/**
 * Test endpoint for basic blog generation
 * No dependencies, just simple GPT call
 */

import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export async function POST(request: NextRequest) {
  try {
    logger.info('[Test API] Blog generation test started');
    
    // Initialize OpenAI
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    });
    
    // Generate a simple blog post
    const prompt = `Write a professional blog post about "Immigration Law Updates 2025" for a law firm website.
    Include:
    - A compelling title
    - 3-4 main sections with headers
    - Professional tone
    - About 500 words
    
    Format as JSON with fields: title, content, excerpt`;
    
    const response = await model.invoke(prompt);
    const blogData = JSON.parse(response.content as string);
    
    // Save to database
    const prisma = getPrismaClient();
    const saved = await prisma.blogPost.create({
      data: {
        title: blogData.title,
        content: blogData.content,
        excerpt: blogData.excerpt,
        slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        practiceArea: 'immigration',
        author: 'Vasquez Law Firm',
        status: 'published',
        publishedAt: new Date(),
        metaDescription: blogData.excerpt,
        metaKeywords: ['immigration law', '2025 updates', 'visa', 'green card'],
        category: 'Legal Updates',
        language: 'en',
        readTime: 3,
        metadata: {
          generatedBy: 'Test API',
          model: 'gpt-3.5-turbo',
          timestamp: new Date().toISOString()
        }
      }
    });
    
    logger.info(`[Test API] Blog post saved: ${saved.id}`);
    
    return NextResponse.json({
      success: true,
      data: {
        message: 'Test blog post generated',
        post: {
          id: saved.id,
          title: saved.title,
          slug: saved.slug
        }
      }
    });
    
  } catch (error) {
    logger.error('[Test API] Failed:', errorToLogMeta(error));
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
