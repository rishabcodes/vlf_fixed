# AWS S3 Deployment Guide for Vasquez Law Firm Website

## Overview

This guide explains how to deploy the Vasquez Law Firm website to AWS S3 while ensuring all API keys and endpoints work correctly. The application uses a **hybrid architecture**:

- **Frontend**: Static files served from S3 + CloudFront
- **Backend APIs**: Serverless functions on AWS Lambda + API Gateway
- **Secrets**: Stored securely in AWS Secrets Manager

## Architecture Diagram

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Browser   │─────►│  CloudFront  │─────►│  S3 Bucket  │
└─────────────┘      └──────────────┘      └─────────────┘
       │                                           │
       │ API Calls                          Static Files
       ▼                                           
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│ API Gateway │─────►│    Lambda    │─────►│   Secrets   │
└─────────────┘      └──────────────┘      │   Manager   │
                            │              └─────────────┘
                            ▼
                     ┌──────────────┐
                     │  PostgreSQL  │
                     │  (Neon DB)   │
                     └──────────────┘
```

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Node.js** (v18+) and **pnpm** installed
4. **Serverless Framework** (optional, for Lambda deployment)

```bash
# Install AWS CLI
brew install awscli  # macOS
# or
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# Configure AWS CLI
aws configure
# Enter: AWS Access Key ID, Secret Access Key, Region (us-east-1), Output format (json)

# Install Serverless Framework
npm install -g serverless
```

## Environment Variables Setup

### 1. Create AWS Secrets

First, store your sensitive API keys in AWS Secrets Manager:

```bash
# Create a secret with all your API keys
aws secretsmanager create-secret \
  --name vasquezlawnc/api-keys \
  --secret-string '{
    "OPENAI_API_KEY": "your-openai-key",
    "DATABASE_URL": "your-database-url",
    "NEXTAUTH_SECRET": "your-nextauth-secret",
    "GHL_API_KEY": "your-ghl-api-key",
    "GHL_LOCATION_ID": "your-ghl-location-id",
    "RETELL_API_KEY": "your-retell-api-key",
    "SMTP_PASSWORD": "your-smtp-password"
  }'
```

### 2. Environment Variable Categories

#### Public Variables (Safe for Frontend)
These are embedded in the frontend build:
- `NEXT_PUBLIC_APP_URL`: https://www.vasquezlawnc.com
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `NEXT_PUBLIC_RETELL_AGENT_ID`: agent_7c549b79a40b4cd4f3b63a98e6
- `GOOGLE_ANALYTICS_ID`: Your GA tracking ID

#### Private Variables (Lambda Only)
These are only accessible in Lambda functions via Secrets Manager:
- `OPENAI_API_KEY`: OpenAI API key
- `DATABASE_URL`: PostgreSQL connection string
- `GHL_API_KEY`: GoHighLevel API key
- `RETELL_API_KEY`: Retell AI API key
- All payment processing keys

## Deployment Steps

### Step 1: Prepare the Codebase

```bash
# Clone and navigate to project
cd /Users/arjun/Documents/neurobit/VLF-Local-DEV

# Install dependencies
pnpm install

# Create production environment file
cat > .env.production << EOF
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
NEXT_PUBLIC_API_URL=https://api.vasquezlawnc.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_RETELL_AGENT_ID=agent_7c549b79a40b4cd4f3b63a98e6
EOF
```

### Step 2: Deploy Using Automated Script

We've created a comprehensive deployment script that handles everything:

```bash
# Set required environment variables
export CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
export API_GATEWAY_URL=https://api.vasquezlawnc.com

# Run the deployment
./deploy-to-aws.sh
```

The script will:
1. ✅ Check prerequisites
2. 🔐 Configure environment variables
3. 🔨 Build the Next.js application
4. 🔧 Prepare Lambda functions
5. ☁️ Deploy Lambda functions
6. 📦 Upload frontend to S3
7. 🔄 Invalidate CloudFront cache
8. 🔐 Store API keys in Secrets Manager

### Step 3: Manual Deployment (Alternative)

If you prefer manual control:

#### A. Build the Frontend

```bash
# Build for production with static export
NODE_OPTIONS="--max-old-space-size=8192" \
  NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com \
  pnpm run build

# If build doesn't create 'out' directory, modify next.config.js:
echo "module.exports.output = 'export'" >> next.config.js
```

#### B. Deploy Lambda Functions

```bash
# Deploy using Serverless Framework
serverless deploy --stage prod --region us-east-1

# Or deploy individual functions
aws lambda create-function \
  --function-name vasquezlawnc-contact \
  --runtime nodejs20.x \
  --handler dist/handlers/contact.handler \
  --role arn:aws:iam::ACCOUNT:role/lambda-role
```

#### C. Upload to S3

```bash
# Create S3 bucket
aws s3api create-bucket \
  --bucket vasquezlawnc-frontend \
  --region us-east-1

# Enable static hosting
aws s3 website s3://vasquezlawnc-frontend/ \
  --index-document index.html \
  --error-document 404.html

