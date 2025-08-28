// Chat API types
export interface ChatRequest {
  message: string;
  userId?: string;
  language?: 'en' | 'es';
  sessionId?: string;
}

export interface ChatResponse {
  response: string;
  quickResponse?: string;
  sessionId?: string;
  userId?: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  metadata?: {
    quickResponse?: boolean;
    intent?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    extractedInfo?: Record<string, string | number | boolean>;
    timestamp?: string;
  } | null;
}

export interface ConversationHistoryResponse {
  conversation: {
    id: string;
    status: string;
    language: string;
    startedAt: Date;
    endedAt: Date | null;
    messages: Array<{
      id: string;
      role: string;
      content: string;
      createdAt: Date;
      metadata: {
        quickResponse?: boolean;
        intent?: string;
        sentiment?: 'positive' | 'negative' | 'neutral';
        extractedInfo?: Record<string, string | number | boolean>;
        timestamp?: string;
      } | null;
    }>;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  };
}
