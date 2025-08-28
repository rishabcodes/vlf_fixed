#!/usr/bin/env node

/**
 * Unified Build Script
 * Consolidates all build-related scripts into one intelligent builder
 *
 * Usage:
 *   npm run build         - Standard production build
 *   npm run build:static  - Full static export for AWS/Netlify
 *   npm run build:deploy  - Build optimized for deployment
 *   npm run build:analyze - Build with bundle analysis
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
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

// Parse command line arguments
const args = process.argv.slice(2);
const isStatic = args.includes('--static');
const isDeploy = args.includes('--deploy');
const isAnalyze = args.includes('--analyze');
const isNetlify = args.includes('--netlify') || process.env.NETLIFY === 'true';
const isHelp = args.includes('--help') || args.includes('-h');

// Display help
if (isHelp) {
  console.log(chalk.bold.blue('\n🏗️  Unified Build Script\n'));
  console.log('Usage: npm run build [options]\n');
  console.log('Options:');
  console.log('  --static     Full static export (for AWS S3/Netlify)');
  console.log('  --deploy     Optimized build for deployment');
  console.log('  --analyze    Include bundle analysis');
  console.log('  --netlify    Netlify-specific optimizations');
  console.log('  --help       Show this help message\n');
  console.log('Examples:');
  console.log('  npm run build            # Standard production build');
  console.log('  npm run build:static     # Static export');
  console.log('  npm run build:analyze    # With bundle analysis\n');
  process.exit(0);
}

// Set build environment
process.env.NODE_ENV = 'production';
if (isAnalyze) {
  process.env.ANALYZE = 'true';
}

// Helper function to run commands
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray(`$ ${command} ${args.join(' ')}`));

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed: ${command} ${args.join(' ')}`));
      } else {
        resolve();
      }
    });

    child.on('error', reject);
  });
}

// Build configuration based on mode
function getBuildConfig() {
  const config = {
    memoryLimit: '8192',
    buildCommand: ['next', 'build'],
    preBuild: [],
    postBuild: [],
  };

  if (isStatic) {
    // Static export configuration
    process.env.NETLIFY = 'true'; // Force static output
    config.memoryLimit = '12288'; // More memory for static generation
    config.preBuild.push(['node', path.join(__dirname, 'prepare-full-static-build.js')]);
  }

  if (isDeploy) {
    // Deployment optimizations
    config.preBuild.push(['node', path.join(__dirname, 'prepare-netlify-build.js')]);
    config.memoryLimit = '8192';
  }

  if (isNetlify) {
    // Netlify-specific handling
    config.preBuild.push(['node', path.join(__dirname, 'handle-api-routes.js'), 'backup']);
    config.postBuild.push(['node', path.join(__dirname, 'handle-api-routes.js'), 'restore']);
  }

  return config;
}

// Main build orchestration
async function build() {
  const startTime = Date.now();
  console.log(chalk.bold.green(`\n🏗️  Starting Unified Build (${new Date().toISOString()})\n`));

  const config = getBuildConfig();

  try {
    // 1. Clean previous builds
    console.log(chalk.yellow('🧹 Cleaning previous builds...'));
    const distPaths = ['.next', 'dist', 'out', '.vercel'];
    for (const distPath of distPaths) {
      if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, { recursive: true, force: true });
      }
    }

    // 2. Validate environment
    console.log(chalk.yellow('📋 Validating environment...'));
    const validateEnvPath = path.join(__dirname, 'validate-env.js');
    if (fs.existsSync(validateEnvPath)) {
      await runCommand('node', [`"${validateEnvPath}"`]);
    }

    // 3. Generate Prisma client
    console.log(chalk.yellow('🗄️  Generating Prisma client...'));
    await runCommand('pnpm', ['exec', 'prisma', 'generate']);

    // 4. Setup Partytown
    console.log(chalk.yellow('🎉 Setting up Partytown...'));
    const partytownPath = path.join(__dirname, 'setup-partytown.js');
    if (fs.existsSync(partytownPath)) {
      await runCommand('node', [`"${partytownPath}"`]);
    }

    // 5. Run pre-build scripts
    for (const [cmd, args] of config.preBuild) {
      console.log(chalk.yellow(`📦 Running pre-build: ${cmd} ${args.join(' ')}`));
      const scriptPath = args[0];
      if (scriptPath && fs.existsSync(scriptPath)) {
        await runCommand(cmd, args);
      }
    }

    // 6. Main build
    console.log(chalk.bold.blue('\n🔨 Running Next.js build...\n'));
    const buildEnv = {
      ...process.env,
      NODE_OPTIONS: `--max-old-space-size=${config.memoryLimit}`,
    };

    await runCommand(config.buildCommand[0], config.buildCommand.slice(1), { env: buildEnv });

    // 7. Run post-build scripts
    for (const [cmd, args] of config.postBuild) {
      console.log(chalk.yellow(`📦 Running post-build: ${cmd} ${args.join(' ')}`));
      await runCommand(cmd, args);
    }

    // 8. Build summary
    const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(chalk.bold.green(`\n✅ Build completed successfully in ${buildTime}s\n`));

    // Display build info
    if (fs.existsSync('.next')) {
      const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8').trim();
      console.log(chalk.cyan('📦 Build ID:'), buildId);
    }

    if (isStatic && fs.existsSync('out')) {
      const files = fs.readdirSync('out', { recursive: true });
      const htmlFiles = files.filter(f => f.endsWith('.html')).length;
      console.log(chalk.cyan('📄 Static pages:'), htmlFiles);
    }

    if (isAnalyze) {
      console.log(chalk.yellow('\n📊 Bundle analysis available at: .next/analyze/\n'));
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Build failed:'), error.message);
    process.exit(1);
  }
}

// Run the build
build().catch(console.error);
