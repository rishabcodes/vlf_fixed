import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/safe-logger';
import { ghlMCPClient } from '@/new-chatbot-ghl/services/ghl-mcp-client';
import OpenAI from 'openai';

// Initialize OpenAI for chat summarization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Helper function to analyze case details from conversation
function analyzeCaseDetails(conversationText: string, legalIssues: string[]): any {
  const lowerText = conversationText.toLowerCase();
  
  // Check if this is primarily an immigration case
  const isImmigrationCase = legalIssues.some(issue => 
    issue.toLowerCase().includes('immigration') || 
    issue.toLowerCase().includes('ice')
  );
  
  // For traffic violations
  if (legalIssues.some(issue => issue.toLowerCase().includes('traffic'))) {
    const violationType = lowerText.includes('red light') ? 'Red Light Violation' :
                         lowerText.includes('speeding') ? 'Speeding' :
                         lowerText.includes('dui') || lowerText.includes('dwi') ? 'DUI/DWI' :
                         'Traffic Violation';
    const firstOffense = lowerText.includes('first') || !lowerText.includes('previous');
    const hasCourtDate = lowerText.includes('court') || lowerText.includes('hearing');
    
    return {
      caseType: 'traffic',
      violationType,
      firstOffense,
      hasCourtDate,
      hasCriminalHistory: lowerText.includes('dui') || lowerText.includes('dwi')
    };
  }
  
  // For immigration cases (original logic)
  if (isImmigrationCase) {
    let nationality = 'N/A';
    const nationalityMatch = lowerText.match(/(?:from|soy de|vengo de|nationality|nacionalidad)[\s:]*([\w\s]+?)(?:\.|,|\n|$)/);
    if (nationalityMatch) nationality = nationalityMatch[1].trim();
    
    let entryYear = 'N/A';
    const yearMatch = lowerText.match(/(?:entered|came|arrived|llegué|vine).*?(\d{4})/);
    if (yearMatch) entryYear = yearMatch[1];
    
    const hasPersecution = /(?:threat|persec|violence|gang|mara|pandilla|cartel|danger|fear|fled|escape)/i.test(lowerText);
    const hasUSFamily = /(?:spouse|husband|wife|child|son|daughter|parent).*?(?:citizen|green card|resident)/i.test(lowerText);
    const hasCriminalHistory = /(?:arrest|convict|criminal|jail|prison|dui|charge)/i.test(lowerText);
    
    return {
      caseType: 'immigration',
      nationality,
      entryYear,
      hasPersecution,
      hasUSFamily,
      hasCriminalHistory
    };
  }
  
  // Default case details for other legal issues
  return {
    caseType: 'general',
    hasCriminalHistory: /(?:arrest|convict|criminal|jail|prison|dui|charge)/i.test(lowerText)
  };
}

// Helper function to calculate relief scores
function calculateReliefScores(caseInfo: any): Array<{relief: string, score: number, hurdle: string}> {
  const scores = [];
  
  // Handle traffic cases
  if (caseInfo.caseType === 'traffic') {
    return []; // Traffic relief options are handled inline in the note template
  }
  
  // Handle immigration cases
  if (caseInfo.caseType === 'immigration') {
    // Asylum/Withholding
    if (caseInfo.hasPersecution) {
      scores.push({
        relief: 'Asylum/Withholding',
        score: 7,
        hurdle: 'must prove persecution'
      });
    } else {
      scores.push({
        relief: 'Asylum/Withholding',
        score: 3,
        hurdle: 'no persecution mentioned'
      });
    }
    
    // Family-based adjustment
    if (caseInfo.hasUSFamily) {
      scores.push({
        relief: 'Family-based Adjustment',
        score: 8,
        hurdle: 'verify qualifying relationship'
      });
    } else {
      scores.push({
        relief: 'Family-based Adjustment',
        score: 2,
        hurdle: 'no qualifying family'
      });
    }
    
    // Non-LPR Cancellation (needs 10 years)
    const currentYear = new Date().getFullYear();
    const yearsInUS = caseInfo.entryYear !== 'N/A' ? currentYear - parseInt(caseInfo.entryYear) : 0;
    
    if (yearsInUS >= 10) {
      scores.push({
        relief: 'Non-LPR Cancellation',
        score: 6,
        hurdle: 'must show hardship'
      });
    } else {
      scores.push({
        relief: 'Non-LPR Cancellation',
        score: 2,
        hurdle: `only ${yearsInUS} years presence`
      });
    }
    
    // Prosecutorial discretion
    scores.push({
      relief: 'Prosecutorial Discretion',
      score: caseInfo.hasCriminalHistory ? 3 : 5,
      hurdle: caseInfo.hasCriminalHistory ? 'criminal history' : 'no strong equities'
    });
  }
  
  return scores;
}

