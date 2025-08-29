#!/bin/bash

echo "🔧 PROPER AWS STANDALONE FIX"
echo "============================"
echo ""

# First, let's test if we can skip standalone entirely
echo "Checking if we can use standard build..."

# Option 1: Update amplify.yml to NOT require standalone
cat > amplify.yml << 'EOF'
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install --frozen-lockfile
    build:
      commands:
        # Skip build - use existing .next folder
        - echo "Using pre-built .next folder"
        - ls -la .next/
  artifacts:
    baseDirectory: .
    files:
      - '.next/**/*'
      - 'node_modules/**/*'
      - 'package.json'
      - 'next.config.js'
      - 'public/**/*'
  cache:
    paths:
      - node_modules/**/*
EOF

echo "✅ Updated amplify.yml to use existing build"

# Option 2: Create a proper package.json for deployment
cat > package-prod.json << 'EOF'
{
  "name": "vasquez-law-website",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "next": "15.4.5",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
EOF

# Option 3: Create a simple server.js at root level
cat > server.js << 'EOF'
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ 
  dev,
  dir: '.',
  quiet: false,
  conf: require('./next.config.js')
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
EOF

echo "✅ Created root-level server.js"

# Test if it runs locally
echo ""
echo "Testing if server works locally..."
timeout 5 node server.js 2>&1 | head -20 || true

echo ""
echo "============================"
echo "📦 DEPLOYMENT OPTIONS:"
echo "============================"
echo ""
echo "Option 1 (Recommended): Deploy as-is"
echo "  The amplify.yml will use existing .next folder"
echo ""
echo "Option 2: Test locally first"
echo "  Run: node server.js"
echo "  If it starts, you're good to deploy"
echo ""
echo "Option 3: Use Vercel instead"
echo "  Run: npx vercel"
echo "  (Vercel handles Next.js better than AWS)"
echo ""
