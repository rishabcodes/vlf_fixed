import { componentLogger as logger } from '@/lib/safe-logger';

interface ContactParams {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
}

interface NoteParams {
  note: string;
}

export async function createGHLContact(params: ContactParams) {
  try {
    const response = await fetch('/api/ghl/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to create contact');
    }

    return await response.json();
  } catch (error) {
    logger.error('GHL contact creation error:', error);
    throw error;
  }
}

export async function addGHLNote(contactId: string, params: NoteParams) {
  try {
    const response = await fetch(`/api/ghl/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to add note');
    }

    return await response.json();
  } catch (error) {
    logger.error('GHL note error:', error);
    // Don't throw - notes are not critical
    return null;
  }
}