// Helper function to generate action plan
function generateActionPlan(caseInfo: any, reliefScores: any[]): string[] {
  const actions = [];
  
  // Traffic case actions
  if (caseInfo.caseType === 'traffic') {
    return []; // Traffic actions are handled inline in the note template
  }
  
  // Immigration case actions
  if (caseInfo.caseType === 'immigration') {
    // Priority actions based on case
    if (caseInfo.hasPersecution) {
      actions.push('Gather evidence of threats/persecution');
      actions.push('Prepare asylum declaration');
    }
    
    if (caseInfo.hasUSFamily) {
      actions.push('Verify family member immigration status');
      actions.push('Gather relationship documents');
    }
    
    // Standard actions
    actions.push('Confirm EOIR status and hearing date');
    actions.push('Schedule consultation with attorney');
    
    const currentYear = new Date().getFullYear();
    const yearsInUS = caseInfo.entryYear !== 'N/A' ? currentYear - parseInt(caseInfo.entryYear) : 0;
    if (yearsInUS >= 8) {
      actions.push('Document continuous presence for cancellation');
    }
    
    if (!caseInfo.hasCriminalHistory) {
      actions.push('Maintain clean record');
    }
  } else {
    // General case actions
    actions.push('Schedule consultation with attorney');
    actions.push('Gather relevant documentation');
    actions.push('Follow up within 24-48 hours');
  }
  
  return actions;
}

// Helper function to score lead quality
function scoreLeadQuality(conversationHistory: any[], caseInfo: any): number {
  let score = 3; // Base score
  
  // Increase score for completeness
  if (conversationHistory.length > 10) score += 1;
  
  // Increase for urgency
  const hasUrgency = conversationHistory.some(msg => 
    /detained|arrest|emergency|court.*tomorrow|urgent/i.test(msg.text)
  );
  if (hasUrgency) score += 1;
  
  // Increase for good case potential
  if (caseInfo.hasUSFamily || caseInfo.hasPersecution) score += 1;
  
  // Decrease for criminal issues
  if (caseInfo.hasCriminalHistory) score -= 1;
  
  // Cap between 1-5
  return Math.min(5, Math.max(1, score));
}

