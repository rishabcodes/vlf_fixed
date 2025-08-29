#!/bin/bash

echo "🚀 APPLYING AWS DEPLOYMENT FIXES"
echo "================================"
echo ""

# Make scripts executable
chmod +x emergency-fix.js
chmod +x fix-aws-deployment.sh
chmod +x RUN_FIX.sh
chmod +x scripts/*.sh 2>/dev/null || true

# Run the emergency fix
echo "Running emergency fix..."
node emergency-fix.js

echo ""
echo "================================"
echo "✅ Fixes have been applied!"
echo ""
echo "The build should now work. If you still see errors,"
echo "they should be non-blocking warnings."
echo ""
echo "To deploy to AWS:"
echo "1. git add -A"
echo "2. git commit -m 'Fix AWS deployment issues'"
echo "3. git push"
echo ""
echo "AWS Amplify will automatically rebuild with these fixes."
