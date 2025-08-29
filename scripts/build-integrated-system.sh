#!/bin/bash

# Build script for integrated VLF + HODOS system
set -e

echo "🚀 Building Integrated VLF + HODOS System"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_success() { echo -e "${GREEN}✓ $1${NC}"; }
log_error() { echo -e "${RED}✗ $1${NC}"; exit 1; }
log_info() { echo -e "${YELLOW}→ $1${NC}"; }

# Paths
VLF_DIR=$(pwd)
HODOS_DIR="/Users/williamvasquez/Documents/HODOS/HODOS"

# Check if HODOS exists
if [ ! -d "$HODOS_DIR" ]; then
    log_error "HODOS directory not found at $HODOS_DIR"
fi

# Step 1: Setup environment files
log_info "Setting up environment files..."

# Create VLF .env if not exists
if [ ! -f .env ]; then
    cat > .env << EOF
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/vlf_website"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Redis
REDIS_URL="redis://localhost:6379"

# HODOS Integration
HODOS_API_URL="http://localhost:3001"
HODOS_API_KEY="hodos-api-key-123"
HODOS_WEBSOCKET_URL="ws://localhost:3001"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Voice & SMS
# Voice: Handled by Retell AI
# SMS: Handled by GoHighLevel

# OpenAI
OPENAI_API_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Sentry
SENTRY_DSN=""

# Socket.IO
SOCKET_PORT="3002"
EOF
    log_success "Created VLF .env file"
else
    log_success "VLF .env file exists"
fi

# Create HODOS .env if not exists
if [ ! -f "$HODOS_DIR/.env" ]; then
    cat > "$HODOS_DIR/.env" << EOF
# Server Configuration
NODE_ENV=development
PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/hodos
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d

# VLF Integration
VLF_WEBSITE_URL=http://localhost:3000
VLF_API_KEY=vlf-api-key-123

# AI Services
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_AI_KEY=
COHERE_API_KEY=

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Voice & SMS
# Voice: Handled by Retell AI (RETELL_API_KEY)
# SMS: Handled by GoHighLevel (GHL_API_KEY)

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
S3_BUCKET_NAME=hodos-documents

# Elasticsearch
ELASTICSEARCH_URL=http://localhost:9200

# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_URL=http://localhost:3030
EOF
    log_success "Created HODOS .env file"
else
    log_success "HODOS .env file exists"
fi

# Step 2: Install dependencies
log_info "Installing dependencies..."

# VLF dependencies
npm install --silent
log_success "VLF dependencies installed"

# Create install script for HODOS
cat > install-hodos.js << 'EOF'
const { execSync } = require('child_process');
const path = require('path');

const hodosPath = '/Users/williamvasquez/Documents/HODOS/HODOS';
try {
  console.log('Installing HODOS dependencies...');
  execSync('npm install --silent', { cwd: hodosPath, stdio: 'inherit' });
  console.log('✓ HODOS dependencies installed');
} catch (error) {
  console.error('Failed to install HODOS dependencies:', error.message);
  process.exit(1);
}
EOF

node install-hodos.js
rm install-hodos.js

# Step 3: Start databases
log_info "Starting database services..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    log_error "Docker is not running. Please start Docker Desktop."
fi

# Start only database services
docker-compose -f docker-compose.integrated.yml up -d vlf-postgres hodos-mongodb shared-redis
sleep 5
log_success "Database services started"

# Step 4: Run database migrations
log_info "Running database migrations..."

# VLF migrations
npx prisma migrate deploy
log_success "VLF database migrations completed"

# Step 5: Build projects
log_info "Building projects..."

# Build VLF
npm run build
log_success "VLF Website built successfully"

# Build HODOS
cat > build-hodos.js << 'EOF'
const { execSync } = require('child_process');
const path = require('path');

const hodosPath = '/Users/williamvasquez/Documents/HODOS/HODOS';
try {
  console.log('Building HODOS...');
  execSync('npm run build', { cwd: hodosPath, stdio: 'inherit' });
  console.log('✓ HODOS built successfully');
} catch (error) {
  console.error('Failed to build HODOS:', error.message);
  process.exit(1);
}
EOF

node build-hodos.js
rm build-hodos.js

# Step 6: Run tests
log_info "Running tests..."

# VLF tests
npm test -- --passWithNoTests
log_success "VLF tests passed"

# Step 7: Create production Dockerfiles
log_info "Creating production Dockerfiles..."

# VLF Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
EOF

log_success "Created VLF Dockerfile"

# HODOS Dockerfile
cat > "$HODOS_DIR/Dockerfile" << 'EOF'
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hodos

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
RUN npm ci --only=production

USER hodos

EXPOSE 3001

CMD ["node", "dist/api/server.js"]
EOF

log_success "Created HODOS Dockerfile"

# Step 8: Create deployment scripts
log_info "Creating deployment scripts..."

# Create deployment script
cat > deploy-production.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 Deploying to Production"

# Build images
docker build -t vlf-website:latest .
docker build -t hodos-platform:latest /Users/williamvasquez/Documents/HODOS/HODOS

# Tag for registry (replace with your registry)
# docker tag vlf-website:latest your-registry/vlf-website:latest
# docker tag hodos-platform:latest your-registry/hodos-platform:latest

# Push to registry
# docker push your-registry/vlf-website:latest
# docker push your-registry/hodos-platform:latest

echo "✅ Deployment complete!"
echo "Update your production environment with the new images."
EOF

chmod +x deploy-production.sh
log_success "Created deployment script"

# Step 9: Create health check script
cat > health-check.sh << 'EOF'
#!/bin/bash

echo "🏥 Running health checks..."

# Check VLF
VLF_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health || echo "000")
if [ "$VLF_HEALTH" = "200" ]; then
    echo "✓ VLF Website: Healthy"
else
    echo "✗ VLF Website: Unhealthy (HTTP $VLF_HEALTH)"
fi

# Check HODOS
HODOS_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health || echo "000")
if [ "$HODOS_HEALTH" = "200" ]; then
    echo "✓ HODOS Platform: Healthy"
else
    echo "✗ HODOS Platform: Unhealthy (HTTP $HODOS_HEALTH)"
fi

# Check databases
docker-compose -f docker-compose.integrated.yml ps
EOF

chmod +x health-check.sh
log_success "Created health check script"

# Step 10: Summary
echo ""
echo "========================================"
echo -e "${GREEN}✅ Build Complete!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Start development servers:"
echo "   - Terminal 1: npm run dev"
echo "   - Terminal 2: cd $HODOS_DIR && npm run dev"
echo ""
echo "2. Or use Docker Compose:"
echo "   docker-compose -f docker-compose.integrated.yml up"
echo ""
echo "3. Run health checks:"
echo "   ./health-check.sh"
echo ""
echo "4. Deploy to production:"
echo "   ./deploy-production.sh"
echo ""
echo "Services will be available at:"
echo "  - VLF Website: http://localhost:3000"
echo "  - HODOS API: http://localhost:3001"
echo "  - PostgreSQL: localhost:5432"
echo "  - MongoDB: localhost:27017"
echo "  - Redis: localhost:6379"