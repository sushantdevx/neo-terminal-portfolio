# AWS Deployment Guide

This guide walks you through deploying the Neo-Terminal Portfolio to AWS infrastructure.

## Architecture Overview

```
User Request
    ↓
Route 53 (DNS)
    ↓
CloudFront (CDN + SSL)
    ↓
S3 Bucket (Static Hosting)
```

### Components:
- **S3**: Stores static build files
- **CloudFront**: CDN with HTTPS/SSL
- **Route 53**: DNS management (optional)
- **ACM**: SSL certificate
- **Lambda + API Gateway**: Contact form (future)
- **SES**: Email delivery (future)

## Cost Estimate

Monthly costs (approximate):
- S3 Storage: $0.50 - $2
- CloudFront: $1 - $10 (depends on traffic)
- Route 53 Hosted Zone: $0.50
- **Total: ~$2-15/month** for low-medium traffic

## Prerequisites

1. **AWS Account** with billing enabled
2. **AWS CLI** installed and configured:
   ```bash
   aws configure
   ```
3. **Domain name** (optional but recommended)
4. **IAM permissions** for:
   - S3
   - CloudFront
   - ACM
   - Route 53 (if using custom domain)

## Deployment Methods

### Method 1: CloudFormation (Automated - Recommended)

#### Step 1: Prepare Domain (if using custom domain)

If you have a domain registered in Route 53:
```bash
# Get your hosted zone ID
aws route53 list-hosted-zones
```

#### Step 2: Deploy Infrastructure

```bash
aws cloudformation create-stack \
  --stack-name neo-terminal-portfolio \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=yourportfolio.dev \
    ParameterKey=HostedZoneId,ParameterValue=Z1234567890ABC \
  --region us-east-1
```

#### Step 3: Wait for Completion

```bash
# Monitor stack creation
aws cloudformation describe-stack-events \
  --stack-name neo-terminal-portfolio \
  --region us-east-1

# Wait for completion
aws cloudformation wait stack-create-complete \
  --stack-name neo-terminal-portfolio \
  --region us-east-1
```

#### Step 4: Verify Certificate (if using custom domain)

The ACM certificate requires DNS validation. Check your email or Route 53 for validation records.

```bash
# Check certificate status
aws acm list-certificates --region us-east-1
```

#### Step 5: Get Stack Outputs

```bash
aws cloudformation describe-stacks \
  --stack-name neo-terminal-portfolio \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'
```

Save these values:
- `S3BucketName`
- `CloudFrontDistributionId`
- `CloudFrontDomainName`

#### Step 6: Update Environment Variables

Create `.env.production`:
```bash
AWS_S3_BUCKET=<S3BucketName from outputs>
AWS_CLOUDFRONT_DISTRIBUTION_ID=<CloudFrontDistributionId from outputs>
NEXT_PUBLIC_SITE_URL=https://yourportfolio.dev
```

#### Step 7: Deploy Application

```bash
# Build and deploy
npm run build
./scripts/deploy-aws.sh
```

---

### Method 2: Manual Setup

#### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://yourportfolio-dev --region us-east-1
```

#### Step 2: Enable Versioning

```bash
aws s3api put-bucket-versioning \
  --bucket yourportfolio-dev \
  --versioning-configuration Status=Enabled
```

#### Step 3: Create CloudFront Origin Access Control (OAC)

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config \
    Name=portfolio-oac,\
    SigningProtocol=sigv4,\
    SigningBehavior=always,\
    OriginAccessControlOriginType=s3
```

Save the `Id` from the output.

#### Step 4: Request SSL Certificate (if using custom domain)

```bash
aws acm request-certificate \
  --domain-name yourportfolio.dev \
  --subject-alternative-names www.yourportfolio.dev \
  --validation-method DNS \
  --region us-east-1
```

Validate the certificate via DNS records.

#### Step 5: Create CloudFront Distribution

Create a file `cloudfront-config.json`:

```json
{
  "CallerReference": "neo-terminal-portfolio-2025",
  "Aliases": {
    "Quantity": 2,
    "Items": ["yourportfolio.dev", "www.yourportfolio.dev"]
  },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3Origin",
        "DomainName": "yourportfolio-dev.s3.us-east-1.amazonaws.com",
        "OriginAccessControlId": "<OAC-ID>",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3Origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 3,
      "Items": ["GET", "HEAD", "OPTIONS"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "<CERTIFICATE-ARN>",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Enabled": true
}
```

Deploy:
```bash
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

#### Step 6: Update S3 Bucket Policy

```bash
aws s3api put-bucket-policy \
  --bucket yourportfolio-dev \
  --policy file://bucket-policy.json
```

`bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::yourportfolio-dev/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT-ID:distribution/DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

#### Step 7: Configure Route 53 (if using custom domain)

```bash
# Create A record
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://route53-changes.json
```

---

## CI/CD with GitHub Actions

### Step 1: Create IAM User for GitHub Actions

```bash
aws iam create-user --user-name github-actions-portfolio
```

### Step 2: Attach Policies

```bash
aws iam attach-user-policy \
  --user-name github-actions-portfolio \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-user-policy \
  --user-name github-actions-portfolio \
  --policy-arn arn:aws:iam::aws:policy/CloudFrontFullAccess
```

### Step 3: Create Access Keys

```bash
aws iam create-access-key --user-name github-actions-portfolio
```

Save the `AccessKeyId` and `SecretAccessKey`.

### Step 4: Add GitHub Secrets

In your GitHub repository settings, add:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- `NEXT_PUBLIC_SITE_URL`

### Step 5: Push to Main Branch

The GitHub Action will automatically deploy on push to `main`.

---

## Verification

1. **Test CloudFront URL:**
   ```bash
   curl -I https://d1234567890.cloudfront.net
   ```

2. **Test Custom Domain:**
   ```bash
   curl -I https://yourportfolio.dev
   ```

3. **Check SSL:**
   ```bash
   openssl s_client -connect yourportfolio.dev:443
   ```

---

## Troubleshooting

### Issue: 403 Forbidden

**Cause:** S3 bucket policy not set correctly for OAC.

**Solution:** Update bucket policy with correct CloudFront distribution ARN.

### Issue: Certificate Not Validating

**Cause:** DNS validation records not added.

**Solution:** Check Route 53 or your DNS provider for required CNAME records.

### Issue: CloudFront Serving Old Content

**Cause:** Cache not invalidated.

**Solution:**
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

---

## Monitoring & Maintenance

### Set Up CloudWatch Alarms

```bash
# 4xx error rate alarm
aws cloudwatch put-metric-alarm \
  --alarm-name portfolio-4xx-errors \
  --metric-name 4xxErrorRate \
  --namespace AWS/CloudFront \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold
```

### Enable CloudFront Logging

Update CloudFront distribution to log to S3 bucket.

### Set Up Budget Alerts

```bash
aws budgets create-budget \
  --account-id 123456789012 \
  --budget file://budget.json
```

---

## Cleanup

To delete all resources:

```bash
# Delete CloudFormation stack
aws cloudformation delete-stack \
  --stack-name neo-terminal-portfolio

# Or manually:
aws cloudfront delete-distribution --id E1234567890ABC
aws s3 rb s3://yourportfolio-dev --force
aws route53 delete-hosted-zone --id Z1234567890ABC
```

---

## Next Steps

After deployment:
1. Configure monitoring and alerts
2. Set up contact form with Lambda + SES
3. Add analytics integration
4. Implement backup strategy
5. Review security headers

---

**Questions?** Check AWS documentation or open an issue on GitHub.