# Upload files
aws s3 sync out/ s3://vasquezlawnc-frontend/ \
  --cache-control "public,max-age=0,must-revalidate" \
  --delete
```

### Step 4: Configure CloudFront

```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json

# Get distribution domain
aws cloudfront get-distribution \
  --id E1234567890ABC \
  --query "Distribution.DomainName"
```

## API Endpoint Configuration

### Frontend API Calls

The frontend should make API calls to the API Gateway URL:

```javascript
// In your frontend code
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vasquezlawnc.com';

// Example API call
fetch(`${API_URL}/api/contact`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

### Lambda Function Environment

Lambda functions automatically load secrets from AWS Secrets Manager:

```javascript
// In Lambda handler
const SecretsManager = require('aws-sdk/clients/secretsmanager');
const sm = new SecretsManager({ region: 'us-east-1' });

async function getSecrets() {
  const data = await sm.getSecretValue({ 
    SecretId: 'vasquezlawnc/api-keys' 
  }).promise();
  return JSON.parse(data.SecretString);
}

// Use in handler
exports.handler = async (event) => {
  const secrets = await getSecrets();
  const openaiKey = secrets.OPENAI_API_KEY;
  // ... use the key
};
```

## Testing the Deployment

### 1. Test Frontend

```bash
# Check S3 website
curl https://vasquezlawnc-frontend.s3-website-us-east-1.amazonaws.com

# Check CloudFront
curl https://d1234567890.cloudfront.net
```

### 2. Test API Endpoints

```bash
# Test contact form
curl -X POST https://api.vasquezlawnc.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Test health check
curl https://api.vasquezlawnc.com/api/health
```

### 3. Monitor Logs

```bash
# View Lambda logs
aws logs tail /aws/lambda/vasquezlawnc-contact --follow

# View API Gateway logs
aws logs tail API-Gateway-Execution-Logs --follow
```

## Security Best Practices

1. **Never commit .env files** to version control
2. **Use AWS Secrets Manager** for all sensitive data
3. **Enable CloudFront WAF** for DDoS protection
4. **Set up API rate limiting** in API Gateway
5. **Use IAM roles** with minimum required permissions
6. **Enable CloudWatch alarms** for monitoring
7. **Regularly rotate API keys**

## Troubleshooting

### Issue: API calls failing with CORS errors

**Solution**: Update API Gateway CORS configuration:

```bash
aws apigatewayv2 update-api \
  --api-id your-api-id \
  --cors-configuration \
    AllowOrigins="https://www.vasquezlawnc.com",\
    AllowHeaders="Content-Type,Authorization",\
    AllowMethods="GET,POST,PUT,DELETE,OPTIONS"
```

### Issue: Environment variables not available in Lambda

**Solution**: Check Secrets Manager permissions:

```bash
# Add policy to Lambda execution role
aws iam attach-role-policy \
  --role-name lambda-execution-role \
  --policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite
```

### Issue: Static export failing

**Solution**: Temporarily disable dynamic routes:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable dynamic routes for static export
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/contact': { page: '/contact' },
      // Add other static pages
    };
  },
};
```

## Cost Optimization

### Estimated Monthly Costs

- **S3 Storage**: ~$5 (for 10GB)
- **CloudFront**: ~$10 (for 100GB transfer)
- **Lambda**: ~$20 (for 1M requests)
- **API Gateway**: ~$3.50 (for 1M requests)
- **Secrets Manager**: ~$0.40 per secret
- **Total**: ~$40-50/month

### Cost-Saving Tips

1. Use CloudFront caching aggressively
2. Set appropriate Lambda memory (1024MB is usually enough)
3. Use S3 lifecycle policies to delete old versions
4. Enable API Gateway caching for GET requests
5. Use Reserved Capacity for predictable workloads

## Maintenance

### Regular Tasks

1. **Weekly**: Check CloudWatch logs for errors
2. **Monthly**: Review AWS costs and optimize
3. **Quarterly**: Update dependencies and redeploy
4. **Annually**: Rotate all API keys and secrets

### Backup Strategy

```bash
# Backup S3 bucket
aws s3 sync s3://vasquezlawnc-frontend s3://vasquezlawnc-backup

# Export Lambda functions
serverless package --stage prod

# Export Secrets (securely)
aws secretsmanager get-secret-value \
  --secret-id vasquezlawnc/api-keys \
  --query SecretString > secrets-backup.json.enc
```

## Support

For issues or questions:
1. Check CloudWatch logs first
2. Review AWS service health dashboard
3. Consult AWS documentation
4. Contact AWS support if needed

## Next Steps

1. **Set up CI/CD** with GitHub Actions or AWS CodePipeline
2. **Add monitoring** with CloudWatch dashboards
3. **Implement auto-scaling** for Lambda functions
4. **Set up disaster recovery** plan
5. **Configure custom domain** with Route 53

---

**Last Updated**: August 2024
**Maintained By**: Vasquez Law Firm DevOps Team