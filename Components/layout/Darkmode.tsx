"use client"
import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdComputer } from 'react-icons/md';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const Darkmode: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<string | null>(null);

  const toggleDarkMode = (mode: 'dark' | 'light' | 'system') => {
    if (mode === 'system') {
      Cookies.remove('dark-mode');
      const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDarkMode ? 'dark' : 'light');
    } else {
      setIsDarkMode(mode);
      Cookies.set('dark-mode', mode, { expires: 365 });
    }
  };

  useEffect(() => {
    const cookieDarkMode = Cookies.get('dark-mode');

    if (cookieDarkMode === undefined) {
      setIsDarkMode('system');
      const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDarkMode) {
        toggleDarkMode('dark');
      } else {
        toggleDarkMode('light');
      }
    } else {
      setIsDarkMode(cookieDarkMode);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode !== null) {
      if (isDarkMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    const updateDarkMode = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches ? 'dark' : 'light');
    };

    const systemDarkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemDarkModeQuery.addEventListener('change', updateDarkMode);

    return () => {
      systemDarkModeQuery.removeEventListener('change', updateDarkMode);
    };
  }, []);

  return (
    <>
      <div className='flex items-center text-white right-0 p-1 gap-2'>
        <motion.div whileHover={{ scale: 1.1 }}>
          {isDarkMode === 'dark' ? (
            <motion.button
              onClick={() => toggleDarkMode('light')}
              className={`rounded-full p-2 bg-purple-500/70`}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiSun size={20} />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => toggleDarkMode('dark')}
              className={`rounded-full p-2 bg-purple-500/70`}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiMoon size={20} />
            </motion.button>
          )}
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <motion.button
            onClick={() => toggleDarkMode('system')}
            className={`rounded-full p-2 bg-purple-500/70`}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MdComputer size={20} />
          </motion.button>
        </motion.div>
      </div>

      {/* <div>
        <h1>Dark Mode State: {darkMode}</h1>
      </div> */}
    </>
  );
};

export default Darkmode;