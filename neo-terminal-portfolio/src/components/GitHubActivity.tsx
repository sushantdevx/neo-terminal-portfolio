'use client';

import { useState, useEffect } from 'react';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicGists: number;
}

interface GitHubEvent {
  type: string;
  repo: string;
  created_at: string;
  payload?: any;
}

interface GitHubActivityProps {
  username: string;
  className?: string;
}

export default function GitHubActivity({ username, className = '' }: GitHubActivityProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch GitHub user data');
        }

        const userData = await userResponse.json();

        // Fetch recent events
        const eventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=10`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch GitHub events');
        }

        const eventsData = await eventsResponse.json();

        // Calculate total stars from all repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        let totalStars = 0;
        let totalForks = 0;

        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
          totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
        }

        setStats({
          totalRepos: userData.public_repos,
          totalStars,
          totalForks,
          followers: userData.followers,
          following: userData.following,
          publicGists: userData.public_gists,
        });

        // Parse recent events
        const parsedEvents = eventsData.slice(0, 5).map((event: any) => ({
          type: event.type,
          repo: event.repo.name,
          created_at: event.created_at,
          payload: event.payload,
        }));

        setRecentEvents(parsedEvents);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const getEventDescription = (event: GitHubEvent): string => {
    const repoName = event.repo.split('/')[1];
    
    switch (event.type) {
      case 'PushEvent':
        const commits = event.payload?.commits?.length;
        if (commits && commits > 0) {
          return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repoName}`;
        }
        // If commit count is unavailable or 0, show generic message
        return `Pushed to ${repoName}`;
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type} in ${repoName}`;
      case 'PullRequestEvent':
        return `${event.payload?.action} pull request in ${repoName}`;
      case 'IssuesEvent':
        return `${event.payload?.action} issue in ${repoName}`;
      case 'WatchEvent':
        return `Starred ${repoName}`;
      case 'ForkEvent':
        return `Forked ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const getEventIcon = (type: string): string => {
    switch (type) {
      case 'PushEvent':
        return '📤';
      case 'CreateEvent':
        return '✨';
      case 'PullRequestEvent':
        return '🔀';
      case 'IssuesEvent':
        return '◉';
      case 'WatchEvent':
        return '⭐';
      case 'ForkEvent':
        return '🍴';
      default:
        return '📌';
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

  if (loading) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-4">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>💻</span>
            GitHub Activity
          </h3>
          <div className="animate-pulse space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-terminal-bg border border-terminal-border rounded p-3">
                  <div className="h-4 bg-terminal-border rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-3">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>💻</span>
            GitHub Activity
          </h3>
          <div className="terminal-card bg-terminal-bg border-terminal-error">
            <div className="flex items-start gap-2">
              <span className="text-terminal-error">✕</span>
              <div>
                <p className="text-terminal-error font-semibold mb-1">
                  Unable to load GitHub data
                </p>
                <p className="text-terminal-textMuted text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`terminal-card ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>💻</span>
            GitHub Activity
          </h3>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-textMuted hover:text-terminal-cyan text-xs transition-colors flex items-center gap-1"
          >
            View Profile
            <span>↗</span>
          </a>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-3 gap-3">
            <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors">
              <div className="text-xl font-bold text-terminal-cyan">{stats.totalRepos}</div>
              <div className="text-xs text-terminal-textMuted mt-1">Repositories</div>
            </div>
            <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors">
              <div className="text-xl font-bold text-terminal-green">{stats.totalStars}</div>
              <div className="text-xs text-terminal-textMuted mt-1">Stars</div>
            </div>
            <div className="terminal-card bg-terminal-bg text-center hover:border-terminal-cyan transition-colors">
              <div className="text-xl font-bold text-terminal-command">{stats.followers}</div>
              <div className="text-xs text-terminal-textMuted mt-1">Followers</div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {recentEvents.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-terminal-text text-sm font-semibold flex items-center gap-2">
              <span className="text-terminal-prompt">›</span>
              Recent Activity
            </h4>
            <div className="space-y-2">
              {recentEvents.map((event, index) => (
                <div
                  key={index}
                  className="terminal-card bg-terminal-bg hover:border-terminal-cyan transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{getEventIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-terminal-text text-sm line-clamp-2 group-hover:text-terminal-cyan transition-colors">
                        {getEventDescription(event)}
                      </p>
                      <p className="text-terminal-textMuted text-xs mt-1">
                        {getTimeAgo(event.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Output Style */}
        <div className="terminal-card bg-terminal-bg">
          <div className="font-mono text-xs space-y-1">
            <p className="text-terminal-textMuted">
              <span className="text-terminal-prompt">¯</span> GitHub stats updated
            </p>
            <p className="text-terminal-green pl-4">
              ✓ Fetched user data and recent events
            </p>
            <p className="text-terminal-textMuted pl-4">
              › Last sync: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}