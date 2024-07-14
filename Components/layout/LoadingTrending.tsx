import React from 'react'

export default function LoadingTrending() {
  return (
<div className="w-full max-w-[1500px] mx-auto lg:h-auto px-2">
    <div className="relative w-full h-[28rem] m-auto overflow-hidden rounded-lg bg-slate-800 lg:bg-transparent animate-pulse flex flex-col lg:flex-row">
      {/* Image section */}
      <div className="h-full md:max-h-[28rem] w-full md:w-1/2 absolute lg:relative lg:py-2 bg-gray-300 dark:bg-gray-700"></div>
      
      {/* Text section */}
      <div className="z-10 text-slate-200 lg:dark:text-slate-200 lg:text-slate-700 px-10 lg:p-4 mt-7 lg:mt-10 flex flex-col justify-between w-full lg:w-1/2">
        {/* Title */}
        <div className="relative mb-6">
          <div className="absolute -top-16 lg:-top-20 left-0 lg:text-[100px] text-gray-900 dark:text-gray-200 opacity-5 lg:block hidden h-12 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4"></div>
          <div className="pl-2 text-3xl font-bold border-l-8 border-orange-400 lg:text-5xl dark:text-white h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4"></div>
        </div>
        
        {/* Category */}
        <div className="my-3">
          <div className="text-sm bg-orange-200 dark:bg-orange-400/50 rounded-full px-2 py-1 mr-1 h-4 dark:bg-gray-700 w-1/4"></div>
        </div>
        
        {/* Info */}
        <div className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400 text-justify h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-5/6"></div>
        
        {/* Creator */}
        <div className="absolute bottom-16 flex items-center">
          <div className="rounded-full border-2 border-gray-300 dark:border-gray-600 h-10 w-10 bg-gray-300 dark:bg-gray-700"></div>
          <div className="ml-3 flex flex-col w-2/3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 rounded-full w-1/2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-full"></div>
          </div>
        </div>
        
        {/* View Article Button */}
        <div className="rounded p-1 text-sm absolute bottom-5 bg-gray-300 dark:bg-gray-700 w-24 h-8"></div>
      </div>
    </div>
  </div>
  )
}
