'use client'
import { motion } from 'framer-motion';
import React from 'react'

export function Parent({children,className}:{


    children: React.ReactNode,className:string
  }) 
  {

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      };
  return (
    <motion.div className={className}
    variants={container}
    initial="hidden"
    animate="visible"
  >
   
        {children}
        </motion.div>
  )
}

export function Child({children,className}:{


    children: React.ReactNode,className:string
  }) 
  {

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
      
    return (<motion.div
        className={className}
        variants={cardVariants}
        >
            {children}
            </motion.div>)

  }
