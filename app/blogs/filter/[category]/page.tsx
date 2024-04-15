import { H1 } from '@/Components/Motion/Motion';
import LoadingBlogs from '@/Components/layout/LoadinBlog';
import React, { Suspense } from 'react'
import Search from '@/Components/Search';
import Allblogs from '../../Allblogs';
import FatchBlogCat from './FatchBlogCat';

export default function Filterblogs( context : any) {


    return (
          <section className='px-3 md:px-5 max-w-[1500px] mx-auto mb-5 '>
             <div className="relative my-5 md:mt-16">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.3 }}
              className="absolute -top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
              >
              Filter
            </H1>
            <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3}} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              {context.params.category.split('_').join(' ')} Blogs
            </H1>
          </div>
          <Search/>

          
          <Suspense fallback={<LoadingBlogs/>}>
          <FatchBlogCat context={context}/>
            </Suspense>

          </section>
    )
}
