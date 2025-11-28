'use client';

interface CodingProfile {
  name: string;
  username: string;
  url: string;
  achievements: string[];
  icon: string;
  color: string;
}

const profiles: CodingProfile[] = [
  {
    name: 'HackerRank',
    username: 'lOne9wOlf',
    url: 'https://www.hackerrank.com/lOne9wOlf',
    achievements: [
      '6-star rating in Problem Solving',
      '5-star badge in Java',
      '5-star badge in Python',
      'Problem Solving (Intermediate) certified',
    ],
    icon: '👨‍💻',
    color: 'text-terminal-green',
  },
  {
    name: 'LeetCode',
    username: 'sushantdevx',
    url: 'https://leetcode.com/sushantdevx',
    achievements: [
      '278+ problems solved',
      'Regular contest participant',
    ],
    icon: '⚡',
    color: 'text-terminal-command',
  },
  {
    name: 'GitHub',
    username: 'sushantdevx',
    url: 'https://github.com/sushantdevx',
    achievements: [
      'Active open source contributor',
      'Multiple production-ready projects',
      'Clean code and documentation',
    ],
    icon: '🐙',
    color: 'text-terminal-cyan',
  },
];

export default function CodingProfiles() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {profiles.map((profile, index) => (
          <a
            key={profile.name}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-card bg-terminal-bg hover:border-terminal-cyan active:scale-[0.98] sm:hover:scale-[1.02] transition-all group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{profile.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-bold text-sm sm:text-base ${profile.color} group-hover:text-terminal-cyan transition-colors truncate`}>
                      {profile.name}
                    </h3>
                    <p className="text-terminal-textMuted text-xs truncate">@{profile.username}</p>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-terminal-textMuted group-hover:text-terminal-cyan group-hover:translate-x-1 transition-all flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>

              {/* Achievements */}
              <div className="space-y-1.5 sm:space-y-2">
                {profile.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                    <span className="text-terminal-green mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-terminal-text flex-1 leading-relaxed">{achievement}</span>
                  </div>
                ))}
              </div>

              {/* Visit Link */}
              <div className="pt-2 border-t border-terminal-border">
                <div className="flex items-center gap-2 text-xs text-terminal-textMuted group-hover:text-terminal-cyan transition-colors">
                  <span>Visit profile</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Achievements Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-green active:scale-95 transition-all">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-terminal-green leading-tight">
            ⭐⭐⭐⭐⭐⭐
          </div>
          <div className="text-xs text-terminal-textMuted mt-1 sm:mt-2 px-1">HackerRank Stars</div>
        </div>
        <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-command active:scale-95 transition-all">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-command">278+</div>
          <div className="text-xs text-terminal-textMuted mt-1 sm:mt-2 px-1">LeetCode Problems</div>
        </div>
        {/* <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan active:scale-95 transition-all">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-cyan">1,501</div>
          <div className="text-xs text-terminal-textMuted mt-1 sm:mt-2 px-1">Contest Rating</div>
        </div> */}
        <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-green active:scale-95 transition-all">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-green">8+</div>
          <div className="text-xs text-terminal-textMuted mt-1 sm:mt-2 px-1">Certifications</div>
        </div>
      </div>

      {/* Recognition */}
      <div className="terminal-card bg-terminal-bg">
        <div className="space-y-3 sm:space-y-4">
          <h4 className="text-sm sm:text-base text-terminal-cyan font-semibold flex items-center gap-2">
            <span className="text-base sm:text-lg">🏆</span>
            <span>Notable Achievements</span>
          </h4>
          <div className="pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-terminal-green mt-0.5 flex-shrink-0">✓</span>
              <div className="flex-1 min-w-0">
                <p className="text-terminal-text text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold">CTO's Honour List</span>
                  <span className="hidden sm:inline"> - </span>
                  <span className="block sm:inline text-terminal-textMuted sm:text-terminal-text">
                    Suntec Business Solutions
                  </span>
                </p>
                <p className="text-terminal-textMuted text-xs mt-1 leading-relaxed">
                  Recognition for exceptional contributions to Platform Engineering Team (Oct 2021)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-terminal-green mt-0.5 flex-shrink-0">✓</span>
              <div className="flex-1 min-w-0">
                <p className="text-terminal-text text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold">Letter of Appreciation</span>
                  <span className="hidden sm:inline"> - </span>
                  <span className="block sm:inline text-terminal-textMuted sm:text-terminal-text">
                    Ashraya NGO
                  </span>
                </p>
                <p className="text-terminal-textMuted text-xs mt-1 leading-relaxed">
                  Received official letter of appreciation for developing a comprehensive website solution for Ashraya NGO, including payment integration, security implementation and digital infrastructure that supports their mission serving thousands of vulnerable individuals across Kerala
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-terminal-green mt-0.5 flex-shrink-0">✓</span>
              <div className="flex-1 min-w-0">
                <p className="text-terminal-text text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold">6-Star HackerRank Badge</span>
                  <span className="hidden sm:inline"> - </span>
                  <span className="block sm:inline text-terminal-textMuted sm:text-terminal-text">
                    Problem Solving Excellence
                  </span>
                </p>
                <p className="text-terminal-textMuted text-xs mt-1 leading-relaxed">
                  Awarded for mastery in Algorithms and Data Structures (Feb 2018)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-card bg-terminal-bg overflow-x-auto">
        <div className="space-y-1 font-mono text-xs whitespace-nowrap">
          <p className="text-terminal-textMuted">
            <span className="text-terminal-prompt">¯</span> Fetching coding profiles...
          </p>
          <p className="text-terminal-green pl-4">✓ HackerRank: 6-star rating verified</p>
          <p className="text-terminal-cyan pl-4">✓ LeetCode: 278+ problems solved</p>
          <p className="text-terminal-command pl-4">✓ GitHub: Active contributions tracked</p>
          <p className="text-terminal-text pl-4">
            › All profiles active and current<span className="terminal-cursor"></span>
          </p>
        </div>
      </div>
    </div>
  );
}