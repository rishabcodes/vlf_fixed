#!/bin/bash

# Quick runner script to apply all fixes

echo "🔧 AWS DEPLOYMENT FIX RUNNER"
echo "============================"
echo ""

# Make all scripts executable
chmod +x fix-aws-deployment.sh
chmod +x scripts/*.sh 2>/dev/null || true
chmod +x scripts/*.js 2>/dev/null || true

# Run the main fix
./fix-aws-deployment.sh

echo ""
echo "✅ Fix process complete!"
echo ""
echo "If the build succeeded, you're ready to deploy!"
echo "If it failed, check the error messages above."
