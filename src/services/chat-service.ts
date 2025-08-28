import { ChatMessage } from '@/types/chat';

interface SendMessageParams {
  message: string;
  language: string;
  sessionId: string;
  contactId?: string;
  contactName?: string;
  phoneNumber?: string;
  ghlContactId?: string;
  ghlNoteIds?: string[];
  conversationHistory?: any[];
}

interface ChatResponse {
  message: string;
  response?: string;
  type?: 'text' | 'document' | 'voice' | 'appointment';
  metadata?: any;
  ghlContactId?: string;
  ghlNoteIds?: string[];
  extractedInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  noteCreated?: boolean;
  noteUpdated?: boolean;
}

export async function sendChatMessage(params: SendMessageParams): Promise<ChatResponse> {
  try {
    // Check if we should use the new agent system
    const useAgentSystem = process.env.NEXT_PUBLIC_USE_AGENT_SYSTEM === 'true';
    const endpoint = useAgentSystem ? '/api/chat/agent' : '/api/chat';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: params.message,
        language: params.language,
        sessionId: params.sessionId,
        contactId: params.contactId,
        contactName: params.contactName,
        phoneNumber: params.phoneNumber,
        ghlContactId: params.ghlContactId,
        ghlNoteIds: params.ghlNoteIds,
        conversationHistory: params.conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return {
      message: data.response || data.message,
      response: data.response,
      type: data.type || 'text',
      metadata: data.metadata,
      ghlContactId: data.ghlContactId,
      ghlNoteIds: data.ghlNoteIds,
      extractedInfo: data.extractedInfo,
      noteCreated: data.noteCreated,
      noteUpdated: data.noteUpdated,
    };
  } catch (error) {
    console.error('Chat service error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}
