# Neo-Terminal Portfolio - AWS Architecture

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          GitHub Repository                               │
│                                                                          │
│  ┌────────────────┐                                                     │
│  │  Push to main  │                                                     │
│  └────────┬───────┘                                                     │
│           │                                                              │
│           v                                                              │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    GitHub Actions Workflow                      │    │
│  │                                                                 │    │
│  │  1. Lint & Type Check  →  2. Build  →  3. Deploy              │    │
│  └────────────────────────────────────────────────────────────────┘    │
│           │                                                              │
│           │ (GitHub OIDC - No long-lived credentials)                   │
└───────────┼──────────────────────────────────────────────────────────────┘
            │
            v
┌───────────────────────────────────────────────────────────────────────────┐
│                              AWS Cloud                                     │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                         IAM Role                                 │    │
│  │  (GitHub Actions Deployment Role)                               │    │
│  │  - S3 write permissions                                         │    │
│  │  - CloudFront invalidation                                       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│           │                                                              │
│           v                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      S3 Bucket                                   │    │
│  │  ┌──────────────────────────────────────────────────┐           │    │
│  │  │  • Static Website Files (HTML, CSS, JS)         │           │    │
│  │  │  • Images and Assets                            │           │    │
│  │  │  • Versioning Enabled                           │           │    │
│  │  │  • Private (No public access)                   │           │    │
│  │  └──────────────────────────────────────────────────┘           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│           │                                                              │
│           │ (Origin Access Control)                                     │
│           v                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                   CloudFront Distribution                        │    │
│  │  ┌──────────────────────────────────────────────────┐           │    │
│  │  │  • Global CDN                                     │           │    │
│  │  │  • HTTPS Only (TLS 1.2+)                         │           │    │
│  │  │  • Caching Optimized                             │           │    │
│  │  │  • Compression Enabled (Gzip/Brotli)             │           │    │
│  │  │  • Custom Error Pages (404, 403)                 │           │    │
│  │  └──────────────────────────────────────────────────┘           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│           │                                                              │
│           │ (SSL/TLS)                                                    │
│           v                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │           ACM (AWS Certificate Manager)                          │    │
│  │  ┌──────────────────────────────────────────────────┐           │    │
│  │  │  • SSL Certificate for domain                    │           │    │
│  │  │  • Auto-renewal                                  │           │    │
│  │  │  • DNS validation                                │           │    │
│  │  └──────────────────────────────────────────────────┘           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│           │                                                              │
│           v                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    Route53 (DNS)                                 │    │
│  │  ┌──────────────────────────────────────────────────┐           │    │
│  │  │  • A Record: yourdomain.dev → CloudFront        │           │    │
│  │  │  • A Record: www.yourdomain.dev → CloudFront    │           │    │
│  │  │  • Health Checks                                 │           │    │
│  │  └──────────────────────────────────────────────────┘           │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
            │
            │ (HTTPS)
            v
┌───────────────────────────────────────────────────────────────────────────┐
│                            End Users                                       │
│                                                                           │
│  🌍 Global Access via CloudFront Edge Locations                          │
│  🔒 Secure HTTPS connections                                             │
│  ⚡ Fast page loads (<2s)                                                │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘


## Data Flow

1. **Developer pushes code** → GitHub Repository
2. **GitHub Actions triggered** → Automated workflow runs
3. **Code is built** → Next.js static export generated
4. **Files uploaded** → S3 bucket (via IAM role)
5. **Cache invalidated** → CloudFront distribution
6. **DNS resolves** → Route53 points to CloudFront
7. **User requests** → CloudFront serves from cache or S3
8. **Content delivered** → Fast, secure HTTPS response


## Components

### Core Infrastructure
- **S3**: Static file hosting with versioning
- **CloudFront**: Global CDN with edge caching
- **Route53**: DNS management and health checks
- **ACM**: SSL/TLS certificate management
- **IAM**: Secure access control

### Deployment Pipeline
- **GitHub Actions**: CI/CD automation
- **GitHub OIDC**: Secure AWS authentication
- **Workflow Stages**: Lint → Build → Deploy

### Security Features
- ✅ HTTPS enforced
- ✅ S3 bucket private
- ✅ Origin Access Control
- ✅ No long-lived credentials
- ✅ TLS 1.2+ minimum
- ✅ Security headers


## Estimated Monthly Costs

| Component | Cost |
|-----------|------|
| S3 Storage (20GB) | $0.50 |
| CloudFront (1TB/month) | $1-5 |
| Route53 Hosted Zone | $0.50 |
| Data Transfer | $1-3 |
| **Total** | **$5-15** |


## Deployment Options

### Option 1: CloudFormation (Recommended)
```bash
aws cloudformation create-stack \
  --stack-name neo-terminal-portfolio \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=yourdomain.dev \
  --capabilities CAPABILITY_IAM
```

### Option 2: Terraform
```bash
cd aws/terraform
terraform init
terraform apply
```

### Option 3: Automated Script
```bash
./scripts/setup-aws.sh
```


## Monitoring & Observability

### CloudWatch Metrics
- Request count
- Data transfer
- Cache hit ratio
- Error rates (4xx, 5xx)

### CloudFront Access Logs
- User requests
- Geographic distribution
- Popular content
- Error tracking

### Route53 Health Checks
- Endpoint availability
- Latency monitoring
- Failover configuration


## Scalability

### Current Configuration
- Handles: 10,000+ requests/day
- Bandwidth: Unlimited (pay-as-you-go)
- Geographic: Global via CloudFront edge locations
- Availability: 99.99% SLA

### Future Enhancements
- [ ] AWS WAF for security
- [ ] Lambda@Edge for dynamic features
- [ ] AWS Shield for DDoS protection
- [ ] Multi-region replication


## Security Best Practices

✅ **Implemented**
- S3 bucket encryption at rest
- HTTPS/TLS in transit
- Origin Access Control (OAC)
- IAM least privilege
- GitHub OIDC (no static credentials)
- Security headers via CloudFront

🔄 **Optional Enhancements**
- AWS WAF rules
- Geographic restrictions
- Rate limiting
- DDoS protection (AWS Shield)


## Disaster Recovery

### Backup Strategy
- S3 versioning enabled
- Cross-region replication (optional)
- CloudFormation/Terraform for infrastructure recovery
- GitHub repository as source of truth

### Recovery Procedures
1. Restore from S3 versions
2. Re-deploy infrastructure from IaC templates
3. Re-run GitHub Actions workflow
4. Invalidate CloudFront cache


## Performance Optimization

### CloudFront Caching
- Static assets: 1 year cache
- HTML files: No cache (always fresh)
- Compression: Gzip/Brotli enabled

### S3 Optimization
- Object versioning for rollback
- Lifecycle policies for old versions
- Transfer acceleration (optional)

### Build Optimization
- Next.js static export
- Image optimization
- Code splitting
- Tree shaking


---

**Architecture Version**: 1.0  
**Last Updated**: November 8, 2025  
**Status**: Production Ready
