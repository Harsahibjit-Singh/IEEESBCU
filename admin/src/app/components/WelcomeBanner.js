'use client'
import { motion } from "framer-motion";

export default function WelcomeBanner({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg text-white mb-8"
    >
      <h1 className="text-3xl font-bold">
        Hi {user?.name || 'Admin'}, welcome to IEEE CUSB Dashboard
      </h1>
      <p className="mt-2 opacity-90">
        Manage events, members, and activities with ease
      </p>
    </motion.div>
  );
}