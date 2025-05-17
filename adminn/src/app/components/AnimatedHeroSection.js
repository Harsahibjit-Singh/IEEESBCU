'use client'
import { motion } from 'framer-motion'

export default function AnimatedHeroSection({ children }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex items-center justify-center min-h-screen"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-90"></div>
      <div className="relative z-20 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {children}
      </div>
    </motion.section>
  )
}