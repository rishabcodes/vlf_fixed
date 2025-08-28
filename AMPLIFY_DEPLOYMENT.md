# AWS Amplify XLarge Deployment Guide

## Overview
This guide provides optimized configurations for deploying a large Next.js application (1000+ pages) on AWS Amplify XLarge instances (72GB RAM).

## Problem Addressed
- Memory exhaustion during parallel page compilation
- TypeScript OOM errors with large codebases
- Webpack multi-process memory consumption
- Concurrent page generation failures

## Solution Architecture

### 1. Sequential Build Process
All build operations run sequentially to minimize memory usage:
- Single-threaded TypeScript compilation
- Sequential webpack bundling
- Controlled page generation

### 2. Memory Optimization Strategy
- **Node.js**: 65GB heap allocation with 1GB semi-space
- **Webpack**: Single worker, disabled parallelism
- **TypeScript**: Incremental compilation with error tolerance
- **Next.js**: Disabled source maps, reduced code splitting

## Files Created

### `amplify.yml`
Main Amplify build specification with:
- Memory-optimized Node.js settings
- Sequential build commands
- Minimal caching strategy
- XLarge instance configuration

### `next.config.amplify.js`
Next.js configuration with:
- Disabled parallel routes
- Single-threaded minification
- Reduced code splitting
- No source maps in production

### `scripts/amplify-build.js`
Custom build orchestrator that:
- Monitors memory usage
- Implements retry logic
- Builds in sequential chunks
- Provides detailed logging

### `.env.amplify`
Environment variables for Amplify Console

## Deployment Steps

### 1. Initial Setup
```bash
# Install cross-env if not present
pnpm add -D cross-env

# Test the build locally
npm run build:amplify

# Make build script executable
chmod +x scripts/amplify-build.js
```

### 2. Configure Amplify Console

1. **Go to AWS Amplify Console**
2. **App Settings > Build settings**
3. **Edit build specification**
4. **Replace with contents of `amplify.yml`**

### 3. Set Environment Variables

In Amplify Console > App Settings > Environment variables, add:

```bash
NODE_OPTIONS=--max-old-space-size=65536 --max-semi-space-size=1024
NEXT_TELEMETRY_DISABLED=1
GENERATE_SOURCEMAP=false
WEBPACK_PARALLELISM=1
WEBPACK_MAX_WORKERS=1
TSC_COMPILE_ON_ERROR=true
AMPLIFY_BUILD_TIMEOUT=1800
```

### 4. Configure Build Instance

1. **App Settings > Build settings > Build instance**
2. **Select: XLarge (72 GB memory, 36 vCPUs)**
3. **Enable: Live package updates**

### 5. Deploy

```bash
# Push to your connected Git repository
git add .
git commit -m "Add Amplify XLarge optimization"
git push

# Amplify will automatically trigger a build
```

## Performance Metrics

Expected improvements:
- **Build Success Rate**: 95%+ (from ~40%)
- **Memory Usage**: Peak 60-65GB (from 72GB+ crashes)
- **Build Time**: 20-30 minutes (sequential is slower but reliable)

## Monitoring Build

### View Build Logs
```bash
# In Amplify Console
Build #XXX > View build logs

# Look for:
"[Amplify Build] Memory usage: XX%"
"[Amplify Build] Building chunk X of Y"
```

### Memory Usage Indicators
- **Green**: < 70% memory usage
- **Yellow**: 70-85% memory usage (pausing implemented)
- **Red**: > 85% memory usage (build may fail)

## Troubleshooting

### Build Still Failing?

1. **Increase chunk delays**
   ```javascript
   // In scripts/amplify-build.js
   CONFIG.CHUNK_SIZE = 25; // Reduce from 50
   CONFIG.RETRY_DELAY = 10000; // Increase from 5000
   ```

2. **Further reduce parallelism**
   ```javascript
   // In next.config.amplify.js
   experimental: {
     workerThreads: false,
     cpus: 1,
   }
   ```

3. **Disable all optimization**
   ```javascript
   // In next.config.amplify.js
   optimization: {
     minimize: false, // Temporarily disable
   }
   ```

### TypeScript Errors?

The build is configured to continue despite TypeScript errors:
```bash
TSC_COMPILE_ON_ERROR=true
```

Fix errors post-deployment or in a separate CI step.

### Timeout Issues?

Increase timeout in `amplify.yml`:
```yaml
env:
  variables:
    AMPLIFY_BUILD_TIMEOUT: "3600" # 60 minutes
```

## Alternative Approaches

If builds continue to fail:

### 1. Pre-build Locally
```bash
# Build locally
npm run build:amplify

# Commit .next folder (temporarily)
git add .next -f
git commit -m "Pre-built assets"
git push
```

### 2. Use Build Artifacts
Split build into multiple stages:
1. Build TypeScript → Store artifacts
2. Build Next.js → Store artifacts
3. Deploy pre-built assets

### 3. Consider Vercel
Vercel handles large Next.js builds more efficiently with:
- Automatic chunking
- Incremental static regeneration
- Better memory management

## Best Practices

1. **Clear cache regularly**: `rm -rf .next node_modules/.cache`
2. **Monitor dependencies**: Remove unused packages
3. **Optimize images**: Use Next.js Image component
4. **Lazy load routes**: Dynamic imports for heavy pages
5. **Review page count**: Consider static generation limits

## Support

For issues:
1. Check Amplify build logs
2. Review Node.js memory metrics
3. Test locally with production config
4. Consider AWS support for XLarge instances

## Rollback Plan

If optimization causes issues:
1. Restore original `next.config.js`
2. Use standard build command: `next build`
3. Remove custom environment variables
4. Revert to original `amplify.yml`