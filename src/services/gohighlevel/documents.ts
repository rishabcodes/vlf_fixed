import { componentLogger as logger } from '@/lib/safe-logger';

export async function uploadToGHL(contactId: string, file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contactId', contactId);

    const response = await fetch('/api/ghl/documents', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }

    return await response.json();
  } catch (error) {
    logger.error('GHL document upload error:', error);
    // Don't throw - document upload is not critical
    return null;
  }
}
