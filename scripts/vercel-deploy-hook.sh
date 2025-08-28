#!/bin/bash

# Vercel Deploy Hook Trigger Script
# This script triggers a manual deployment on Vercel

echo "🚀 Triggering Vercel deployment..."

# You need to get your deploy hook URL from Vercel dashboard:
# 1. Go to https://vercel.com/dashboard
# 2. Click on your project
# 3. Go to Settings → Git → Deploy Hooks
# 4. Create a hook for 'main' branch
# 5. Copy the URL and replace below

DEPLOY_HOOK_URL="YOUR_VERCEL_DEPLOY_HOOK_URL"

# Check if URL is set
if [ "$DEPLOY_HOOK_URL" = "YOUR_VERCEL_DEPLOY_HOOK_URL" ]; then
    echo "❌ Error: Please set your Vercel deploy hook URL in this script"
    echo ""
    echo "To get your deploy hook URL:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Click on your project (vlf-website)"
    echo "3. Go to Settings → Git → Deploy Hooks"
    echo "4. Create a hook for 'main' branch"
    echo "5. Copy the URL and replace in this script"
    exit 1
fi

# Trigger the deployment
response=$(curl -X POST "$DEPLOY_HOOK_URL" -w "\n%{http_code}" 2>/dev/null)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo "✅ Deployment triggered successfully!"
    echo "📊 Response: $body"
    echo ""
    echo "🔍 Check deployment status at:"
    echo "   https://vercel.com/dashboard"
else
    echo "❌ Failed to trigger deployment"
    echo "HTTP Code: $http_code"
    echo "Response: $body"
    exit 1
fi

echo ""
echo "📝 Deployment Details:"
echo "- Branch: main"
echo "- Commit: $(git rev-parse HEAD)"
echo "- Time: $(date)"
echo ""
echo "✨ Epic AI agents deployment in progress!"