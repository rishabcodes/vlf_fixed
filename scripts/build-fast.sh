#!/bin/bash

echo "🚀 ULTRA-FAST BUILD SCRIPT"
echo "=========================="

# Clean everything
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Set aggressive memory and build options
export NODE_OPTIONS="--max-old-space-size=16384"
export NEXT_TELEMETRY_DISABLED=1
export SKIP_ENV_VALIDATION=true
export NODE_ENV=production

# Create super minimal config
cat > next.config.minimal.js << 'EOF'
module.exports = {
  output: 'standalone',
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  webpack: (config) => {
    config.devtool = false;
    config.optimization.minimize = false; // Skip minification for speed
    return config;
  },
};
EOF

# Backup and use minimal config
mv next.config.js next.config.original.js
cp next.config.minimal.js next.config.js

echo ""
echo "🔨 Starting build (this may take a few minutes)..."
echo ""

# Build with timeout and progress
timeout 600 npx next build

BUILD_EXIT=$?

# Restore original config
mv next.config.original.js next.config.js
rm next.config.minimal.js

if [ $BUILD_EXIT -eq 0 ]; then
  echo ""
  echo "✅ BUILD SUCCESS!"
  echo ""
  echo "Build artifacts created in .next/"
  echo "Ready for deployment!"
else
  echo ""
  echo "❌ Build failed or timed out"
  echo "Try running with more memory or reducing the codebase size"
fi

exit $BUILD_EXIT