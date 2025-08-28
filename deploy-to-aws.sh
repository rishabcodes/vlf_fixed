#!/bin/bash

# ============================================
# AWS S3 + Lambda Deployment Script
# Hybrid architecture: Static frontend + Serverless API
# ============================================

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="us-east-1"
S3_BUCKET="vasquezlawnc-frontend"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"
API_GATEWAY_URL="${API_GATEWAY_URL:-https://api.vasquezlawnc.com}"

echo -e "${GREEN}🚀 Starting AWS Hybrid Deployment${NC}"
echo "=================================="

# Step 1: Check prerequisites
echo -e "\n${YELLOW}📋 Checking prerequisites...${NC}"

command -v aws >/dev/null 2>&1 || { echo -e "${RED}AWS CLI is required but not installed.${NC}" >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo -e "${RED}Node.js is required but not installed.${NC}" >&2; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo -e "${RED}pnpm is required but not installed.${NC}" >&2; exit 1; }

# Check AWS credentials
aws sts get-caller-identity >/dev/null 2>&1 || { echo -e "${RED}AWS credentials not configured. Run 'aws configure'${NC}" >&2; exit 1; }

echo -e "${GREEN}✅ Prerequisites checked${NC}"

# Step 2: Load environment variables
echo -e "\n${YELLOW}🔐 Setting up environment variables...${NC}"

# Create production env file for build
cat > .env.production.local << EOF
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
NEXT_PUBLIC_API_URL=${API_GATEWAY_URL}
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
NEXT_PUBLIC_RETELL_AGENT_ID=agent_7c549b79a40b4cd4f3b63a98e6
NEXT_PUBLIC_RETELL_AGENT_VERSION=18
GOOGLE_ANALYTICS_ID=${GOOGLE_ANALYTICS_ID:-G-XXXXXXXXXX}
NODE_ENV=production
EOF

echo -e "${GREEN}✅ Environment variables configured${NC}"

# Step 3: Build the frontend
echo -e "\n${YELLOW}🔨 Building Next.js application...${NC}"

# Clean previous builds
rm -rf .next out dist

# Install dependencies
pnpm install --frozen-lockfile

# Build and export static site
NODE_OPTIONS="--max-old-space-size=8192" pnpm run build

# Check if static export is possible
if [ ! -d "out" ]; then
    echo -e "${YELLOW}⚠️  Static export not available. Configuring for server-side deployment...${NC}"
    
    # Modify next.config.js for static export
    cat >> next.config.js << 'EOF'

// AWS S3 Static Export Configuration
module.exports = {
  ...module.exports,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Rewrite API calls to Lambda
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ],
    };
  },
};
EOF
    
    # Rebuild with static export
    NODE_OPTIONS="--max-old-space-size=8192" pnpm run build
fi

echo -e "${GREEN}✅ Build completed${NC}"

# Step 4: Prepare Lambda functions
echo -e "\n${YELLOW}🔧 Preparing Lambda functions...${NC}"

# Create Lambda handlers directory
mkdir -p lambda-handlers/dist/handlers

# Create a simple handler wrapper for Next.js API routes
cat > lambda-handlers/convert-api-routes.js << 'EOF'
const fs = require('fs');
const path = require('path');

// Convert Next.js API routes to Lambda handlers
const apiDir = path.join(__dirname, '../src/app/api');
const handlersDir = path.join(__dirname, 'dist/handlers');

