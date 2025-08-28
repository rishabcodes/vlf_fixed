import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import OpenAI from 'openai';
import { parsePDF } from '@/lib/pdf-parser';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const language = (formData.get('language') as string) || 'en';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    let textContent = '';

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfData = await parsePDF(buffer);
      textContent = pdfData.text;

      if (!textContent) {
        return NextResponse.json({
          analysis:
            language === 'es'
              ? 'No se pudo extraer texto del PDF. Por favor describa el contenido del documento.'
              : 'Could not extract text from PDF. Please describe the document contents.',
          documentType: file.type,
          fileName: file.name,
        });
      }
    } else if (file.type.startsWith('text/')) {
      textContent = await file.text();
    } else if (file.type.startsWith('image/')) {
      // For images, we could use OCR or vision API in the future
      return NextResponse.json({
        analysis:
          language === 'es'
            ? 'Imagen recibida. Por favor describa qué necesita saber sobre este documento.'
            : 'Image received. Please describe what you need to know about this document.',
        documentType: file.type,
        fileName: file.name,
      });
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Only analyze if we have text content
    if (!textContent) {
      return NextResponse.json({
        analysis:
          language === 'es'
            ? 'Documento recibido. Por favor describa qué necesita saber.'
            : 'Document received. Please describe what you need to know.',
        documentType: file.type,
        fileName: file.name,
      });
    }

    // Analyze document with AI
    const prompt =
      language === 'es'
        ? `Analiza el siguiente documento legal y proporciona un resumen conciso de los puntos clave, posibles problemas legales y recomendaciones:\n\n${textContent.substring(0, 4000)}`
        : `Analyze the following legal document and provide a concise summary of key points, potential legal issues, and recommendations:\n\n${textContent.substring(0, 4000)}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            language === 'es'
              ? 'Eres un asistente legal experto. Analiza documentos y proporciona información útil de manera clara y concisa.'
              : 'You are an expert legal assistant. Analyze documents and provide helpful insights in a clear and concise manner.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({
      analysis: completion.choices[0]?.message?.content || 'No analysis available',
      documentType: file.type,
      fileName: file.name,
    });
  } catch (error) {
    logger.error('Document processing error:', error);
    return NextResponse.json({ error: 'Failed to process document' }, { status: 500 });
  }
}
