import { Div, H1 } from '@/Components/Motion/Motion'
import Link from 'next/link'
import React from 'react'
import { IoAddSharp } from 'react-icons/io5'

export default function UserBloglayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (<>
  <section className="px-2 mx-auto max-w-[1500px]">
      <div className=" md:px-6 py-5 mx-auto">
        <div className="relative mt-5 md:mt-16 mx-2">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute md:-top-16 lg:-top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
          >
            User
          </H1>
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
            My Blogs
          </H1>
        </div>
        <Div className='flex gap-2 w-full mx-2'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Link href={"/user/blog/new"} className=" hover:text-orange-500/60 flex items-center mt-5 mb-2"> <IoAddSharp size={20} className="mr-1" /> New blog</Link>
        </Div>
    {children}
    </div>
    </section>
  </>
  )
}
