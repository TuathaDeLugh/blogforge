'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode | null;
  className?: string | '';
  index: number;
  style?: React.CSSProperties;
  whileTap?: {};
  whileHover?: {};
}

export default function AnimationData({
  children,
  className,
  index,
  style,
  whileTap,
  whileHover,
}: Props) {
  const variants = {
    initial: {
      opacity: 0,
      x: -20,
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * (index % 3),
        staggerDirection: -1,
        amount: 0,
      },
    }),
    exit: {
      opacity: 0,
      x: -20,
    },
  };
  return (
    <motion.div
      key={index}
      className={className}
      variants={variants}
      initial="initial"
      whileInView="animate"
      exit="exit"
      layout
      viewport={{ once: true, amount: 0 }}
      whileHover={whileHover}
      whileTap={whileTap}
      custom={index}
      style={style}
    >
      {children}
    </motion.div>
  );
}
