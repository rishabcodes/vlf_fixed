#!/bin/bash

# Load environment variables from .env.local
export $(cat .env.local | grep -v '^#' | xargs)

# Run Prisma generate
echo "Generating Prisma client..."
npx prisma generate

# Validate environment variables
echo "Validating environment variables..."
npm run validate:env

# Run Next.js build
echo "Building Next.js application..."
npx next build