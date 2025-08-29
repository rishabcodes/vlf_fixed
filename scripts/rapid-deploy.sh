#!/bin/bash

# Rapid deployment script for VLF + HODOS
set -e

echo "🚀 Rapid Deployment: VLF + HODOS"
echo "================================"

# Check Docker
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Starting Docker..."
    open -a Docker
    echo "Waiting for Docker to start..."
    while ! docker info > /dev/null 2>&1; do
        sleep 2
    done
fi

# Step 1: Create minimal docker-compose for essentials
cat > docker-compose.rapid.yml << 'EOF'
version: '3.8'

services:
  # Databases only - apps run locally for speed
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vlf_website
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  mongodb:
    image: mongo:7.0
    environment:
      MONGO_INITDB_DATABASE: hodos
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  mongo-data:
  redis-data:
EOF

# Step 2: Start databases
echo "→ Starting databases..."
docker-compose -f docker-compose.rapid.yml up -d
sleep 5

# Step 3: Create startup script
cat > start-dev.sh << 'EOF'
#!/bin/bash

echo "Starting development servers..."
echo ""
echo "Open 2 terminals and run:"
echo ""
echo "Terminal 1 (VLF Website):"
echo "  npm run dev"
echo ""
echo "Terminal 2 (HODOS):"
echo "  cd /Users/williamvasquez/Documents/HODOS/HODOS && npm run dev"
echo ""
echo "Services:"
echo "  - VLF Website: http://localhost:3000"
echo "  - HODOS API: http://localhost:3001"
echo "  - PostgreSQL: localhost:5432"
echo "  - MongoDB: localhost:27017"
echo "  - Redis: localhost:6379"
EOF

chmod +x start-dev.sh

# Step 4: Run database migrations for VLF
echo "→ Running VLF database migrations..."
npx prisma migrate dev --name init || true

# Step 5: Create test script
cat > test-integration.sh << 'EOF'
#!/bin/bash

echo "Testing integration..."

# Test VLF health
echo -n "VLF Website: "
curl -s http://localhost:3000/api/health || echo "Not running"

# Test HODOS health
echo -n "HODOS API: "
curl -s http://localhost:3001/health || echo "Not running"

# Test databases
echo ""
echo "Database Status:"
docker-compose -f docker-compose.rapid.yml ps
EOF

chmod +x test-integration.sh

# Step 6: Create production build script
cat > build-production.sh << 'EOF'
#!/bin/bash

echo "Building for production..."

# Build VLF
echo "→ Building VLF Website..."
npm run build

# Build HODOS
echo "→ Building HODOS Platform..."
cd /Users/williamvasquez/Documents/HODOS/HODOS
npm run build
cd -

echo "✅ Production builds complete!"
EOF

chmod +x build-production.sh

# Summary
echo ""
echo "✅ Rapid deployment complete!"
echo "================================"
echo ""
echo "Databases are running. Now:"
echo ""
echo "1. Run ./start-dev.sh to see startup instructions"
echo "2. Start each service in separate terminals"
echo "3. Test with ./test-integration.sh"
echo ""
echo "For production: ./build-production.sh"