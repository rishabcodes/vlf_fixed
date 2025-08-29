#!/bin/bash

# Fix Dependencies Script
# This script installs missing packages that are causing build failures

echo "🔧 Installing missing critical dependencies..."

# Install missing UI components that are imported but not installed
pnpm add @radix-ui/react-checkbox @radix-ui/react-slider @radix-ui/react-tabs

# Install missing utility packages
pnpm add winston million @react-pdf/renderer

# Install missing development dependencies for tests (if you want to keep tests)
pnpm add -D @testing-library/react @testing-library/jest-dom jest @types/jest ts-jest

echo "✅ Dependencies installed successfully"

# Verify installation
echo "📋 Verifying installed packages..."
pnpm list @radix-ui/react-checkbox @radix-ui/react-slider @radix-ui/react-tabs winston million @react-pdf/renderer

echo "🎉 All critical dependencies are now installed!"
