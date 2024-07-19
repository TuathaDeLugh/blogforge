import React from 'react'

export default function Aloading() {
  return (
  <div className='flex space-x-2 justify-center items-center h-screen animate-pulse'>
  	<span className='sr-only'>Loading...</span>
   	<div className='h-8 w-8 dark:bg-purple-400 bg-purple-600  rounded-full animate-bounce  [animation-delay:-0.3s]'></div>
 	<div className='h-8 w-8 dark:bg-purple-400 bg-purple-600 rounded-full animate-bounce  [animation-delay:-0.15s]'></div>
 	<div className='h-8 w-8 dark:bg-purple-400 bg-purple-600 rounded-full animate-bounce '></div>
 </div>
  )
}
