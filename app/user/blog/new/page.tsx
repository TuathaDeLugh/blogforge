import { H1 } from '@/Components/Motion/Motion'
import React from 'react'
import NewBlogForm from './NewBlogForm'

export default function NewBlog() {
  return (
    <>
    <section className='max-w-[1500px] mx-auto px-5 '>

    <div className="relative mt-5 md:mt-16 mx-2">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
            >
              Create
            </H1>
            <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              New Blog
            </H1>
          </div>
    <NewBlogForm/>
                </section>
    </>
  )
}
