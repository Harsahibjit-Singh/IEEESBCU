'use client'
import { useUser } from "@auth0/nextjs-auth0/client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X, Moon, Sun, Settings, User, LogOut, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const MotionLink = motion(Link)

export default function Navbar() {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    setActiveLink(window.location.pathname)
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.add(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)
  }

  const themeStyles = {
    dark: {
      nav: 'bg-gray-900 border-gray-800',
      text: 'text-gray-100',
      link: 'text-gray-300 hover:text-blue-400',
      active: 'text-blue-300 font-medium',
      button: 'bg-gray-800 hover:bg-gray-700 text-white',
      mobileMenu: 'bg-gray-900',
      mobileLink: 'text-gray-300 hover:bg-gray-800',
      mobileActive: 'bg-gray-800 text-blue-300',
      dropdown: 'bg-gray-800 border-gray-700'
    },
    light: {
      nav: 'bg-white border-gray-200 shadow-md',
      text: 'text-gray-800',
      link: 'text-gray-600 hover:text-blue-600',
      active: 'text-blue-600 font-medium',
      button: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
      mobileMenu: 'bg-white',
      mobileLink: 'text-gray-600 hover:bg-gray-100',
      mobileActive: 'bg-gray-100 text-blue-600',
      dropdown: 'bg-white border-gray-200'
    }
  }

  const style = themeStyles[theme] || themeStyles.dark

  return (
    <>
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .nav-highlight {
          position: relative;
        }
        .nav-highlight:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-highlight:hover:after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-highlight.active:after {
          transform: scaleX(1);
        }
        .theme-toggle {
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          transform: rotate(30deg) scale(1.1);
        }
        .profile-dropdown {
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .profile-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed w-full z-50 border-b ${style.nav}`}
      >
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <div className="w-12 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                    <span className="text-white font-bold text-sm">IEEE</span>
                  </div>
                  <span className="font-bold text-xl gradient-text">CUSB Admin</span>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-9">
              <NavLink href="/dashboard" active={activeLink === '/dashboard'} style={style}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/members" active={activeLink === '/dashboard/members'} style={style}>
                Members
              </NavLink>
              <NavLink href="/dashboard/events" active={activeLink === '/dashboard/events'} style={style}>
                Events
              </NavLink>
              <NavLink href="/settings" active={activeLink === '/settings'} style={style}>
                Settings
              </NavLink>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${style.button} theme-toggle`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Profile Dropdown */}
              {user && (
                <div className="relative ml-2">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${style.button} transition-all duration-200`}
                  >
                    {user.picture ? (
                      <Image
                        src="/img.png"
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        {user.name?.charAt(0)}
                      </div>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${style.dropdown} border profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className={`text-sm font-medium ${style.text}`}>{user.name}</p>
                      <p className={`text-xs ${style.link}`}>{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className={`flex items-center px-4 py-2 text-sm ${style.link} hover:bg-gray-700/50 transition-colors`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className={`flex items-center px-4 py-2 text-sm ${style.link} hover:bg-gray-700/50 transition-colors`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <a
                      href="/api/auth/logout"
                      className={`flex items-center px-4 py-2 text-sm ${style.link} hover:bg-gray-700/50 transition-colors`}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${style.button}`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${style.button} focus:outline-none`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${style.mobileMenu} border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="/dashboard" active={activeLink === '/dashboard'} style={style}>
                Dashboard
              </MobileNavLink>
              <MobileNavLink href="/dashboard/members" active={activeLink === '/dashboard/members'} style={style}>
                Members
              </MobileNavLink>
              <MobileNavLink href="/dashboard/events" active={activeLink === '/dashboard/events'} style={style}>
                Events
              </MobileNavLink>
              <MobileNavLink href="/dashboard/settings" active={activeLink === '/dashboard/settings'} style={style}>
                Settings
              </MobileNavLink>
              {user && (
                <div className="pt-2 border-t border-gray-700">
                  <div className="px-4 py-2">
                    <p className={`text-sm font-medium ${style.text}`}>Logged in as</p>
                    <p className={`text-sm ${style.text}`}>{user.name}</p>
                  </div>
                  <a
                    href="/api/auth/logout"
                    className={`flex items-center px-4 py-2 text-sm ${style.mobileLink} rounded-md`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}

function NavLink({ href, active, children, style }) {
  return (
    <Link
      href={href}
      className={`nav-highlight ${active ? 'active' : ''} px-3 py-2 text-sm font-medium ${active ? style.active : style.link}`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children, style }) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${active ? style.mobileActive : style.mobileLink}`}
    >
      {children}
    </Link>
  )
}