/**
 * Auto-save endpoint for periodic conversation updates
 * Called every 60 seconds from the chat widget
 */
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
      conversationHistory = [],
      ghlContactId,
      ghlNoteId,
      phoneNumber,
      contactName,
      isAbandoned = false
    } = data;

    if (!ghlContactId || conversationHistory.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No contact or conversation to save' 
      });
    }

    // Format conversation for note
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'short',
      timeStyle: 'short'
    });
    
    // Build conversation text
    let conversationText = '';
    conversationHistory.forEach((msg: any) => {
      const speaker = msg.sender === 'user' ? 'Client' : 'Assistant';
      conversationText += `${speaker}: ${msg.text}\n\n`;
    });
    
    // Extract key information
    const legalIssues = [];
    const lowerText = conversationText.toLowerCase();
    if (lowerText.includes('divorce')) legalIssues.push('Divorce');
    if (lowerText.includes('ice') || lowerText.includes('detention')) legalIssues.push('Immigration/ICE');
    if (lowerText.includes('accident') && !lowerText.includes('traffic')) legalIssues.push('Personal Injury');
    if (lowerText.includes('dui') || lowerText.includes('dwi')) legalIssues.push('DUI/DWI');
    else if (lowerText.includes('arrest')) legalIssues.push('Criminal Defense');
    if (lowerText.includes('work') && lowerText.includes('injur')) legalIssues.push('Workers Comp');
    if (lowerText.includes('custody')) legalIssues.push('Custody');
    if (lowerText.includes('visa') || lowerText.includes('green card') || lowerText.includes('asylum')) legalIssues.push('Immigration');
    if (lowerText.includes('traffic') || lowerText.includes('ticket') || lowerText.includes('red light') || lowerText.includes('speeding')) legalIssues.push('Traffic');
    
    // Determine if emergency
    const isEmergency = lowerText.includes('detained') || lowerText.includes('arrested') || 
                       lowerText.includes('emergency') || lowerText.includes('urgent') ||
                       lowerText.includes('court') && lowerText.includes('tomorrow');
    
    // Determine conversation status
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    const lastMessageTime = lastMessage?.timestamp || Date.now();
    const timeSinceLastMessage = Date.now() - lastMessageTime;
    const isAbandonedByTime = timeSinceLastMessage > 300000; // 5 minutes = abandoned
    const abandoned = isAbandoned || isAbandonedByTime; // Use explicit flag or time-based
    
    // Analyze case details based on legal issues
    const caseInfo = analyzeCaseDetails(conversationText, legalIssues);
    const reliefScores = calculateReliefScores(caseInfo);
    const actionPlan = generateActionPlan(caseInfo, reliefScores);
    const leadRating = scoreLeadQuality(conversationHistory, caseInfo);
    
    // Generate AI summary using OpenAI
    let aiSummary = 'Conversation in progress...';
    if (conversationHistory.length > 4) {
      try {
        const summaryPrompt = `Summarize this legal consultation chat in 2-3 sentences. Focus on the client's main legal issue, their situation, and what assistance they're seeking:

${conversationText}

Provide a concise summary that captures the key points.`;

        const summaryResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a legal intake specialist. Provide concise summaries.' },
            { role: 'user', content: summaryPrompt }
          ],
          max_tokens: 150,
          temperature: 0.3,
        });
        
        aiSummary = summaryResponse.choices[0]?.message?.content || aiSummary;
      } catch (error) {
        logger.error('OpenAI summarization failed:', error);
      }
    }
    
    // Extract more details from conversation
    const phoneMatch = conversationText.match(/\b(\d{3}[-.]?\d{3}[-.]?\d{4})\b/);
    const detectedPhone = phoneMatch ? phoneMatch[1] : phoneNumber;
    
    // Detect if client needs specific attorney
    const needsSpanishAttorney = lowerText.includes('spanish') || lowerText.includes('español') || lowerText.includes('habla');
    
    // Detect entry details for immigration cases
    let entryStatus = 'N/A';
    if (lowerText.includes('asylum')) entryStatus = 'Asylum at border';
    else if (lowerText.includes('visa')) entryStatus = 'Visa entry';
    else if (lowerText.includes('crossed') || lowerText.includes('border')) entryStatus = 'Border crossing';
    
    // Detect court/hearing info
    let courtDate = 'No hearing scheduled';
    const courtMatch = lowerText.match(/court.*?(\d{1,2}\/\d{1,2}\/\d{2,4})/);
    if (courtMatch) courtDate = `Hearing: ${courtMatch[1]}`;
    
    // Detect A-Number
    let aNumber = 'N/A';
    const aNumberMatch = conversationText.match(/[Aa][-\s]?(\d{8,9})/);
    if (aNumberMatch) aNumber = `A-${aNumberMatch[1]}`;
    
    // Create note content based on case type
    let caseSpecificContent = '';
    
    if (caseInfo.caseType === 'traffic') {
      caseSpecificContent = `📄 Case Summary – [Traffic Violation]
---------------------------------------
- Violation Type: ${caseInfo.violationType}
- First Offense: ${caseInfo.firstOffense ? 'Yes' : 'No'}
- Court Date: ${courtDate}
- Location: ${lowerText.includes('charlotte') ? 'Charlotte, NC' : 
                  lowerText.includes('raleigh') ? 'Raleigh, NC' : 
                  lowerText.includes('smithfield') ? 'Smithfield, NC' :
                  lowerText.includes('orlando') ? 'Orlando, FL' : 'To be determined'}
- License Status: ${lowerText.includes('suspended') ? 'Suspended' : 
                    lowerText.includes('revoked') ? 'Revoked' : 'Valid'}
- Prior Violations: ${caseInfo.firstOffense ? 'None' : 'Has prior violations'}`;
    } else if (caseInfo.caseType === 'immigration') {
      caseSpecificContent = `📄 Case Summary – [Immigration]
---------------------------------------
- Nationality: ${caseInfo.nationality}
- Entry & Status: ${entryStatus}; ${caseInfo.entryYear !== 'N/A' ? `entered ${caseInfo.entryYear}` : 'entry date unknown'}; ${lowerText.includes('no status') || lowerText.includes('undocumented') ? 'no legal status' : 'status unclear'}${lowerText.includes('detained') ? '; detained at entry' : ''}
- Next Court / USCIS date: ${courtDate}
- Family with status: ${caseInfo.hasUSFamily ? 'Yes - verify relationship' : 'None mentioned'}
- Past persecution: ${caseInfo.hasPersecution ? 'Yes - ' + (lowerText.includes('gang') || lowerText.includes('mara') ? 'gang/violence' : 'threats/persecution') : 'Not mentioned'}
- A-Number: ${aNumber}`;
    } else {
      caseSpecificContent = `📄 Case Summary – [${legalIssues.join(', ') || 'General Inquiry'}]
---------------------------------------
- Issue Type: ${legalIssues.join(', ') || 'To be determined'}
- Court Date: ${courtDate}
- Urgency: ${isEmergency ? 'High - Immediate attention needed' : 'Standard'}
- Criminal History: ${caseInfo.hasCriminalHistory ? 'Yes - needs review' : 'None mentioned'}`;
    }
    
    const noteContent = `QUALIFYING AGENT Chat SUMMARY
${aiSummary}

DOB: N/A  
Address: N/A  

${caseSpecificContent}

🔍 Legal Analysis
---------------------------------------
${caseInfo.caseType === 'traffic' ? 
`- Violation Severity: ${caseInfo.violationType === 'DUI/DWI' ? 'High - Criminal charge' : 
                        caseInfo.violationType === 'Red Light Violation' ? 'Moderate - Moving violation' : 
                        'Standard traffic violation'}
