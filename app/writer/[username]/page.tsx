import Pagination from '@/Components/layout/Pagination';
import getSingleWriter from '@/controllers/singlewriter';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export default async function OneWriter(context : any) {
  const username =  context?.params.username;
  const pageno = parseInt(context?.searchParams.page);
  
  const writer = await getSingleWriter(username,pageno);

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center">
      <div className="flex flex-col items-center">
        <img src={writer.user.avatar} alt={writer.user.name} className="w-32 h-32 rounded-full object-cover mb-4" />
        <h1 className="text-3xl font-bold text-orange-500 dark:text-orange-400">{writer.user.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">@{writer.user.username}</p>
        <p className="text-gray-600 dark:text-gray-400">{writer.user.email}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow hover">
          <h3 className="text-lg font-semibold dark:text-gray-300">Total Blogs</h3>
          <p className="text-gray-800 dark:text-gray-400">{writer.stats.totalblogs}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow ">
          <h3 className="text-lg font-semibold dark:text-gray-300">Joined</h3>
          <p className="text-gray-800 dark:text-gray-400">{writer.user.createdAt}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow ">
          <h3 className="text-lg font-semibold dark:text-gray-300">Shares & Saves</h3>
          <p className="text-gray-800 dark:text-gray-400">Saves: {writer.stats.totalSaves}, Shares: {writer.stats.totalShares}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow ">
        <h3 className="text-xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Most Shared</h3>
        <Link href={`/blogs/${writer.blogs.mostShared._id}`} className="block">
          <img src={writer.blogs.mostShared.images[0].link} alt={writer.blogs.mostShared.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h4 className="text-lg font-bold text-orange-500 dark:text-orange-400">{writer.blogs.mostShared.title}</h4>
          <p className="text-gray-600 dark:text-gray-400">{writer.blogs.mostShared.info}</p>
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow ">
        <h3 className="text-xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Most Saved</h3>
        <Link href={`/blogs/${writer.blogs.mostSaved._id}`} className="block">
          <img src={writer.blogs.mostSaved.images[0].link} alt={writer.blogs.mostSaved.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h4 className="text-lg font-bold text-orange-500 dark:text-orange-400">{writer.blogs.mostSaved.title}</h4>
          <p className="text-gray-600 dark:text-gray-400">{writer.blogs.mostSaved.info}</p>
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow ">
        <h3 className="text-xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Recent Blogs</h3>
        <div className="space-y-4">
          {writer.blogs.recent.map((blog: any) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id} className="block">
              <div className="flex items-center space-x-4">
                <img src={blog.images[0].link} alt={blog.title} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h4 className="text-lg font-bold text-orange-500 dark:text-orange-400">{blog.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{blog.info}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow ">
        <h3 className="text-xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Popular Blogs</h3>
        <div className="space-y-4">
          {writer.blogs.popular.map((blog: any) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id} className="block">
              <div className="flex items-center space-x-4">
                <img src={blog.images[0].link} alt={blog.title} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h4 className="text-lg font-bold text-orange-500 dark:text-orange-400">{blog.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{blog.info}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-orange-500 dark:text-orange-400">All Blogs</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-300 text-left">Title</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-300 text-left">Image</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-300 text-center">Saves-Share</th>
              <th className="py-2 px-4 border-b dark:border-gray-700 dark:text-gray-300 text-center hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {writer.blogs.all.data.map((blog: any) => (
              <tr key={blog._id} className={'even:bg-gray-100 even:dark:bg-gray-700 odd:bg-white odd:dark:bg-gray-800'}>
                <td className="py-2 px-4 border-b dark:border-gray-700">
                  <Link href={`/blogs/${blog._id}`} className="text-blue-600 dark:text-blue-400">{blog.title}</Link>
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-700">
                  <img src={blog.images[0].link} alt={blog.title} className="w-20 h-20 object-cover rounded-lg" />
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-center">{blog.usersave+" - "+blog.share}</td>
                <td className="py-2 px-4 border-b dark:border-gray-700 text-center hidden md:table-cell">{new Date(blog.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Pagination pagedata={writer.blogs.all.meta} />
      </div>
    </div>
  </div>
  );
};
