"use client"
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

export default function TabLoader() {
    const [progress,setProgress] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setProgress((preProgress)=>
            preProgress >= 100 ? 0 : preProgress + 10)
        },1000)
        return()=>{
            clearInterval(interval);
        }
    },[])

    useEffect(() => {
      document.body.style.overflow = 'hidden';
  
      return () => {
        document.body.style.overflow = 'visible';
      };
    }, []);
  
    return (
        
    <>
    <div className="flex gap-4 mb-3">
        <p
          className={`py-2 px-4 focus:outline-none`}
        >
          All
        </p>
        <p
        
        className={`py-2 px-4 border-b-2 border-transparent focus:outline-none`}

        >
          Published
        </p>
        <p
        
        className={`py-2 px-4 border-b-2 border-transparent focus:outline-none`}
        >
          Archived
        </p>
        <p
        
        className={`py-2 px-4 border-b-2 border-transparent focus:outline-none`}

        >
          Draft
        </p>
      </div>
    <div className=' fixed top-0 left-0 bg-transparent h-[2px] w-full z-50'>
        <motion.div
          animate={{ width: `${progress}%`  
        }}
          initial={{ width: '0%' }}
          transition={{ duration: 1.3,stiffness: 100,
            damping: 30,}}
        
        className=' h-full bg-orange-600 dark:bg-orange-400 ' style={{width:`${progress}%`}}></motion.div>
    </div>
    <div className=' fixed top-0 bottom-0 left-0 right-0 flex space-x-6 justify-center items-center min-h-[93vh] md:min-h-[91vh] animate-pulse'>
   <div className="animate-bounce  [animation-delay:-0.3s]">

   <motion.div
    animate={{
      scale: [1 , 1.5, 1.5, 1],
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
    className='h-8 w-8 dark:bg-orange-400 bg-orange-600  rounded-md '> 
     </motion.div>
    </div>
	<div className=' animate-bounce  [animation-delay:-0.15s]'>
  <motion.div
    animate={{
      scale: [1 , 1.5, 1.5, 1],
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
    className='h-8 w-8 dark:bg-orange-400 bg-orange-600  rounded-md '> 
     </motion.div>
  </div>
	<div className=' animate-bounce '>
  <motion.div
    animate={{
      scale: [1 , 1.5, 1.5, 1],
      rotate: [0, 180, 0, 180],
      borderRadius: ["10%", "50%", "50%", "10%"]
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 0.5
      
    }}
    className='h-8 w-8 dark:bg-orange-400 bg-orange-600  rounded-md'> 
     </motion.div>
  </div>
</div>

    </>
  )
}