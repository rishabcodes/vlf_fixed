#!/bin/bash

# AWS Build Script with Optimized Memory Management
# This script is specifically designed to prevent AWS build failures

echo "🚀 Starting AWS-optimized build process..."

# Set aggressive memory limits for AWS
export NODE_OPTIONS="--max-old-space-size=16384"  # 16GB RAM
export NEXT_TELEMETRY_DISABLED=1  # Disable telemetry to save memory
export DISABLE_SERVERLESS_FUNCTIONS=true  # Reduce memory during build

# Enable swap if available (helps on AWS EC2)
if [ -f /proc/sys/vm/swappiness ]; then
    echo "Configuring swap..."
    sudo sysctl vm.swappiness=10 2>/dev/null || true
fi

# Clean up before build
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .partytown
rm -rf out
rm -rf dist

# Clean node_modules if over 1.5GB
if [ -d "node_modules" ]; then
    SIZE=$(du -sm node_modules | cut -f1)
    if [ "$SIZE" -gt "1500" ]; then
        echo "⚠️  node_modules is ${SIZE}MB, performing clean install..."
        rm -rf node_modules
        rm -rf pnpm-lock.yaml
        pnpm install --frozen-lockfile --prefer-offline
    fi
fi

# Generate Prisma client with minimal memory
echo "🗄️  Generating Prisma client..."
NODE_OPTIONS="--max-old-space-size=4096" pnpm exec prisma generate

# Build in production mode with optimizations
echo "🔨 Building application..."
NODE_ENV=production \
NEXT_TELEMETRY_DISABLED=1 \
NODE_OPTIONS="--max-old-space-size=16384" \
next build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Display build size
    if [ -d ".next" ]; then
        echo "📊 Build size: $(du -sh .next | cut -f1)"
    fi
else
    echo "❌ Build failed!"
    exit 1
fi