function convertRoute(routePath, outputPath) {
  const template = `
const SecretsManager = require('aws-sdk/clients/secretsmanager');
const sm = new SecretsManager({ region: process.env.REGION });

let secrets = {};

async function getSecrets() {
  if (Object.keys(secrets).length === 0) {
    try {
      const data = await sm.getSecretValue({ SecretId: process.env.SECRET_NAME }).promise();
      secrets = JSON.parse(data.SecretString);
      
      // Set environment variables from secrets
      Object.keys(secrets).forEach(key => {
        process.env[key] = secrets[key];
      });
    } catch (error) {
      console.error('Error fetching secrets:', error);
    }
  }
  return secrets;
}

const handler = async (event) => {
  // Load secrets
  await getSecrets();
  
  // Parse the event
  const { httpMethod, path, headers, body, queryStringParameters } = event;
  
  // Set up CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  };
  
  // Handle OPTIONS request
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }
  
  try {
    // Import the Next.js API route
    const route = require('${routePath}');
    
    // Create mock Next.js request/response objects
    const req = {
      method: httpMethod,
      headers,
      query: queryStringParameters || {},
      body: body ? JSON.parse(body) : {},
    };
    
    const res = {
      statusCode: 200,
      headers: {},
      body: null,
      status: function(code) { this.statusCode = code; return this; },
      json: function(data) { this.body = JSON.stringify(data); return this; },
      send: function(data) { this.body = data; return this; },
      setHeader: function(key, value) { this.headers[key] = value; return this; },
    };
    
    // Call the handler
    if (route.default) {
      await route.default(req, res);
    } else if (route[httpMethod]) {
      await route[httpMethod](req, res);
    } else {
      throw new Error('Handler not found');
    }
    
    return {
      statusCode: res.statusCode,
      headers: { ...corsHeaders, ...res.headers },
      body: res.body,
    };
  } catch (error) {
    console.error('Lambda handler error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

module.exports = { handler };
`;
  
  fs.writeFileSync(outputPath, template);
}

// Process each API route
function processApiRoutes(dir, basePath = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processApiRoutes(filePath, path.join(basePath, file));
    } else if (file === 'route.ts' || file === 'route.js') {
      const handlerName = basePath.replace(/\//g, '-') || 'index';
      const outputPath = path.join(handlersDir, `${handlerName}.js`);
      convertRoute(filePath, outputPath);
      console.log(`Created handler: ${handlerName}`);
    }
  });
}

// Create handlers directory
if (!fs.existsSync(handlersDir)) {
  fs.mkdirSync(handlersDir, { recursive: true });
}

// Process all API routes
processApiRoutes(apiDir);

console.log('Lambda handlers created successfully');
EOF

# Run the converter
cd lambda-handlers && node convert-api-routes.js && cd ..

echo -e "${GREEN}✅ Lambda functions prepared${NC}"

# Step 5: Deploy Lambda functions with Serverless
echo -e "\n${YELLOW}☁️  Deploying Lambda functions...${NC}"

# Check if serverless is installed
if ! command -v serverless &> /dev/null; then
    echo "Installing Serverless Framework..."
    npm install -g serverless
fi

# Deploy with Serverless (if serverless.yml exists)
if [ -f "serverless.yml" ]; then
    serverless deploy --stage prod --region ${AWS_REGION}
    
    # Get the API Gateway URL
    API_GATEWAY_URL=$(serverless info --stage prod --region ${AWS_REGION} | grep "endpoint:" | head -1 | awk '{print $2}')
    echo -e "${GREEN}✅ Lambda functions deployed at: ${API_GATEWAY_URL}${NC}"
fi

# Step 6: Upload to S3
echo -e "\n${YELLOW}☁️  Uploading frontend to S3...${NC}"

# Create S3 bucket if it doesn't exist
aws s3api head-bucket --bucket "${S3_BUCKET}" 2>/dev/null || \
  aws s3api create-bucket --bucket "${S3_BUCKET}" --region "${AWS_REGION}"

# Enable static website hosting
aws s3api put-bucket-website --bucket "${S3_BUCKET}" \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "404.html"}
  }'

# Upload static files with appropriate cache headers
echo "Uploading static assets..."

# Upload immutable assets with long cache
aws s3 sync out/_next/static s3://${S3_BUCKET}/_next/static \
  --cache-control "public,max-age=31536000,immutable" \
  --delete

