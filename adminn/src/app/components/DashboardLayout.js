'use client'
import { motion } from 'framer-motion'

export default function DashboardLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gray-50"
    >
      <div className="flex flex-col flex-1">
        {children}
      </div>
    </motion.div>
  )
}