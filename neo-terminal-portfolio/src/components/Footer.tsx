import Link from 'next/link';
import { siteConfig, socialLinks } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-terminal-border bg-terminal-bgLight mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-terminal-prompt font-bold text-xl">¯</span>
              <span className="text-terminal-text font-semibold">
                {siteConfig.author.name}
              </span>
            </div>
            <p className="text-terminal-textMuted text-sm">
              Full-Stack Developer specializing in modern web technologies and cloud infrastructure
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-terminal-cyan font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/articles" className="terminal-link text-sm">
                Articles
              </Link>
              <Link href="/projects" className="terminal-link text-sm">
                Projects
              </Link>
              <Link href="/about" className="terminal-link text-sm">
                About
              </Link>
              <Link href="/contact" className="terminal-link text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-terminal-cyan font-semibold text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-col space-y-2">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-sm"
                >
                  GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-sm"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-sm"
                >
                  Twitter
                </a>
              )}
              {socialLinks.medium && (
                <a
                  href={socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-sm"
                >
                  Medium
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-terminal-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-terminal-textMuted text-sm">
              <span className="text-terminal-prompt">¯</span> © {currentYear}{' '}
              {siteConfig.author.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-terminal-textMuted text-sm">
              <span>Built with Next.js & AWS</span>
              <span>•</span>
              <span>Updated: {siteConfig.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}