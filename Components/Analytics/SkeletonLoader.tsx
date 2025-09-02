import React from 'react';

// Individual skeleton components
export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div
    className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border dark:border-slate-500 animate-pulse ${className}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      </div>
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);

export const SkeletonTable = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-4"></div>
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
        >
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="text-right">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-12 mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonCategoryGrid = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-4"></div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg text-center"
        >
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto mb-1"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-14 mx-auto mb-1"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonPerformanceCard = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-4"></div>
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonTopBlogCard = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-4"></div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto mb-1"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-10 mx-auto"></div>
        </div>
        <div className="text-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto mb-1"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-10 mx-auto"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
    </div>
  </div>
);

export const SkeletonBlogTable = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-4"></div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-700">
            {[...Array(7)].map((_, i) => (
              <th key={i} className="py-3 px-4 border-b dark:border-slate-600">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr
              key={i}
              className="odd:bg-transparent even:bg-slate-50 dark:even:bg-slate-700/50"
            >
              <td className="py-3 px-4 border-b dark:border-slate-600">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
              </td>
              {[...Array(6)].map((_, j) => (
                <td
                  key={j}
                  className="py-3 px-4 border-b dark:border-slate-600 text-center"
                >
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Main skeleton loaders for different pages
export const AdminAnalyticsSkeleton = () => (
  <section className="md:my-6 space-y-8">
    {/* Header Skeleton */}
    <div className="md:relative -z-10">
      <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-80 animate-pulse"></div>
    </div>

    {/* Period Selector Skeleton */}
    <div className="flex gap-2 mb-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"
        ></div>
      ))}
    </div>

    {/* Overview Stats Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    {/* Engagement Metrics Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    {/* Top Performing Content Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SkeletonTable />
      <SkeletonTable />
    </div>

    {/* Category Performance Skeleton */}
    <SkeletonCategoryGrid />
  </section>
);

export const WriterAnalyticsSkeleton = () => (
  <section className="md:my-6 space-y-8 max-w-7xl mx-auto px-4">
    {/* Header Skeleton */}
    <div className="md:relative -z-10">
      <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-96 animate-pulse"></div>
    </div>

    {/* Overview Stats Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    {/* Performance Insights Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SkeletonPerformanceCard />
      <SkeletonTopBlogCard />
    </div>

    {/* Blog Performance Table Skeleton */}
    <SkeletonBlogTable />
  </section>
);
