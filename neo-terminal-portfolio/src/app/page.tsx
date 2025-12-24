import Hero from '@/components/Hero';
import NowWidget from '@/components/NowWidget';
import MediumFeed from '@/components/MediumFeed';
import GitHubActivity from '@/components/GitHubActivity';

// async function delay(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export default async function Home() {
  // Get usernames from environment variables or config
  const mediumUsername = process.env.NEXT_PUBLIC_MEDIUM_USERNAME || 'sushantk.dev';
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'sushantk.dev';

  // await delay(2000);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero and Now Widget Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Hero />
          </div>

          {/* Now Widget - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <NowWidget className="animate-fade-in" />
          </div>
        </div>

        {/* External Integrations Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GitHub Activity Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <GitHubActivity username={githubUsername} />
          </div>

          {/* Medium Feed Widget */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <MediumFeed username={mediumUsername} maxArticles={3} />
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-terminal-cyan flex items-center">
              <span className="text-terminal-prompt mr-2">›</span>
              Quick Access
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
              {/* Articles Link */}
              <a
                href="/articles"
                className="terminal-card bg-terminal-bg hover:border-terminal-cyan transition-all group hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📚</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-terminal-text group-hover:text-terminal-cyan transition-colors">
                      Articles
                    </h3>
                    <p className="text-xs text-terminal-textMuted">
                      Technical writings & tutorials
                    </p>
                  </div>
                  <span className="text-terminal-cyan group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>

              {/* Projects Link */}
              <a
                href="/projects"
                className="terminal-card bg-terminal-bg hover:border-terminal-green transition-all group hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🛠️</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-terminal-text group-hover:text-terminal-green transition-colors">
                      Projects
                    </h3>
                    <p className="text-xs text-terminal-textMuted">
                      Portfolio & open source work
                    </p>
                  </div>
                  <span className="text-terminal-green group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>

              {/* Contact Link */}
              <a
                href="/contact"
                className="terminal-card bg-terminal-bg hover:border-terminal-command transition-all group hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💬</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-terminal-text group-hover:text-terminal-command transition-colors">
                      Contact
                    </h3>
                    <p className="text-xs text-terminal-textMuted">
                      Get in touch
                    </p>
                  </div>
                  <span className="text-terminal-command group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Info */}
        {/* <div className="text-center text-terminal-textMuted text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="terminal-card bg-terminal-bg inline-block">
            <p className="flex items-center justify-center gap-2 flex-wrap font-mono">
              <span className="text-terminal-prompt">›</span>
              <span>Next.js 14</span>
              <span className="text-terminal-border">•</span>
              <span>TypeScript</span>
              <span className="text-terminal-border">•</span>
              <span>Tailwind CSS</span>
              <span className="text-terminal-border">•</span>
              <span>AWS Integration</span>
              <span className="text-terminal-border">•</span>
              <span className="text-terminal-cyan">Neo-Terminal Theme</span>
            </p>
          </div>
        </div> */}

        {/* System Status */}
        <div className="terminal-card bg-terminal-bg animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="font-mono text-xs space-y-1">
            <p className="text-terminal-textMuted">
              <span className="text-terminal-prompt">¯</span> System Status
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                <span className="text-terminal-text">Portfolio Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                <span className="text-terminal-text">Contact Form</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                <span className="text-terminal-text">GitHub API</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                <span className="text-terminal-text">Medium Feed</span>
              </div>
            </div>
            <p className="text-terminal-green pl-4 pt-2">
              ✓ All systems operational
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}