#!/bin/bash

# Vercel Deployment Script
# This script deploys your VLF website to Vercel

echo "🚀 Starting Vercel deployment..."

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep VERCEL_TOKEN | xargs)
fi

# Check if token exists
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN not found in .env.local"
    exit 1
fi

# Deploy to Vercel
echo "📦 Building and deploying to Vercel..."
npx vercel deploy --yes --token $VERCEL_TOKEN --prod

echo "✅ Deployment complete!"
echo "🔗 Visit your site at: https://vlf-website.vercel.app"