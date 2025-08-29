import { NextRequest, NextResponse } from 'next/server';
import { ghlMCPClient } from '@/new-chatbot-ghl/services/ghl-mcp-client';
import { ChatSummarizer } from '@/services/chat-summarizer';
import { logger } from '@/lib/safe-logger';

export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and text/plain (from sendBeacon)
    let data;
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('text/plain')) {
      // sendBeacon sends as text/plain
      const text = await request.text();
      data = JSON.parse(text);
    } else {
      data = await request.json();
    }
    
    const { 
      sessionId, 
      messages, 
      startTime, 
      contactId,
      noteId,
      contactName,
      contactPhone,
      abandoned = false
    } = data;

    if (!sessionId || !messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Session ID and messages are required' },
        { status: 400 }
      );
    }

    // Generate chat summary
    const endTime = new Date();
    const startTimeDate = new Date(startTime || Date.now() - 600000); // Default 10 min ago
    
    const summary = ChatSummarizer.generateSummary(
      sessionId,
      messages,
      startTimeDate,
      endTime,
      messages[0]?.language || 'en'
    );

    // Always save to GHL (even for anonymous users)
    let ghlContactId = contactId;
    let currentNoteId = noteId;
    
    try {
      // Create or find contact
      if (!ghlContactId) {
        if (contactPhone) {
          // If we have a phone, use it to find/create contact
          const result = await ghlMCPClient.createOrUpdateContact({
            firstName: contactName?.split(' ')[0] || 'Chat',
            lastName: contactName?.split(' ').slice(1).join(' ') || 'User',
            phone: contactPhone,
            email: '',
            tags: ['Website-chatbot']
          }, summary);
          
          ghlContactId = result.id;
        } else {
          // Create anonymous contact using session ID
          const result = await ghlMCPClient.createOrUpdateContact({
            firstName: 'Anonymous',
            lastName: `Session-${sessionId.slice(-6)}`,
            email: `${sessionId}@chat.vasquezlaw.com`,
            tags: ['Website-chatbot', 'anonymous'],
          }, summary);
          
          ghlContactId = result.id;
        }
      }
        
        // Format full conversation
        const conversationText = messages
          .map((msg: any) => {
            const role = msg.role === 'user' ? 'User' : 'Assistant';
            const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : '';
            return `[${timestamp}] ${role}: ${msg.content}`;
          })
          .join('\n');
        
        // Create comprehensive note
        const noteContent = `
===========================================
CHAT CONVERSATION - ${new Date().toLocaleString()}
===========================================
${abandoned ? '⚠️ SESSION ABANDONED - User closed browser/tab\n' : ''}
SESSION INFO:
- Session ID: ${sessionId}
- Duration: ${Math.round(summary.duration / 60000)} minutes
- Topic: ${summary.topic}
- Agent: ${summary.agent}
- Language: ${summary.language === 'es' ? 'Spanish' : 'English'}
- Sentiment: ${summary.sentiment}
- Status: ${abandoned ? 'ABANDONED' : 'COMPLETED'}

SUMMARY:
${summary.summary}

KEY POINTS:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

${summary.followUpRequired.length > 0 ? `FOLLOW-UP REQUIRED:
${summary.followUpRequired.map(item => `• ${item}`).join('\n')}
` : ''}

FULL CONVERSATION:
-------------------------------------------
${conversationText}
-------------------------------------------

===========================================
END OF CONVERSATION
===========================================
`;
        
        // Save or update note in GHL
        if (ghlContactId) {
          let finalNoteId = currentNoteId;
          
          // If we have an existing note ID, try to update it
          if (currentNoteId) {
            const updated = await ghlMCPClient.updateContactNote(ghlContactId, currentNoteId, noteContent);
            
            if (!updated) {
              // If update failed, create a new note
              logger.warn('Failed to update existing note, creating new one', { 
                contactId: ghlContactId, 
                noteId: currentNoteId 
              });
              const newNoteId = await ghlMCPClient.createContactNote(ghlContactId, noteContent);
              finalNoteId = newNoteId || currentNoteId;
            }
            
            logger.info('Chat conversation updated in GHL', { 
              contactId: ghlContactId, 
              noteId: currentNoteId,
              sessionId 
            });
          } else {
            // No existing note, create a new one
            const newNoteId = await ghlMCPClient.createContactNote(ghlContactId, noteContent);
            finalNoteId = newNoteId;
            
            logger.info('Chat conversation saved to GHL', { 
              contactId: ghlContactId, 
              noteId: newNoteId,
              sessionId 
            });
          }
          
          return NextResponse.json({
            success: true,
            summary,
            ghlContactId,
            noteId: finalNoteId,
            message: 'Conversation saved successfully'
          });
        }
        
        return NextResponse.json({
          success: true,
          summary,
          message: 'Conversation saved successfully'
        });
        
    } catch (error) {
      logger.error('Failed to save to GHL', error);
      // Don't fail the whole request if GHL fails
      return NextResponse.json({
        success: true,
        summary,
        warning: 'Conversation ended but could not save to GHL'
      });
    }
    
  } catch (error) {
    logger.error('End session error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to end session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}