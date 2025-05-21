'use client'
import { useUser } from "@auth0/nextjs-auth0/client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const MotionLink = motion(Link)

export default function Navbar() {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="flex items-center"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                  <span className="text-white font-bold">IEEE</span>
                </div>
                <span className="font-bold text-gray-800">CUSB Admin</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/dashboard">Executives</NavLink>
            <NavLink href="/settings">Settings</NavLink>
            <NavLink href="/dashboard/members">Members</NavLink>
            {user && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/api/auth/logout"
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium"
              >
                Logout
              </motion.a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
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
          className="md:hidden bg-white"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/executives">Executives</NavLink>
            <NavLink href="/settings">Settings</NavLink>
            <NavLink href="/dashboard/members">Members</NavLink>
            {user && (
              <Link
                href="/api/auth/logout"
                className="block px-3 py-2 text-base font-medium text-red-600 hover:text-red-800"
              >
                Logout
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children }) {
  return (
    <MotionLink
      href={href}
      whileHover={{ scale: 1.05 }}
      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
    >
      {children}
    </MotionLink>
  )
}

function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      {children}
    </Link>
  )
}
