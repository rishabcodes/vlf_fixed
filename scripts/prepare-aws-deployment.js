#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to prepare static site for AWS S3 + CloudFront deployment
 * This will be used once we migrate from Netlify to AWS
 */

console.log('🚀 Preparing for AWS S3 deployment...\n');

// Create AWS deployment configuration
const awsConfig = {
  s3: {
    bucketName: 'vasquezlawnc-website',
    region: 'us-east-1',
  },
  cloudfront: {
    distributionId: 'TO_BE_CONFIGURED',
    defaultRootObject: 'index.html',
    errorPages: [
      {
        errorCode: 404,
        responseCode: 404,
        responsePagePath: '/404.html',
      },
      {
        errorCode: 403,
        responseCode: 404,
        responsePagePath: '/404.html',
      },
    ],
  },
  routing: {
    // S3 doesn't support clean URLs, so we need to handle this
    trailingSlash: true,
    indexDocument: 'index.html',
  },
};

// Save AWS configuration
fs.writeFileSync(path.join(__dirname, '../aws-config.json'), JSON.stringify(awsConfig, null, 2));

console.log('✅ Created aws-config.json');

// Create deployment script for AWS
const deployScript = `#!/bin/bash
# AWS S3 + CloudFront Deployment Script

# Exit on error
set -e

echo "🚀 Starting AWS deployment..."

# Build the site with maximum memory
echo "📦 Building static site..."
NODE_OPTIONS="--max-old-space-size=32768" npm run build

# Sync to S3
echo "☁️ Uploading to S3..."
aws s3 sync out/ s3://\${S3_BUCKET_NAME} \\
  --delete \\
  --cache-control "public, max-age=31536000" \\
  --exclude "*.html" \\
  --exclude "_next/data/*" \\
  --exclude "_next/static/chunks/pages/*"

# Upload HTML files with shorter cache
aws s3 sync out/ s3://\${S3_BUCKET_NAME} \\
  --delete \\
  --cache-control "public, max-age=0, must-revalidate" \\
  --exclude "*" \\
  --include "*.html" \\
  --include "_next/data/*" \\
  --include "_next/static/chunks/pages/*"

# Invalidate CloudFront
if [ ! -z "\${CLOUDFRONT_DISTRIBUTION_ID}" ]; then
  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \\
    --distribution-id \${CLOUDFRONT_DISTRIBUTION_ID} \\
    --paths "/*"
fi

echo "✅ Deployment complete!"
`;

fs.writeFileSync(path.join(__dirname, '../deploy-aws.sh'), deployScript, { mode: 0o755 });

console.log('✅ Created deploy-aws.sh script');

// Create buildspec.yml for AWS CodeBuild (future CI/CD)
const buildSpec = `version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - echo "Installing pnpm..."
      - npm install -g pnpm@10.13.1
      - echo "Installing dependencies..."
      - pnpm install --frozen-lockfile

  pre_build:
    commands:
      - echo "Running pre-build tasks..."
      - pnpm run validate:env || true
      - pnpm exec prisma generate

  build:
    commands:
      - echo "Building application..."
      - NODE_OPTIONS="--max-old-space-size=32768" pnpm run build
      - echo "Build completed on \`date\`"

artifacts:
  files:
    - '**/*'
  base-directory: out
  name: vasquezlawnc-build-\${CODEBUILD_BUILD_NUMBER}

cache:
  paths:
    - 'node_modules/**/*'
    - '.next/cache/**/*'
`;

fs.writeFileSync(path.join(__dirname, '../buildspec.yml'), buildSpec);

console.log('✅ Created buildspec.yml for AWS CodeBuild');

// Create terraform configuration for AWS infrastructure
const terraformConfig = `# Terraform configuration for Vasquez Law Firm website infrastructure

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region for resources"
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name for the website"
  default     = "vasquezlawnc.com"
}

# S3 bucket for static website hosting
resource "aws_s3_bucket" "website" {
  bucket = "vasquezlawnc-website"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "\${aws_s3_bucket.website.arn}/*"
      }
    ]
  })
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.website.website_endpoint
    origin_id   = "S3-vasquezlawnc"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [var.domain_name, "www.\${var.domain_name}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-vasquezlawnc"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.website.arn
    ssl_support_method  = "sni-only"
  }
}

# ACM Certificate for HTTPS
resource "aws_acm_certificate" "website" {
  domain_name               = var.domain_name
  subject_alternative_names = ["www.\${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Outputs
output "s3_bucket_name" {
  value = aws_s3_bucket.website.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.website.domain_name
}
`;

fs.writeFileSync(path.join(__dirname, '../terraform/main.tf'), terraformConfig);

console.log('✅ Created terraform configuration');

console.log('\n📋 AWS Deployment Preparation Complete!');
console.log('\nNext steps for AWS deployment:');
console.log('1. Configure AWS CLI: aws configure');
console.log('2. Set environment variables:');
console.log('   export S3_BUCKET_NAME=vasquezlawnc-website');
console.log('   export CLOUDFRONT_DISTRIBUTION_ID=<your-distribution-id>');
console.log('3. Run: ./deploy-aws.sh');
console.log('\nFor infrastructure setup:');
console.log('1. cd terraform');
console.log('2. terraform init');
console.log('3. terraform plan');
console.log('4. terraform apply');
