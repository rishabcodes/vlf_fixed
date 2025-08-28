import { componentLogger as logger } from '@/lib/safe-logger';

// Safe wrapper for pdf-parse to handle test file loading issue
export async function parsePDF(buffer: Buffer): Promise<{ text: string; numpages: number }> {
  try {
    // Dynamic import to avoid initialization issues
    const pdfParse = await import('pdf-parse/lib/pdf-parse.js' as any);

    // Use the parser without the test file
    const options = {
      // Disable the default test file loading
      pagerender: null,
      max: 0,
    };

    const data = await pdfParse.default(buffer, options);
    return {
      text: data.text || '',
      numpages: data.numpages || 0,
    };
  } catch (error) {
    logger.error('PDF parsing error:', error);
    // Fallback if pdf-parse fails
    return {
      text: '',
      numpages: 0,
    };
  }
}
