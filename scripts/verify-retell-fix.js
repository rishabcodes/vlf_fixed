// Final verification of Retell fixes
const fetch = require('node-fetch');
const Retell = require('retell-sdk').default;

async function verifyFix() {
  console.log('=== VERIFYING RETELL FIX ===\n');
  
  const apiKey = process.env.RETELL_API_KEY || '';
  const agentId = process.env.RETELL_AGENT_ID || '';
  const agentVersion = 18; // Published version
  
  try {
    const client = new Retell({ apiKey });
    
    // 1. Verify agent is published
    console.log('1. CHECKING AGENT STATUS');
    const agent = await client.agent.retrieve(agentId);
    console.log('   Agent:', agent.agent_name);
    console.log('   Version:', agent.version);
    console.log('   Published:', agent.is_published ? '✅ Yes' : '❌ No');
    
    // 2. Test simplified call creation
    console.log('\n2. TESTING SIMPLIFIED CALL CREATION');
    const call1 = await client.call.createWebCall({
      agent_id: agentId,
      agent_version: agentVersion // Using published version
    });
    console.log('   Call Status:', call1.call_status);
    console.log('   Has Token:', !!call1.access_token);
    
    // 3. Test our API endpoint
    console.log('\n3. TESTING OUR API ENDPOINT');
    const response = await fetch('http://localhost:3001/api/retell/create-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'en' })
    });
    
    const apiData = await response.json();
    console.log('   Response Status:', response.status);
    console.log('   Call Status:', apiData.call_status);
    console.log('   Has Token:', !!apiData.access_token);
    
    // 4. Check diagnostic endpoint
    console.log('\n4. RUNNING DIAGNOSTICS');
    const diagResponse = await fetch('http://localhost:3001/api/retell/test-connection');
    const diagnostics = await diagResponse.json();
    console.log('   Success:', diagnostics.success);
    console.log('   Call Creation Time:', diagnostics.timing?.createCallMs + 'ms');
    console.log('   Recommendations:', diagnostics.recommendations?.length || 0);
    
    // 5. Summary
    console.log('\n=== FIX VERIFICATION COMPLETE ===');
    console.log('\n✅ CHANGES APPLIED:');
    console.log('1. Simplified server call creation (removed unnecessary metadata)');
    console.log('2. Using published agent version 18');
    console.log('3. Immediate client connection (within ms of token receipt)');
    console.log('4. Removed delays in connection process');
    console.log('5. Added diagnostic endpoints for troubleshooting');
    
    console.log('\n📋 TEST INSTRUCTIONS:');
    console.log('1. Open Firefox: http://localhost:3001/test-retell');
    console.log('2. Click "Test Connection" button');
    console.log('3. Watch the logs - should connect within 1-2 seconds');
    console.log('4. If still getting "user not joined":');
    console.log('   - Check browser console for WebSocket errors');
    console.log('   - Verify microphone permissions granted');
    console.log('   - Try incognito mode to rule out extensions');
    
    console.log('\n💡 ALTERNATIVE SOLUTIONS:');
    console.log('1. Publish agent version 19 in Retell dashboard');
    console.log('2. Try without specifying version (will use latest)');
    console.log('3. Contact Retell support if issue persists');
    
  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
  }
}

verifyFix();