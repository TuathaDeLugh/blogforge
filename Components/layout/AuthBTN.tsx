"use client";
import Link from 'next/link';
import { AiOutlineUser, AiOutlineLogin, AiOutlineUserAdd, AiOutlineHome, AiOutlineStar, AiOutlineTool, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const AuthLinks = () => {
  const { data: session } = useSession();
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
    { name: 'Login', path: '/login', icon: AiOutlineLogin, key: 1 },
    { name: 'Register', path: '/register', icon: AiOutlineUserAdd, key: 2 },
  ];

  if (session?.user && session.user.dbid) {
    if (session.user.isVerified) {
      dropdata = [
        { name: 'Profile', path: '/user', icon: AiOutlineUser, key: 1 },
        { name: 'My Blog', path: '/user/blog/tab', icon: AiOutlineHome, key: 2 },
        { name: 'Saved Blog', path: '/user/savedblog', icon: AiOutlineStar, key: 3 },
      ];

      if (session?.user?.isAdmin) {
        dropdata = [
          { name: 'Admin Panel', path: '/admin', icon: AiOutlineTool, key: 1 },
          { name: 'Profile', path: '/user', icon: AiOutlineUser, key: 2 },
          { name: 'My Blog', path: '/user/blog/tab', icon: AiOutlineHome, key: 3 },
          { name: 'Saved Blog', path: '/user/savedblog', icon: AiOutlineStar, key: 4 },
        ];
      }
    } else {
      dropdata = [
        { name: 'Verify Email', path: '/verifyemail/request', icon: AiOutlineCheckCircle, key: 1 }
      ];
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setOpen(!open)}
        className="border border-gray-300 dark:border-gray-500 rounded-full m-1 p-[1px]"
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {
          session?.user?.avatar ? (
            <Image src={session.user?.avatar} width={25} height={25} alt='avatar' className='rounded-full' />
          ) : (
            <AiOutlineUser size={25} />
          )
        }
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute right-0 mt-6 list-none m-1 border dark:border-slate-700 w-max md:w-44 rounded bg-white/70 dark:bg-slate-900/70 backdrop-blur"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {session?.user.dbid && (
              <li
                key={0}
                className="text-slate-800 dark:text-slate-300 border-b dark:border-slate-600 py-3 text-center"
              >
                {session.user?.username}
              </li>
            )}
            {dropdata.map((link) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                key={link.key}
                className="rounded-lg text-slate-800 dark:text-slate-300 p-1 m-2  hover:bg-orange-400/90  hover:text-slate-50 md:dark:hover:text-slate-200"
              >
                <Link onClick={() => setOpen(!open)} href={link.path} className="inline-block px-1 w-full">
                  <link.icon className="inline-block mr-2" /> {link.name}
                </Link>
              </motion.li>
            ))}
            {session?.user && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="rounded-lg text-red-400 border border-red-400 p-1 m-2 text-center hover:bg-red-400 hover:text-slate-50 md:dark:hover:text-slate-200"
              >
                <button onClick={() => signOut({ callbackUrl: '/' })}>
                  <FaSignOutAlt className="inline-block mr-2" /> Log Out
                </button>
              </motion.li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLinks;
