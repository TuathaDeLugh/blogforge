import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className='flex space-x-6 justify-center items-center min-h-[93vh] md:min-h-[91vh] animate-pulse'>
      <span className='sr-only'>Loading...</span>
      <div className="animate-bounce [animation-delay:-0.3s]">
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1],
            rotate: [0, 180, 0, 180],
            borderRadius: ["10%", "50%", "50%", "10%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: -0.3
          }}
          className='h-8 w-8 dark:bg-orange-400 bg-orange-600 rounded-md'>
        </motion.div>
      </div>
      <div className='animate-bounce [animation-delay:-0.15s]'>
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1],
            rotate: [0, 180, 0, 180],
            borderRadius: ["10%", "50%", "50%", "10%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: -0.15
          }}
          className='h-8 w-8 dark:bg-orange-400 bg-orange-600 rounded-md'>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;