#!/bin/bash

# Deploy to AWS Amplify using AWS API
# This script uses the AWS credentials from ~/.aws/credentials

set -e

# Configuration
APP_NAME="VLF-Website-Production"
REPOSITORY="https://github.com/Zak-neurobit/VLF-DEPLOYMENT-V1"
BRANCH="master"
REGION="us-east-2"
FRAMEWORK="Next.js - SSR"

# Read AWS credentials
AWS_ACCESS_KEY_ID=$(grep aws_access_key_id ~/.aws/credentials | cut -d '=' -f2 | tr -d ' ')
AWS_SECRET_ACCESS_KEY=$(grep aws_secret_access_key ~/.aws/credentials | cut -d '=' -f2 | tr -d ' ')

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "Error: AWS credentials not found"
    exit 1
fi

echo "AWS Credentials loaded successfully"
echo "Region: $REGION"
echo ""

# Install AWS CLI if not present
if ! command -v aws &> /dev/null; then
    echo "Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip -q awscliv2.zip
    sudo ./aws/install
    rm -rf awscliv2.zip aws/
fi

# Configure AWS CLI
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=$REGION

# Step 1: Create Amplify App
echo "Creating Amplify App: $APP_NAME"

# Read environment variables
ENV_VARS=$(cat amplify-env-vars.json | jq -c .)

# Create app with XLarge compute
APP_RESPONSE=$(aws amplify create-app \
    --name "$APP_NAME" \
    --repository "$REPOSITORY" \
    --platform "WEB_COMPUTE" \
    --build-spec file://amplify.yml \
    --environment-variables "$ENV_VARS" \
    --enable-branch-auto-build \
    --region $REGION \
    2>&1) || true

if echo "$APP_RESPONSE" | grep -q "ResourceAlreadyExistsException"; then
    echo "App already exists, fetching app ID..."
    APP_ID=$(aws amplify list-apps --region $REGION --query "apps[?name=='$APP_NAME'].appId" --output text)
else
    APP_ID=$(echo "$APP_RESPONSE" | jq -r '.app.appId')
fi

if [ -z "$APP_ID" ]; then
    echo "Error: Could not create or find app"
    exit 1
fi

echo "App ID: $APP_ID"

# Step 2: Update app to use XLarge compute
echo "Configuring XLarge compute type..."

# Update app with compute type
aws amplify update-app \
    --app-id "$APP_ID" \
    --build-spec file://amplify.yml \
    --custom-headers '{"Cache-Control": "public, max-age=31536000, immutable"}' \
    --environment-variables "$ENV_VARS" \
    --region $REGION

# Step 3: Create/Update Branch
echo "Configuring branch: $BRANCH"

BRANCH_RESPONSE=$(aws amplify create-branch \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH" \
    --framework "$FRAMEWORK" \
    --stage "PRODUCTION" \
    --enable-auto-build \
    --environment-variables "$ENV_VARS" \
    --build-spec file://amplify.yml \
    --region $REGION \
    2>&1) || true

if echo "$BRANCH_RESPONSE" | grep -q "ResourceAlreadyExistsException"; then
    echo "Branch already exists, updating..."
    aws amplify update-branch \
        --app-id "$APP_ID" \
        --branch-name "$BRANCH" \
        --framework "$FRAMEWORK" \
        --stage "PRODUCTION" \
        --enable-auto-build \
        --environment-variables "$ENV_VARS" \
        --build-spec file://amplify.yml \
        --region $REGION
fi

# Step 4: Connect GitHub repository
echo "Setting up GitHub webhook..."

WEBHOOK_RESPONSE=$(aws amplify create-webhook \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH" \
    --region $REGION \
    2>&1) || true

if ! echo "$WEBHOOK_RESPONSE" | grep -q "ResourceAlreadyExistsException"; then
    WEBHOOK_URL=$(echo "$WEBHOOK_RESPONSE" | jq -r '.webhook.webhookUrl')
    echo "Webhook URL: $WEBHOOK_URL"
    echo "Please add this webhook URL to your GitHub repository settings"
fi

# Step 5: Start deployment
echo "Starting deployment..."

JOB_RESPONSE=$(aws amplify start-job \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH" \
    --job-type "RELEASE" \
    --region $REGION)

JOB_ID=$(echo "$JOB_RESPONSE" | jq -r '.jobSummary.jobId')

echo "Deployment started! Job ID: $JOB_ID"

# Step 6: Monitor deployment
echo "Monitoring deployment progress..."

while true; do
    sleep 10
    
    JOB_STATUS=$(aws amplify get-job \
        --app-id "$APP_ID" \
        --branch-name "$BRANCH" \
        --job-id "$JOB_ID" \
        --region $REGION)
    
    STATUS=$(echo "$JOB_STATUS" | jq -r '.job.summary.status')
    
    echo "Status: $STATUS"
    
    # Show step details
    echo "$JOB_STATUS" | jq -r '.job.steps[] | "  - \(.stepName): \(.status)"'
    
    if [[ "$STATUS" == "SUCCEED" ]]; then
        echo ""
        echo "Deployment completed successfully!"
        echo "App URL: https://$BRANCH.$APP_ID.amplifyapp.com"
        break
    elif [[ "$STATUS" == "FAILED" ]] || [[ "$STATUS" == "CANCELLED" ]]; then
        echo ""
        echo "Deployment failed with status: $STATUS"
        
        # Show error logs
        echo "Error details:"
        echo "$JOB_STATUS" | jq -r '.job.steps[] | select(.status=="FAILED") | .logUrl'
        
        exit 1
    fi
done

echo ""
echo "Deployment complete!"
echo "You can view your app at: https://$BRANCH.$APP_ID.amplifyapp.com"
echo "Amplify Console: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"