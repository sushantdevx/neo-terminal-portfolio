'use client';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  logo: string;
  skills: string[];
  featured?: boolean;
}

const certificationsData: Certification[] = [
  {
    id: 'gcp-ace',
    title: 'Google Cloud Certified Associate Cloud Engineer',
    issuer: 'Google',
    issueDate: 'Jul 2025',
    expiryDate: 'Jul 2028',
    credentialId: 'ae6bd1b4f1014acab9eb7324bea7386a',
    credentialUrl: 'https://www.credly.com/badges/22b9594b-288c-41d2-a5ad-4353ce3d51fa/public_url',
    logo: '☁️',
    skills: ['Cloud Computing', 'Google Cloud Platform (GCP)', 'Cloud Infrastructure', 'Cloud Security'],
    featured: true,
  },
  {
    id: 'freecodecamp-js',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    issueDate: 'Oct 2020',
    credentialId: 'sk9712',
    credentialUrl: 'https://www.freecodecamp.org/certification/sk9712/javascript-algorithms-and-data-structures',
    logo: '🔥',
    skills: ['JavaScript'],
  },
  {
    id: 'hackerrank-problem-solving',
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
    issueDate: 'Jul 2020',
    credentialId: 'dc291f42229c',
    credentialUrl: 'https://www.hackerrank.com/certificates/dc291f42229c',
    logo: '💚',
    skills: ['Algorithms', 'Data Structures'],
  },
  {
    id: 'udemy-web-dev',
    title: 'The Web Developer Bootcamp',
    issuer: 'Udemy',
    issueDate: 'Jan 2020',
    credentialId: 'UC-6IG2F2PV',
    credentialUrl: 'https://www.udemy.com/certificate/UC-6IG2F2PV/',
    logo: '🎓',
    skills: ['Web Development'],
  },
];

export default function Certifications() {
  return (
    <div className="space-y-6">
      {/* All Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificationsData.map((cert, index) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors">
          <div className="text-xl font-bold text-terminal-cyan">{certificationsData.length}</div>
          <div className="text-xs text-terminal-textMuted mt-1">Total Certs</div>
        </div>
        <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-command transition-colors">
          <div className="text-xl font-bold text-terminal-command">
            {new Set(certificationsData.flatMap(c => c.skills)).size}
          </div>
          <div className="text-xs text-terminal-textMuted mt-1">Skills</div>
        </div>
        <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-green transition-colors">
          <div className="text-xl font-bold text-terminal-green">
            {certificationsData.filter(c => c.expiryDate).length}
          </div>
          <div className="text-xs text-terminal-textMuted mt-1">Active</div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-card bg-terminal-bg">
        <div className="space-y-1 font-mono text-xs">
          <p className="text-terminal-textMuted">
            <span className="text-terminal-prompt">¯</span> verifying credentials...
          </p>
          <p className="text-terminal-green pl-4">
            ✓ All certifications verified
          </p>
          <p className="text-terminal-cyan pl-4">
            › Professional credentials up to date
          </p>
          <p className="text-terminal-textMuted pl-4">
            › Continuous learning in progress<span className="terminal-cursor"></span>
          </p>
        </div>
      </div>
    </div>
  );
}

interface CertificationCardProps {
  cert: Certification;
}

function CertificationCard({ cert }: CertificationCardProps) {
  const isActive = cert.expiryDate ? new Date(cert.expiryDate) > new Date() : true;

  return (
    <div className="terminal-card group hover:scale-[1.02] transition-all">
      <div className="space-y-3">
        {/* Header with Logo */}
        <div className="flex items-start gap-3">
          <div className="text-3xl flex-shrink-0">{cert.logo}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-terminal-cyan group-hover:text-terminal-cyanDark transition-colors line-clamp-2 text-sm sm:text-base">
              {cert.title}
            </h3>
            <p className="text-terminal-textMuted text-xs sm:text-sm mt-1">
              <span className="text-terminal-prompt mr-1">›</span>
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Dates and Status */}
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center justify-between text-terminal-textMuted">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>Issued {cert.issueDate}</span>
            </div>
            {cert.expiryDate && (
              <div className="flex items-center gap-2">
                <span className={isActive ? 'text-terminal-green' : 'text-terminal-error'}>
                  {isActive ? '✓' : '⚠'}
                </span>
                <span>Expires {cert.expiryDate}</span>
              </div>
            )}
          </div>

          {/* Credential ID */}
          <div className="bg-terminal-bg border border-terminal-border rounded px-3 py-2">
            <p className="text-terminal-textMuted text-xs">Credential ID</p>
            <p className="text-terminal-text font-mono text-xs break-all">{cert.credentialId}</p>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {cert.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-terminal-bg border border-terminal-border rounded text-terminal-textMuted text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Verify Button */}
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-button w-full text-center hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm"
        >
          <span className="text-terminal-prompt">›</span>
          <span>Show credential</span>
          <svg
            className="w-4 h-4"
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
      </div>
    </div>
  );
}