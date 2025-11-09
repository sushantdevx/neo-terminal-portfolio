'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

export default function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (format: language-xxx)
  const language = className?.replace(/language-/, '') || 'text';
  
  const handleCopy = async () => {
    const success = await copyToClipboard(children);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-terminal-border bg-terminal-bg">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-terminal-bgLight border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-terminal-error"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-command"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-success"></div>
          </div>
          {filename && (
            <span className="text-terminal-textMuted text-sm ml-2">{filename}</span>
          )}
          <span className="text-terminal-cyan text-xs ml-2">{language}</span>
        </div>
        
        <button
          onClick={handleCopy}
          className="terminal-button py-1 px-3 text-xs flex items-center gap-2 hover:scale-105 transition-transform"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className={className}>{children}</code>
        </pre>
      </div>
    </div>
  );
}