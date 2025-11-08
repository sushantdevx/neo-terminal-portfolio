#!/bin/bash

# Neo-Terminal Portfolio - AWS Infrastructure Setup Script
# This script helps set up the AWS infrastructure using CloudFormation or Terraform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════╗"
    echo "║     Neo-Terminal Portfolio - AWS Setup          ║"
    echo "╚══════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    print_success "AWS CLI found"
    
    # Check if AWS credentials are configured
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials are not configured. Run 'aws configure' first."
        exit 1
    fi
    print_success "AWS credentials configured"
    
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    print_success "AWS Account ID: $AWS_ACCOUNT_ID"
}

setup_github_oidc() {
    print_info "Setting up GitHub Actions OIDC provider..."
    
    # Check if OIDC provider already exists
    if aws iam get-open-id-connect-provider \
        --open-id-connect-provider-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com" \
        &> /dev/null; then
        print_success "GitHub OIDC provider already exists"
    else
        print_info "Creating GitHub OIDC provider..."
        aws iam create-open-id-connect-provider \
            --url "https://token.actions.githubusercontent.com" \
            --client-id-list "sts.amazonaws.com" \
            --thumbprint-list "6938fd4d98bab03faadb97b34396831e3780aea1"
        print_success "GitHub OIDC provider created"
    fi
}

deploy_with_cloudformation() {
    print_info "Deploying with CloudFormation..."
    
    read -p "Enter your domain name (e.g., portfolio.dev): " DOMAIN_NAME
    read -p "Enter Route53 Hosted Zone ID (leave empty if managing DNS elsewhere): " HOSTED_ZONE_ID
    read -p "Enter stack name [neo-terminal-portfolio]: " STACK_NAME
    STACK_NAME=${STACK_NAME:-neo-terminal-portfolio}
    
    print_info "Creating CloudFormation stack: $STACK_NAME"
    
    PARAMS="ParameterKey=DomainName,ParameterValue=$DOMAIN_NAME"
    if [ ! -z "$HOSTED_ZONE_ID" ]; then
        PARAMS="$PARAMS ParameterKey=HostedZoneId,ParameterValue=$HOSTED_ZONE_ID"
    fi
    
    aws cloudformation create-stack \
        --stack-name "$STACK_NAME" \
        --template-body file://aws/cloudformation-template.yaml \
        --parameters $PARAMS \
        --capabilities CAPABILITY_IAM \
        --region us-east-1
    
    print_info "Waiting for stack creation to complete..."
    aws cloudformation wait stack-create-complete \
        --stack-name "$STACK_NAME" \
        --region us-east-1
    
    print_success "CloudFormation stack created successfully!"
    
    # Get outputs
    S3_BUCKET=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
        --output text \
        --region us-east-1)
    
    CF_DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
        --output text \
        --region us-east-1)
    
    echo ""
    print_success "Deployment complete!"
    echo ""
    echo "Stack Outputs:"
    echo "  S3 Bucket: $S3_BUCKET"
    echo "  CloudFront Distribution ID: $CF_DISTRIBUTION_ID"
    echo "  Website URL: https://$DOMAIN_NAME"
    echo ""
    print_info "Add these to your GitHub Secrets:"
    echo "  S3_BUCKET_NAME=$S3_BUCKET"
    echo "  CLOUDFRONT_DISTRIBUTION_ID=$CF_DISTRIBUTION_ID"
    echo "  SITE_URL=https://$DOMAIN_NAME"
}