- Defense Options: ${caseInfo.firstOffense ? 'First offense - possible diversion programs' : 
                    'Multiple violations - limited options'}
- License Impact: ${caseInfo.violationType === 'DUI/DWI' ? 'Likely suspension' : 
                   'Points on license'}` :
caseInfo.caseType === 'immigration' ?
`- Removal posture: ${lowerText.includes('court') || lowerText.includes('hearing') ? 'Defensive' : 'Affirmative'}; ${caseInfo.entryYear !== 'N/A' && parseInt(caseInfo.entryYear) <= 2014 ? 'possible 10-year presence' : 'insufficient presence for cancellation'}
- Adjustment or other relief track: ${caseInfo.hasUSFamily ? 'Family-based possible' : caseInfo.hasPersecution ? 'Asylum/withholding' : 'Limited options'}; ${caseInfo.hasUSFamily ? 'verify qualifying relationship' : 'no family-based options'}
- Critical deadlines / evidentiary issues: ${courtDate !== 'No hearing scheduled' ? courtDate : 'No immediate deadlines'}; ${caseInfo.hasPersecution ? 'must document persecution' : 'gather supporting evidence'}; ${lowerText.includes('one year') || lowerText.includes('1 year') ? 'asylum clock may be running' : ''}` :
`- Initial assessment pending consultation
- Gather relevant documentation
- Schedule consultation with attorney`}

🎯 Relief Options & Scores
---------------------------------------
${caseInfo.caseType === 'traffic' ? 
`Option : Traffic School  
Score  : ${caseInfo.firstOffense ? '8' : '4'} / 10  
Hurdle : ${caseInfo.firstOffense ? 'Court approval needed' : 'May not be eligible'}

