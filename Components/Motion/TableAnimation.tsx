'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimationTableProp {
  index: number;
  className: string;
  children: React.ReactNode;
}

export default function Tr({ index, className, children }: AnimationTableProp) {
  const variants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        delay: 0.1 * index,
        staggerDirection: -1,
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <motion.tr
      className={className}
      layout
      key={index}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      viewport={{ once: true, amount: 0 }}
      custom={index}
    >
      {children}
    </motion.tr>
  );
}
