#!/usr/bin/env node

/**
 * Unified Clean Script
 * Intelligent cleanup of build artifacts and temporary files
 */

const fs = require('fs');
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
const isAll = args.includes('--all');

async function clean() {
  console.log(chalk.bold.yellow('\n🧹 Cleaning project...\n'));

  const itemsToClean = [
    { path: '.next', type: 'dir', desc: 'Next.js build cache' },
    { path: 'dist', type: 'dir', desc: 'Distribution files' },
    { path: 'out', type: 'dir', desc: 'Static export' },
    { path: '.vercel', type: 'dir', desc: 'Vercel cache' },
    { path: 'coverage', type: 'dir', desc: 'Test coverage' },
    { path: '.turbo', type: 'dir', desc: 'Turbo cache' },
    { path: '*.log', type: 'pattern', desc: 'Log files' },
    { path: '.DS_Store', type: 'pattern', desc: 'macOS files' },
  ];

  if (isAll) {
    itemsToClean.push(
      { path: 'node_modules', type: 'dir', desc: 'Dependencies' },
      { path: 'pnpm-lock.yaml', type: 'file', desc: 'Lock file' }
    );
  }

  let cleaned = 0;

  for (const item of itemsToClean) {
    try {
      if (item.type === 'dir' && fs.existsSync(item.path)) {
        fs.rmSync(item.path, { recursive: true, force: true });
        console.log(chalk.green('✓'), chalk.gray(item.desc));
        cleaned++;
      } else if (item.type === 'file' && fs.existsSync(item.path)) {
        fs.unlinkSync(item.path);
        console.log(chalk.green('✓'), chalk.gray(item.desc));
        cleaned++;
      }
    } catch (error) {
      console.log(chalk.red('✗'), chalk.gray(item.desc), chalk.red(error.message));
    }
  }

  console.log(chalk.green(`\n✨ Cleaned ${cleaned} items\n`));
}

clean();
