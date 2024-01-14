'use client'
import { Div, H1 } from '@/Components/Motion/Motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center">
      <Div
        className="h-full flex items-center relative max-w-2xl mx-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
        className="mx-auto p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]"
        >
          <div className="relative mt-5 md:mt-10">
            <H1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
            >
              BlogForge
            </H1>
            <H1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pl-2 font-bold border-l-8 border-orange-400 text-5xl dark:text-white"
            >
              SIGN IN
            </H1>
          </div>



        
        <form >
          <div className="w-[75vw] md:w-[450px] my-8">
            <input
              type="text"
              placeholder="Email"
              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-orange-500"
            />
          </div>
          <div className="w-[75vw] md:w-[450px] my-8">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-orange-500"
            />
             <div
                      className={` absolute top-0  right-3 h-full flex items-center text-slate-400`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={22} />}
                    </div>
            </div>
          </div>
          <div className="md:w-[450px] mt-8 mb-2">
          <button
                                disabled ={disabled}
                                type="button"
                                className="text-white bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
                            >
                                Login 
                                {
                                    disabled ?
                                    <AiOutlineLoading3Quarters size={20} className='animate-spin'/>
                                    : null
                                }
                            </button>
          </div>
        </form>
        <div className="md:w-[450px] text-center">
            OR
        </div>
          <div className="md:w-[450px] mb-8 mt-2 ">
            <button
              type="button"
              className="text-white bg-slate-400 hover:bg-gray-600 font-semibold rounded-md text-sm px-4 py-3 w-full"
            >
                Login With Google
            </button>
          </div>
          <div className="md:w-[450px] mt-6 text-center">
            Don't have Account? <Link href={'/register'} className='text-orange-400 hover:text-orange-500'>Create one </Link> 
          </div>
        </div>
        <Div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
         className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block"></Div>
      </Div>
    </div>
  );
}
