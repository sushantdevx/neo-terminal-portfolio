\# 🖥️ Neo-Terminal Portfolio



A modern, developer-focused portfolio website with terminal aesthetics built with Next.js 14, TypeScript, and Tailwind CSS.



\## ✨ Features



\- \*\*Terminal-inspired design\*\* with smooth animations

\- \*\*Dark/Light mode\*\* support

\- \*\*Fully responsive\*\* mobile-first layout

\- \*\*SEO optimized\*\* with metadata support

\- \*\*Fast performance\*\* with static site generation

\- \*\*AWS-ready\*\* deployment configuration



\## 🛠️ Tech Stack



\- \*\*Framework:\*\* Next.js 14 (App Router)

\- \*\*Language:\*\* TypeScript

\- \*\*Styling:\*\* Tailwind CSS

\- \*\*Font:\*\* JetBrains Mono

\- \*\*Deployment:\*\* AWS (S3 + CloudFront)

\- \*\*CI/CD:\*\* GitHub Actions



\## 🚀 Getting Started



\### Prerequisites



\- Node.js 18+ installed

\- npm or yarn package manager



\### Installation



1\. Clone the repository:

```bash

git clone <your-repo-url>

cd neo-terminal-portfolio

```



2\. Install dependencies:

```bash

npm install

```



3\. Copy environment variables:

```bash

cp .env.example .env.local

```



4\. Run the development server:

```bash

npm run dev

```



5\. Open \[http://localhost:3000](http://localhost:3000) in your browser.



\## 📜 Available Scripts



\- `npm run dev` - Start development server

\- `npm run build` - Build for production

\- `npm start` - Start production server

\- `npm run lint` - Run ESLint

\- `npm run format` - Format code with Prettier

\- `npm run type-check` - Run TypeScript type checking



\## 🏗️ Project Structure



```

neo-terminal-portfolio/

├── src/

│   ├── app/              # Next.js app directory

│   │   ├── layout.tsx    # Root layout

│   │   └── page.tsx      # Home page

│   ├── components/       # React components

│   ├── lib/             # Utility functions

│   ├── styles/          # Global styles

│   └── types/           # TypeScript types

├── public/              # Static assets

├── aws/                 # AWS infrastructure files

├── scripts/             # Deployment scripts

└── .github/             # GitHub Actions workflows

```



\## 🌩️ AWS Deployment



\### Prerequisites



\- AWS CLI installed and configured

\- AWS account with appropriate permissions

\- Domain registered (optional)



\### Option 1: Using CloudFormation (Recommended)



1\. Deploy the CloudFormation stack:

```bash

aws cloudformation create-stack \\

&nbsp; --stack-name neo-terminal-portfolio \\

&nbsp; --template-body file://aws/cloudformation-template.yaml \\

&nbsp; --parameters ParameterKey=DomainName,ParameterValue=your-domain.dev \\

&nbsp;              ParameterKey=HostedZoneId,ParameterValue=YOUR\_HOSTED\_ZONE\_ID \\

&nbsp; --capabilities CAPABILITY\_IAM

```



2\. Wait for the stack to complete:

```bash

aws cloudformation wait stack-create-complete \\

&nbsp; --stack-name neo-terminal-portfolio

```



3\. Get the outputs:

```bash

aws cloudformation describe-stacks \\

&nbsp; --stack-name neo-terminal-portfolio \\

&nbsp; --query 'Stacks\[0].Outputs'

```



\### Option 2: Manual Deployment



1\. Build the application:

```bash

npm run build

```



2\. Deploy using the script:

```bash

./scripts/deploy-aws.sh

```



\### GitHub Actions Setup



Add these secrets to your GitHub repository:



\- `AWS\_ACCESS\_KEY\_ID` - AWS access key

\- `AWS\_SECRET\_ACCESS\_KEY` - AWS secret key

\- `AWS\_REGION` - AWS region (e.g., us-east-1)

\- `AWS\_S3\_BUCKET` - S3 bucket name

\- `AWS\_CLOUDFRONT\_DISTRIBUTION\_ID` - CloudFront distribution ID

\- `NEXT\_PUBLIC\_SITE\_URL` - Your site URL

\- `NEXT\_PUBLIC\_SITE\_NAME` - Your site name



\## 🎨 Customization



\### Theme Colors



Edit `tailwind.config.ts` to customize the terminal theme colors:



```typescript

colors: {

&nbsp; terminal: {

&nbsp;   bg: "#1a1d23",        // Background

&nbsp;   cyan: "#00d9ff",      // Primary accent

&nbsp;   green: "#00ff85",     // Secondary accent

&nbsp;   // ... more colors

&nbsp; }

}

```



\### Fonts



The default font is JetBrains Mono. To change it, update the import in `src/app/layout.tsx`.



\## 📊 Performance



Target metrics:

\- Lighthouse Score: ≥90

\- First Contentful Paint: <1.8s

\- Time to Interactive: <3.9s

\- Cumulative Layout Shift: <0.1



\## 🔒 Security



\- HTTPS enforced via CloudFront

\- S3 bucket not publicly accessible (OAC used)

\- Security headers configured

\- No sensitive data in client-side code



\## 📝 License



MIT License - feel free to use this project for your own portfolio!



\## 🤝 Contributing



Contributions, issues, and feature requests are welcome!



\## 📧 Contact



Your Name - \[your@email.com](mailto:your@email.com)



Project Link: \[https://github.com/yourusername/neo-terminal-portfolio](https://github.com/yourusername/neo-terminal-portfolio)



---



\*\*Version:\*\* 1.0.0  

\*\*Last Updated:\*\* 2025-01-01