Option : Fine Reduction  
Score  : 6 / 10  
Hurdle : Demonstrate financial hardship

Option : Contest Violation  
Score  : ${lowerText.includes('hurry') ? '3' : '5'} / 10  
Hurdle : ${lowerText.includes('hurry') ? 'Admission of fault' : 'Need evidence'}` :
reliefScores.map(item => 
`Relief : ${item.relief}  
Score  : ${item.score} / 10  
Hurdle : ${item.hurdle}
`).join('\n')}

🗒️ Action Plan
---------------------------------------
${caseInfo.caseType === 'traffic' ? 
[
  'Review traffic citation details',
  'Document circumstances of violation',
  'Gather any evidence (dashcam, witnesses)',
  'Prepare for court appearance',
  caseInfo.firstOffense ? 'Inquire about traffic school eligibility' : 'Review prior violation history',
  'Schedule consultation with traffic attorney',
  'Prepare financial documentation if seeking fine reduction'
].map(action => `- ${action}`).join('\n') :
actionPlan.map(action => `- ${action}`).join('\n')}

First name: ${contactName?.split(' ')[0] || ''}
Last name: ${contactName?.split(' ').slice(1).join(' ') || ''}
Phone: ${detectedPhone || 'Not provided'}
Type: ${isEmergency ? 'URGENT Consultation' : 'Client Consultation'}

Rating: ${leadRating}

Reason: ${abandoned ? 'incomplete_intake' : 'ai_completed_call_flow'}

${needsSpanishAttorney ? 'Language Preference: Spanish\n' : ''}

Call Transferred: ${isEmergency ? 'Yes - Emergency' : 'No'}

Qualified Lead: ${leadRating >= 3 ? 'true' : 'false'}

Session ID: ${sessionId || 'web-chat'}

=============== CHAT TRANSCRIPT ===============
${conversationText}
===============================================`;

    // Update existing note or create new one
    let noteId = ghlNoteId;
    
    if (noteId) {
      // Update existing note
      const updated = await ghlMCPClient.updateContactNote(ghlContactId, noteId, noteContent);
      if (updated) {
        logger.info(`[Auto-save] Updated GHL note: ${noteId}`);
      } else {
        logger.error(`[Auto-save] Failed to update note: ${noteId}`);
      }
    } else {
      // Create new note
      const newNoteId = await ghlMCPClient.createContactNote(ghlContactId, noteContent);
      if (newNoteId) {
        logger.info(`[Auto-save] Created new GHL note: ${newNoteId}`);
        noteId = newNoteId;
      } else {
        logger.error('[Auto-save] Failed to create note');
      }
    }
    
    // Also update contact tags if emergency or abandoned
    if (isEmergency || abandoned) {
      const tags = ['Website-chatbot'];
      if (isEmergency) tags.push('urgent', 'emergency');
      if (abandoned) tags.push('incomplete-intake', 'follow-up-needed');
      legalIssues.forEach(issue => tags.push(issue.toLowerCase().replace(/\s+/g, '-')));
      
      try {
        await ghlMCPClient.createOrUpdateContact({
          firstName: contactName?.split(' ')[0] || 'Unknown',
          lastName: contactName?.split(' ').slice(1).join(' ') || '',
          phone: phoneNumber,
          tags
        });
      } catch (error) {
        logger.error('[Auto-save] Failed to update contact tags:', error);
      }
    }

    return NextResponse.json({
      success: true,
      noteId,
      isAbandoned: abandoned,
      isEmergency,
      lastSaved: timestamp
    });

  } catch (error) {
    logger.error('Save conversation error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to save conversation'
      },
      { status: 500 }
    );
  }
}