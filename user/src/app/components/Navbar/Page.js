'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

export default function Navbar() {
  const [logoImage, setLogoImage] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { theme, changeTheme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.use-outside-click')) {
        setIsProfileMenuOpen(false);
      }
      if (isThemeMenuOpen && !event.target.closest('.theme-menu-relative')) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen, isThemeMenuOpen]);

  const saveTheme = (newTheme) => {
    changeTheme(newTheme);
  };

  const themeStyles = {
    dark: {
      nav: 'from-gray-900 via-gray-800 to-blue-800',
      text: 'text-white',
      link: 'text-gray-300 hover:text-blue-400',
      active: 'text-blue-300 font-bold',
      underline: 'bg-blue-400',
      button: 'bg-gray-800/80 hover:bg-gray-700/80 text-white',
      menu: 'bg-gray-900/95',
      mobileLink: 'text-blue-100 hover:bg-blue-800/30 hover:text-white',
      mobileActive: 'bg-blue-800/70 text-white font-semibold',
      logoPrimary: 'from-blue-300 via-blue-200 to-blue-100',
      logoSecondary: 'from-blue-200 to-blue-100',
      dropdownText: 'text-white',
      dropdownActiveText: 'text-white'
    },
    light: {
      nav: 'from-blue-100 via-blue-300 to-blue-400',
      text: 'text-gray-900',
      link: 'text-gray-900 hover:text-blue-900',
      active: 'text-blue-900 font-bold',
      underline: 'bg-blue-900',
      button: 'bg-white/80 hover:bg-blue-200/80 text-blue-700',
      menu: 'bg-white/95',
      mobileLink: 'text-blue-800 hover:bg-blue-300/30 hover:text-blue-900',
      mobileActive: 'bg-blue-300/70 text-blue-900 font-semibold',
      logoPrimary: 'from-blue-900 via-blue-700 to-blue-600',
      logoSecondary: 'from-blue-700 to-blue-600',
      dropdownText: 'text-gray-900',
      dropdownActiveText: 'text-gray-900'
    },
    neon: {
      nav: 'from-purple-900 via-pink-700 to-blue-800',
      text: 'neon-glow',
      link: 'neon-glow',
      active: 'neon-glow font-bold',
      underline: 'bg-cyan-300',
      button: 'bg-black/40 hover:bg-black/70 neon-glow',
      menu: 'bg-black/95 neon-glow',
      mobileLink: 'neon-glow hover:bg-black/40',
      mobileActive: 'bg-black/70 neon-glow font-semibold',
      logoPrimary: 'from-cyan-300 via-pink-200 to-blue-100',
      logoSecondary: 'from-pink-200 via-blue-200 to-cyan-100',
      dropdownText: 'neon-glow',
      dropdownActiveText: 'neon-glow'
    },
    nature: {
      nav: 'from-green-900 via-emerald-800 to-teal-700',
      text: 'text-green-100',
      link: 'text-green-100 hover:text-teal-300',
      active: 'text-teal-300 font-bold',
      underline: 'bg-teal-300',
      button: 'bg-green-900/70 hover:bg-emerald-800/80 text-teal-100',
      menu: 'bg-green-900/95',
      mobileLink: 'text-teal-100 hover:bg-teal-800/40 hover:text-green-100',
      mobileActive: 'bg-teal-800/70 text-green-100 font-semibold',
      logoPrimary: 'from-green-300 via-teal-200 to-emerald-100',
      logoSecondary: 'from-teal-200 to-emerald-100',
      dropdownText: 'text-green-100',
      dropdownActiveText: 'text-green-100'
    },
    retro: {
      nav: 'from-amber-900 via-orange-800 to-yellow-700',
      text: 'text-yellow-100',
      link: 'text-yellow-100 hover:text-amber-400',
      active: 'text-amber-400 font-bold',
      underline: 'bg-amber-400',
      button: 'bg-amber-900/70 hover:bg-orange-800/80 text-yellow-100',
      menu: 'bg-amber-900/95',
      mobileLink: 'text-yellow-100 hover:bg-amber-800/40 hover:text-yellow-300',
      mobileActive: 'bg-amber-800/70 text-yellow-300 font-semibold',
      logoPrimary: 'from-amber-300 via-orange-200 to-yellow-100',
      logoSecondary: 'from-yellow-200 to-orange-100',
      dropdownText: 'text-yellow-100',
      dropdownActiveText: 'text-yellow-100'
    },
  };

  const themes = [
    { id: 'dark', name: 'Dark' },
    { id: 'light', name: 'Light' },
    { id: 'neon', name: 'Neon' },
    { id: 'nature', name: 'Nature' },
    { id: 'retro', name: 'Retro' },
  ];

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
        .neon-navbar {
          box-shadow: 0 0 20px 5px #39ff14, 0 0 60px 10px #00fff0;
          border-radius: 1.5rem;
          border: 2px solid #39ff14;
          background: linear-gradient(90deg, #2d006e 0%, #ff1cf7 50%, #00fff0 100%) !important;
        }
        .use-outside-click {
          position: relative;
        }
        .use-outside-click::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 40;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .use-outside-click:focus-within::after {
          pointer-events: all;
          opacity: 1;
        }
      `}</style>
      <nav
        className={`
          bg-gradient-to-r ${style.nav} shadow-xl
          ${isNeon ? 'neon-navbar' : 'rounded-2xl'}
          transition-all duration-500
          mt-4 mx-2
        `}
      >
        <div className="max-w-15xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Title section */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center group"
                onClick={() => setActiveLink('/')}
              >
                {logoImage ? (
                  <Image
                    src="/image.png"
                    alt="IEEE Executive Logo"
                    width={220}
                    height={100}
                    className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="flex flex-col group">
                    <span
                      className={`
                        text-3xl font-extrabold tracking-tight
                        bg-clip-text text-transparent
                        bg-gradient-to-r ${style.logoPrimary}
                        ${isNeon ? 'neon-glow' : ''}
                      `}
                    >
                      IEEE
                    </span>
                    <span
                      className={`
                        text-xl font-semibold tracking-wider mt-[-4px]
                        bg-clip-text text-transparent
                        bg-gradient-to-r ${style.logoSecondary}
                        ${isNeon ? 'neon-glow' : ''}
                      `}
                    >
                      EXECUTIVE
                    </span>
                  </div>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                <NavLink href="/" active={activeLink === '/'} theme={theme} style={style}>Home</NavLink>
                <NavLink href="/team" active={activeLink === '/team'} theme={theme} style={style}>Team</NavLink>
                <NavLink href="/achievements" active={activeLink === '/achievements'} theme={theme} style={style}>Achievements</NavLink>
                <NavLink href="/services" active={activeLink === '/services'} theme={theme} style={style}>Services</NavLink>
                <NavLink href="/socials" active={activeLink === '/socials'} theme={theme} style={style}>Socials</NavLink>
                <NavLink href="/about" active={activeLink === '/about'} theme={theme} style={style}>About</NavLink>
              </div>

              {/* Theme Selector */}
              <div className="relative ml-2 theme-menu-relative">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className={`
                    flex items-center space-x-1 px-3 py-2 rounded-lg
                    transition-colors duration-200 border-2
                    ${style.button}
                    ${isNeon ? 'neon-glow border-[#00fff0]' : 'border-transparent hover:border-blue-300'}
                    shadow-md
                  `}
                >
                  <span className="w-4 h-4 rounded-full bg-current flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  </span>
                  <span className="text-sm font-medium">{themes.find(t => t.id === theme)?.name || 'Theme'}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isThemeMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isThemeMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-44 origin-top-right rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${style.menu}`}>
                    <div className="py-2">
                      {themes.map((themeOption) => (
                        <button
                          key={themeOption.id}
                          onClick={() => {
                            saveTheme(themeOption.id);
                            setIsThemeMenuOpen(false);
                          }}
                          className={`
                            flex items-center w-full px-4 py-2 text-base rounded-lg mb-1
                            transition-all duration-200
                            ${theme === themeOption.id
                              ? (isNeon
                                ? 'bg-black/70 neon-glow'
                                : `bg-blue-600/50 ${style.dropdownActiveText} font-bold shadow`)
                              : `hover:bg-blue-700/40 ${style.dropdownText}`}
                            ${themeOption.id === 'neon' && theme === 'neon' ? 'neon-glow' : ''}
                          `}
                        >
                          <span className="w-3 h-3 rounded-full mr-2 bg-current"></span>
                          {themeOption.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu - opens on hover, focus, or click, and closes on outside click */}
              <div
                className="relative ml-2 use-outside-click"
                onMouseEnter={() => setIsProfileMenuOpen(true)}
                onMouseLeave={() => setIsProfileMenuOpen(false)}
                onFocus={() => setIsProfileMenuOpen(true)}
                onBlur={() => setIsProfileMenuOpen(false)}
                tabIndex={0}
              >
                <button
                  onClick={() => setIsProfileMenuOpen((open) => !open)}
                  className={`
                    flex items-center justify-center p-2 rounded-full
                    transition-colors duration-200
                    ${style.button}
                    ${isNeon ? 'neon-glow' : ''}
                    hover:scale-110
                  `}
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
         {isProfileMenuOpen && (
  <div className={`absolute right-0 mt-2 w-48 origin-top-right rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${style.menu}`}>
    {/* Add close button at the top-right corner */}
    <button 
      onClick={() => setIsProfileMenuOpen(false)}
      className={`
        absolute top-2 right-2 p-1 rounded-full
        transition-colors duration-200
        ${isNeon ? 'neon-glow' : `hover:bg-gray-700/40 ${style.dropdownText}`}
        hover:scale-110
      `}
      aria-label="Close menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <div className="py-1 pt-3"> {/* Increased top padding to accommodate close button */}
      <Link
        href="/profile"
        className={`
          block px-4 py-2 text-sm
          ${style.dropdownText}
          hover:bg-gray-800 hover:text-white
          transition-colors duration-200
        `}
        onClick={() => setIsProfileMenuOpen(false)}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          My Profile
        </div>
      </Link>
                      <Link
                        href="/settings"
                        className={`
                          block px-4 py-2 text-sm
                          ${style.dropdownText}
                          hover:bg-gray-800 hover:text-white
                          transition-colors duration-200
                        `}
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19a7 7 0 100-14 7 7 0 000 14z" />
                          </svg>
                          Settings
                        </div>
                      </Link>
                      <div className="border-t border-gray-700/50 my-1"></div>
                      <button
                        onClick={() => {
                          // Add your logout logic here
                          setIsProfileMenuOpen(false);
                        }}
                        className={`
                          w-full text-left px-4 py-2 text-sm
                          ${style.dropdownText}
                          hover:bg-gray-800 hover:text-white
                          transition-colors duration-200
                          flex items-center
                        `}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </div>
                  )}
                
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  inline-flex items-center justify-center p-2 rounded-md
                  focus:outline-none transition-colors duration-300
                  ${isNeon ? 'neon-glow bg-black/40' : 'bg-blue-800/30'}
                `}
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-sm py-2 px-2 ${style.menu} rounded-b-2xl`}>
            <div className="pt-2 pb-4 space-y-2">
              <MobileNavLink href="/" active={activeLink === '/'} theme={theme} style={style}>Home</MobileNavLink>
              <MobileNavLink href="/team" active={activeLink === '/team'} theme={theme} style={style}>Team</MobileNavLink>
              <MobileNavLink href="/achievements" active={activeLink === '/achievements'} theme={theme} style={style}>Achievements</MobileNavLink>
              <MobileNavLink href="/services" active={activeLink === '/services'} theme={theme} style={style}>Services</MobileNavLink>
              <MobileNavLink href="/socials" active={activeLink === '/socials'} theme={theme} style={style}>Socials</MobileNavLink>
              <MobileNavLink href="/about" active={activeLink === '/about'} theme={theme} style={style}>About</MobileNavLink>

              {/* Mobile Theme Selector */}
              <div className="pt-4 border-t border-blue-800/50">
                <h4 className={`px-4 py-2 text-base font-semibold ${isNeon ? 'neon-glow' : style.text}`}>Select Theme</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => {
                        saveTheme(themeOption.id);
                        setIsMenuOpen(false);
                      }}
                      className={`
                        flex items-center justify-center px-3 py-2 rounded-lg text-sm
                        transition-all duration-200
                        ${theme === themeOption.id
                          ? (isNeon
                            ? 'bg-black/70 neon-glow font-bold'
                            : `bg-blue-600/50 ${style.dropdownActiveText} font-bold shadow`)
                          : `hover:bg-blue-700/40 ${style.dropdownText}`}
                        ${themeOption.id === 'neon' && theme === 'neon' ? 'neon-glow' : ''}
                      `}
                    >
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// Desktop NavLink
function NavLink({ href, active, children, theme, style }) {
  return (
    <Link
      href={href}
      className={`
        relative px-3 py-2 text-lg font-medium transition-all duration-300 group rounded-lg
        ${active ? style.active : style.link}
        ${theme === 'neon' ? 'neon-glow' : ''}
        hover:scale-105
      `}
    >
      {children}
      <span className={`
        absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-500
        ${active ? `w-full ${style.underline}` : 'w-0 group-hover:w-full bg-white'}
      `}></span>
    </Link>
  );
}

// Mobile NavLink
function MobileNavLink({ href, active, children, theme, style }) {
  return (
    <Link
      href={href}
      className={`
        block px-4 py-3 text-lg rounded-lg transition-all duration-300
        ${active ? style.mobileActive : style.mobileLink}
        ${theme === 'neon' ? 'neon-glow' : ''}
        hover:scale-105
      `}
    >
      <span className="flex items-center">
        <span className={`
          mr-2 h-2 w-2 rounded-full transition-all duration-300
          ${active ? 'bg-white' : 'bg-white/30'}
        `}></span>
        {children}
      </span>
    </Link>
  );
}
