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
      <div className="space-y-3 sm:space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-terminal-border">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-error hover:opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-command hover:opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-success hover:opacity-80 transition-opacity cursor-pointer"></div>
          </div>
          <span className="text-terminal-textMuted text-xs sm:text-sm ml-2 truncate">
            sushantkumar@dev:~
          </span>
        </div>

        {/* Command Execution */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-terminal-textMuted text-sm sm:text-base">
            <span className="terminal-prompt">¯</span> ./welcome.sh
          </p>

          {/* Output */}
          <div className="pl-3 sm:pl-4 space-y-3 sm:space-y-4">
            {/* Welcome Message - SEO Optimized */}
            <div className="space-y-2 sm:space-y-3">
              <Typewriter
                text="Hi, I'm Sushant Kumar – Full-Stack Developer"
                speed={40}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient block leading-tight"
                onComplete={() => setShowSubtitle(true)}
              />
              
              {showSubtitle && (
                <Typewriter
                  text="Full Stack Developer specializing in backend microservices with Java, Spring Boot, Angular, Google Cloud and AWS"
                  speed={30}
                  delay={200}
                  className="text-terminal-textMuted text-sm sm:text-base md:text-lg block leading-relaxed"
                  onComplete={() => setShowButtons(true)}
                />
              )}
            </div>

            {/* Value Proposition */}
            {showButtons && (
              <div className="space-y-3 sm:space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <p className="text-terminal-text text-sm sm:text-base leading-relaxed">
                    Specializing in building scalable, high-performance digital systems across web, cloud, and distributed architectures. 
                    Passionate about creating reliable, user-focused solutions that make a meaningful impact.
                  </p>
                </div>

                {/* System Info - Technical Stack */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-terminal-cyan flex-shrink-0">›</span>
                      <span className="text-terminal-textMuted flex-shrink-0">Expertise:</span>
                      <span className="text-terminal-text">Full-Stack</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-terminal-cyan flex-shrink-0">›</span>
                      <span className="text-terminal-textMuted flex-shrink-0">Focus:</span>
                      <span className="text-terminal-green">System Design & Architecture</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-terminal-cyan flex-shrink-0">›</span>
                      <span className="text-terminal-textMuted flex-shrink-0">Stack:</span>
                      <span className="text-terminal-text">Java, Spring Boot, Angular</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-terminal-cyan flex-shrink-0">›</span>
                      <span className="text-terminal-textMuted flex-shrink-0">Cloud:</span>
                      <span className="text-terminal-cyan">Google Cloud Certified</span>
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="terminal-card bg-terminal-bg p-3 sm:p-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="text-terminal-cyan font-semibold flex items-center gap-2">
                      <span>💡</span>
                      <span>What I Bring to the Table</span>
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 pl-4 sm:pl-6">
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green flex-shrink-0 mt-0.5">✓</span>
                        <span>4+ years building production-ready applications</span>
                      </li>
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green flex-shrink-0 mt-0.5">✓</span>
                        <span>Expert in Java, Spring Boot, Angular, TypeScript, Node.js ecosystem</span>
                      </li>
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green flex-shrink-0 mt-0.5">✓</span>
                        <span>Google Cloud infrastructure</span>
                      </li>
                      <li className="flex items-start gap-2 text-terminal-text">
                        <span className="text-terminal-green flex-shrink-0 mt-0.5">✓</span>
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
          <div className="pt-3 sm:pt-4 border-t border-terminal-border animate-slide-up">
            <p className="text-terminal-textMuted mb-2 sm:mb-3 text-sm sm:text-base">
              <span className="terminal-prompt">¯</span> Explore my work:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pl-3 sm:pl-4">
              <Link
                href="/articles"
                className="terminal-button text-center hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-4"
                aria-label="Read technical articles and tutorials"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                <span className="hidden xs:inline">Articles</span>
                <span className="xs:hidden">Articles</span>
              </Link>
              <Link
                href="/projects"
                className="terminal-button text-center hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-4"
                aria-label="View portfolio projects"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                <span>Projects</span>
              </Link>
              <Link
                href="/about"
                className="terminal-button text-center hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-4"
                aria-label="Learn more about my experience"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                <span>About</span>
              </Link>
              <Link
                href="/contact"
                className="terminal-button text-center hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-4"
                aria-label="Get in touch for collaboration"
              >
                <span className="text-terminal-prompt mr-1">›</span>
                <span>Contact</span>
              </Link>
            </div>
          </div>
        )}

        {/* Command Prompt */}
        <div className="pt-3 sm:pt-4 border-t border-terminal-border">
          <p className="text-terminal-textMuted flex items-start sm:items-center flex-wrap text-xs sm:text-sm">
            <span className="terminal-prompt flex-shrink-0">¯</span>
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