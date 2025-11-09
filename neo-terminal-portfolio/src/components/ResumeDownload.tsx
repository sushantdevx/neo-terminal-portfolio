'use client';

import { useState } from 'react';

export default function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      // In production, this would be a real PDF URL from S3
      // For now, we'll create a simple download action
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // This file would be in /public folder
      link.download = 'sushant-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
    }, 500);
  };

  const handleView = () => {
    // Open resume in new tab
    window.open('/resume.pdf', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Download Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="terminal-button text-left group hover:scale-105 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-terminal-prompt text-xl">❯</span>
                <span className="font-semibold">Download Resume</span>
              </div>
              <p className="text-xs text-terminal-textMuted pl-7">
                {isDownloading ? 'Preparing download...' : 'PDF format • 245 KB'}
              </p>
            </div>
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {isDownloading ? '⏳' : '📥'}
            </span>
          </div>
        </button>

        {/* View Button */}
        <button
          onClick={handleView}
          className="terminal-button text-left group hover:scale-105 transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-terminal-prompt text-xl">❯</span>
                <span className="font-semibold">View Online</span>
              </div>
              <p className="text-xs text-terminal-textMuted pl-7">
                Opens in new tab
              </p>
            </div>
            <span className="text-2xl group-hover:scale-110 transition-transform">👁️</span>
          </div>
        </button>
      </div>

      {/* Resume Preview/Info */}
      <div className="terminal-card bg-terminal-bg">
        <div className="space-y-3">
          <h3 className="text-terminal-cyan font-semibold flex items-center gap-2">
            <span>📄</span>
            Resume Contents
          </h3>
          
          <div className="pl-6 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-terminal-green">✓</span>
              <span className="text-terminal-text">Professional Summary</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-terminal-green">✓</span>
              <span className="text-terminal-text">Work Experience & Projects</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-terminal-green">✓</span>
              <span className="text-terminal-text">Technical Skills & Certifications</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-terminal-green">✓</span>
              <span className="text-terminal-text">Education & Achievements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-terminal-green">✓</span>
              <span className="text-terminal-text">Contact Information</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-card bg-terminal-bg">
        <div className="space-y-1 font-mono text-xs">
          <p className="text-terminal-textMuted">
            <span className="text-terminal-prompt">❯</span> ls -la ./resume
          </p>
          <p className="text-terminal-text pl-4">
            -rw-r--r-- 1 sushant staff 245K Jan 8 2025 resume.pdf
          </p>
          <p className="text-terminal-green pl-4">
            ✓ Resume ready for download
          </p>
          <p className="text-terminal-textMuted pl-4">
            <span className="text-terminal-prompt">❯</span> Last updated: January 2025
            <span className="terminal-cursor"></span>
          </p>
        </div>
      </div>

      {/* Alternative Formats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="terminal-card text-center hover:border-terminal-cyan transition-colors cursor-pointer">
          <div className="text-2xl mb-1">📄</div>
          <div className="text-xs text-terminal-textMuted">PDF</div>
        </div>
        <div className="terminal-card text-center hover:border-terminal-cyan transition-colors cursor-pointer opacity-50">
          <div className="text-2xl mb-1">📝</div>
          <div className="text-xs text-terminal-textMuted">DOCX</div>
        </div>
        <div className="terminal-card text-center hover:border-terminal-cyan transition-colors cursor-pointer opacity-50">
          <div className="text-2xl mb-1">🔗</div>
          <div className="text-xs text-terminal-textMuted">LinkedIn</div>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-terminal-textMuted text-center">
        <span className="text-terminal-prompt">›</span> Resume is regularly updated to reflect latest experience
      </p>
    </div>
  );
}