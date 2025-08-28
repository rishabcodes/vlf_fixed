/**
 * Summarization Agent
 * Generates intelligent summaries of chat conversations for GHL notes
 */

import { BaseAgent } from '../agents/base-agent';
import { componentLogger as logger } from '@/lib/safe-logger';
import { z } from 'zod';
import OpenAI from 'openai';

// Conversation message schema
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  timestamp: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

// Summary output schema
const SummarySchema = z.object({
  summary: z.string().describe('Concise summary of the conversation'),
  topic: z.string().describe('Main topic or subject discussed'),
  keyPoints: z.array(z.string()).describe('Key points from the conversation'),
  followUpRequired: z.array(z.string()).describe('Follow-up actions needed'),
  sentiment: z.enum(['positive', 'neutral', 'concerned', 'urgent']).describe('Overall sentiment'),
  contactInfo: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    extracted: z.boolean()
  }).optional(),
  legalIssues: z.array(z.string()).describe('Legal issues mentioned'),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).describe('Urgency level'),
  recommendedAction: z.string().describe('Recommended next step for the firm')
});

export type ConversationMessage = z.infer<typeof MessageSchema>;
export type ConversationSummary = z.infer<typeof SummarySchema>;

export class SummarizationAgent extends BaseAgent {
  private openai: OpenAI;
  
