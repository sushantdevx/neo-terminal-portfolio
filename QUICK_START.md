# 🚀 Quick Start Guide - Neo-Terminal Portfolio

## Get Started in 5 Minutes

### Step 1: Navigate to Project
```bash
cd /home/claude/neo-terminal-portfolio
```

### Step 2: Install Dependencies (if needed)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

You should see the Neo-Terminal themed homepage! 🎉

---

## What You'll See

When you open the site, you'll see:
- ✨ Terminal-style interface with command prompt aesthetics
- 🎨 Charcoal background with cyan/green accents
- ⌨️ JetBrains Mono monospace font
- 🔮 Smooth animations (cursor blink, fade effects)
- 💫 Professional, developer-focused design

---

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start

# Run type checking
npm run type-check

# Run linter
npm run lint

# Format code
npm run format
```

---

## Project Structure

```
neo-terminal-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx    ← Root layout with theme
│   │   └── page.tsx      ← Homepage (terminal styled)
│   └── styles/
│       └── globals.css   ← Terminal theme styles
├── public/               ← Static assets
├── aws/                  ← Infrastructure templates
└── scripts/              ← Deployment automation
```

---

## Customization Quick Tips

### 1. Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  terminal: {
    cyan: "#your-color",  // Change accent color
    green: "#your-color", // Change secondary accent
  }
}
```

### 2. Update Content
Edit `src/app/page.tsx`:
```typescript
<h1>Your Name</h1>
<p>Your tagline or description</p>
```

### 3. Add Your Info
Edit `.env.local`:
```env
NEXT_PUBLIC_SITE_NAME="Your Name"
NEXT_PUBLIC_SITE_URL="https://yourdomain.dev"
```

---

## Deploy to AWS (When Ready)

### Option 1: Automated Setup
```bash
./scripts/setup-aws.sh
```
Follow the interactive prompts!

### Option 2: Manual CloudFormation
```bash
aws cloudformation create-stack \
  --stack-name neo-terminal-portfolio \
  --template-body file://aws/cloudformation-template.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=yourdomain.dev \
  --capabilities CAPABILITY_IAM \
  --region us-east-1
```

### Option 3: Terraform
```bash
cd aws/terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars
terraform init
terraform apply
```

---

## After AWS Deployment

### Add GitHub Secrets
Go to: Repository → Settings → Secrets and variables → Actions

Add:
```
AWS_ROLE_ARN=arn:aws:iam::ACCOUNT:role/GitHubActionsDeploymentRole
S3_BUCKET_NAME=your-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=EXXXXXXXXXXXXX
SITE_URL=https://yourdomain.dev
```

### Push to Deploy
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

GitHub Actions will automatically:
1. ✅ Lint and type check
2. ✅ Build the site
3. ✅ Deploy to S3
4. ✅ Invalidate CloudFront cache
5. 🎉 Your site is live!

---

## Common Tasks

### View Build Output
```bash
npm run build
# Check the /out directory for static files
```

### Test Locally Before Deploy
```bash
npm run build
npx serve out
```

### Update Dependencies
```bash
npm update
npm audit fix
```

---

## Need Help?

### Documentation
- 📖 **README.md** - Project overview
- 📖 **docs/ITERATION_1_GUIDE.md** - Detailed setup guide
- 📖 **docs/AWS_DEPLOYMENT.md** - AWS infrastructure details

### Quick Links
- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
- AWS CloudFormation: https://docs.aws.amazon.com/cloudformation/

---

## What's Working Right Now

✅ **Development Environment**
- Next.js 14 with hot reload
- TypeScript type checking
- Tailwind CSS with JetBrains Mono
- Terminal theme fully configured

✅ **Build System**
- Static export ready
- Optimized for production
- 87.5 kB First Load JS (excellent!)

✅ **AWS Infrastructure**
- CloudFormation template ready
- Terraform alternative available
- GitHub Actions workflow configured
- IAM policies defined

✅ **Code Quality**
- ESLint configured
- Prettier formatting
- TypeScript strict mode
- Git-ready project structure

---

## Next Steps (Iteration 2)

After you're comfortable with the current setup, you can:
1. Add navigation bar
2. Create routes (/about, /projects, /blog)
3. Add error pages (404, 500)
4. Implement breadcrumbs

But for now, enjoy your working Neo-Terminal portfolio! 🎉

---

**💡 Pro Tip**: The project is already production-ready. You can deploy it to AWS right now and have a live portfolio website!

**🎨 Design Tip**: The terminal theme is intentionally minimal. As you add features in future iterations, maintain the clean, command-line aesthetic for consistency.

**⚡ Performance Tip**: The static export approach means your site will load incredibly fast. Keep using this pattern as you add more pages.

---

**Happy coding! 🚀**
