import { H1 } from '@/Components/Motion/Motion';
import React from 'react';
import Search from '@/Components/Searchbox/Search';
import Pagination from '@/Components/layout/Pagination';
import BlogCards from '@/Components/BlogCard';
import { getFilterBlog } from '@/controllers/blog';

export default async function Filterblogs(context: any) {
  const category = context.params.category;
  const pageno = parseInt(context?.searchParams.page);

  const blogs = await getFilterBlog(category, pageno);

  return (
    <section className="px-4 lg:px-8 max-w-[1500px] mx-auto mb-5 ">
      <div className="relative my-5 md:mt-16">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute md:-top-16 lg:-top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
        >
          Filter
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white"
        >
          {decodeURIComponent(category)} Blogs
        </H1>
      </div>
      <Search />

      <div className="min-h-[90vh]">
        {blogs.data.length > 0 ? (
          <BlogCards data={blogs.data} />
        ) : (
          <h5 className="capitalize font-semibold text-lg w-full text-center ">
            No Blogs avaliable for :{' '}
            <span className="text-orange-500">
              {decodeURIComponent(category)}
            </span>
          </h5>
        )}
      </div>
      <Pagination pagedata={blogs.meta} />
    </section>
  );
}
