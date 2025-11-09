import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import ResumeDownload from '@/components/ResumeDownload';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me and my work',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />

        {/* Page Header */}
        <div className="terminal-card mb-8 animate-fade-in">
          <div className="space-y-2">
            <p className="text-terminal-textMuted">
              <span className="terminal-prompt">❯</span> cat about.md
            </p>
            <div className="pl-4">
              <h1 className="text-4xl font-bold text-gradient mb-2">
                About Me
              </h1>
              <p className="text-terminal-textMuted">
                Developer & Builder<span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="space-y-8">
          {/* Bio Section */}
          <div className="terminal-card animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Bio
              </h2>
              <div className="pl-6 space-y-4 text-terminal-text">
                <p className="text-lg">
                  Hello! I'm <span className="text-terminal-cyan font-semibold">{siteConfig.author.name}</span>, 
                  a passionate full-stack developer focused on building innovative solutions and learning new technologies.
                </p>
                <p>
                  With expertise in modern web technologies, I specialize in creating scalable, performant applications 
                  that solve real-world problems. My journey in software development has taken me through various domains, 
                  from building responsive frontends to architecting robust backend systems.
                </p>
                <p className="text-terminal-textMuted">
                  I believe in writing clean, maintainable code and following best practices. When I'm not coding, 
                  you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the community.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center">
                    <div className="text-2xl font-bold text-terminal-cyan">4+</div>
                    <div className="text-xs text-terminal-textMuted mt-1">Years Experience</div>
                  </div>
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center">
                    <div className="text-2xl font-bold text-terminal-green">50+</div>
                    <div className="text-xs text-terminal-textMuted mt-1">Projects Built</div>
                  </div>
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center">
                    <div className="text-2xl font-bold text-terminal-command">15+</div>
                    <div className="text-xs text-terminal-textMuted mt-1">Technologies</div>
                  </div>
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center">
                    <div className="text-2xl font-bold text-terminal-cyan">∞</div>
                    <div className="text-xs text-terminal-textMuted mt-1">Learning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Skills & Technologies
              </h2>
              <div className="pl-6">
                <Skills />
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Career Timeline
              </h2>
              <div className="pl-6">
                <Timeline />
              </div>
            </div>
          </div>

          {/* Resume Download Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Resume
              </h2>
              <div className="pl-6">
                <ResumeDownload />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="terminal-card bg-terminal-bg animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center space-y-4 py-8">
              <h3 className="text-2xl font-bold text-gradient">Let's Work Together!</h3>
              <p className="text-terminal-textMuted max-w-2xl mx-auto">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <a
                  href="/contact"
                  className="terminal-button hover:scale-105 transition-transform"
                >
                  <span className="text-terminal-prompt mr-2">❯</span>
                  Get In Touch
                </a>
                <a
                  href="/projects"
                  className="terminal-button hover:scale-105 transition-transform"
                >
                  <span className="text-terminal-prompt mr-2">❯</span>
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}