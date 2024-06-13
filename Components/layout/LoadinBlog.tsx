import React from 'react';

export default function LoadingBlogs() {
    const blogs = Array(12).fill(null);

    return (
        <section className="px-4 lg:px-8 max-w-[1500px] mx-auto mb-5">
            <div className="relative my-5 md:mt-16 animate-pulse duration-300">
                <h1 className="absolute -top-16 -z-10 px-32 py-10 left-0 text-[80px] lg:text-[100px] bg-gray-900 font-bold dark:bg-gray-200 rounded-full opacity-5 md:block hidden">
                </h1>
                <h1 className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
                    <span className="block w-[60%] py-7 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                </h1>
            </div>
            <div className="my-5 flex  items-center justify-center gap-3 animate-pulse duration-300 delay-200">
                <div className=" bg-gray-300/50 dark:bg-slate-700/50 rounded-lg w-full md:w-[30rem] flex shadow dark:shadow-slate-700 backdrop-blur-md ">
                    <div className=" p-5 md:p-7  inline-block relative w-4/5">
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-pulse duration-300 delay-500">
                {blogs.map((_, index: number) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
                    >
                        <div className="block">
                            <div className="relative">
                                <div className="w-full h-48 bg-slate-200 dark:bg-slate-600 object-cover"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2 bg-slate-200 dark:bg-slate-700 rounded-full h-8 w-3/4"></h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 bg-slate-200 dark:bg-slate-700 rounded-full h-4 w-full"></p>
                                <div className="flex items-center">
                                    <div className="rounded-full border-2 border-gray-300 dark:border-gray-600 bg-slate-200 dark:bg-slate-600 w-10 h-10"></div>
                                    <div className="ml-3">
                                        <p className="text-gray-700 dark:text-gray-400 bg-slate-200 dark:bg-slate-700 rounded-full h-4 w-24"></p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 bg-slate-200 dark:bg-slate-700 rounded-full h-4 w-32 mt-2"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
