'use client'
import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full flex items-center justify-center"
        >
          <span className="text-xs font-semibold text-blue-500">IEEE</span>
        </motion.div>
      </motion.div>
    </div>
  )
}