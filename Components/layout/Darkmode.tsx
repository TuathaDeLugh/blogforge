"use client"
import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdComputer } from 'react-icons/md';
import { motion } from 'framer-motion';

const Darkmode: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('dark-mode');
      if (storedMode === 'light' || storedMode === 'dark') {
        return storedMode;
      } else {
        const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemDarkMode ? 'dark' : 'light';
      }
    } else {
      return 'system'; // Fallback for non-browser environments
    }
  });

  const toggleDarkMode = (mode: 'dark' | 'light' | 'system') => {
    if (typeof window !== 'undefined') {
      if (mode === 'system') {
        localStorage.removeItem('dark-mode');
        const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemDarkMode ? 'dark' : 'light');
      } else {
        setIsDarkMode(mode);
        localStorage.setItem('dark-mode', mode);
      }
    }
  };

  useEffect(() => {
    const updateDarkMode = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches ? 'dark' : 'light');
    };

    if (typeof window !== 'undefined') {
      const systemDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      systemDarkModeQuery.addEventListener('change', updateDarkMode);

      return () => {
        systemDarkModeQuery.removeEventListener('change', updateDarkMode);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  return (
    <>
      <div className='flex items-center text-white right-0 p-1 gap-2'>
        <motion.div whileHover={{ opacity: 0.8, rotate: 30, scale: 1.1 }}>
          {isDarkMode === 'dark' ? (
            <motion.button
              onClick={() => toggleDarkMode('light')}
              className={`rounded-full p-2 bg-orange-400 border dark:border-slate-400`}
              whileTap={{ scale: 0.9, rotate: 30 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiSun size={20} />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => toggleDarkMode('dark')}
              className={`rounded-full p-2 bg-slate-700`}
              whileTap={{ scale: 0.9, rotate: 30 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiMoon size={20} />
            </motion.button>
          )}
        </motion.div>

        <motion.div whileHover={{ opacity: 0.8, scale: 1.1 }}>
          <motion.button
            onClick={() => toggleDarkMode('system')}
            className={`rounded-full p-2 bg-sky-400`}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MdComputer size={20} />
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default Darkmode;
