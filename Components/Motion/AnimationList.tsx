'use client'
import React from 'react'
import { motion } from 'framer-motion';

export default function AnimationList({data}:any) {
    const items = data;
    const variants = {
        initial : {
            opacity : 0,
            x:-20
        },
        animate : (index:number) =>( {
            opacity:1,
            x:0,
            transition:{
                delay: 0.1 * index,
                staggerDirection : -1
            }
        })
    }
  return (
    <ul className='flex gap-4 flex-wrap items-center justify-start p-2'>
        {
            items.map((item: any,index: number) => (

                <motion.li key={index}
                className=' w-full md:w-[30%] h-56 border rounded'
                variants={variants}
                initial='initial'
                whileInView='animate'
                viewport={{once:true, amount:0}}
                custom={index}
                >
                {item}
    </motion.li>
                )
                )
    }
    </ul>
  )
}
