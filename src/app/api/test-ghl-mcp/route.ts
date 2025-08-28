import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';

// This is a test endpoint to verify GHL MCP integration with PIT token
export async function GET(request: NextRequest) {
  try {
    logger.info('Starting GHL MCP integration test...');
    
    // Check if MCP is enabled
    const isMCPEnabled = process.env.ENABLE_GHL_MCP === 'true';
    const hasPITToken = !!process.env.GHL_PIT_TOKEN;
    
    if (!isMCPEnabled) {
      return NextResponse.json({
        success: false,
        error: 'GHL MCP integration is not enabled. Set ENABLE_GHL_MCP=true in .env.local'
      }, { status: 400 });
    }
    
    if (!hasPITToken) {
      return NextResponse.json({
        success: false,
        error: 'GHL PIT token is not configured. Add GHL_PIT_TOKEN to .env.local'
      }, { status: 400 });
    }
    
    // Import the GHL MCP client
    const { GHLMCPClient } = await import('@/new-chatbot-ghl/services/ghl-mcp-client');
    const ghlClient = new GHLMCPClient();
    
    logger.info('GHL MCP Client initialized with PIT token');
    
    // Test 1: Create a test contact
    logger.info('Creating test contact...');
    const testContact = await ghlClient.createOrUpdateContact({
      firstName: 'Test',
      lastName: 'Integration',
      email: 'test.integration@vasquezlaw.test',
      phone: '+1234567890',
      tags: ['test', 'mcp-integration', 'pit-token-test'],
      customFields: {
        source: 'MCP Integration Test',
        testDate: new Date().toISOString()
      }
    });
    
    if (!testContact || !testContact.id) {
      return NextResponse.json({
        success: false,
        error: 'Failed to create test contact',
        details: testContact
      }, { status: 500 });
    }
    
    logger.info('Test contact created successfully:', testContact.id);
    
    // Test 2: Add immigration conversation notes
    logger.info('Adding conversation notes...');
    const conversationNotes = [
      'User: I need help with my green card application',
      'Assistant: I can help you with your green card application. What type of green card are you applying for?',
      'User: Family-based green card through my US citizen spouse',
      'Assistant: For a family-based green card through a US citizen spouse, you will need to file Form I-130 and potentially Form I-485 if you are in the US.',
      'User: How long does the process typically take?',
      'Assistant: For immediate relatives of US citizens, the process typically takes 8-14 months if filing from within the US.'
    ];
    
    const noteContent = `=== TEST IMMIGRATION CONSULTATION ===
Date: ${new Date().toLocaleString()}
Type: Green Card Consultation
Language: English

CONVERSATION:
${conversationNotes.join('\n')}

STATUS: Test completed successfully
PIT Token: Active and working
Integration: MCP endpoint connected
===================================`;
    
    const noteResult = await ghlClient.createContactNote(testContact.id, noteContent);
    
    logger.info('Note added successfully:', noteResult);
    
    // Test 3: Add tags to categorize the conversation
    const tagsAdded = await ghlClient.addContactTags(testContact.id, [
      'immigration-inquiry',
      'green-card',
      'family-based',
      'test-successful'
    ]);
    
    logger.info('Tags added:', tagsAdded);
    
    // Return success response with details
    return NextResponse.json({
      success: true,
      message: 'GHL MCP integration test completed successfully!',
      results: {
        pitTokenStatus: 'Active and authenticated',
        mcpEndpoint: process.env.GHL_MCP_ENDPOINT,
        contactCreated: {
          id: testContact.id,
          name: `${testContact.firstName} ${testContact.lastName}`,
          email: testContact.email
        },
        notesAdded: !!noteResult,
        tagsAdded: tagsAdded,
        conversationLength: conversationNotes.length
      },
      instructions: 'Check your GHL dashboard for the new contact "Test Integration" with the immigration conversation notes.'
    });
    
  } catch (error) {
    logger.error('GHL MCP test error:', error);
    
    // Detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error && 'response' in error 
      ? (error as any).response?.data 
      : undefined;
    
    return NextResponse.json({
      success: false,
      error: 'GHL MCP integration test failed',
      message: errorMessage,
      details: errorDetails,
      troubleshooting: {
        checkPITToken: 'Verify your PIT token is correct in .env.local',
        checkLocationId: 'Ensure GHL_LOCATION_ID matches your account',
        checkEndpoint: 'Confirm GHL_MCP_ENDPOINT is accessible',
        currentConfig: {
          mcpEnabled: process.env.ENABLE_GHL_MCP === 'true',
          hasPITToken: !!process.env.GHL_PIT_TOKEN,
          endpoint: process.env.GHL_MCP_ENDPOINT
        }
      }
    }, { status: 500 });
  }
}

// POST endpoint for testing with custom data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;
    
    // Import the GHL MCP client
    const { GHLMCPClient } = await import('@/new-chatbot-ghl/services/ghl-mcp-client');
    const ghlClient = new GHLMCPClient();
    
    // Create or update contact
    const contact = await ghlClient.createOrUpdateContact({
      firstName: firstName || 'Test',
      lastName: lastName || 'User',
      email: email || `test${Date.now()}@example.com`,
      phone: phone || '',
      tags: ['api-test', 'manual-test']
    });
    
    // Add the message as a note if provided
    if (message) {
      await ghlClient.createContactNote(contact.id, `Manual Test Message: ${message}`);
    }
    
    return NextResponse.json({
      success: true,
      contact: {
        id: contact.id,
        name: `${contact.firstName} ${contact.lastName}`,
        email: contact.email
      },
      noteAdded: !!message
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Test failed'
    }, { status: 500 });
  }
}
