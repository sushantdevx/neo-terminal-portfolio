'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navItems, siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <span className="text-terminal-prompt font-bold text-xl">❯</span>
            <span className="text-terminal-text font-semibold group-hover:text-terminal-cyan transition-colors">
              {"sushantdevx"}
            </span>
            <span className="terminal-cursor"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname.replace(/(?<!^)\/$/, "") === item.href || (item.href !== '/' && pathname.replace(/(?<!^)\/$/, "").startsWith(item.href+'/'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-link px-4 py-2 rounded text-sm font-medium',
                    isActive && 'active text-terminal-cyan'
                  )}
                >
                  <span className="text-terminal-prompt mr-1">
                    {isActive ? '❯' : ''}
                  </span>
                  {item.label}
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden terminal-button p-2"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={cn(
                  'block h-0.5 bg-terminal-cyan transition-all duration-300',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              ></span>
              <span
                className={cn(
                  'block h-0.5 bg-terminal-cyan transition-all duration-300',
                  isMobileMenuOpen && 'opacity-0'
                )}
              ></span>
              <span
                className={cn(
                  'block h-0.5 bg-terminal-cyan transition-all duration-300',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-terminal-border bg-terminal-bg/98 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.replace(/(?<!^)\/$/, "") === item.href || (item.href !== '/' && pathname.replace(/(?<!^)\/$/, "").startsWith(item.href+'/'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded transition-colors',
                    isActive
                      ? 'bg-terminal-bgLight text-terminal-cyan border border-terminal-cyan'
                      : 'text-terminal-textMuted hover:text-terminal-cyan hover:bg-terminal-bgLight'
                  )}
                >
                  <span className="text-terminal-prompt mr-2">
                    {isActive ? '❯' : '›'}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </nav>
  );
}