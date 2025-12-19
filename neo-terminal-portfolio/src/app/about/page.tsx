import { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import ResumeDownload from '@/components/ResumeDownload';
import { siteConfig } from '@/lib/config';
import CodingProfiles from '@/components/CodingProfiles';
import Certifications from '@/components/Certifications';

// SEO-Optimized Metadata
export const metadata: Metadata = {
  title: 'About Sushant Kumar | Software Engineer II at Equifax | Java & Spring Boot Expert',
  description: 'Software Engineer II with 4.5+ years experience in Java, Spring Boot, Angular, microservices, and Google Cloud Platform. Specialized in building enterprise-scale applications, frontend development, backend development, and distributed systems. Currently at Equifax, previously at Suntec Business Solutions. 6-star HackerRank rating, 278+ LeetCode problems solved.',
  keywords: [
    // Primary Keywords
    'Sushant Kumar',
    'Software Engineer',
    'Full Stack Developer',
    'Backend Developer',
    
    // Technical Skills
    'Java Developer',
    'Spring Boot',
    'Microservices',
    'Google Cloud Platform',
    'Apache Kafka',
    'Redis',
    'REST API',
    
    // Expertise Areas
    'Enterprise Software Development',
    'Distributed Systems',
    'Cloud Architecture',
    'Backend Development',
    'API Development',
    
    // Companies & Experience
    'Equifax Engineer',
    'Suntec Business Solutions',
    'Revenue Management Systems',
    
    // Achievements
    'HackerRank 6 Star',
    'LeetCode Problems',
    'Competitive Programming',
    
    // Location-based
    'Software Engineer Kollam',
    'Java Developer Kerala',
    'Backend Developer India',
    
    // Technologies
    'Angular',
    'TypeScript',
    'Apache Beam',
    'Dataflow',
    'OAuth2',
    'SAML',
    'Jenkins Plugin Development',
  ],
  authors: [
    { 
      name: 'Sushant Kumar',
      url: siteConfig.url 
    }
  ],
  creator: 'Sushant Kumar',
  publisher: 'Sushant Kumar',
  
  // OpenGraph
  openGraph: {
    title: 'About Sushant Kumar | Software Engineer II at Equifax',
    description: 'Experienced Software Engineer specializing in Java, Spring Boot, microservices architecture, and Google Cloud Platform. 4.5+ years building enterprise applications.',
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: `${siteConfig.url}/profile.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Sushant Kumar - Software Engineer',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'About Sushant Kumar | Software Engineer II at Equifax',
    description: 'Software Engineer with 4.5+ years in Java, Spring Boot & GCP. Building enterprise-scale applications at Equifax.',
    creator: siteConfig.author.twitter?.split('/').pop(),
    images: [`${siteConfig.url}/profile.jpg`],
  },
  
  // Additional SEO
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  
  // Additional metadata
  category: 'Technology',
  classification: 'Software Engineering Portfolio',
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
                Software Engineer II at Equifax | Java, Spring Boot & Angular Specialist | Microservices Expert<span className="terminal-cursor"></span>
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
                  {/* Profile Picture - OPTIMIZED */}
                  <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <div className="relative group w-full max-w-xs">
                      {/* Decorative border effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-terminal-cyan to-terminal-green rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                      
                      {/* Image container */}
                      <div className="relative">
                        <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-terminal-cyan bg-terminal-bg">
                          {/* OPTIMIZED: Using Next.js Image component with priority loading */}
                          <Image
                            src="/profile.jpg"
                            alt={siteConfig.author.name}
                            width={400}
                            height={400}
                            priority={true}
                            quality={90}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            className="w-full h-full object-cover"
                            sizes="(max-width: 1024px) 100vw, 400px"
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        
                        {/* Terminal-style label */}
                        <div className="mt-3 text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-terminal-bg border border-terminal-cyan rounded text-xs font-mono">
                            <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                            <span className="text-terminal-text">sushant@equifax</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Text Content */}
                  <div className="lg:col-span-2 space-y-4 text-terminal-text">
                    <p className="text-base sm:text-lg leading-relaxed">
                      Hello! I'm <span className="text-terminal-cyan font-semibold">Sushant Kumar</span>, 
                      a <span className="text-terminal-green font-semibold">Software Engineer II at Equifax</span> with 4.5+ years of professional experience 
                      specializing in <span className="text-terminal-cyan">enterprise Java development</span>, 
                      <span className="text-terminal-cyan">microservices architecture</span>, and 
                      <span className="text-terminal-cyan">full-stack engineering</span>.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed">
                      Currently at <span className="font-semibold text-terminal-green">Equifax</span>, I design and develop{' '}
                      <span className="text-terminal-cyan">cloud-native microservices</span> and web applications using{' '}
                      <span className="font-semibold">Java, Spring Boot, Angular, and Google Cloud Platform</span>. 
                      I build scalable backend systems with distributed architectures while delivering modern, responsive user interfaces. 
                      My technical expertise includes <span className="text-terminal-cyan">OAuth2/SAML authentication</span>, 
                      RESTful API development, containerization with <span className="font-semibold">Docker</span>, and implementing{' '}
                      <span className="text-terminal-cyan">CI/CD pipelines</span> using Jenkins for automated deployment workflows.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed">
                      Previously at <span className="font-semibold text-terminal-green">Suntec Business Solutions</span>, 
                      I served as a Backend Java Developer on the <span className="text-terminal-cyan">Xelerate revenue management platform</span> — 
                      a mission-critical enterprise system deployed at major banks and financial institutions worldwide. 
                      I engineered high-performance <span className="text-terminal-cyan">RESTful APIs</span> using{' '}
                      <span className="font-semibold">Java and Spring Boot</span>, architected event-driven data pipelines with{' '}
                      <span className="font-semibold">Apache Kafka</span>, and implemented{' '}
                      <span className="text-terminal-cyan">Redis caching solutions</span> that significantly improved system performance and scalability.
                    </p>

                    <p className="text-sm sm:text-base text-terminal-textMuted leading-relaxed">
                      I'm passionate about <span className="text-terminal-green">software craftsmanship and problem-solving</span>, with{' '}
                      <span className="font-semibold">278+ LeetCode problems</span> solved and a{' '}
                      <span className="font-semibold">6-star rating on HackerRank</span>. 
                      I continuously enhance my skills in <span className="text-terminal-cyan">system design</span>, 
                      cloud computing, and modern development practices to build robust, maintainable solutions that solve complex business problems.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 pt-4">
                      <div className="bg-terminal-bg border border-terminal-border rounded p-2 sm:p-3 text-center hover:border-terminal-cyan transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-terminal-cyan">4.5+</div>
                        <div className="text-xs text-terminal-textMuted mt-1">Years Exp</div>
                      </div>
                      <div className="bg-terminal-bg border border-terminal-border rounded p-2 sm:p-3 text-center hover:border-terminal-green transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-terminal-green">278+</div>
                        <div className="text-xs text-terminal-textMuted mt-1">LeetCode</div>
                      </div>
                      <div className="bg-terminal-bg border border-terminal-border rounded p-2 sm:p-3 text-center hover:border-terminal-command transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-terminal-command">6★</div>
                        <div className="text-xs text-terminal-textMuted mt-1">HackerRank</div>
                      </div>
                      <div className="bg-terminal-bg border border-terminal-border rounded p-2 sm:p-3 text-center hover:border-terminal-cyan transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-terminal-cyan">15+</div>
                        <div className="text-xs text-terminal-textMuted mt-1">Tech Stack</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dubai Onsite Experience Section - Enhanced with light mode support */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-terminal-cyan flex items-center">
                  <span className="text-terminal-prompt mr-2">›</span>
                  Dubai Onsite Experience
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-terminal-cyan/10 border border-terminal-cyan rounded-full text-terminal-cyan text-xs font-semibold self-start sm:self-auto">
                  <span className="w-1.5 h-1.5 bg-terminal-cyan rounded-full"></span>
                  Special Assignment
                </span>
              </div>

              <div className="pl-2 sm:pl-6 space-y-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  Selected for onsite opportunity at Dubai office to work directly with CEO on experimental prototype for database-agnostic system for Suntec's 
                  <span className="text-terminal-cyan font-semibold"> Revenue Management System</span>. Contributed to exploring solutions for multi-database compatibility 
                  serving banking, hospitality, and financial institutions.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-terminal-cyan mt-0.5 flex-shrink-0">▸</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base leading-relaxed">
                        <span className="font-semibold text-terminal-green">Implemented Redis-based caching layer</span> for the prototype, working on caching strategies 
                        for frequently accessed data to reduce direct database queries and improve response times
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-terminal-cyan mt-0.5 flex-shrink-0">▸</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base leading-relaxed">
                        <span className="font-semibold text-terminal-green">Collaborated with CEO</span> on experimental approach to enable the revenue management platform 
                        to interface with multiple database systems (Oracle, PostgreSQL, SQL Server) without tight coupling
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-terminal-cyan mt-0.5 flex-shrink-0">▸</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base leading-relaxed">
                        <span className="font-semibold text-terminal-green">Gained hands-on experience</span> with distributed caching patterns, cache invalidation strategies, 
                        and performance optimization techniques for enterprise-scale applications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-terminal-border">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div className="text-center p-2 bg-terminal-bg border border-terminal-border rounded hover:border-terminal-cyan transition-colors">
                      <div className="text-terminal-cyan font-bold text-sm sm:text-base">Redis</div>
                      <div className="text-xs">Caching Layer</div>
                    </div>
                    <div className="text-center p-2 bg-terminal-bg border border-terminal-border rounded hover:border-terminal-green transition-colors">
                      <div className="text-terminal-green font-bold text-sm sm:text-base">CEO</div>
                      <div className="text-xs">Direct Collab</div>
                    </div>
                    <div className="text-center p-2 bg-terminal-bg border border-terminal-border rounded hover:border-terminal-command transition-colors">
                      <div className="text-terminal-command font-bold text-sm sm:text-base">Dubai</div>
                      <div className="text-xs">Onsite Project</div>
                    </div>
                  </div>
                </div>

                <div className="bg-terminal-bg border border-terminal-border rounded p-3 sm:p-4">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    <span className="text-terminal-cyan font-semibold">Technologies:</span> Redis, Java, Spring Boot, 
                    Caching Strategies, Cache Invalidation Patterns
                  </p>
                  <p className="text-xs mt-2 leading-relaxed">
                    <span className="text-terminal-green font-semibold">Key Learning:</span> Valuable exposure to distributed caching design, 
                    working directly with leadership on R&D initiatives, and understanding enterprise-scale architectural challenges
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
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
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
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
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.375s' }}>
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
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.375s' }}>
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
          <div className="terminal-card animate-slide-up" style={{ animationDelay: '0.375s' }}>
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
          <div className="terminal-card bg-terminal-bg animate-slide-up" style={{ animationDelay: '0.375s' }}>
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