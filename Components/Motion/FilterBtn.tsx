"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const FilterDropDown = () => {
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

  let ddata: string[] = [
    'Lifestyle',
    'Personal_Development',
    'Technology',
    'Business_and_Finance',
    'Science_and_Nature',
    'Entertainment',
    'Books_and_Literature',
    'Education',
    'Parenting',
    'Travel',
    'Sports_and_Fitness',
    'Home_Improvement',
    'Food_and_Cooking',
    'Social_Issues',
    'Technology_and_Gaming'
  ];

  return (
    <div className="relative w-1/5 p-3 md:p-4 " ref={dropdownRef}>
        <div
        className="border-l w-full border-black dark:border-gray-500 ">
      <motion.button className='w-full'
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 100 }}
      onClick={() => setOpen(!open)}
      >Filter</motion.button>
      </div>
      <AnimatePresence>

      
      {open ? (
        <motion.ul
        className=" bg-gray-300/70 dark:bg-slate-700/70 backdrop-blur mt-6 absolute right-0 list-none m-1 border overflow-y-auto max-h-60 md:max-h-96 dark:border-slate-700 w-max  rounded "
        initial={{ opacity: 0, y: -20 , x:20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
          <motion.li
            key={"all"}
            whileHover={{ scale: 1.05 }}
            className="text-l rounded-lg text-slate-800 dark:text-slate-300 p-1 m-2 text-left hover:bg-orange-400/90 hover:text-white md:dark:hover:text-slate-200"
          >
            <Link
              onClick={() => setOpen(!open)}
              href={`/blogs`}
              className="inline-block px-1 w-full"
            >
              {"All"}
            </Link>
          </motion.li>
          {ddata.map((link) => (
            <motion.li
              key={link}
              whileHover={{ scale: 1.05 }}
              className="text-l rounded-lg text-slate-800 dark:text-slate-300 p-1 m-2 text-left hover:bg-orange-400/90 hover:text-white md:dark:hover:text-slate-200"
            >
              <Link
                onClick={() => setOpen(!open)}
                href={`/blogs/filter/${encodeURIComponent(link)}`}
                className="inline-block px-1 w-full capitalize"
              >
                {link.split('_').join(' ')}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : null}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropDown;