'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Get theme from localStorage to match navbar
    const loadTheme = () => {
      const localTheme = localStorage.getItem('theme') || 'dark';
      setTheme(localTheme);
    };
    loadTheme();

    // Create a custom event listener for theme changes
    const handleThemeChange = (e) => {
      const newTheme = e.detail || localStorage.getItem('theme') || 'dark';
      setTheme(newTheme);
    };

    // Listen for both storage events and custom theme change events
    window.addEventListener('themeChanged', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const themeStyles = {
    dark: {
      bg: 'from-gray-950 to-blue-950',
      border: 'border-gray-800',
      text: 'text-gray-400',
      hoverText: 'hover:text-blue-300',
      gradient: 'from-gray-300 to-gray-100',
      hoverGradient: 'from-blue-300 to-blue-200'
    },
    light: {
      bg: 'from-blue-600 to-blue-400',
      border: 'border-blue-300',
      text: 'text-blue-800',
      hoverText: 'hover:text-blue-900',
      gradient: 'from-blue-900 to-blue-700',
      hoverGradient: 'from-blue-700 to-blue-600'
    },
    neon: {
      bg: 'from-purple-900 to-blue-800',
      border: 'border-[#39ff14]',
      text: 'neon-glow',
      hoverText: 'neon-glow',
      gradient: 'from-cyan-300 to-blue-100',
      hoverGradient: 'from-pink-200 to-cyan-100'
    },
    nature: {
      bg: 'from-green-900 to-teal-700',
      border: 'border-teal-500',
      text: 'text-teal-200',
      hoverText: 'hover:text-teal-300',
      gradient: 'from-green-300 to-emerald-100',
      hoverGradient: 'from-teal-200 to-emerald-100'
    },
    retro: {
      bg: 'from-amber-900 to-yellow-700',
      border: 'border-amber-500',
      text: 'text-yellow-200',
      hoverText: 'hover:text-amber-300',
      gradient: 'from-amber-300 to-yellow-100',
      hoverGradient: 'from-yellow-200 to-orange-100'
    },
  };

  const style = themeStyles[theme] || themeStyles.dark;
  const isNeon = theme === 'neon';

  return (
    <>
      <style jsx global>{`
        .neon-glow {
          color: #fff !important;
          text-shadow:
            0 0 5px #fff,
            0 0 10px #39ff14,
            0 0 20px #39ff14,
            0 0 40px #39ff14;
          animation: neonPulse 1.5s infinite alternate;
        }
        @keyframes neonPulse {
          from {
            text-shadow:
              0 0 5px #fff,
              0 0 10px #39ff14,
              0 0 20px #39ff14,
              0 0 40px #39ff14;
          }
          to {
            text-shadow:
              0 0 10px #fff,
              0 0 20px #00fff0,
              0 0 30px #00fff0,
              0 0 60px #00fff0;
          }
        }
      `}</style>
      <footer className={`w-full bg-gradient-to-r ${style.bg} ${isNeon ? 'neon-glow' : 'text-white'} py-6 px-4 border-t ${style.border}  bottom-0 left-0 z-10`}>
        <div className="max-w-15xl mx-auto flex flex-col items-center">
          <div className="text-center mb-2">
            <p className={`text-sm ${style.text}`}>
              © {new Date().getFullYear()} IEEE Executive. All rights reserved.
            </p>
          </div>
          <div className="group">
            <Link 
              href="/team" 
              className={`flex items-center ${style.text} ${style.hoverText} transition-colors duration-300`}
            >
              <span className="text-sm font-medium mr-1">Designed by</span>
              <span className={`text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r ${style.gradient} group-hover:${style.hoverGradient} transition-all duration-300`}>
                The Team
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300 ${isNeon ? 'neon-glow' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}