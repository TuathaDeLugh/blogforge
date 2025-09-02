import LoadingBlogs from '@/Components/layout/LoadinBlog';
import React from 'react';

export default function LoadingBlog() {
  return (
    <section className="px-4 lg:px-8 max-w-[1500px] mx-auto mb-5">
      <div className="relative my-5 md:mt-16 animate-pulse duration-300">
        <h1 className="absolute -top-16 -z-10 px-32 py-10 left-0 text-[80px] lg:text-[100px] bg-gray-900 font-bold dark:bg-gray-200 rounded-full opacity-5 md:block hidden"></h1>
        <h1 className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
          <span className="block w-[60%] py-7 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
        </h1>
      </div>
      <div className="my-5 flex  items-center justify-center gap-3 animate-pulse duration-300 delay-200">
        <div className=" bg-gray-300/50 dark:bg-slate-700/50 rounded-lg w-full md:w-[30rem] flex shadow dark:shadow-slate-700 backdrop-blur-md ">
          <div className=" p-5 md:p-7  inline-block relative w-4/5"></div>
        </div>
      </div>
      <LoadingBlogs />
    </section>
  );
}
