import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import ResumeDownload from '@/components/ResumeDownload';
import { siteConfig } from '@/lib/config';
import CodingProfiles from '@/components/CodingProfiles';
import Certifications from '@/components/Certifications';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Sushant Kumar - Full Stack Developer specializing in Java, Spring Boot, and Microservices',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6 md:mb-8" />

        {/* Page Header */}
        <div className="terminal-card mb-6 md:mb-8 animate-fade-in">
          <div className="space-y-2">
            <p className="text-terminal-textMuted text-sm md:text-base">
              <span className="terminal-prompt">¯</span> cat about.md
            </p>
            <div className="pl-2 md:pl-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                About Me
              </h1>
              <p className="text-terminal-textMuted text-sm md:text-base">
                Full Stack Developer | Backend Specialist<span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="space-y-6 md:space-y-8">
          {/* Bio Section with Profile Picture */}
          <div className="terminal-card animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Bio
              </h2>
              <div className="pl-2 sm:pl-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                  {/* Profile Picture */}
                  <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <div className="relative group w-full max-w-xs">
                      {/* Decorative border effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-terminal-cyan to-terminal-green rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                      
                      {/* Image container */}
                      <div className="relative">
                        <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-terminal-cyan bg-terminal-bg">
                          <img
                            src="/profile.jpg"
                            alt={siteConfig.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Terminal-style label */}
                        <div className="mt-3 text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-terminal-bg border border-terminal-cyan rounded text-xs font-mono">
                            <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                            <span className="text-terminal-cyan">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Text */}
                  <div className="lg:col-span-2 space-y-3 md:space-y-4 text-terminal-text text-sm sm:text-base">
                    <p className="text-base sm:text-lg leading-relaxed">
                      Hello! I'm <span className="text-terminal-cyan font-semibold">{siteConfig.author.name}</span>, 
                      a <span className="text-terminal-green font-semibold">Software Engineer II</span> with 4+ years of experience 
                      building enterprise-scale applications in backend development, microservices architecture, and cloud infrastructure.
                    </p>
                    <p className="leading-relaxed">
                      Currently at <span className="text-terminal-cyan font-semibold">Equifax</span>, I work with <span className="text-terminal-green">Google Cloud Platform</span>, 
                      developing customer onboarding automation, building internal tools with <span className="text-terminal-command">Angular</span> and <span className="text-terminal-command">TypeScript</span>, 
                      and creating data pipelines using <span className="text-terminal-green">Apache Beam</span> and <span className="text-terminal-green">Dataflow</span>. 
                      I also developed a custom Jenkins plugin to streamline complex build configurations across teams.
                    </p>
                    <p className="leading-relaxed">
                      Previously at <span className="text-terminal-cyan font-semibold">Suntec Business Solutions</span>, I contributed to the <span className="text-terminal-green">Xelerate platform</span> - 
                      an enterprise revenue management system serving global banking and financial institutions. I worked on optimizing API performance with <span className="text-terminal-command">Spring WebFlux</span> and <span className="text-terminal-command">Redis</span>, 
                      building real-time data pipelines with <span className="text-terminal-command">Kafka</span>, implementing authentication systems with <span className="text-terminal-command">OAuth2</span> and <span className="text-terminal-command">SAML</span>, 
                      and developing a custom DSL using <span className="text-terminal-command">ANTLR</span> for product configuration workflows.
                    </p>
                    <p className="leading-relaxed">
                      I'm passionate about <span className="text-terminal-cyan">clean code</span>, <span className="text-terminal-cyan">distributed systems</span>, 
                      and <span className="text-terminal-cyan">solving complex problems</span>. With a 6-star rating on HackerRank and 278+ problems solved on LeetCode, 
                      I continuously sharpen my algorithmic skills. I thrive in <span className="text-terminal-green">Agile environments</span>, believe in writing maintainable code, 
                      and enjoy tackling challenges that drive real business value.
                    </p>
                    <p className="text-terminal-textMuted leading-relaxed">
                      When I'm not coding, you'll find me exploring new technologies, participating in competitive programming on platforms like CodeChef and LeetCode, 
                      or contributing to technical solutions that make a difference. I'm always eager to learn, grow, and take on new challenges in software engineering.
                    </p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pt-4 mt-4 border-t border-terminal-border">
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center hover:border-terminal-cyan transition-colors cursor-pointer group">
                    <div className="text-xl sm:text-2xl font-bold text-terminal-cyan group-hover:scale-110 transition-transform">4+</div>
                    <div className="text-xs sm:text-sm text-terminal-textMuted mt-1">Years Experience</div>
                  </div>
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center hover:border-terminal-green transition-colors cursor-pointer group">
                    <div className="text-xl sm:text-2xl font-bold text-terminal-green group-hover:scale-110 transition-transform">278+</div>
                    <div className="text-xs sm:text-sm text-terminal-textMuted mt-1">LeetCode Solved</div>
                  </div>
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center hover:border-terminal-command transition-colors cursor-pointer group">
                    <div className="text-lg sm:text-2xl font-bold text-terminal-command group-hover:scale-110 transition-transform">★★★★★★</div>
                    <div className="text-xs sm:text-sm text-terminal-textMuted mt-1">HackerRank Rating</div>
                  </div>
                  <div className="bg-terminal-bg border border-terminal-border rounded p-3 text-center hover:border-terminal-cyan transition-colors cursor-pointer group">
                    <div className="text-xl sm:text-2xl font-bold text-terminal-cyan group-hover:scale-110 transition-transform">∞</div>
                    <div className="text-xs sm:text-sm text-terminal-textMuted mt-1">Learning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Skills & Technologies
              </h2>
              <div className="pl-2 sm:pl-6">
                <Skills />
              </div>
            </div>
          </div>

          {/* Coding Profiles Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Coding Profiles & Achievements
              </h2>
              <div className="pl-2 sm:pl-6">
                <CodingProfiles />
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.175s' }}>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Licenses & Certifications
              </h2>
              <div className="pl-2 sm:pl-6">
                <Certifications />
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.225s' }}>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Career Timeline
              </h2>
              <div className="pl-2 sm:pl-6">
                <Timeline />
              </div>
            </div>
          </div>

          {/* Resume Download Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.275s' }}>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                <span className="text-terminal-prompt mr-2">›</span>
                Resume
              </h2>
              <div className="pl-2 sm:pl-6">
                <ResumeDownload />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="terminal-card bg-terminal-bg animate-slide-up" style={{ animationDelay: '0.325s' }}>
            <div className="text-center space-y-4 py-6 sm:py-8 px-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gradient">Let's Work Together!</h3>
              <p className="text-terminal-textMuted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-4">
                <a
                  href="/contact"
                  className="terminal-button hover:scale-105 transition-transform text-sm sm:text-base"
                >
                  <span className="text-terminal-prompt mr-2">¯</span>
                  Get In Touch
                </a>
                <a
                  href="/projects"
                  className="terminal-button hover:scale-105 transition-transform text-sm sm:text-base"
                >
                  <span className="text-terminal-prompt mr-2">¯</span>
                  View Projects
                </a>
                <a
                  href={siteConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-button hover:scale-105 transition-transform text-sm sm:text-base"
                >
                  <span className="text-terminal-prompt mr-2">¯</span>
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}