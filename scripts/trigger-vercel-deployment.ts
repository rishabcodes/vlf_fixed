#!/usr/bin/env tsx

/**
 * Vercel Direct Deployment Trigger
 *
 * This script triggers a deployment on Vercel without relying on git push.
 * It uses the Vercel API to create a deployment from the current state.
 *
 * Requirements:
 * - VERCEL_TOKEN environment variable (create at https://vercel.com/account/tokens)
 * - Project ID and Org ID from .vercel/project.json
 *
 * Usage:
 * - npm run deploy:trigger
 * - VERCEL_TOKEN=your-token npm run deploy:trigger
 * - tsx scripts/trigger-vercel-deployment.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { execSync } from 'child_process';

// Configuration
const PROJECT_ID = 'prj_tlJJXr6A2jamXAQwAz2hPVciuScp';
const ORG_ID = 'team_ovuLTyYuuvgs2INJ1DelBxI4';
const VERCEL_API_BASE = 'https://api.vercel.com';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.error(`${colors.red}✗${colors.reset} ${msg}`),
  section: (msg: string) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`),
};

// Make API request to Vercel
async function vercelRequest(
  method: string,
  endpoint: string,
  token: string,
  body?: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = new URL(`${VERCEL_API_BASE}${endpoint}`);

    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`API Error (${res.statusCode}): ${parsed.error?.message || data}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

// Get environment variables from production config
function getProductionEnv(): Record<string, string> {
  const env: Record<string, string> = {};

  // Read from .env.production if it exists
  const envPath = path.join(process.cwd(), '.env.production');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key) {
          env[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
        }
      }
    });
  }

  return env;
}

// Main deployment function
async function triggerDeployment() {
  log.section('🚀 Vercel Direct Deployment Trigger');

  // 1. Check for Vercel token
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    log.error('VERCEL_TOKEN environment variable not found!');
    log.info('Create a token at: https://vercel.com/account/tokens');
    log.info('Then run: VERCEL_TOKEN=your-token npm run deploy:trigger');
    process.exit(1);
  }

  // 2. Verify project configuration
  log.info('Verifying project configuration...');
  try {
    const projectData = await vercelRequest('GET', `/v9/projects/${PROJECT_ID}`, token);
    log.success(`Project found: ${projectData.name}`);
  } catch (error) {
    log.error(`Failed to verify project: ${error}`);
    process.exit(1);
  }

  // 3. Create deployment
  log.section('Creating deployment...');

  try {
    // Option 1: Create deployment with build
    const deploymentData = {
      name: 'vasquez-law-website',
      project: PROJECT_ID,
      target: 'production',
      gitSource: {
        type: 'github',
        ref: 'main',
      },
    };

    const deployment = await vercelRequest('POST', `/v13/deployments`, token, deploymentData);

    log.success(`Deployment created: ${deployment.id}`);
    log.info(`URL: ${deployment.url}`);
    log.info(`Status: ${deployment.readyState}`);

    // 4. Monitor deployment progress
    log.section('Monitoring deployment...');
    let checkCount = 0;
    const maxChecks = 60; // 5 minutes max

    const checkDeployment = async () => {
      checkCount++;

      try {
        const status = await vercelRequest('GET', `/v13/deployments/${deployment.id}`, token);

        switch (status.readyState) {
          case 'READY':
            log.success('Deployment completed successfully!');
            log.info(`Production URL: https://${status.url}`);
            log.info(`Deployment URL: https://${PROJECT_ID}-${ORG_ID}.vercel.app`);
            return true;

          case 'ERROR':
            log.error('Deployment failed!');
            if (status.errorMessage) {
              log.error(`Error: ${status.errorMessage}`);
            }
            return false;

          case 'CANCELED':
            log.warning('Deployment was canceled');
            return false;

          default:
            process.stdout.write(
              `\r${colors.yellow}⏳${colors.reset} Status: ${status.readyState} (${checkCount}/${maxChecks})`
            );
            if (checkCount >= maxChecks) {
              log.error('\nDeployment timeout!');
              return false;
            }
            // Check again in 5 seconds
            await new Promise(resolve => setTimeout(resolve, 5000));
            return checkDeployment();
        }
      } catch (error) {
        log.error(`Failed to check deployment status: ${error}`);
        return false;
      }
    };

    const success = await checkDeployment();
    process.stdout.write('\n');

    if (success) {
      log.section('✅ Deployment successful!');
      log.info('Visit your site at: https://www.vasquezlawnc.com');
    } else {
      process.exit(1);
    }
  } catch (error) {
    log.error(`Deployment failed: ${error}`);
    process.exit(1);
  }
}

// Alternative: Create deployment using Vercel CLI
async function triggerDeploymentViaCLI() {
  log.section('🚀 Vercel Deployment via CLI');

  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch {
    log.error('Vercel CLI not installed!');
    log.info('Installing Vercel CLI...');
    execSync('npm i -g vercel', { stdio: 'inherit' });
  }

  // Deploy using CLI with --force flag to bypass git
  log.info('Deploying to Vercel...');
  try {
    execSync('vercel --prod --force', {
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' },
    });
    log.success('Deployment triggered successfully!');
  } catch (error) {
    log.error('Deployment failed!');
    process.exit(1);
  }
}

// Alternative: Create deployment hook
async function createDeploymentHook() {
  log.section('🔗 Creating Deployment Hook');

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    log.error('VERCEL_TOKEN required for creating deployment hooks');
    return;
  }

  try {
    const hookData = {
      name: 'Manual Deployment Trigger',
      project: PROJECT_ID,
      events: ['deployment.created'],
    };

    const hook = await vercelRequest('POST', `/v1/integrations/deploy-hooks`, token, hookData);

    log.success('Deployment hook created!');
    log.info(`Hook URL: ${hook.url}`);
    log.info('You can trigger deployments by making a POST request to this URL');

    // Save hook URL
    fs.writeFileSync(path.join(process.cwd(), '.vercel', 'deploy-hook.txt'), hook.url);
  } catch (error) {
    log.error(`Failed to create deployment hook: ${error}`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
${colors.bright}Vercel Deployment Trigger${colors.reset}

Usage:
  tsx scripts/trigger-vercel-deployment.ts [options]

Options:
  --api         Use Vercel API (requires VERCEL_TOKEN)
  --cli         Use Vercel CLI (default)
  --hook        Create a deployment hook
  --help, -h    Show this help message

Environment Variables:
  VERCEL_TOKEN  Your Vercel API token (create at https://vercel.com/account/tokens)

Examples:
  # Deploy using CLI (default)
  npm run deploy:trigger
  
  # Deploy using API
  VERCEL_TOKEN=your-token npm run deploy:trigger -- --api
  
  # Create deployment hook
  VERCEL_TOKEN=your-token npm run deploy:trigger -- --hook
`);
    process.exit(0);
  }

  if (args.includes('--hook')) {
    await createDeploymentHook();
  } else if (args.includes('--api')) {
    await triggerDeployment();
  } else {
    // Default to CLI method
    await triggerDeploymentViaCLI();
  }
}

// Run the script
main().catch(error => {
  log.error(`Unexpected error: ${error}`);
  process.exit(1);
});
