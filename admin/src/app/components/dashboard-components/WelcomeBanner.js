'use client'
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // You can use any icon you like

export default function WelcomeBanner({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 p-8 rounded-2xl shadow-2xl mt-25 text-white mb-10"
    >
      {/* Animated Glow */}
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1.1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 opacity-30 rounded-full blur-2xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1.1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.5, ease: "easeInOut" }}
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400 opacity-30 rounded-full blur-2xl pointer-events-none"
      />

      <div className="flex items-center gap-4 relative z-10">
        <div className="bg-white bg-opacity-20 p-3 rounded-full shadow-md">
          <Sparkles size={38} className="text-yellow-300 drop-shadow-lg animate-bounce" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
            Hi {user?.name || 'Admin'}, 
            <span className="text-yellow-200">welcome</span> to
            <br className="hidden md:block" />
            <span className="text-white">IEEE CUSB Dashboard</span>
          </h1>
          <p className="mt-3 text-lg md:text-xl opacity-90 font-medium">
            Manage events, members, and activities with ease.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
