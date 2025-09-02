'use client';
import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdComputer } from 'react-icons/md';
import { motion } from 'framer-motion';

const Darkmode: React.FC = () => {
  const [modeDisplay, setModeDisplay] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('dark-mode');
      if (storedMode === 'light' || storedMode === 'dark') {
        setModeDisplay(storedMode);
        return storedMode;
      } else {
        setModeDisplay('system');
        const systemDarkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemDarkMode ? 'dark' : 'light';
      }
    } else {
      return 'system'; // Fallback for non-browser environments
    }
  });

  const toggleDarkMode = (mode: 'dark' | 'light' | 'system') => {
    if (typeof window !== 'undefined') {
      if (mode === 'system') {
        setModeDisplay('system');
        localStorage.removeItem('dark-mode');
        const systemDarkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemDarkMode ? 'dark' : 'light');
      } else {
        setModeDisplay(mode);
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
      const systemDarkModeQuery = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
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
      <div className="flex items-center text-black dark:text-white right-0 p-1 gap-2">
        <motion.button
          whileHover={{ opacity: 0.8, rotate: 30, scale: 1.1 }}
          onClick={() => toggleDarkMode('light')}
          className={` ${modeDisplay === 'light' && ' bg-slate-300'} rounded-full p-2 `}
          whileTap={{ scale: 0.9, rotate: 30 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FiSun size={20} />
        </motion.button>
        <motion.button
          whileHover={{ opacity: 0.8, rotate: 30, scale: 1.1 }}
          onClick={() => toggleDarkMode('dark')}
          className={` ${modeDisplay === 'dark' && ' dark:bg-slate-700'} rounded-full p-2`}
          whileTap={{ scale: 0.9, rotate: 30 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FiMoon size={20} />
        </motion.button>

        <motion.button
          whileHover={{ opacity: 0.8, scale: 1.1 }}
          onClick={() => toggleDarkMode('system')}
          className={` ${modeDisplay === 'system' && ' bg-slate-300 dark:bg-slate-700 '} rounded-full p-2 `}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <MdComputer size={20} />
        </motion.button>
      </div>
    </>
  );
};

export default Darkmode;
