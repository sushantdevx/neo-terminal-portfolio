'use client';

import { useState } from 'react';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  type: 'work' | 'education' | 'project';
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: 'Nov 2024 - Present',
    title: 'Software Engineer II',
    company: 'Equifax',
    description: 'Developed Smart Parameter Plugin for Jenkins enabling conditional parameters with dynamic visibility control, supporting multiple condition types and logical operators for complex build pipelines. Engineered customer onboarding automation using Jenkins pipelines with Groovy scripts to generate configuration files and orchestrate Apache Airflow deployments on Google Cloud Composer. Developed internal file service application using Angular 17 and TypeScript featuring JSON tree viewer, file-search utilities, HTTP integration, pagination, and custom UI components. Built summary file generation pipeline using Apache Beam on Google Dataflow for metadata aggregation including record counts and file statistics. Worked extensively with Google Cloud Platform services including Storage, Composer, Dataflow, Cloud Logging, Dataproc, and IAM. Contributed Python utility methods for automation workflows. Followed strict Agile practices including sprint planning, daily stand-ups, retrospectives, and iterative development.',
    technologies: ['Java', 'Spring Boot', 'Angular 17', 'TypeScript', 'Apache Beam', 'Google Cloud', 'Dataflow', 'Cloud Composer', 'Apache Airflow', 'Jenkins', 'Jenkins Plugin Development', 'Groovy', 'Python', 'IAM', 'Agile'],
    type: 'work',
  },
    {
    id: '2',
    year: '2024',
    title: 'LoopHoleLaw - Legal Practice Management Platform',
    company: 'Freelance Project',
    description: 'Developed comprehensive full-stack web application for legal practice in Kollam, Kerala, serving as both client-facing platform and administrative dashboard. Built responsive frontend using React and Tailwind CSS for optimal user experience across devices. Engineered RESTful API backend with Nodejs and Express, implementing secure JWT authentication and MongoDB database for case management and client data. Deployed production application on AWS EC2 with Nginx, demonstrating end-to-end ownership from design to deployment. Enabled lawyer to streamline practice operations, manage client cases, and establish professional online presence.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS', 'AWS EC2', 'Nginx', 'RESTful API', 'Multer'],
    type: 'project',
  },
  {
    id: '3',
    year: '2022 - Nov 2024',
    title: 'Software Engineer',
    company: 'Suntec Business Solutions',
    description: 'Optimized Xelerate platform API performance for banking clients by implementing pagination and reactive streaming with Spring WebFlux, enabling faster retrieval of pricing and billing data. Automated revenue management workflows by implementing scheduled batch processes for billing cycles and pricing updates across global financial institutions. Improved pricing calculation response times by 60% through strategic Redis caching with optimized TTL policies, supporting relationship-based pricing queries at enterprise scale. Built real-time revenue data pipeline from Kafka to S3 enabling business intelligence and regulatory compliance reporting for banking and telecom clients. Expanded platform database support by integrating Oracle and MariaDB, providing flexibility for enterprise clients with diverse infrastructure requirements. Reduced infrastructure costs by implementing micro-batching architecture using Stateful Kafka Streams for aggregating billing transactions before database persistence. Streamlined product configuration workflow by developing custom DSL using ANTLR, enabling product engineering teams to define pricing rules and billing logic through simplified syntax, reducing feature delivery time and development complexity. Enhanced enterprise security posture by implementing SSO solutions (OpenID Connect and SAML) and OAuth2 authorization for multi-tenant banking environments, supporting secure access across relationship managers and customer-facing applications.',
    technologies: ['Java', 'Spring Boot', 'Spring WebFlux', 'Kafka', 'Kafka Streams', 'Redis', 'Oracle', 'MariaDB', 'S3', 'ANTLR', 'OAuth2', 'OpenID Connect', 'SAML', 'Docker', 'Kubernetes', 'Jenkins'],
    type: 'work',
  },
  {
    id: '4',
    year: '2021 - 2022',
    title: 'Associate Software Engineer',
    company: 'Suntec Business Solutions',
    description: 'Standardized application logging across services by creating unified Log4j abstraction layer, improving debugging efficiency and system observability. Automated transaction data ingestion by building Apache NiFi flow to monitor folders and publish to Kafka, enabling real-time transaction processing. Enhanced system monitoring and compliance by implementing Tomcat filter chain to log requests, responses, headers, and execution times to database for audit trails. Performed vulnerability remediation and security patches for Java applications. Maintained platform reliability and client SLAs by promptly resolving critical production issues in revenue management and billing systems.',
    technologies: ['Java', 'Apache NiFi', 'Apache Kafka', 'Log4j', 'Tomcat', 'Oracle', 'MariaDB'],
    type: 'work',
  },
  {
    id: '5',
    year: '2019 - 2020',
    title: 'Malicious URL Detection System',
    company: 'Final Year Project - UKF College',
    description: 'Developed CNN model for detecting malicious URLs containing SQL injection, directory traversal, and XSS attacks. Architected neural network with embedding layer, dual CNN layers, and max-pooling layer for pattern recognition. Achieved high accuracy in identifying malicious code patterns in URLs.',
    technologies: ['Python', 'TensorFlow', 'CNN', 'Deep Learning', 'Cybersecurity', 'Machine Learning'],
    type: 'project',
  },
    {
    id: '6',
    year: '2018 - 2019',
    title: 'Ashraya NGO Website',
    company: 'Volunteer Work - Ashraya NGO',
    description: 'Developed full-featured website for Ashraya NGO using PHP CodeIgniter framework. Created platform to showcase NGO activities, facilitate donations, and manage beneficiary information. Received official Letter of Appreciation from organization for contribution.',
    technologies: ['PHP', 'CodeIgniter', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    type: 'project',
  },
  {
    id: '7',
    year: '2017 - 2018',
    title: 'Code Editor Desktop Application',
    company: 'College Project - UKF College',
    description: 'Built HTML/CSS/JS compiler utility as desktop application using Electron js framework. Implemented real-time code editing and rendering with side-by-side preview panel. Created intuitive interface for web development workflow with instant feedback.',
    technologies: ['Electron.js', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    type: 'project',
  },
  {
    id: '8',
    year: '2017 - 2018',
    title: 'PlayByEars - Affiliate Marketing Website',
    company: 'Personal Project - UKF College',
    description: 'Built e-commerce affiliate marketing website using WordPress for Amazon Associates program, demonstrating entrepreneurial mindset and digital marketing skills. Designed and configured product showcase pages, implemented affiliate tracking, and optimized content for search engines. Explored web monetization strategies and gained hands-on experience in content management systems and online business models.',
    technologies: ['WordPress', 'Amazon Associates', 'SEO', 'Content Management', 'Web Monetization'],
    type: 'project',
  },
  {
    id: '9',
    year: '2016 - 2017',
    title: '2D Game Development',
    company: 'Hackathon Project - UKF College',
    description: 'Built Flappy Bird-style 2D game using Phaserjs framework during first-year hackathon. Implemented game physics, collision detection, scoring system, and responsive controls. Successfully completed hackathon project demonstrating game development fundamentals.',
    technologies: ['Phaser.js', 'JavaScript', 'Game Development', 'HTML5 Canvas'],
    type: 'project',
  },
  {
    id: '10',
    year: '2016 - 2020',
    title: 'B.Tech in Computer Science',
    company: 'UKF College of Engineering and Technology',
    description: 'Graduated with a degree in Computer Science and Engineering. Won coding competition during college. Actively participated in competitive programming on platforms like HackerRank, CodeChef, and LeetCode, solving algorithmic challenges and improving problem-solving skills. Developed strong foundation in algorithms, data structures, and software engineering principles through coursework and practical projects.',
    technologies: ['Data Structures', 'Algorithms', 'OOPs', 'System Design', 'Competitive Programming', 'HackerRank', 'CodeChef', 'LeetCode'],
    type: 'education',
  },
];

export default function Timeline() {
  const [selectedType, setSelectedType] = useState<'all' | 'work' | 'education' | 'project'>('all');

  const filteredTimeline = selectedType === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      default:
        return '📌';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'text-terminal-cyan';
      case 'education':
        return 'text-terminal-green';
      case 'project':
        return 'text-terminal-command';
      default:
        return 'text-terminal-text';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`terminal-button text-sm ${
            selectedType === 'all' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="text-terminal-prompt mr-1">›</span>
          All
        </button>
        <button
          onClick={() => setSelectedType('work')}
          className={`terminal-button text-sm ${
            selectedType === 'work' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="mr-1">💼</span>
          Work
        </button>
        <button
          onClick={() => setSelectedType('project')}
          className={`terminal-button text-sm ${
            selectedType === 'project' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="mr-1">🚀</span>
          Projects
        </button>
        <button
          onClick={() => setSelectedType('education')}
          className={`terminal-button text-sm ${
            selectedType === 'education' ? 'border-terminal-cyan text-terminal-cyan' : ''
          }`}
        >
          <span className="mr-1">🎓</span>
          Education
        </button>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-8">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-terminal-border"></div>

        {filteredTimeline.map((item, index) => (
          <div
            key={item.id}
            className="relative animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-2.15rem] top-2 w-4 h-4 rounded-full bg-terminal-bg border-2 border-terminal-cyan flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-terminal-cyan animate-pulse"></div>
            </div>

            {/* Content Card */}
            <div className="terminal-card hover:scale-[1.02] transition-transform">
              <div className="space-y-3">
                {/* Year Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-cyan text-sm font-semibold">
                    <span>{getTypeIcon(item.type)}</span>
                    {item.year}
                  </span>
                </div>

                {/* Title & Company */}
                <div>
                  <h3 className={`text-xl font-bold ${getTypeColor(item.type)} mb-1`}>
                    {item.title}
                  </h3>
                  <p className="text-terminal-textMuted text-sm">
                    <span className="text-terminal-prompt mr-1">›</span>
                    {item.company}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  {item.description.split('.').filter(sentence => sentence.trim()).map((sentence, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-terminal-cyan mt-0.5">›</span>
                      <p className="text-terminal-text text-sm leading-relaxed flex-1">
                        {sentence.trim()}.
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-textMuted text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* End Marker */}
      <div className="relative pl-8">
        <div className="absolute left-[-2.15rem] top-0 w-4 h-4 rounded-full bg-terminal-bg border-2 border-terminal-green flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-terminal-green"></div>
        </div>
        <div className="text-terminal-green text-sm flex items-center gap-2">
          <span className="text-terminal-prompt">¯</span>
          <span>Journey continues...</span>
        </div>
      </div>
    </div>
  );
}