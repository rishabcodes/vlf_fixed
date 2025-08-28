import { ChatSummary } from '@/new-chatbot-ghl/services/ghl-mcp-client';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
  timestamp?: Date;
}

export class ChatSummarizer {
  /**
   * Generate a structured summary of the chat conversation
   */
  static generateSummary(
    sessionId: string,
    messages: ConversationMessage[],
    startTime: Date,
    endTime: Date,
    language: 'en' | 'es' = 'en'
  ): ChatSummary {
    // Calculate duration in milliseconds
    const duration = endTime.getTime() - startTime.getTime();
    
    // Extract key information from conversation
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    
    // Determine primary topic
    const topic = this.extractTopic(userMessages);
    
    // Determine primary agent
    const agents = assistantMessages
      .map(m => m.agent)
      .filter(Boolean);
    const primaryAgent = agents.length > 0 ? agents[agents.length - 1] || 'Classification Agent' : 'Classification Agent';
    
    // Generate summary
    const summary = this.createSummary(messages);
    
    // Extract key points
    const keyPoints = this.extractKeyPoints(messages);
    
    // Identify follow-up items
    const followUpRequired = this.identifyFollowUp(messages);
    
    // Analyze sentiment
    const sentiment = this.analyzeSentiment(userMessages);
    
    return {
      sessionId,
      timestamp: startTime.toISOString(),
      duration,
      language,
      topic,
      agent: primaryAgent,
      summary,
      keyPoints,
      followUpRequired,
      sentiment
    };
  }
  
  private static extractTopic(userMessages: string[]): string {
    const allText = userMessages.join(' ').toLowerCase();
    
    // Check for common legal topics
    const topics = {
      'Immigration': ['immigration', 'visa', 'green card', 'citizenship', 'deportation'],
      'Criminal Defense': ['criminal', 'arrest', 'charge', 'dui', 'jail'],
      'Personal Injury': ['accident', 'injury', 'hurt', 'insurance', 'crash'],
      'Family Law': ['divorce', 'custody', 'child support', 'family'],
      'Business': ['business', 'llc', 'contract', 'company'],
      'Traffic': ['ticket', 'traffic', 'violation', 'speeding'],
      'General Inquiry': []
    };
    
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => allText.includes(keyword))) {
        return topic;
      }
    }
    
    return 'General Inquiry';
  }
  
  private static createSummary(messages: ConversationMessage[]): string {
    if (messages.length < 2) {
      return 'Brief initial contact with no specific inquiry.';
    }
    
    // Get first substantive user message (skip name/phone)
    const substantiveMessages = messages.filter(m => 
      m.role === 'user' && 
      m.content.length > 20 &&
      !m.content.match(/^\d{10,}$/) // Not just a phone number
    );
    
    if (substantiveMessages.length === 0) {
      return 'Contact information collected. No specific legal inquiry made.';
    }
    
    const firstInquiry = substantiveMessages[0].content;
    const lastResponse = messages
      .filter(m => m.role === 'assistant')
      .slice(-1)[0]?.content || '';
    
    return `User inquired about: "${firstInquiry.substring(0, 100)}${firstInquiry.length > 100 ? '...' : ''}". ` +
           `System provided guidance and ${lastResponse.includes('connecting') ? 'routed to specialist' : 'answered questions'}.`;
  }
  
  private static extractKeyPoints(messages: ConversationMessage[]): string[] {
    const keyPoints: string[] = [];
    
    // Look for emergency mentions
    const hasEmergency = messages.some(m => 
      m.content.toLowerCase().includes('emergency') ||
      m.content.toLowerCase().includes('detained') ||
      m.content.toLowerCase().includes('urgent')
    );
    if (hasEmergency) {
      keyPoints.push('Emergency/urgent situation identified');
    }
    
    // Look for existing client status
    const isExistingClient = messages.some(m => 
      m.content.toLowerCase().includes('existing client') &&
      m.role === 'user' &&
      (m.content.toLowerCase().includes('yes') || m.content.toLowerCase().includes('si'))
    );
    if (isExistingClient) {
      keyPoints.push('Existing client');
    }
    
    // Look for document mentions
    if (messages.some(m => m.content.toLowerCase().includes('document'))) {
      keyPoints.push('Documents discussed');
    }
    
    // Look for appointment requests
    if (messages.some(m => m.content.toLowerCase().includes('appointment') || m.content.toLowerCase().includes('meeting'))) {
      keyPoints.push('Appointment requested');
    }
    
    return keyPoints.length > 0 ? keyPoints : ['Initial consultation'];
  }
  
  private static identifyFollowUp(messages: ConversationMessage[]): string[] {
    const followUp: string[] = [];
    
    // Check if user asked for callback
    if (messages.some(m => m.content.toLowerCase().includes('call me') || m.content.toLowerCase().includes('callback'))) {
      followUp.push('Callback requested');
    }
    
    // Check if documents needed
    if (messages.some(m => m.content.toLowerCase().includes('send') || m.content.toLowerCase().includes('email'))) {
      followUp.push('Information to be sent');
    }
    
    // Check if appointment scheduling incomplete
    if (messages.some(m => m.content.toLowerCase().includes('schedule')) && 
        !messages.some(m => m.content.toLowerCase().includes('scheduled'))) {
      followUp.push('Complete appointment scheduling');
    }
    
    return followUp;
  }
  
  private static analyzeSentiment(userMessages: string[]): 'positive' | 'neutral' | 'concerned' {
    const allText = userMessages.join(' ').toLowerCase();
    
    const concernedWords = ['urgent', 'emergency', 'worried', 'scared', 'help', 'detained', 'arrested', 'desperate'];
    const positiveWords = ['thank', 'great', 'good', 'appreciate', 'helpful', 'excellent'];
    
    const concernedCount = concernedWords.filter(word => allText.includes(word)).length;
    const positiveCount = positiveWords.filter(word => allText.includes(word)).length;
    
    if (concernedCount > positiveCount) {
      return 'concerned';
    } else if (positiveCount > concernedCount) {
      return 'positive';
    }
    
    return 'neutral';
  }
}