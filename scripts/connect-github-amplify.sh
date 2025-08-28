#!/bin/bash

# Connect GitHub repository to AWS Amplify
# This script requires a GitHub Personal Access Token

APP_ID="d1yo34fqw65fpz"
REGION="us-east-2"
REPO_URL="https://github.com/rishabcodes/vlf_fixed"
BRANCH="main"

echo "==========================================
AWS Amplify GitHub Connection Setup
=========================================="

echo "
To connect your GitHub repository to AWS Amplify, you need:

1. A GitHub Personal Access Token with these permissions:
   - repo (Full control of private repositories)
   - admin:repo_hook (Full control of repository hooks)

2. Create a token at: https://github.com/settings/tokens/new

3. Once you have the token, you can either:

   Option A: Use AWS Console (Recommended for first-time setup)
   ---------------------------------------------------------
   1. Go to: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${APP_ID}
   2. Click 'Connect repository'
   3. Choose 'GitHub'
   4. Authorize AWS Amplify
   5. Select repository: rishabcodes/vlf_fixed
   6. Select branch: main
   
   Option B: Use OAuth URL (Direct method)
   --------------------------------------
   1. Visit: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${APP_ID}/settings/repository
   2. Click 'Connect repository'
   3. Follow OAuth flow

After connecting, the build will start automatically.
"

echo "
App Details:
- App ID: ${APP_ID}
- Region: ${REGION}
- Repository: ${REPO_URL}
- Branch: ${BRANCH}
- Domain: https://${APP_ID}.amplifyapp.com
"

echo "
Build Monitoring:
- Build logs: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${APP_ID}/builds
- App settings: https://${REGION}.console.aws.amazon.com/amplify/home?region=${REGION}#/${APP_ID}/settings
"