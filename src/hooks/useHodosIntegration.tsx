import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/safe-logger';
import { useHodos } from '@/hooks/useHodos';

interface UseHodosIntegrationProps {
  onAgentResponse: (response: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Integrates HODOS AI agents with the chat widget
 * Handles complex legal questions by delegating to specialized agents
 */
export const useHodosIntegration = ({ onAgentResponse, onError }: UseHodosIntegrationProps) => {
  const { getAIAssistance, loading } = useHodos();
  const [isConnected, setIsConnected] = useState(false);

  // Check HODOS connection on mount
  useEffect(() => {
    checkHodosConnection();
  }, []);

  const checkHodosConnection = async () => {
    try {
      const response = await fetch('/api/hodos/health');
      setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
        }
};

  /**
   * Analyze message complexity and determine if HODOS assistance is needed
   */
  const analyzeComplexity = (message: string): boolean => {
    const complexPatterns = [
      /legal advice/i,
      /case strategy/i,
      /document review/i,
      /court procedure/i,
      /immigration status/i,
      /criminal defense/i,
      /family law/i,
      /personal injury/i,
      /workers compensation/i,
      /specific law/i,
      /precedent/i,
      /statute/i,
    ];

    return complexPatterns.some(pattern => pattern.test(message));
  };

  /**
   * Get specialized agent based on legal area
   */
  const selectAgent = (message: string): string | undefined => {
    const agentMapping = {
      immigration: 'Marcus', // Immigration specialist
      criminal: 'Grace', // Criminal law expert
      family: 'Mitchell', // Family law specialist
      injury: 'Roland', // Personal injury expert
      workers: 'Sage', // Workers comp specialist
    };

    const lowerMessage = message.toLowerCase();

    for (const [keyword, agent] of Object.entries(agentMapping)) {
      if (lowerMessage.includes(keyword)) {
        return agent;
      }
    }

    return undefined; // Let HODOS choose the best agent
  };

  /**
   * Process message through HODOS if needed
   */
  const processMessage = async (
    message: string,
    conversationHistory?: unknown[]
  ): Promise<string | null> => {
    // Check if message needs HODOS assistance
    if (!analyzeComplexity(message)) {
      return null;
    }

    if (!isConnected) {
      return "I'm having trouble connecting to our advanced legal AI system. Please try again later or contact us directly.";
    }

    try {
      const agent = selectAgent(message);
      const response = await getAIAssistance(message, {
        agent,
        conversationHistory,
        source: 'chat-widget',
      });

      if (response && typeof response === 'object' && 'response' in response) {
        // Add disclaimer for legal advice
        const disclaimer =
          '\n\n*This information is for general guidance only and does not constitute legal advice. Please consult with one of our attorneys for advice specific to your situation.*';
        return (response as { response: string }).response + disclaimer;
      }

      return null;
    } catch (error) {
      onError?.(error as Error);
      return 'I encountered an error while processing your request. Please try again or contact us directly.';
        }
};

  /**
   * Handle document analysis requests
   */
  const analyzeDocument = async (file: File, question: string): Promise<string> => {
    if (!isConnected) {
      return 'Document analysis is currently unavailable. Please try again later.';
    }

    try {
      // Upload document to HODOS for analysis
      const response = await getAIAssistance(`Analyze this document and answer: ${question}`, {
        documentName: file.name,
        documentType: file.type,
        agent: 'Sage', // Document analysis specialist
      });

      return (
        (response && typeof response === 'object' && 'response' in response
          ? (response as { response: string }).response
          : null) || 'Unable to analyze the document at this time.'
      );
    } catch (error) {
      onError?.(error as Error);
      return 'Error analyzing document. Please try again.';
        }
};

  return {
    isConnected,
    loading,
    processMessage,
    analyzeDocument,
    checkHodosConnection,
  };
};

/**
 * Example usage in ChatWidget component:
 *
 * const { processMessage } = useHodosIntegration({
 *   onAgentResponse: (response) => {
 *     addMessage({ text: response, sender: 'agent' });
 *   },
 *   onError: (error) => {
 *     logger.error('HODOS error:', error);
 *   }
 * });
 *
 * // In your message handler:
 * const hodosResponse = await processMessage(userMessage, conversationHistory);
 * if (hodosResponse) {
 *   // Use HODOS response
 * } else {
 *   // Use regular chatbot response
 * }
 */
