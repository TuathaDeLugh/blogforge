"use client"
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
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
    { name: 'Login', path: '/login', key: 1 },
    { name: 'Register', path: '/register', key: 2 },
  ];

  if (session?.user) {
    if (session.user.isVerified) {

      dropdata = [
        { name: 'Profile', path: '/user', key: 1 },
        { name: 'My blog', path: '/user/blog/tab', key: 2 },
        { name: 'Saved blog', path: '/user/savedblog', key: 3 },
      ];
      if (session?.user?.isAdmin) {
        dropdata = [
          { name: 'Admin Panal', path: '/admin', key: 1 },
          { name: 'Profile', path: '/user', key: 2 },
          { name: 'My blog', path: '/user/blog/tab', key: 3 },
          { name: 'Saved blog', path: '/user/savedblog', key: 4 },
        ];
      }
    }
    else {
      dropdata = [
        { name: 'Verify Email', path: '/verifyemail/request', key: 1 }
      ]
    }
  }



  return (
    <div className="relative" ref={dropdownRef} >
      <motion.button
        onClick={() => setOpen(!open)}
        className="border border-gray-300 dark:border-gray-500 rounded-full m-1 p-[1px]"
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {
          session?.user?.avatar ? (<Image src={session.user?.avatar} width={25} height={25} alt='avatar' className='rounded-full' />) :
            (<AiOutlineUser size={25} />)
        }
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className=" absolute right-0 mt-6 list-none m-1 border dark:border-slate-700 w-max md:w-40 rounded bg-white/70 dark:bg-slate-900/70 backdrop-blur "
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >   {
              session?.user ?

                <li
                  key={0}
                  className=" text-slate-800 dark:text-slate-300 border-b dark:border-slate-600 py-3 text-center"
                >
                  {session.user?.username}
                </li>
                : null}
            {dropdata.map((link) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                key={link.key}
                className=" rounded-lg text-slate-800 dark:text-slate-300 p-1 m-2 text-center md:text-left hover:bg-orange-400/90 hover:text-slate-50 md:dark:hover:text-slate-200"
              >
                <Link onClick={() => setOpen(!open)} href={link.path} className="inline-block px-1 w-full">
                  {link.name}
                </Link>

              </motion.li>
            ))}
            {session?.user ? (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className=" rounded-lg text-red-400 border border-red-400 p-1 m-2 text-center hover:bg-red-400   hover:text-slate-50 md:dark:hover:text-slate-200"
              >
                <motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.05}} onClick={() => signOut({ callbackUrl: '/' })}>Log Out</motion.button>
              </motion.li>
            ) : null}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLinks;
