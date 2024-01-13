"use client";
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AuthLinksProps = {};

const AuthLinks: React.FC<AuthLinksProps> = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  let dropdata = [
    { name: 'Login', path: '/login', key: 1 },
    { name: 'Register', path: '/register', key: 2 },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setOpen(!open)}
        className="border border-gray-300 dark:border-gray-500 rounded-full m-1 p-[1px]"
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <AiOutlineUser size={25} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className=" absolute right-0 mt-6 list-none m-1 border dark:border-slate-700 w-full md:w-40 rounded bg-white/90 dark:bg-slate-900/90"
            initial={{ opacity: 0, y: -20, }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {dropdata.map((link) => (
              <motion.li
                key={link.key}
                className="text-l rounded-lg text-slate-800 dark:text-slate-300 p-1 m-2 text-center md:text-left hover:bg-orange-400/90 hover:text-slate-50 md:dark:hover:text-slate-200"
                whileHover={{ scale: 1.05 }}
              >
                <Link onClick={() => setOpen(!open)} href={link.path} className="inline-block px-1 w-full">
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLinks;
