#!/bin/bash

# Vasquez Law Firm Production Deployment Script
# This script handles the deployment process to Vercel

set -e

echo "🚀 Starting Vasquez Law Firm deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ .env.production not found!"
    echo "Please create .env.production from env.production.example"
    exit 1
fi

# Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# 1. Run linting
echo "📝 Running linting..."
npm run lint || {
    echo "❌ Linting failed. Please fix errors before deploying."
    exit 1
}

# 2. Run type checking
echo "🔍 Running type check..."
npm run type-check || {
    echo "❌ Type checking failed. Please fix errors before deploying."
    exit 1
}

# 3. Run tests
echo "🧪 Running tests..."
npm test || {
    echo "❌ Tests failed. Please fix failing tests before deploying."
    exit 1
}

# 4. Build locally to ensure it works
echo "🏗️  Testing production build locally..."
npm run build || {
    echo "❌ Build failed. Please fix build errors before deploying."
    exit 1
}

echo "✅ All pre-deployment checks passed!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."

# Check if this is first deployment
if [ ! -f .vercel/project.json ]; then
    echo "📋 First deployment detected. Setting up Vercel project..."
    vercel link
fi

# Deploy to production
vercel --prod

echo "✅ Deployment complete!"

# Post-deployment tasks
echo "📋 Post-deployment checklist:"
echo "  1. ✅ Verify the site is live at https://www.vasquezlawnc.com"
echo "  2. 📊 Submit sitemap to Google Search Console"
echo "  3. 📈 Verify Google Analytics is tracking"
echo "  4. 🔍 Test all forms and integrations"
echo "  5. 📱 Test mobile responsiveness"
echo "  6. 🌐 Verify all language versions work"
echo "  7. 💳 Test payment processing (in test mode first)"
echo "  8. 📞 Test phone click-to-call functionality"
echo "  9. 💬 Test chat widget"
echo "  10. 🔔 Configure webhook endpoints in external services"

echo ""
echo "🎉 Deployment successful! The site should be live in a few moments."