'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
  showCursor = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Reset everything when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setIsStarted(false);
  }, [text]);

  // Handle initial delay
  useEffect(() => {
    if (!isStarted) {
      if (delay > 0) {
        const delayTimeout = setTimeout(() => {
          setIsStarted(true);
        }, delay);
        return () => clearTimeout(delayTimeout);
      } else {
        setIsStarted(true);
      }
    }
  }, [delay, isStarted]);

  // Typewriter effect
  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete, isStarted]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && <span className="terminal-cursor"></span>}
    </span>
  );
}