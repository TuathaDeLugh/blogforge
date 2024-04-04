import { Div, H1 } from '@/Components/Motion/Motion'
import React from 'react'

function verifyEmail() {
  return (
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center">
      <Div
        className="h-full flex items-center relative max-w-2xl md:mx-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]"
        >
          <div className="relative mt-5 md:mt-10 mb-10">
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
              Verify Email
            </H1>
          </div>




          
          <div className="md:w-[450px] text-center">
            Click the button  below to verifiy your email.
          </div>
          <div className="md:w-[450px] mt-6 text-center flex items-center justify-center">
            <button className="text-white bg-orange-600/80 w-1/3 hover:opacity-60 font-semibold rounded-md text-sm px-4 py-3 flex gap-2 items-center justify-center"> Verify Email </button>
          </div>
          <div className="md:w-[450px] mt-6 text-center text-sm">
           After Verifecation  you will be redirected to login page and <br/> can start using our services!
          </div>
        </div>
        <Div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block"></Div>
      </Div>
    </div>
  )
}

export default verifyEmail