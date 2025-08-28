#!/bin/bash

# Vercel build script with fallback DATABASE_URL
echo "Starting Vercel build..."

# Set a dummy DATABASE_URL if not provided
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set, using placeholder for build"
  export DATABASE_URL="postgresql://user:password@localhost:5432/db"
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run the actual build
echo "Running Next.js build..."
npm run build

echo "Build complete!"