  constructor() {
    super('summarization', 'Summarization Agent');
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  /**
   * Summarize a conversation
   */
  async summarizeConversation(
    messages: ConversationMessage[],
    context: {
      sessionId: string;
      duration?: number;
      language?: 'en' | 'es';
      agentName?: string;
    }
  ): Promise<ConversationSummary> {
    try {
      // Build conversation text
      const conversationText = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      // Create prompt for summarization
      const systemPrompt = `You are a legal assistant summarizing a client conversation for a law firm's CRM system.
      
Your task is to:
1. Create a concise but comprehensive summary
2. Extract key points and legal issues discussed
3. Identify any follow-up actions needed
4. Determine the overall sentiment and urgency
5. Extract contact information if mentioned
6. Recommend next steps for the firm

Focus on:
- Legal issues and questions raised
- Client's current situation and needs
- Any deadlines or time-sensitive matters
- Contact information shared
- Emotional state and concerns`;

      const userPrompt = `Please summarize the following conversation:

${conversationText}

Context:
- Session ID: ${context.sessionId}
- Duration: ${context.duration ? Math.round(context.duration / 60) + ' minutes' : 'Unknown'}
- Language: ${context.language === 'es' ? 'Spanish' : 'English'}
- Agent: ${context.agentName || 'Chatbot'}

Provide a structured summary following the required format.`;

      // Use OpenAI to generate summary
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        functions: [{
          name: 'generateSummary',
          description: 'Generate a structured summary of the conversation',
          parameters: SummarySchema
        }],
        function_call: { name: 'generateSummary' },
        temperature: 0.3, // Lower temperature for more consistent summaries
        max_tokens: 1000
      });
      
      // Parse the function call response
      const functionCall = completion.choices[0]?.message?.function_call;
      if (!functionCall?.arguments) {
        throw new Error('No summary generated');
      }
      
      const summary = JSON.parse(functionCall.arguments) as ConversationSummary;
      
      // Validate the summary
      const validated = SummarySchema.parse(summary);
      
      // Log for debugging
      logger.info('[SummarizationAgent] Generated summary:', {
        sessionId: context.sessionId,
        topic: validated.topic,
        sentiment: validated.sentiment,
        urgency: validated.urgency,
        keyPointsCount: validated.keyPoints.length,
        followUpsCount: validated.followUpRequired.length
      });
      
      return validated;
    } catch (error) {
      logger.error('[SummarizationAgent] Error generating summary:', error);
      
      // Return a basic summary if AI fails
      return this.generateFallbackSummary(messages, context);
    }
  }
  
  /**
   * Generate a basic summary if AI fails
   */
  private generateFallbackSummary(
    messages: ConversationMessage[],
    context: any
  ): ConversationSummary {
    // Extract any contact info from messages
    const contactInfo = this.extractContactInfo(messages);
    
    // Count user messages for basic stats
    const userMessages = messages.filter(m => m.role === 'user');
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    
    return {
      summary: `Chat session with ${userMessages.length} user messages and ${assistantMessages.length} responses. ${
        contactInfo.extracted ? `Contact: ${contactInfo.name || 'Unknown'}, ${contactInfo.email || 'No email'}, ${contactInfo.phone || 'No phone'}.` : 'No contact information provided.'
      }`,
      topic: 'General inquiry',
      keyPoints: userMessages.slice(0, 3).map(m => m.content.substring(0, 100)),
      followUpRequired: ['Review conversation', 'Follow up with client'],
      sentiment: 'neutral',
      contactInfo,
      legalIssues: ['To be determined'],
      urgency: 'medium',
      recommendedAction: 'Review conversation and follow up with client'
    };
  }
  
  /**
   * Extract contact information from messages
   */
  private extractContactInfo(messages: ConversationMessage[]): any {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    const namePatterns = [
      /my name is ([A-Za-z]+ [A-Za-z]+)/i,
      /i am ([A-Za-z]+ [A-Za-z]+)/i,
      /call me ([A-Za-z]+)/i
    ];
    
    let contactInfo = {
      name: undefined as string | undefined,
      email: undefined as string | undefined,
      phone: undefined as string | undefined,
      extracted: false
    };
    
    for (const message of messages) {
      if (message.role !== 'user') continue;
      
      // Extract email
      const emailMatch = message.content.match(emailRegex);
      if (emailMatch && !contactInfo.email) {
        contactInfo.email = emailMatch[0];
        contactInfo.extracted = true;
      }
      
      // Extract phone
      const phoneMatch = message.content.match(phoneRegex);
      if (phoneMatch && !contactInfo.phone) {
        contactInfo.phone = phoneMatch[0];
        contactInfo.extracted = true;
      }
      
      // Extract name
      for (const pattern of namePatterns) {
        const nameMatch = message.content.match(pattern);
        if (nameMatch && !contactInfo.name) {
          contactInfo.name = nameMatch[1];
          contactInfo.extracted = true;
          break;
        }
      }
    }
    
    return contactInfo;
  }
  
  /**
   * Format summary for GHL notes
   */
  formatForGHLNotes(
    summary: ConversationSummary,
    context: {
      sessionId: string;
      timestamp: string;
      duration?: number;
      language?: 'en' | 'es';
      agentName?: string;
    }
  ): string {
    const divider = '='.repeat(50);
    const date = new Date(context.timestamp).toLocaleString();
    
    return `${divider}
🤖 CHAT SESSION SUMMARY
${divider}
📅 Date: ${date}
🆔 Session: ${context.sessionId}
⏱️ Duration: ${context.duration ? Math.round(context.duration / 60) + ' minutes' : 'Unknown'}
🌐 Language: ${context.language === 'es' ? 'Spanish' : 'English'}
🤖 Agent: ${context.agentName || 'AI Assistant'}

📋 TOPIC: ${summary.topic}
🚨 Urgency: ${summary.urgency.toUpperCase()}
💭 Sentiment: ${summary.sentiment}

📝 SUMMARY:
${summary.summary}

🔑 KEY POINTS:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

⚖️ LEGAL ISSUES:
${summary.legalIssues.map(issue => `• ${issue}`).join('\n')}

📌 FOLLOW-UP REQUIRED:
${summary.followUpRequired.map(item => `• ${item}`).join('\n')}

🎯 RECOMMENDED ACTION:
${summary.recommendedAction}

${summary.contactInfo?.extracted ? `
👤 CONTACT INFORMATION:
• Name: ${summary.contactInfo.name || 'Not provided'}
• Email: ${summary.contactInfo.email || 'Not provided'}
• Phone: ${summary.contactInfo.phone || 'Not provided'}
` : ''}
${divider}
Generated by Vasquez Law Firm AI Assistant
${divider}`;
  }
  
  /**
   * Process a message (required by BaseAgent)
   */
  async processMessage(message: string, context: any): Promise<any> {
    // This agent doesn't process individual messages
    // It summarizes entire conversations
    return {
      message: 'This agent summarizes complete conversations, not individual messages.',
      metadata: {  }
};
  }
}
