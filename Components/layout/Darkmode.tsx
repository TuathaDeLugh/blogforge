"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdComputer } from 'react-icons/md';
import { setDarkMode, selectDarkMode } from '@/Redux/darkModeSlice';
import { motion } from 'framer-motion';

const Darkmode: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkMode === 'system') {
      toggleDarkMode(systemDarkMode ? 'dark' : 'light');
    }

    document.documentElement.classList.toggle('dark', darkMode === 'dark');
  }, [darkMode]);

  const toggleDarkMode = (mode: 'dark' | 'light' | 'system') => {
    console.log('Toggling Dark Mode to:', mode);
    dispatch(setDarkMode(mode));
    localStorage.setItem('dark-mode', mode || '');
  };

  return (
    <>
      <div className='flex items-center text-white right-0 p-1 gap-2'>
        <motion.div whileHover={{ scale: 1.1 }}>
          {darkMode === 'dark' ? (
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