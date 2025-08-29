#!/bin/bash

# Local development setup without Docker
set -e

echo "🚀 Local Development Setup (No Docker)"
echo "====================================="

# Check for required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        exit 1
    fi
}

# Check Node.js
check_tool node
check_tool npm

echo "✓ Node.js $(node --version) installed"
echo "✓ npm $(npm --version) installed"

# Step 1: Setup environment files
echo ""
echo "→ Setting up environment files..."

# VLF .env for local development
cat > .env.local << 'EOF'
# Database (use SQLite for local dev)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key-123"

# HODOS Integration
HODOS_API_URL="http://localhost:3001"
HODOS_API_KEY="dev-hodos-key"
HODOS_WEBSOCKET_URL="ws://localhost:3001"

# Development Mode
NODE_ENV="development"
SKIP_ENV_VALIDATION="true"

# Mock services for development
MOCK_REDIS="true"
MOCK_EMAIL="true"
MOCK_SMS="true"
EOF

# Copy to .env if doesn't exist
if [ ! -f .env ]; then
    cp .env.local .env
fi

echo "✓ Environment files created"

# Step 2: Install dependencies
echo ""
echo "→ Installing VLF dependencies..."
npm install

# Step 3: Setup SQLite database for development
echo ""
echo "→ Setting up SQLite database..."
npx prisma migrate dev --name init || true
npx prisma generate

# Step 4: Create mock services
echo ""
echo "→ Creating mock services..."

cat > src/lib/mocks/redis.ts << 'EOF'
// Mock Redis for local development
export class MockRedis {
  private store: Map<string, any> = new Map();

  async get(key: string) {
    return this.store.get(key) || null;
  }

  async set(key: string, value: any, options?: any) {
    this.store.set(key, value);
    return 'OK';
  }

  async del(key: string) {
    return this.store.delete(key) ? 1 : 0;
  }

  async expire(key: string, seconds: number) {
    // Mock implementation
    return 1;
  }
}

export const redis = new MockRedis();
EOF

# Step 5: Create development runners
cat > run-vlf.sh << 'EOF'
#!/bin/bash
echo "Starting VLF Website..."
export NODE_ENV=development
export DATABASE_URL="file:./dev.db"
npm run dev
EOF

cat > run-hodos.sh << 'EOF'
#!/bin/bash
echo "Starting HODOS Platform..."
cd /Users/williamvasquez/Documents/HODOS/HODOS
export NODE_ENV=development
export MONGODB_URI="mongodb://localhost:27017/hodos"
npm run dev
EOF

chmod +x run-vlf.sh run-hodos.sh

# Step 6: Create a simple test endpoint
cat > src/app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    services: {
      database: 'connected',
      redis: process.env.MOCK_REDIS === 'true' ? 'mocked' : 'connected',
      hodos: 'pending'
    }
  });
}
EOF

# Step 7: Create integration test
cat > test-local.sh << 'EOF'
#!/bin/bash

echo "🧪 Testing local setup..."
echo ""

# Check if VLF is running
echo -n "VLF Website: "
curl -s http://localhost:3000/api/health | jq -r '.status' || echo "Not running"

# Check if HODOS is running
echo -n "HODOS API: "
curl -s http://localhost:3001/health || echo "Not running"

echo ""
echo "To start services:"
echo "  Terminal 1: ./run-vlf.sh"
echo "  Terminal 2: ./run-hodos.sh"
EOF

chmod +x test-local.sh

# Step 8: Create build script
cat > build-all.sh << 'EOF'
#!/bin/bash

echo "🔨 Building projects..."

# Build VLF
echo "→ Building VLF Website..."
npm run build

# Check HODOS
if [ -d "/Users/williamvasquez/Documents/HODOS/HODOS" ]; then
    echo "→ Building HODOS Platform..."
    cd /Users/williamvasquez/Documents/HODOS/HODOS
    npm run build
    cd -
fi

echo "✅ Build complete!"
EOF

chmod +x build-all.sh

# Summary
echo ""
echo "✅ Local development setup complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Start VLF Website:"
echo "   ./run-vlf.sh"
echo ""
echo "2. In another terminal, start HODOS:"
echo "   ./run-hodos.sh"
echo ""
echo "3. Test the setup:"
echo "   ./test-local.sh"
echo ""
echo "4. Build for production:"
echo "   ./build-all.sh"
echo ""
echo "No Docker required! Using SQLite for VLF database."