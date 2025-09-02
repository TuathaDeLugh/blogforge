'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface proops {
  children?: React.ReactNode;
  className?: string;
  initial?: {};
  animate?: {};
  transition?: {};
  whileTap?: {};
  whileHover?: {};
  exit?: {};
  layout?: boolean;
}

export function H1({
  children,
  className,
  initial,
  animate,
  transition,
}: proops) {
  return (
    <motion.h1
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.h1>
  );
}

export function Div({
  children,
  className,
  initial,
  animate,
  transition,
  whileTap,
  whileHover,
  exit,
  layout,
}: proops) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      layout={layout}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function P({
  children,
  className,
  initial,
  animate,
  transition,
}: proops) {
  return (
    <motion.p
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function Animation({ children }: proops) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
