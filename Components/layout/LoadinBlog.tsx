import React from 'react';

export default function LoadingBlogs() {
  const blogs = Array(12).fill(null);
  const cat = Array(2).fill(null);
  return (
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
              <p className="my-3">
                {cat?.map((_, index: number) => (
                  <span
                    key={index}
                    className="inline-block h-7 text-sm  bg-slate-200 dark:bg-slate-700 rounded-full px-14 mr-2"
                  >
                    {cat}
                  </span>
                ))}
              </p>
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
  );
}
