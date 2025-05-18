'use client'
import { motion } from "framer-motion";

export default function AuthButton() {
  return (
    <motion.a
      href="/api/auth/login?returnTo=/dashboard"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
    >
      Login / Sign Up
    </motion.a>
  );
}