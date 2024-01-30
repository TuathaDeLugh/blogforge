'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { FaFeatherAlt } from 'react-icons/fa';


export default function FeatureCard({content}:any) {
    const items = content;
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
    <>
    <div className="flex flex-wrap mx-4">

    {
        items.map((item: any,index: number) => (
            <motion.div
            variants={variants}
            initial='initial'
            whileInView='animate'
            viewport={{once:true, amount:0}}
            custom={index}
            className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3"
            >
        <div
          className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md border dark:border-slate-600 dark:shadow-gray-700/50 "
          >
          <div
            className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-900 left-1/2">
            <div
              className="inline-flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-full">
              <FaFeatherAlt size={25} />
            </div>
          </div>
          <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
            {item.heading}
          </h2>
          <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500 text-justify">
            {item.data}
          </p>
        </div>
      </motion.div>
        ))
    }
    </div>
    </>
  )
}