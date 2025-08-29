#!/bin/bash
# Vercel pre-build script
# This runs before the build process on Vercel

echo "🔍 Running pre-build environment validation..."

# Check if we're in Vercel environment
if [ "$VERCEL" = "1" ]; then
  echo "✅ Running in Vercel environment"
  
  # Check for critical environment variables
  MISSING_VARS=()
  
  if [ -z "$DATABASE_URL" ]; then
    MISSING_VARS+=("DATABASE_URL")
  fi
  
  if [ -z "$NEXTAUTH_SECRET" ]; then
    MISSING_VARS+=("NEXTAUTH_SECRET")
  fi
  
  if [ -z "$OPENAI_API_KEY" ]; then
    MISSING_VARS+=("OPENAI_API_KEY")
  fi
  
  if [ -z "$NEXT_PUBLIC_APP_URL" ]; then
    MISSING_VARS+=("NEXT_PUBLIC_APP_URL")
  fi
  
  if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo "❌ Missing required environment variables:"
    printf ' - %s\n' "${MISSING_VARS[@]}"
    echo ""
    echo "📋 Please add these variables in your Vercel project settings:"
    echo "   https://vercel.com/[your-team]/[your-project]/settings/environment-variables"
    echo ""
    echo "📖 See ENV-SETUP-GUIDE.md for detailed instructions"
    exit 1
  else
    echo "✅ All required environment variables are present"
  fi
  
  # Validate NEXTAUTH_SECRET length
  if [ ${#NEXTAUTH_SECRET} -lt 32 ]; then
    echo "❌ NEXTAUTH_SECRET must be at least 32 characters long"
    echo "💡 Generate a new secret with: openssl rand -base64 32"
    exit 1
  fi
  
  # Validate OPENAI_API_KEY format
  if [[ ! "$OPENAI_API_KEY" =~ ^sk- ]]; then
    echo "❌ OPENAI_API_KEY must start with 'sk-'"
    echo "💡 Get your API key from: https://platform.openai.com/api-keys"
    exit 1
  fi
  
  echo "✅ Environment validation passed"
else
  echo "ℹ️  Not running in Vercel environment, skipping pre-build checks"
fi

echo "🚀 Proceeding with build..."