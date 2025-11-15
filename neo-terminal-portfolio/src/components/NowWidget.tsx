'use client';

import { useState, useEffect } from 'react';
import { getCurrentTime, getGreeting } from '@/lib/utils';

interface NowWidgetProps {
  className?: string;
}

export default function NowWidget({ className = '' }: NowWidgetProps) {
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getCurrentTime());
    setGreeting(getGreeting());

    // Update time every minute
    const interval = setInterval(() => {
      setTime(getCurrentTime());
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className={`terminal-card ${className}`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-terminal-cyan font-semibold">
              <span className="text-terminal-prompt mr-2">›</span>
              Now
            </h3>
          </div>
          <div className="pl-6 space-y-2 text-sm">
            <p className="text-terminal-textMuted">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const status = {
    emoji: '🚀',
    text: 'Building Neo-Terminal Portfolio',
    location: 'Trivandrum, Kerala, IN',
    availability: 'Available for opportunities',
  };

  return (
    <div className={`terminal-card ${className}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-terminal-cyan font-semibold flex items-center">
            <span className="text-terminal-prompt mr-2">›</span>
            Now
          </h3>
          <span className="text-xs text-terminal-textMuted animate-pulse">
            Live
          </span>
        </div>

        {/* Content */}
        <div className="pl-6 space-y-3 text-sm">
          {/* Greeting & Time */}
          <div className="space-y-1">
            <p className="text-terminal-text">
              {greeting}! It's{' '}
              <span className="text-terminal-cyan font-semibold">{time}</span>
            </p>
          </div>

          {/* Current Status */}
          {/* <div className="space-y-1">
            <p className="text-terminal-textMuted text-xs">Currently</p>
            <p className="text-terminal-text flex items-center gap-2">
              <span className="text-lg">{status.emoji}</span>
              {status.text}
            </p>
          </div> */}

          {/* Location */}
          <div className="space-y-1">
            <p className="text-terminal-textMuted text-xs">Location</p>
            <p className="text-terminal-text flex items-center gap-2">
              <span>📍</span>
              {status.location}
            </p>
          </div>

          {/* Availability */}
          {/* <div className="space-y-1">
            <p className="text-terminal-textMuted text-xs">Status</p>
            <p className="text-terminal-green flex items-center gap-2">
              <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
              {status.availability}
            </p>
          </div> */}

          {/* System Info */}
          <div className="pt-2 border-t border-terminal-border space-y-1">
            {/* <div className="flex justify-between text-xs">
              <span className="text-terminal-textMuted">Iteration</span>
              <span className="text-terminal-cyan">3/12</span>
            </div> */}
            <div className="flex justify-between text-xs">
              <span className="text-terminal-textMuted">Uptime</span>
              <span className="text-terminal-text">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}