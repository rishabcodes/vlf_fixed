#!/bin/bash
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=8192"
export NEXT_TELEMETRY_DISABLED=1
export GENERATE_SOURCEMAP=false
npx next build || true
