import React from 'react';

export default function LoadingTrending() {
  return (
    <div className="w-full max-w-[1500px] mx-auto lg:h-auto px-2">
      <div className="relative w-full h-[28rem] m-auto overflow-hidden rounded-lg animate-pulse">
        <div className="absolute inset-0 lg:flex lg:gap-3">
          <div className="w-full h-full lg:w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="hidden lg:flex lg:flex-col lg:gap-3 lg:w-1/2 p-4">
            <div className="w-3/4 h-10 bg-gray-300 dark:bg-gray-700  mb-2 animate-pulse rounded-full"></div>
            <div className="w-1/3 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 animate-pulse"></div>
            <div className="w-full h-24 bg-gray-300 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="w-1/3 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
