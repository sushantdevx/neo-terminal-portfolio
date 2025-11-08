#!/bin/bash

# Neo-Terminal Portfolio - AWS Deployment Script
# This script deploys the static Next.js build to AWS S3 and invalidates CloudFront cache

set -e

echo "🚀 Starting deployment to AWS..."

# Load environment variables
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '#' | awk '/=/ {print $1}')
fi

# Check required environment variables
if [ -z "$AWS_S3_BUCKET" ]; then
    echo "❌ Error: AWS_S3_BUCKET is not set"
    exit 1
fi

if [ -z "$AWS_CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "⚠️  Warning: AWS_CLOUDFRONT_DISTRIBUTION_ID is not set, skipping cache invalidation"
fi

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

# Sync to S3
echo "☁️  Uploading to S3 bucket: $AWS_S3_BUCKET..."
aws s3 sync out/ s3://$AWS_S3_BUCKET \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "*.xml" \
    --exclude "*.txt"

# Upload HTML files with no-cache
aws s3 sync out/ s3://$AWS_S3_BUCKET \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "*.xml" \
    --include "*.txt"

# Invalidate CloudFront cache
if [ -n "$AWS_CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*"
    echo "✅ Cache invalidation initiated"
fi

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: $NEXT_PUBLIC_SITE_URL"
