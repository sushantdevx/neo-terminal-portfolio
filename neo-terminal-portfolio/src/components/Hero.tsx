'use client';

import { useState } from 'react';
import Link from 'next/link';
import Typewriter from './Typewriter';
import { siteConfig } from '@/lib/config';

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="terminal-card animate-fade-in">
      <div className="space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 pb-4 border-b border-terminal-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-terminal-error hover:opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-command hover:opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-success hover:opacity-80 transition-opacity cursor-pointer"></div>
          </div>
          <span className="text-terminal-textMuted text-sm ml-2">
            sushantkumar@dev:~
          </span>
        </div>

        {/* Command Execution */}
        <div className="space-y-3">
          <p className="text-terminal-textMuted">
            <span className="terminal-prompt">¯</span> ./welcome.sh
          </p>

          {/* Output */}
          <div className="pl-4 space-y-4">
            {/* Welcome Message - SEO Optimized */}
            <div className="space-y-3">
              <Typewriter
                text="Hi, I'm Sushant Kumar — Full-Stack Developer"
                speed={40}
                className="text-2xl md:text-4xl font-bold text-gradient block"
                onComplete={() => setShowSubtitle(true)}
              />
              
              {showSubtitle && (
                <Typewriter
                  text="Building scalable web applications with Next.js, TypeScript, and AWS cloud infrastructure"
                  speed={30}
                  delay={200}
                  className="text-terminal-textMuted text-lg block"
                  onComplete={() => setShowButtons(true)}
                />
              )}
            </div>

            {/* Value Proposition */}
            {showButtons && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <p className="text-terminal-text leading-relaxed">
                    Specializing in modern web development, cloud architecture, and DevOps practices. 
                    Passionate about creating performant, user-centric applications that solve real-world problems.
                  </p>
                </div>

                {/* System Info - Technical Stack */}
                <div className="space-y-2">
                  {/* <p className="text-terminal-success flex items-center gap-2">
                    <span className="w-2 h-2 bg-terminal-success rounded-full animate-pulse"></span>
                    Available for opportunities
                  </p> */}
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-terminal-cyan">›</span>
                      <span className="text-terminal-textMuted">Expertise:</span>
                      <span className="text-terminal-text">Full-Stack</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-terminal-cyan">›</span>
                      <span className="text-terminal-textMuted">Focus:</span>
                      <span className="text-terminal-green">Web Apps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-terminal-cyan">›</span>
                      <span className="text-terminal-textMuted">Stack:</span>
                      <span className="text-terminal-text">React/Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-terminal-cyan">›</span>
                      <span className="text-terminal-textMuted">Cloud:</span>
                      <span className="text-terminal-cyan">Google Cloud Certified</span>
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="terminal-card bg-terminal-bg">
                  <div className="space-y-2 text-sm">
                    <p className="text-terminal-cyan font-semibold flex items-center gap-2">
                      <span>💡</span>
                      What I Bring to the Table
                    </p>
                    <ul className="space-y-1 pl-6">
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green">✓</span>
                        <span>4+ years building production-ready applications</span>
                      </li>
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green">✓</span>
                        <span>Expert in TypeScript, React, Node.js ecosystem</span>
                      </li>
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green">✓</span>
                        <span>AWS infrastructure & serverless architecture</span>
                      </li>
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green">✓</span>
                        <span>CI/CD, testing, and DevOps best practices</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {showButtons && (
          <div className="pt-4 border-t border-terminal-border animate-slide-up">
            <p className="text-terminal-textMuted mb-3">
              <span className="terminal-prompt">¯</span> Explore my work:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-4">
              <Link
                href="/articles"
                className="terminal-button text-center hover:scale-105 transition-transform"
                aria-label="Read technical articles and tutorials"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                Articles
              </Link>
              <Link
                href="/projects"
                className="terminal-button text-center hover:scale-105 transition-transform"
                aria-label="View portfolio projects"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                Projects
              </Link>
              <Link
                href="/about"
                className="terminal-button text-center hover:scale-105 transition-transform"
                aria-label="Learn more about my experience"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                About
              </Link>
              <Link
                href="/contact"
                className="terminal-button text-center hover:scale-105 transition-transform"
                aria-label="Get in touch for collaboration"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                Contact
              </Link>
            </div>
          </div>
        )}

        {/* Command Prompt */}
        <div className="pt-4 border-t border-terminal-border">
          <p className="text-terminal-textMuted flex items-center">
            <span className="terminal-prompt">¯</span>
            <span className="ml-2 text-terminal-text">
              Ready to collaborate on your next project
            </span>
            <span className="terminal-cursor"></span>
          </p>
        </div>
      </div>
    </div>
  );
}