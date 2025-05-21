'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeProvider';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
];

const achievements = [
  { number: "1st", title: "Place in IEEE India Council" },
  { number: "500+", title: "Active Members" },
  { number: "50+", title: "Events Organized" },
  { number: "10+", title: "Years of Excellence" }
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  // Theme styles
  const themeStyles = {
    dark: {
      bg: 'from-gray-900 to-gray-800',
      text: 'text-white',
      cardBg: 'bg-gray-800',
      cardBorder: 'border-gray-700',
    },
    light: {
      bg: 'bg-blue-50',
      text: 'text-black',
      cardBg: 'bg-blue-50',
      cardBorder: 'border-blue-100',
    },
    neon: {
      bg: 'from-purple-900 to-blue-800',
      text: 'text-white',
      cardBg: 'bg-black/80',
      cardBorder: 'border-[#39ff14]/40',
    },
    nature: {
      bg: 'from-green-900 to-teal-800',
      text: 'text-green-100',
      cardBg: 'bg-green-800/80',
      cardBorder: 'border-teal-500',
    },
    retro: {
      bg: 'from-amber-900 to-yellow-800',
      text: 'text-yellow-100',
      cardBg: 'bg-amber-800/80',
      cardBorder: 'border-amber-500',
    },
  };

  const style = themeStyles[theme] || themeStyles.dark;
  const isNeon = theme === 'neon';

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // For full-page background
  const bgMap = {
    dark: 'bg-gray-900',
    light: 'bg-blue-50',
    neon: 'bg-gradient-to-br from-purple-900 to-blue-800',
    nature: 'bg-gradient-to-br from-green-900 to-teal-800',
    retro: 'bg-gradient-to-br from-amber-900 to-yellow-800',
  };
  const pageBg = bgMap[theme] || bgMap.dark;

  return (
    <div className={`min-h-screen w-full ${pageBg}`}>
      <div className={`w-full max-w-7xl mx-auto px-4 py-8 ${style.text}`}>
        {/* Hero Carousel */}
        <div
          className={`relative overflow-hidden rounded-3xl shadow-2xl h-96 md:h-[32rem] ${isNeon ? 'border border-[#39ff14]/40' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence mode='wait'>
            <motion.img
              key={current}
              src={images[current]}
              alt={`Slide ${current + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>

          {/* Slide Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Overlay Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 flex flex-col justify-end p-8 md:p-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              IEEE <span className="text-blue-400">Chandigarh University</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl"
            >
              Pioneering innovation and excellence in technology since 2014
            </motion.p>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === idx ? 'bg-blue-500 scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12`}
        >
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${style.cardBg} ${style.cardBorder} border ${style.text}`}
            >
              <p className="text-4xl md:text-5xl font-bold">{item.number}</p>
              <p className="text-lg md:text-xl mt-2">{item.title}</p>
            </div>
          ))}
        </motion.div>

        {/* About IEEE Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mt-16 rounded-3xl shadow-2xl overflow-hidden ${style.cardBg} ${style.cardBorder} border ${style.text}`}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* IEEE Logo with Animation */}
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-full md:w-1/3 flex justify-center"
            >
              <img
                src="/image.png"
                alt="IEEE logo"
                className="h-32 md:h-48 object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                <span className={theme === 'light' ? 'text-blue-600' : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300'}>
                  IEEE Chandigarh University Student Branch
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  Established in 2014, our Student Branch has consistently pushed boundaries in technological innovation and professional development. Under the guidance of Dr. B Preistly Shan, Er. Sugandha Sharma, and Er. Rishabh Raj, we've become a beacon of excellence in the IEEE community.
                </p>
                <p className={`text-lg font-medium p-4 rounded-xl border-l-4 ${theme === 'light' ? 'bg-blue-100 border-blue-300' : 'bg-white/10 border-blue-300'}`}>
                  Our relentless efforts earned us the <span className={theme === 'light' ? 'font-bold text-blue-800' : 'font-bold text-blue-100'}>First Place at the IEEE India Council</span>, making us one of the most active branches worldwide under the Delhi Section.
                </p>
                <p className="text-lg">
                  We regularly organize technical sessions, expert talks, hackathons, and workshops to prepare students for the challenges of tomorrow's technological landscape.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {['Mission', 'Vision'].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 shadow-xl border ${style.cardBg} ${style.cardBorder} ${style.text}`}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-full mr-4 ${
                  theme === 'dark'
                    ? 'bg-blue-900'
                    : theme === 'light'
                    ? 'bg-blue-100'
                    : theme === 'nature'
                    ? 'bg-green-900'
                    : theme === 'retro'
                    ? 'bg-amber-900'
                    : 'bg-blue-900'
                }`}>
                  {item === 'Mission' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-bold">{item === 'Mission' ? 'Our Mission' : 'Our Vision'}</h3>
              </div>
              <p className="text-lg">
                {item === 'Mission'
                  ? 'To foster technological innovation and excellence for the benefit of humanity by advancing the theory and practice of electrical, electronics, communications, and computer engineering, as well as computer science and related areas.'
                  : 'To be essential to the global technical community and to technical professionals everywhere, and be universally recognized for the contributions of technology and of technical professionals in improving global conditions.'
                }
              </p>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block">
              <span className="relative z-10 px-4">Upcoming Events</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-200/60 z-0"></span>
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group ${style.cardBg} ${style.cardBorder} border ${style.text}`}>
                <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white text-blue-600 font-bold px-3 py-1 rounded-lg text-sm">
                    Coming Soon
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    June {15 + item}, 2023
                  </div>
                  <h3 className="text-xl font-bold mb-3">Tech Symposium {item}.0</h3>
                  <p className="mb-4">
                    Join us for an exciting day of technical talks, workshops, and networking with industry leaders.
                  </p>
                  <button className="text-blue-600 font-medium flex items-center group-hover:text-blue-800 transition-colors duration-300">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Motivational Join Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          {/* Remove blue glow in light mode */}
          {theme !== 'light' && (
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl opacity-20 blur-xl"></div>
          )}
          <div className={`relative rounded-3xl px-8 py-12 md:px-16 md:py-20 shadow-2xl overflow-hidden ${style.cardBg} ${style.cardBorder} border ${style.text}`}>
            {theme !== 'light' && (
              <>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-400/10 rounded-full"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-400/10 rounded-full"></div>
              </>
            )}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className={theme === 'light' ? 'text-blue-600' : 'text-cyan-300'}>Shape</span> the Future?
              </h2>
              <p className="text-xl mb-8">
                Join IEEE today and become part of a global community that's advancing technology for humanity. Gain access to exclusive resources, networking opportunities, and professional development that will accelerate your career.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://www.ieee.org/membership/join/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 text-lg
                    ${theme === 'light'
                      ? 'bg-black text-white hover:bg-gray-900'
                      : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                >
                  Join IEEE Now
                </a>
                <a
                  href="#"
                  className={`inline-block border-2 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 text-lg
                    ${theme === 'light'
                      ? 'border-black text-black hover:bg-black hover:text-white'
                      : 'border-white text-white hover:bg-white/10'}`}
                >
                  Contact Our Team
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className={`mt-20 pt-8 pb-12 border-t ${theme === 'light' ? 'border-blue-200' : 'border-gray-700'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img
                src="/image.png"
                alt="IEEE Logo"
                className="h-10 mr-4"
              />
              <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>Chandigarh University Student Branch</span>
            </div>
            <div className="flex space-x-6">
              {/* Social icons here */}
            </div>
          </div>
          <p className={theme === 'light' ? 'text-center text-gray-500 mt-8 text-sm' : 'text-center text-gray-400 mt-8 text-sm'}>
            © {new Date().getFullYear()} IEEE Chandigarh University Student Branch. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
