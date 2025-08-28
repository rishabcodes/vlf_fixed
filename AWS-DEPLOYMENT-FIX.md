# AWS Deployment Memory Fix Guide

## Problem Summary
AWS builds were failing with "out of memory" errors due to:
- **5,483 TypeScript files** requiring heavy compilation
- Memory leaks in React hooks with polling
- Default 8GB memory allocation insufficient 
- Heavy dependencies (pdf-lib, langchain, googleapis)

## Implemented Solutions

### 1. Increased Memory Allocation
- **Old**: 8GB (`--max-old-space-size=8192`)
- **New**: 16GB (`--max-old-space-size=16384`)
- Location: `scripts/aws-build.sh`

### 2. Fixed Memory Leaks
- **File**: `src/hooks/useCrewAI.ts`
- **Issue**: `setTimeout` creating infinite polling loops without cleanup
- **Fix**: Added cleanup functions and activity flags to stop polling on unmount

### 3. Created AWS-Specific Build Script
- **File**: `scripts/aws-build.sh`
- Features:
  - 16GB memory allocation
  - Disables telemetry to save memory
  - Cleans node_modules if over 1.5GB
  - Enables swap if available on EC2

### 4. Build Optimization Config
- **File**: `build-optimization.config.js`
- Optimizations:
  - Code splitting for heavy dependencies
  - Filesystem caching with gzip compression
  - Excludes test files and extras from build
  - Configures AWS Lambda layers for heavy libs

## How to Deploy to AWS

### Option 1: Using AWS Build Script (Recommended)
```bash
# Make script executable
chmod +x scripts/aws-build.sh

# Run the optimized build
./scripts/aws-build.sh

# Deploy to AWS
aws s3 sync .next s3://your-bucket-name
```

### Option 2: Using Package.json Script
```bash
# Add to package.json scripts:
"build:aws": "NODE_OPTIONS='--max-old-space-size=16384' next build"

# Run build
npm run build:aws
```

### Option 3: In AWS Build Environment
Set these environment variables in AWS CodeBuild or Amplify:
```
NODE_OPTIONS=--max-old-space-size=16384
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

## AWS Service-Specific Instructions

### AWS Amplify
1. Go to App settings > Build settings
2. Update build spec:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --prefer-offline
    build:
      commands:
        - NODE_OPTIONS='--max-old-space-size=16384' npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### AWS CodeBuild
1. Use a build environment with at least 16GB RAM
2. Select: `aws/codebuild/standard:7.0` or higher
3. Environment type: `Linux EC2`
4. Compute type: `BUILD_GENERAL1_LARGE` (15GB memory)

### EC2 Direct Deployment
```bash
# SSH into EC2 instance
ssh ec2-user@your-instance

# Clone repository
git clone https://github.com/rishabcodes/VLF_final.git
cd VLF_final

# Install dependencies
npm install

# Run AWS build script
./scripts/aws-build.sh

# Start application
pm2 start npm --name "vlf-app" -- start
```

## Monitoring Build Memory

To monitor memory usage during builds:
```bash
# Add to build script
NODE_OPTIONS='--max-old-space-size=16384 --trace-gc' npm run build
```

## If Build Still Fails

1. **Increase memory further**:
   ```bash
   NODE_OPTIONS='--max-old-space-size=24576'  # 24GB
   ```

2. **Enable swap on EC2**:
   ```bash
   sudo dd if=/dev/zero of=/swapfile bs=1G count=8
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

3. **Split the build**:
   - Build API routes separately
   - Build static pages in batches
   - Use incremental static regeneration (ISR)

4. **Remove heavy dependencies**:
   - Move PDF processing to Lambda functions
   - Load AI/ML libraries dynamically
   - Use CDN for large assets

## Verification

After deployment, verify the build:
```bash
# Check build size
du -sh .next

# Test the deployment
curl -I https://your-domain.com

# Check for memory leaks in production
npm run analyze
```

## Long-term Recommendations

1. **Break into microservices**: Split this monolith into smaller services
2. **Use serverless functions**: Move heavy processing to AWS Lambda
3. **Implement build caching**: Use Turborepo or Nx for incremental builds
4. **Reduce dependencies**: Audit and remove unused packages
5. **Consider edge functions**: Use Vercel Edge or Cloudflare Workers for lighter deployments

## Support

If builds continue to fail after these optimizations:
1. Check AWS CloudWatch logs for specific errors
2. Increase EC2 instance size temporarily for builds
3. Consider using a dedicated build server
4. Contact AWS support for quota increases

---

*Last updated: January 2025*
*Fixes implemented to resolve build failures on AWS with 5,483 TypeScript files*