# Upload images with long cache
aws s3 sync out/images s3://${S3_BUCKET}/images \
  --cache-control "public,max-age=31536000" \
  --delete

# Upload HTML files with no cache
aws s3 sync out/ s3://${S3_BUCKET}/ \
  --exclude "_next/static/*" \
  --exclude "images/*" \
  --cache-control "public,max-age=0,must-revalidate" \
  --delete

echo -e "${GREEN}✅ Frontend uploaded to S3${NC}"

# Step 7: Invalidate CloudFront cache
if [ ! -z "${CLOUDFRONT_DISTRIBUTION_ID}" ]; then
    echo -e "\n${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
    
    aws cloudfront create-invalidation \
      --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
      --paths "/*"
    
    echo -e "${GREEN}✅ CloudFront cache invalidated${NC}"
fi

# Step 8: Store API keys in Secrets Manager
echo -e "\n${YELLOW}🔐 Storing API keys in AWS Secrets Manager...${NC}"

# Create secrets JSON from .env file
cat > secrets.json << EOF
{
  "OPENAI_API_KEY": "${OPENAI_API_KEY}",
  "DATABASE_URL": "${DATABASE_URL}",
  "NEXTAUTH_SECRET": "${NEXTAUTH_SECRET}",
  "GHL_API_KEY": "${GHL_API_KEY}",
  "GHL_LOCATION_ID": "${GHL_LOCATION_ID}",
  "GHL_WEBHOOK_SECRET": "${GHL_WEBHOOK_SECRET}",
  "RETELL_API_KEY": "${RETELL_API_KEY}",
  "RETELL_WEBHOOK_SECRET": "${RETELL_WEBHOOK_SECRET}",
  "SMTP_PASSWORD": "${SMTP_PASSWORD}",
  "AUTHORIZENET_LOGIN_ID": "${AUTHORIZENET_LOGIN_ID}",
  "AUTHORIZENET_TRANSACTION_KEY": "${AUTHORIZENET_TRANSACTION_KEY}",
  "LAWPAY_SECRET_KEY": "${LAWPAY_SECRET_KEY}",
  "HUGGINGFACE_API_KEY": "${HUGGINGFACE_API_KEY}",
  "REVALIDATION_TOKEN": "${REVALIDATION_TOKEN}"
}
EOF

# Create or update the secret
aws secretsmanager create-secret \
  --name vasquezlawnc/api-keys \
  --description "API keys for Vasquez Law Firm website" \
  --secret-string file://secrets.json \
  --region ${AWS_REGION} 2>/dev/null || \
aws secretsmanager update-secret \
  --secret-id vasquezlawnc/api-keys \
  --secret-string file://secrets.json \
  --region ${AWS_REGION}

# Clean up secrets file
rm -f secrets.json

echo -e "${GREEN}✅ API keys stored securely${NC}"

# Step 9: Output deployment information
echo -e "\n${GREEN}🎉 Deployment Complete!${NC}"
echo "=================================="
echo -e "Frontend URL: ${GREEN}https://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com${NC}"
echo -e "API URL: ${GREEN}${API_GATEWAY_URL}${NC}"

if [ ! -z "${CLOUDFRONT_DISTRIBUTION_ID}" ]; then
    CLOUDFRONT_URL=$(aws cloudfront get-distribution --id ${CLOUDFRONT_DISTRIBUTION_ID} --query "Distribution.DomainName" --output text)
    echo -e "CloudFront URL: ${GREEN}https://${CLOUDFRONT_URL}${NC}"
fi

echo -e "\n${YELLOW}📝 Next Steps:${NC}"
echo "1. Update DNS records to point to CloudFront distribution"
echo "2. Test all API endpoints at ${API_GATEWAY_URL}"
echo "3. Monitor CloudWatch logs for any errors"
echo "4. Set up CloudWatch alarms for monitoring"

# Clean up temporary files
rm -f .env.production.local

echo -e "\n${GREEN}✨ Deployment script completed successfully!${NC}"