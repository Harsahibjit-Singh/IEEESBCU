'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              IEEE CUSB
            </h3>
            <p className="text-gray-300 leading-relaxed">
              The official student branch of IEEE at Chandigarh University, fostering innovation and technical excellence.
            </p>
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-sm">Active Community</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Quick Links
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/dashboard/events">Events</FooterLink>
              <FooterLink href="/dashboard/members">Members</FooterLink>
              <FooterLink href="/dashboard/gallery">Gallery</FooterLink>
              <FooterLink href="/dashboard/achievements">Achievements</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Contact
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="mt-1 flex-shrink-0 text-blue-400" size={18} />
                <a 
                  href="mailto:ieee@cumail.in" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  ieee@cumail.in
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 flex-shrink-0 text-blue-400" size={18} />
                <p className="text-gray-300">
                  Chandigarh University,<br />
                  NH-95, Ludhiana Highway,<br />
                  Punjab 140413
                </p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Follow Us
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </h3>
            <div className="flex space-x-4 mb-6">
              <SocialIcon 
                href="#" 
                icon={<Facebook size={20} />}
                color="hover:text-blue-500"
                tooltip="Facebook"
              />
              <SocialIcon 
                href="#" 
                icon={<Twitter size={20} />}
                color="hover:text-sky-400"
                tooltip="Twitter"
              />
              <SocialIcon 
                href="#" 
                icon={<Instagram size={20} />}
                color="hover:text-pink-500"
                tooltip="Instagram"
              />
              <SocialIcon 
                href="#" 
                icon={<Linkedin size={20} />}
                color="hover:text-blue-400"
                tooltip="LinkedIn"
              />
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative px-4 py-2 bg-gray-800 rounded-lg leading-none flex items-center">
                <span className="text-sm font-medium text-white">
                  Join Our Community
                </span>
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-700 text-center"
        >
          <p className="text-gray-400">
            © {currentYear} IEEE CUSB. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/code-of-conduct" className="text-gray-400 hover:text-white text-sm transition-colors">
              Code of Conduct
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

function FooterLink({ href, children }) {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link 
        href={href}
        className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
        {children}
      </Link>
    </motion.li>
  )
}

function SocialIcon({ href, icon, color, tooltip }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative group"
    >
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {tooltip}
      </span>
      <Link 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-gray-300 ${color} transition-colors`}
      >
        {icon}
      </Link>
    </motion.div>
  )
}