'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';

interface FAQProps {
  faq: {
    _id: string;
    title: string;
    info: string;
  };
  index: number;
}

const OneFaQ: React.FC<FAQProps> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="p-4 mb-4 border border-gray-200 dark:border-gray-700/50 rounded-lg shadow-md cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${index % 2 ? 'text-orange-500 dark:orange-400' : ''} `}
        >
          {faq.title}
        </h3>
        <IoMdArrowDropdown
          className={`duration-300 ease-in-out ${isOpen ? ' rotate-180 ' : 'rotate-0'}  w-10 ${index % 2 ? 'text-orange-500 dark:orange-400' : ''} `}
          size={25}
        />
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-2"
      >
        <p className="text-gray-700 dark:text-gray-200">{faq.info}</p>
      </motion.div>
    </motion.div>
  );
};

export default OneFaQ;
