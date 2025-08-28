/**
 * Enhanced Contact Form API v2 - GHL Only
 * Uses the GHL MCP Client for direct integration
 * No database writes - everything goes to GHL
 */

import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { contactFormSchema } from '@/lib/validations/forms';
import { contactFormLimiter } from '@/lib/rate-limiter';
import { GHLMCPClient } from '@/new-chatbot/ghl-agents/ghl-mcp-client';
import { withLeadCaptureTracing } from '@/lib/telemetry/api-middleware';

/**
 * Contact form handler with GHL MCP integration only
 */
async function handleContactFormV2(req: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await contactFormLimiter({
      headers: Object.fromEntries(req.headers.entries()),
      ip: req.headers.get('x-forwarded-for') || req.ip || undefined,
    });
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();
    
    // Validate input
    const validatedData = contactFormSchema.parse(body);
    
    // Check honeypot
    if (validatedData.website) {
      apiLogger.warn('Honeypot triggered', { 
        ip: req.headers.get('x-forwarded-for') 
      });
      // Return success to not reveal honeypot
      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us.',
      });
    }

    // Initialize GHL client
    const ghlClient = new GHLMCPClient();
    
    // Check if GHL is configured
    if (!ghlClient.isConfigured()) {
      apiLogger.error('GHL not configured - missing PIT token');
      return NextResponse.json(
        {
          success: false,
          error: 'Contact system is not properly configured. Please call us directly at 1-877-827-7839.',
        },
        { status: 503 }
      );
    }
    
    // Determine lead qualification based on message content and case type
    const leadScore = calculateLeadScore(validatedData);
    const qualification = getQualification(leadScore);
    
    // Prepare tags based on form data
    const tags = [
      'Website Contact Form',
      `Score: ${leadScore}`,
      qualification,
      validatedData.caseType,
      validatedData.language === 'es' ? 'Spanish Speaker' : 'English Speaker'
    ];
    
    // Add urgency tags
    const urgentKeywords = ['urgent', 'emergency', 'immediately', 'asap', 'today', 'accident', 'injury', 'injured'];
    const hasUrgency = urgentKeywords.some(keyword => 
      validatedData.message.toLowerCase().includes(keyword)
    );
    if (hasUrgency) {
      tags.push('URGENT');
    }
    
    // Custom fields for GHL
    const customFields = {
      practice_area: validatedData.caseType,
      initial_message: validatedData.message,
      preferred_contact: validatedData.preferredContact,
      location: validatedData.location || 'Not specified',
      language: validatedData.language || 'en',
      lead_score: leadScore.toString(),
      qualification: qualification,
      form_submission_date: new Date().toISOString(),
      source_form: req.headers.get('referer')?.includes('free-consultation') ? 'Free Consultation' : 'Contact'
    };
    
    // Create or update contact in GHL using the correct method
    try {
      const contactResult = await ghlClient.createOrUpdateContact({
        firstName: validatedData.name.split(' ')[0],
        lastName: validatedData.name.split(' ').slice(1).join(' ') || '',
        email: validatedData.email,
        phone: validatedData.phone,
        tags,
        customFields
      });
      
      apiLogger.info('GHL contact created/updated', {
        contactId: contactResult.id,
        created: contactResult.created,
        updated: contactResult.updated,
        email: validatedData.email,
        qualification
      });
      
      // Add a note with the initial message for better tracking
      if (contactResult.id) {
        const noteContent = `
==============================================
Contact Form Submission
==============================================
Date: ${new Date().toLocaleString()}
Form: ${req.headers.get('referer')?.includes('free-consultation') ? 'Free Consultation' : 'Contact'}
Case Type: ${validatedData.caseType}
Preferred Contact: ${validatedData.preferredContact}
Location: ${validatedData.location || 'Not specified'}
Language: ${validatedData.language === 'es' ? 'Spanish' : 'English'}
Lead Score: ${leadScore}/100
Qualification: ${qualification}

Message:
${validatedData.message}
==============================================
`;
        
        await ghlClient.createContactNote(contactResult.id, noteContent);
      }
      
      // Return appropriate response based on language and qualification
      const responseMessage = getResponseMessage(validatedData.language, qualification);
      
      return NextResponse.json({
        success: true,
        message: responseMessage,
        data: {
          leadScore,
          qualification,
          estimatedResponseTime: qualification === 'HOT' ? '15 minutes' : '1 hour',
          contactId: contactResult.id
        }
      });
      
    } catch (ghlError) {
      apiLogger.error('GHL contact creation error', ghlError as Error);
      
      // Still return success to user but log the error
      return NextResponse.json({
        success: true,
        message: validatedData.language === 'es' 
          ? 'Gracias por contactarnos. Le responderemos pronto.'
          : 'Thank you for contacting us. We will respond soon.',
        data: {
          leadScore,
          qualification,
          estimatedResponseTime: '1 hour'
        }
      });
    }

  } catch (error) {
    apiLogger.error('contact-form-v2-error', error as Error);

    if (error instanceof Error && 'errors' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form. Please try again or call us directly at 1-877-827-7839.',
      },
      { status: 500 }
    );
  }
}

/**
 * Calculate lead score based on form data
 */
function calculateLeadScore(data: any): number {
  let score = 50; // Base score
  
  // Case type scoring
  const highValueCases = ['personal_injury', 'Personal Injury', 'medical_malpractice', 'Medical Malpractice'];
  const mediumValueCases = ['criminal_defense', 'Criminal Defense', 'family_law', 'Family Law'];
  
  if (highValueCases.includes(data.caseType)) {
    score += 20;
  } else if (mediumValueCases.includes(data.caseType)) {
    score += 10;
  }
  
  // Message length and content
  if (data.message.length > 200) {
    score += 10;
  }
  if (data.message.length > 500) {
    score += 5;
  }
  
  // Urgency keywords
  const urgentKeywords = ['urgent', 'emergency', 'immediately', 'asap', 'today', 'accident', 'injury', 'injured'];
  const hasUrgency = urgentKeywords.some(keyword => 
    data.message.toLowerCase().includes(keyword)
  );
  if (hasUrgency) {
    score += 15;
  }
  
  // Contact preference
  if (data.preferredContact === 'phone') {
    score += 5; // Phone preference shows higher intent
  }
  
  // Location provided
  if (data.location) {
    score += 3;
  }
  
  // Ensure score is between 0 and 100
  return Math.min(100, Math.max(0, score));
}

/**
 * Get qualification based on score
 */
function getQualification(score: number): 'HOT' | 'WARM' | 'COLD' {
  if (score >= 70) return 'HOT';
  if (score >= 50) return 'WARM';
  return 'COLD';
}

/**
 * Get response message based on language and qualification
 */
function getResponseMessage(language: string | undefined, qualification: string): string {
  const isSpanish = language === 'es';
  
  if (qualification === 'HOT') {
    return isSpanish
      ? 'Gracias por contactarnos. Un abogado le llamará en los próximos 15 minutos.'
      : 'Thank you for contacting us. An attorney will call you within 15 minutes.';
  } else if (qualification === 'WARM') {
    return isSpanish
      ? 'Gracias por contactarnos. Le responderemos dentro de 1 hora hábil.'
      : 'Thank you for contacting us. We will respond within 1 business hour.';
  } else {
    return isSpanish
      ? 'Gracias por contactarnos. Le responderemos dentro de 24 horas hábiles.'
      : 'Thank you for contacting us. We will respond within 24 business hours.';
  }
}

// Export with telemetry wrapper
export const POST = withLeadCaptureTracing(handleContactFormV2);