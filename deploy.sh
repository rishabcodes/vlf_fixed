#!/bin/bash

# Deployment script for Vasquez Law Firm website
# This script handles the deployment to development server

set -e

echo "🚀 Starting deployment to development server..."
echo "================================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    exit 1
fi

# Kill any existing Next.js processes on port 3000
echo "🔍 Checking for existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
pnpm exec prisma generate

# Build the application
echo "🔨 Building application..."
npx next build

# Run database migrations (if needed)
# echo "🗃️ Running database migrations..."
# pnpm exec prisma migrate deploy

# Start the production server
echo "🌐 Starting production server on port 3000..."
echo "================================================"
echo "✅ Deployment complete!"
echo "🌍 Application running at: http://localhost:3000"
echo "================================================"

# Start the server
NODE_ENV=production npx next start -p 3000