'use client'
import { motion } from 'framer-motion';
import React from 'react'

export function H1({children,className,initial,animate,transition}:{
    children: React.ReactNode| null,className:string| '',initial:{},animate:{},transition:{}
  }) 
  {
    return (
        <motion.h1
        initial={initial}
        animate={animate}
        transition={transition}
          className={className}
          >
          {children}
        </motion.h1>
    )
  }

  export function Div({children,className,initial,animate,transition}:{
    children ? : React.ReactNode| null,className:string| '',initial? :{} ,animate:{},transition:{}
  }) 
  {
    return (
        <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
          >
          {children}
        </motion.div>
    )
  }

  export function P({children,className,initial,animate,transition}:{
    children: React.ReactNode| null,className:string|'',initial:{},animate:{},transition:{}
  }) 
  {
    return (
        <motion.p
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
          >
          {children}
        </motion.p>
    )
  }