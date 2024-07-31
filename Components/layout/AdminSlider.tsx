'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiMessageSquare, FiX } from 'react-icons/fi';
import { FaHome, FaUsers, FaCog, FaChartBar, FaQuoteLeft } from 'react-icons/fa';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactElement;
}

export default function AdminNav({
  children
}: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);

  const toggleNav = (): void => setIsNavOpen(!isNavOpen);

  // Set the initial state based on the screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsNavOpen(true);
      } else {
        setIsNavOpen(false);
      }
    };

    handleResize(); // Check screen size on initial load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: <FaHome /> },
    { name: 'Users', href: '/admin/users', icon: <FaUsers /> },
    { name: 'Blogs', href: '/admin/blogs', icon: <FaChartBar /> },
    { name: 'FaQ', href: '/admin/faq', icon: <FaQuoteLeft /> },
    { name: "Contact", href: "/admin/contact", icon: <FiMessageSquare /> },
    { name: 'Settings', href: '/admin/settings', icon: <FaCog /> },
  ];

  const handleLinkClick = (): void => {
    if (window.innerWidth < 1024) {
      setIsNavOpen(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <motion.nav
        initial={{ x: 0 }}
        animate={{ x: isNavOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed z-20 lg:z-10 bottom-0 left-0 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] w-56 p-2 lg:translate-x-0 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full bg-white/80 dark:bg-slate-800/80 dark:border-slate-600 shadow dark:shadow-slate-500/50 backdrop-blur-sm border rounded-xl p-4">
          <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-400 text-transparent bg-clip-text">Admin Panel</div>
          <ul className="space-y-4 flex-grow">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.href} className="flex items-center px-3 py-2 rounded-lg group transition-colors duration-200 hover:bg-orange-400/90 dark:hover:bg-orange-500/50 hover:text-white" onClick={handleLinkClick}>
                  <span className="mr-3 text-orange-500 group-hover:text-white">{item.icon}</span>
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Toggle button at the bottom */}
          <button
            onClick={toggleNav}
            className="mt-auto p-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
      </motion.nav>
      
      {/* Main content with smooth padding transition */}
      <section className={`duration-300 ease-in-out mx-auto ${isNavOpen ? 'lg:pl-52' : 'pl-0'}`}>
        <div className="px-4 lg:px-8 py-5 mx-auto">
          {children}
        </div>
      </section>

      {/* Collapsed nav button for closed state */}
      {!isNavOpen && (
        <button
          onClick={toggleNav}
          className="fixed bottom-4 left-4 z-20 lg:z-10 p-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          <FiMenu size={24} />
        </button>
      )}
    </>
  );
}
