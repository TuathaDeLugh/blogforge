'use client'
import React from 'react'
import { motion } from 'framer-motion';

interface Props{
    children: React.ReactNode| null;
    className?:string| '';
    index:number;
    style?: React.CSSProperties;

}

export default function AnimationData({children,className,index,style}:Props) {
    const variants = {
        initial : {
            opacity : 0,
            x:-20
        },
        animate : (index:number) =>( {
            opacity:1,
            x:0,
            transition:{
                delay: 0.1 * (index % 3 ),
                staggerDirection : -1,
                amount:0
            }
        })
    }
  return (

                <motion.div key={index}
                className={className}
                variants={variants}
                initial='initial'
                whileInView='animate'
                viewport={{once:true, amount:0}}
                custom={index}
                style={style}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                >
                {children}
    </motion.div>
  )
}



