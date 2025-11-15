import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { siteConfig, socialLinks } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch - Let\'s connect and collaborate',
  openGraph: {
    title: 'Contact | Neo-Terminal Portfolio',
    description: 'Get in touch - Let\'s connect and collaborate',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />

        {/* Page Header */}
        <div className="terminal-card mb-8 animate-fade-in">
          <div className="space-y-2">
            <p className="text-terminal-textMuted">
              <span className="terminal-prompt">¯</span> ./contact.sh
            </p>
            <div className="pl-4">
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Get In Touch
              </h1>
              <p className="text-terminal-textMuted">
                Let's connect and collaborate<span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="terminal-card animate-slide-up">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center mb-6">
                <span className="text-terminal-prompt mr-2">›</span>
                Connect With Me
              </h2>
              
              <div className="pl-6 space-y-4">
                {/* Email */}
                <div className="space-y-1">
                  <p className="text-terminal-textMuted text-sm">Email</p>
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="terminal-link text-lg block group"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">
                      {siteConfig.author.email}
                    </span>
                  </a>
                </div>

                {/* Social Links with Hover Animations */}
                <div className="space-y-2">
                  <p className="text-terminal-textMuted text-sm">Social</p>
                  <div className="space-y-2">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terminal-link flex items-center gap-2 group"
                      >
                        <span className="text-terminal-prompt group-hover:translate-x-1 transition-transform">›</span>
                        <span className="group-hover:text-terminal-cyan transition-colors">GitHub</span>
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terminal-link flex items-center gap-2 group"
                      >
                        <span className="text-terminal-prompt group-hover:translate-x-1 transition-transform">›</span>
                        <span className="group-hover:text-terminal-cyan transition-colors">LinkedIn</span>
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terminal-link flex items-center gap-2 group"
                      >
                        <span className="text-terminal-prompt group-hover:translate-x-1 transition-transform">›</span>
                        <span className="group-hover:text-terminal-cyan transition-colors">Twitter</span>
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {socialLinks.medium && (
                      <a
                        href={socialLinks.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terminal-link flex items-center gap-2 group"
                      >
                        <span className="text-terminal-prompt group-hover:translate-x-1 transition-transform">›</span>
                        <span className="group-hover:text-terminal-cyan transition-colors">Medium</span>
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="terminal-card bg-terminal-bg animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-3">
                <h3 className="text-terminal-green font-semibold flex items-center gap-2">
                  <span>⚡</span>
                  Quick Response
                </h3>
                <div className="pl-6 space-y-2 text-sm text-terminal-textMuted">
                  <p className="flex items-start gap-2">
                    <span className="text-terminal-green">✓</span>
                    <span>Typically respond within 24 hours</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-terminal-green">✓</span>
                    <span>All inquiries are welcome</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-terminal-green">✓</span>
                    <span>Open to collaboration opportunities</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-terminal-cyan flex items-center mb-6">
              <span className="text-terminal-prompt mr-2">›</span>
              Send a Message
            </h2>
            
            <ContactForm />
          </div>
        </div>

        {/* AWS Integration Info */}
        {/* <div className="terminal-card bg-terminal-bg mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-2">
            <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
              <span>🔒</span>
              Secure & Reliable
            </h3>
            <div className="pl-6 text-sm text-terminal-textMuted space-y-2">
              <p>
                This contact form is powered by AWS infrastructure (SES + Lambda + API Gateway) 
                ensuring secure, reliable message delivery with spam protection.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="terminal-card bg-terminal-bg text-center">
                  <div className="text-terminal-cyan font-semibold">⚡</div>
                  <div className="text-xs mt-1">Fast Delivery</div>
                </div>
                <div className="terminal-card bg-terminal-bg text-center">
                  <div className="text-terminal-green font-semibold">🔐</div>
                  <div className="text-xs mt-1">Encrypted</div>
                </div>
                <div className="terminal-card bg-terminal-bg text-center">
                  <div className="text-terminal-command font-semibold">🛡️</div>
                  <div className="text-xs mt-1">Spam Protected</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Terminal Output */}
        {/* <div className="terminal-card bg-terminal-bg mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="font-mono text-xs space-y-1">
            <p className="text-terminal-textMuted">
              <span className="text-terminal-prompt">¯</span> Status check...
            </p>
            <p className="text-terminal-green pl-4">
              ✓ Contact form ready
            </p>
            <p className="text-terminal-green pl-4">
              ✓ Email service operational
            </p>
            <p className="text-terminal-green pl-4">
              ✓ All systems go
            </p>
            <p className="text-terminal-textMuted pl-4">
              › Ready to receive your message<span className="terminal-cursor"></span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}