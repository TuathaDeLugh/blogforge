import { H1 } from '@/Components/Motion/Motion';
import React from 'react'
import Search from '@/Components/Searchbox/Search';
import Pagination from '@/Components/layout/Pagination';
import getAllBlog from '@/controllers/allblog';
import BlogCards from '@/Components/BlogCard';


export default async function Blogs( context : any) {
  const pageno = parseInt(context?.searchParams.page)
    
  const blogs = await getAllBlog(pageno);
  
    return (
          <section className='px-4 lg:px-8 max-w-[1500px] mx-auto mb-5 '>
             <div className="relative my-5 md:mt-16">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.3 }}
              className="absolute md:-top-16 lg:-top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
              >
              Blogs
            </H1>
            <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3}} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              All Blogs
            </H1>
          </div>
          <Search/>

          <div className="min-h-[90vh]">
          <BlogCards data={blogs.data}/>
      </div> 
            <Pagination pagedata={blogs.meta}/>
          </section>
    )
}
  