deploy_with_terraform() {
    print_info "Deploying with Terraform..."
    
    # Check if Terraform is installed
    if ! command -v terraform &> /dev/null; then
        print_error "Terraform is not installed. Please install it first."
        exit 1
    fi
    
    cd aws/terraform
    
    if [ ! -f "terraform.tfvars" ]; then
        print_info "terraform.tfvars not found. Creating from example..."
        cp terraform.tfvars.example terraform.tfvars
        print_info "Please edit aws/terraform/terraform.tfvars with your values"
        exit 1
    fi
    
    print_info "Initializing Terraform..."
    terraform init
    
    print_info "Creating Terraform plan..."
    terraform plan -out=tfplan
    
    read -p "Apply this plan? (yes/no): " APPLY
    if [ "$APPLY" = "yes" ]; then
        terraform apply tfplan
        print_success "Terraform deployment complete!"
        
        # Get outputs
        S3_BUCKET=$(terraform output -raw s3_bucket_name)
        CF_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
        WEBSITE_URL=$(terraform output -raw website_url)
        
        echo ""
        echo "Deployment Outputs:"
        echo "  S3 Bucket: $S3_BUCKET"
        echo "  CloudFront Distribution ID: $CF_DISTRIBUTION_ID"
        echo "  Website URL: $WEBSITE_URL"
        echo ""
        print_info "Add these to your GitHub Secrets:"
        echo "  S3_BUCKET_NAME=$S3_BUCKET"
        echo "  CLOUDFRONT_DISTRIBUTION_ID=$CF_DISTRIBUTION_ID"
        echo "  SITE_URL=$WEBSITE_URL"
    fi
    
    cd ../..
}

setup_github_actions_role() {
    print_info "Setting up IAM role for GitHub Actions..."
    
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    read -p "Enter your GitHub repository name: " GITHUB_REPO
    read -p "Enter S3 bucket name: " S3_BUCKET
    read -p "Enter CloudFront distribution ID: " CF_DIST_ID
    
    ROLE_NAME="GitHubActionsDeploymentRole"
    
    # Create trust policy
    TRUST_POLICY=$(cat aws/iam/github-actions-trust-policy.json | \
        sed "s/\${AWS_ACCOUNT_ID}/$AWS_ACCOUNT_ID/g" | \
        sed "s/\${GITHUB_USERNAME}/$GITHUB_USERNAME/g" | \
        sed "s/\${GITHUB_REPO}/$GITHUB_REPO/g")
    
    # Create role
    print_info "Creating IAM role..."
    ROLE_ARN=$(aws iam create-role \
        --role-name "$ROLE_NAME" \
        --assume-role-policy-document "$TRUST_POLICY" \
        --description "Role for GitHub Actions to deploy Neo-Terminal Portfolio" \
        --query 'Role.Arn' \
        --output text)
    
    print_success "IAM role created: $ROLE_ARN"
    
    # Create and attach policy
    POLICY_NAME="GitHubActionsDeploymentPolicy"
    POLICY_DOC=$(cat aws/iam/deployment-policy.json | \
        sed "s/\${S3_BUCKET_NAME}/$S3_BUCKET/g" | \
        sed "s/\${AWS_ACCOUNT_ID}/$AWS_ACCOUNT_ID/g" | \
        sed "s/\${CLOUDFRONT_DISTRIBUTION_ID}/$CF_DIST_ID/g")
    
    print_info "Creating IAM policy..."
    POLICY_ARN=$(aws iam create-policy \
        --policy-name "$POLICY_NAME" \
        --policy-document "$POLICY_DOC" \
        --query 'Policy.Arn' \
        --output text)
    
    print_success "IAM policy created: $POLICY_ARN"
    
    # Attach policy to role
    aws iam attach-role-policy \
        --role-name "$ROLE_NAME" \
        --policy-arn "$POLICY_ARN"
    
    print_success "Policy attached to role"
    
    echo ""
    print_success "GitHub Actions IAM role setup complete!"
    print_info "Add this to your GitHub Secrets:"
    echo "  AWS_ROLE_ARN=$ROLE_ARN"
}

main() {
    print_header
    check_prerequisites
    
    echo ""
    echo "Select deployment method:"
    echo "1) CloudFormation"
    echo "2) Terraform"
    echo "3) Setup GitHub Actions IAM Role only"
    echo "4) Setup GitHub OIDC Provider only"
    echo "5) Exit"
    echo ""
    read -p "Enter choice [1-5]: " choice
    
    case $choice in
        1)
            setup_github_oidc
            deploy_with_cloudformation
            ;;
        2)
            setup_github_oidc
            deploy_with_terraform
            ;;
        3)
            setup_github_oidc
            setup_github_actions_role
            ;;
        4)
            setup_github_oidc
            ;;
        5)
            print_info "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
    
    echo ""
    print_success "Setup complete!"
    print_info "Next steps:"
    echo "  1. Add the output values to your GitHub repository secrets"
    echo "  2. Push your code to trigger the deployment workflow"
    echo "  3. Verify DNS settings if you're using a custom domain"
}

main
