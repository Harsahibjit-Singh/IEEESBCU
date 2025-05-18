'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-800 text-white py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">IEEE CUSB</h3>
            <p className="text-gray-300">
              The official student branch of IEEE at Chandigarh University.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/dashboard/events">Events</FooterLink>
              <FooterLink href="/dashboard/members">Members</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">Email: ieee@cumail.in</p>
            <p className="text-gray-300">Chandigarh University, Punjab</p>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={<Facebook size={20} />} />
              <SocialIcon href="#" icon={<Twitter size={20} />} />
              <SocialIcon href="#" icon={<Instagram size={20} />} />
              <SocialIcon href="#" icon={<Linkedin size={20} />} />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {currentYear} IEEE CUSB. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function SocialIcon({ href, icon }) {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-white"
    >
      <motion.span whileHover={{ y: -3 }}>
        {icon}
      </motion.span>
    </Link>
  )
}