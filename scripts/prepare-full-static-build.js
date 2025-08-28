#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing for full static build with all pages...');

// 1. Restore all backed up directories
const backupDirs = [
  'src/app/locations.backup',
  'src/app/near-me.backup',
  'src/app/es/cerca-de-mi.backup',
  'src/app/api.backup',
];

backupDirs.forEach(backupDir => {
  const originalDir = backupDir.replace('.backup', '');

  if (fs.existsSync(backupDir)) {
    // Remove current directory if it exists
    if (fs.existsSync(originalDir)) {
      fs.rmSync(originalDir, { recursive: true, force: true });
    }

    // Rename backup to original
    fs.renameSync(backupDir, originalDir);
    console.log(`✅ Restored ${originalDir}`);
  }
});

// 2. Create a static-optimized Next.js config
const staticConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Optimize for large static builds
  experimental: {
    workerThreads: true,
    cpus: 4, // Adjust based on your machine
  },
  // Increase webpack memory
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
        },
      };
    }
    return config;
  },
  // Skip type checking and linting during build (do these separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
`;

fs.writeFileSync(path.join(process.cwd(), 'next.config.static.js'), staticConfig);
console.log('✅ Created optimized static config');

// 3. Create build script for full static export
const buildScript = `#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️ Starting full static build...');
console.log('Total pages to generate: ~6,562');
console.log('This may take 10-20 minutes...');

// Set environment variables
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';

// Backup current config
if (fs.existsSync('next.config.js')) {
  fs.renameSync('next.config.js', 'next.config.original.js');
}

// Use static config
fs.copyFileSync('next.config.static.js', 'next.config.js');

try {
  // Ensure all routes are static
  execSync('node scripts/ensure-static-routes.js', { stdio: 'inherit' });
  
  // Remove API routes temporarily
  if (fs.existsSync('src/app/api')) {
    fs.renameSync('src/app/api', 'src/app/api.temp');
    console.log('✅ Temporarily moved API routes');
  }
  
  // Build with maximum memory
  console.log('\\n📦 Building static site...');
  execSync('next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=32768' // 32GB
    }
  });
  
  console.log('\\n✅ Build completed successfully!');
  
  // Show build stats
  if (fs.existsSync('out')) {
    const files = execSync('find out -type f | wc -l').toString().trim();
    const size = execSync('du -sh out').toString().trim();
    console.log(\`\\n📊 Build Stats:\`);
    console.log(\`   Files: \${files}\`);
    console.log(\`   Size: \${size}\`);
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore original config
  if (fs.existsSync('next.config.original.js')) {
    fs.renameSync('next.config.original.js', 'next.config.js');
  }
  
  // Restore API routes
  if (fs.existsSync('src/app/api.temp')) {
    fs.renameSync('src/app/api.temp', 'src/app/api');
  }
}
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts/build-static-full.js'), buildScript);
fs.chmodSync(path.join(process.cwd(), 'scripts/build-static-full.js'), '755');
console.log('✅ Created full build script');

// 4. Create AWS deployment script
const deployScript = `#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config();

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'vasquezlawnc-website';
const DISTRIBUTION_ID = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID;
const REGION = process.env.AWS_REGION || 'us-east-1';

console.log('🚀 Deploying to AWS S3...');

if (!fs.existsSync('out')) {
  console.error('❌ No build output found. Run npm run build:full first.');
  process.exit(1);
}

try {
  // Check AWS CLI is installed
  execSync('aws --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ AWS CLI not found. Please install it first.');
  console.log('Visit: https://aws.amazon.com/cli/');
  process.exit(1);
}

try {
  // Sync to S3 with optimized settings
  console.log(\`\\n📤 Syncing to s3://\${BUCKET_NAME}...\`);
  
  // HTML files - shorter cache
  execSync(\`aws s3 sync out/ s3://\${BUCKET_NAME} \\
    --delete \\
    --exclude "*" \\
    --include "*.html" \\
    --cache-control "public, max-age=3600" \\
    --content-type "text/html; charset=utf-8"\`, 
    { stdio: 'inherit' }
  );
  
  // Static assets - longer cache
  execSync(\`aws s3 sync out/ s3://\${BUCKET_NAME} \\
    --exclude "*.html" \\
    --cache-control "public, max-age=31536000, immutable"\`, 
    { stdio: 'inherit' }
  );
  
  // Create CloudFront invalidation
  if (DISTRIBUTION_ID) {
    console.log('\\n🔄 Creating CloudFront invalidation...');
    execSync(\`aws cloudfront create-invalidation \\
      --distribution-id \${DISTRIBUTION_ID} \\
      --paths "/*"\`, 
      { stdio: 'inherit' }
    );
  }
  
  console.log('\\n✅ Deployment completed successfully!');
  console.log(\`🌐 Site available at: https://\${BUCKET_NAME}.s3-website-\${REGION}.amazonaws.com\`);
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts/deploy-to-aws.js'), deployScript);
fs.chmodSync(path.join(process.cwd(), 'scripts/deploy-to-aws.js'), '755');
console.log('✅ Created AWS deployment script');

// 5. Update package.json with new scripts
console.log('\n📝 Add these scripts to your package.json:');
console.log(
  JSON.stringify(
    {
      'build:full':
        'node scripts/prepare-full-static-build.js && node scripts/build-static-full.js',
      'deploy:aws': 'node scripts/deploy-to-aws.js',
      'build:deploy': 'npm run build:full && npm run deploy:aws',
    },
    null,
    2
  )
);

console.log('\n✅ Preparation complete! Next steps:');
console.log('1. Add the scripts above to package.json');
console.log('2. Set up AWS credentials (aws configure)');
console.log('3. Create S3 bucket with static website hosting');
console.log('4. Run: npm run build:full');
console.log('5. Run: npm run deploy:aws');
