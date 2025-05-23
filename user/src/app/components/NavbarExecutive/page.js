'use client';
import Link from 'next/link';
import { useTheme } from '../ThemeProvider';
import { useState, useEffect } from 'react';

export default function ExecutiveNavbar() {
  const { theme } = useTheme();
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setActiveLink(window.location.pathname);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeStyles = {
    dark: {
      background: 'bg-gray-800/95 backdrop-blur-sm',
      text: 'text-gray-300',
      activeText: 'text-blue-400 font-semibold',
      hoverText: 'hover:text-blue-300',
      border: 'border-gray-700',
      activeBorder: 'border-blue-400',
      glow: 'shadow-[0_4px_12px_rgba(96,165,250,0.15)]'
    },
    light: {
      background: 'bg-blue-50/95 backdrop-blur-sm',
      text: 'text-gray-700',
      activeText: 'text-blue-600 font-semibold',
      hoverText: 'hover:text-blue-800',
      border: 'border-blue-200',
      activeBorder: 'border-blue-600',
      glow: 'shadow-[0_4px_12px_rgba(59,130,246,0.15)]'
    },
    neon: {
      background: 'bg-black/90 backdrop-blur-sm',
      text: 'text-pink-300',
      activeText: 'text-cyan-300 font-semibold',
      hoverText: 'hover:text-cyan-200',
      border: 'border-pink-500/30',
      activeBorder: 'border-cyan-400',
      glow: 'shadow-[0_4px_12px_rgba(34,211,238,0.25)]'
    },
    nature: {
      background: 'bg-green-800/95 backdrop-blur-sm',
      text: 'text-green-100',
      activeText: 'text-teal-300 font-semibold',
      hoverText: 'hover:text-teal-200',
      border: 'border-green-700',
      activeBorder: 'border-teal-400',
      glow: 'shadow-[0_4px_12px_rgba(45,212,191,0.15)]'
    },
    retro: {
      background: 'bg-amber-800/95 backdrop-blur-sm',
      text: 'text-amber-100',
      activeText: 'text-yellow-300 font-semibold',
      hoverText: 'hover:text-yellow-200',
      border: 'border-amber-700',
      activeBorder: 'border-yellow-400',
      glow: 'shadow-[0_4px_12px_rgba(234,179,8,0.15)]'
    }
  };

  const style = themeStyles[theme] || themeStyles.dark;

  return (
    <nav className={`${style.background} border-b ${style.border} ${isScrolled ? 'py-1' : 'py-2'} transition-all duration-300 sticky top-16 z-40 ${style.glow}`}>
      <div className="max-w-15xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-6">
            <ExecutiveNavLink 
              href="/executive/events" 
              active={activeLink.startsWith('/executive/events')} 
              style={style}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Event Management
              </span>
            </ExecutiveNavLink>
            <ExecutiveNavLink 
              href="/executive/data" 
              active={activeLink.startsWith('/executive/data')} 
              style={style}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Data Management
              </span>
            </ExecutiveNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ExecutiveNavLink({ href, active, children, style }) {
  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg
        ${active ? style.activeText : style.text}
        ${style.hoverText}
        hover:bg-white/10
        group
      `}
    >
      {children}
      <span className={`
        absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300
        ${active ? `w-full ${style.activeBorder}` : 'w-0 group-hover:w-full bg-current'}
      `}></span>
    </Link>
  );
}