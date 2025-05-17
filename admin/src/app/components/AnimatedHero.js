// components/AnimatedHero.js
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedHero({ children }) {
  return (
    <section className="w-full flex flex-col items-center py-20">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-indigo-700 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        IEEE Chandigarh University Student Branch
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-gray-700 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Admin Portal – Modern, Secure, Powerful
      </motion.p>
      {children}
    </section>
  );
}
