'use client'
import React from 'react'
import toast from 'react-hot-toast';

interface ToastInfoProps{
    message: React.ReactNode;
    duration?: number;
    ClassName?: string;
    name? : string;

}

export default function ToastInfo({message,duration,ClassName,name}:ToastInfoProps) {
    const time = duration || 6000
    const display = () =>{
        toast((t) => (
            <div className=' space-y-2'>  
                <div className='flex items-center justify-center text-4xl' >
                    🧐
                </div> 
              <div className='text-justify'>
              {message}
              </div>
              <div className='flex items-center justify-center'>
              <button className=' shadow rounded px-2 py-1 text-sm border text-white bg-red-500/70 ' onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </button>
              </div>
            </div>
          ),
            {
              duration: time,
              position: "top-center"
            }
          );
    }
  return (
    <button onClick={display} className={`${ClassName} ml-2 shadow rounded-full h-5 w-5 text-xs border`}>{name ? name : "i"}</button>
  )
}
