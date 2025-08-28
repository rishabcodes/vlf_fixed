#!/usr/bin/env node

/**
 * Unified Deploy Script
 * Handles all deployment scenarios
 */

const { spawn } = require('child_process');
const path = require('path');
// Use built-in colors instead of chalk
const chalk = {
  green: text => `\x1b[32m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  blue: text => `\x1b[34m${text}\x1b[0m`,
  red: text => `\x1b[31m${text}\x1b[0m`,
  gray: text => `\x1b[90m${text}\x1b[0m`,
  cyan: text => `\x1b[36m${text}\x1b[0m`,
  bold: {
    green: text => `\x1b[1m\x1b[32m${text}\x1b[0m`,
    yellow: text => `\x1b[1m\x1b[33m${text}\x1b[0m`,
    blue: text => `\x1b[1m\x1b[34m${text}\x1b[0m`,
    red: text => `\x1b[1m\x1b[31m${text}\x1b[0m`,
  },
};

const args = process.argv.slice(2);
const isAWS = args.includes('--aws');
const isAgents = args.includes('--agents');

async function deploy() {
  console.log(chalk.bold.green('\n🚀 Unified Deploy Script\n'));

  try {
    if (isAgents) {
      console.log(chalk.yellow('🤖 Deploying CrewAI agents...'));
      await runCommand('docker', [
        'build',
        '-f',
        'Dockerfile.agents',
        '-t',
        'vasquezlaw-agents',
        '.',
      ]);
      // AWS ECR push would go here
    } else if (isAWS) {
      console.log(chalk.yellow('☁️  Deploying to AWS...'));
      await runCommand('node', [path.join(__dirname, 'aws-hybrid-deploy.js')]);
    } else {
      console.log(chalk.yellow('🌐 Triggering Netlify deploy...'));
      await runCommand('netlify', ['deploy', '--prod']);
    }

    console.log(chalk.green('\n✅ Deployment completed!\n'));
  } catch (error) {
    console.error(chalk.red('❌ Deployment failed:'), error.message);
    process.exit(1);
  }
}

function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`Command failed: ${cmd}`))
    );
  });
}

deploy();
