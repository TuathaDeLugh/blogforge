import { H1 } from '@/Components/Motion/Motion'
import React from 'react'
import NewBlogForm from './NewBlogForm'
import Goback from '@/Components/layout/GoBack'

export default function NewBlog() {
  return (
    <>
    <section className='max-w-[1500px] mx-auto px-3 '>

    <div className="flex items-end my-5 md:mt-16">

              <Goback/>
             <div className="relative ">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
            >
              Create
            </H1>
            <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3}} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              New Blog
            </H1>
          </div>
              </div>
    <NewBlogForm/>
                </section>
    </>
  )
}
