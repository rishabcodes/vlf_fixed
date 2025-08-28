import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;
    const language = (formData.get('language') as string) || 'en';

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Convert audio blob to buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());

    // Create a File object for OpenAI
    const file = new File([buffer], 'audio.webm', { type: 'audio/webm' });

    // Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: language === 'es' ? 'es' : 'en',
    });

    return NextResponse.json({
      transcript: transcription.text,
      language,
    });
  } catch (error) {
    logger.error('Voice processing error:', error);
    return NextResponse.json({ error: 'Failed to process voice input' }, { status: 500 });
  }
}
