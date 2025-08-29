#!/usr/bin/env node

/**
 * Deploy script for AWS Amplify with environment variables
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse .env.local file
function parseEnvFile(filePath) {
  const envContent = fs.readFileSync(filePath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || !line.trim()) return;
    
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      // Remove quotes if present
      envVars[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  });
  
  return envVars;
}

// Format environment variables for AWS CLI
function formatEnvVarsForAWS(envVars) {
  // Add FAST_BUILD flag
  envVars.FAST_BUILD = 'true';
  envVars.SKIP_STATIC_GENERATION = 'true';
  
  // Convert to AWS format
  const awsEnvVars = {};
  Object.entries(envVars).forEach(([key, value]) => {
    // Skip certain local-only variables
    if (key.startsWith('MOCK_') || 
        key === 'NODE_ENV' || 
        key === 'NEXT_PUBLIC_APP_URL' ||
        key === 'NEXTAUTH_URL') {
      return;
    }
    awsEnvVars[key] = value;
  });
  
  // Override for production
  awsEnvVars.NODE_ENV = 'production';
  awsEnvVars.NEXT_PUBLIC_APP_URL = 'https://master.d2b7bbbfww8yqi.amplifyapp.com';
  awsEnvVars.NEXTAUTH_URL = 'https://master.d2b7bbbfww8yqi.amplifyapp.com';
  
  return awsEnvVars;
}

async function main() {
  const APP_ID = 'd2b7bbbfww8yqi';
  const BRANCH_NAME = 'master';
  
  console.log('📦 AWS Amplify Fast Deployment Script');
  console.log('=====================================');
  console.log(`App ID: ${APP_ID}`);
  console.log(`Branch: ${BRANCH_NAME}`);
  console.log('');
  
  try {
    // Step 1: Parse environment variables
    console.log('📋 Reading environment variables from .env.local...');
    const envVars = parseEnvFile(path.join(__dirname, '../.env.local'));
    const awsEnvVars = formatEnvVarsForAWS(envVars);
    
    console.log(`Found ${Object.keys(awsEnvVars).length} environment variables`);
    
    // Step 2: Update app configuration
    console.log('\n🔧 Updating Amplify app configuration...');
    
    // Create environment variables JSON
    const envVarsJson = JSON.stringify(awsEnvVars);
    fs.writeFileSync('temp-env-vars.json', envVarsJson);
    
    // Update app with environment variables
    const updateCommand = `python -m awscli amplify update-branch --app-id ${APP_ID} --branch-name ${BRANCH_NAME} --environment-variables file://temp-env-vars.json`;
    
    console.log('Setting environment variables...');
    try {
      execSync(updateCommand, { stdio: 'pipe' });
      console.log('✅ Environment variables updated successfully');
    } catch (error) {
      console.log('⚠️  Error updating environment variables:', error.message);
      console.log('Continuing with deployment...');
    }
    
    // Clean up temp file
    fs.unlinkSync('temp-env-vars.json');
    
    // Step 3: Start a new build
    console.log('\n🚀 Starting new Amplify build...');
    const buildCommand = `python -m awscli amplify start-job --app-id ${APP_ID} --branch-name ${BRANCH_NAME} --job-type RELEASE`;
    
    const result = execSync(buildCommand, { encoding: 'utf8' });
    const jobData = JSON.parse(result);
    
    if (jobData && jobData.jobSummary) {
      console.log('✅ Build started successfully!');
      console.log(`Job ID: ${jobData.jobSummary.jobId}`);
      console.log(`Status: ${jobData.jobSummary.status}`);
      console.log('');
      console.log('🔗 View build progress at:');
      console.log(`https://console.aws.amazon.com/amplify/home?region=us-east-1#/${APP_ID}/${BRANCH_NAME}`);
      console.log('');
      console.log('📊 Build Details:');
      console.log('  - Mode: Fast Build (Core Pages Only)');
      console.log('  - Compute: XLarge (72 vCPUs, 145GB RAM)');
      console.log('  - Pages: ~30-40 core pages');
      console.log('  - Blog/Locations: On-demand generation');
      console.log('  - Estimated time: 3-5 minutes');
    } else {
      console.log('Build started, check AWS Console for details');
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});