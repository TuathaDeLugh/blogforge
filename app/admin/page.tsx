import { Div, H1 } from '@/Components/Motion/Motion';
import { getStats } from '@/controllers/blog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaEnvelope,
  FaFileAlt,
  FaUsers,
  FaHeart,
  FaShare,
  FaComment,
  FaCalendarAlt,
  FaChartLine,
} from 'react-icons/fa';
import { IoMdTrendingDown } from 'react-icons/io';

export default async function Admin() {
  const stats = await getStats();

  return (
    <section className="md:my-6">
      {/* Header with Quick Actions */}
      <div className="md:relative z-10 mb-8">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
        >
          Admin
        </H1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white"
          >
            Admin Dashboard
          </H1>
          <Div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-3 mt-4 md:mt-0"
          >
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <FaChartLine />
              Analytics
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaUsers />
              Manage Users
            </Link>
          </Div>
        </div>
      </div>
      {stats && (
        <>
          {/* Enhanced Stats Cards */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Blogs
                  </p>
                  <p className="text-3xl font-bold">{stats.totalBlogs}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    Published content
                  </p>
                </div>
                <div className="bg-blue-400/30 p-3 rounded-lg">
                  <FaFileAlt className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <p className="text-green-100 text-xs mt-1">
                    Registered members
                  </p>
                </div>
                <div className="bg-green-400/30 p-3 rounded-lg">
                  <FaUsers className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Total Emails
                  </p>
                  <p className="text-3xl font-bold">{stats.totalEmails}</p>
                  <p className="text-purple-100 text-xs mt-1">
                    Contact messages
                  </p>
                </div>
                <div className="bg-purple-400/30 p-3 rounded-lg">
                  <FaEnvelope className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Categories
                  </p>
                  <p className="text-3xl font-bold">
                    {stats.popularCategories?.length || 0}
                  </p>
                  <p className="text-orange-100 text-xs mt-1">
                    Active categories
                  </p>
                </div>
                <div className="bg-orange-400/30 p-3 rounded-lg">
                  <IoMdTrendingDown className="text-2xl" />
                </div>
              </div>
            </div>
          </Div>

          {/* Quick Stats Row */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-red-500">
              <div className="flex items-center">
                <FaHeart className="text-red-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Saves
                  </p>
                  <p className="text-lg font-bold">
                    {stats.mostSavedBlogs?.reduce(
                      (acc: number, blog: any) => acc + (blog.usersave || 0),
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex items-center">
                <FaShare className="text-blue-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Shares
                  </p>
                  <p className="text-lg font-bold">
                    {stats.mostSharedBlogs?.reduce(
                      (acc: number, blog: any) => acc + (blog.share || 0),
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-green-500">
              <div className="flex items-center">
                <FaComment className="text-green-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Comments
                  </p>
                  <p className="text-lg font-bold">
                    {stats.mostCommentedBlogs?.reduce(
                      (acc: number, blog: any) =>
                        acc + (blog.commentsCount || 0),
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-yellow-500">
              <div className="flex items-center">
                <FaCalendarAlt className="text-yellow-500 text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This Month
                  </p>
                  <p className="text-lg font-bold">
                    {stats.recentBlogs?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </Div>

          {/* Popular Categories */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-700/60 shadow-lg p-4 rounded-lg mt-8"
          >
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-2">
              Popular Categories
            </h2>
            <div className="flex flex-wrap justify-center">
              {stats.popularCategories.map((category: any) => (
                <div
                  key={category._id}
                  className="bg-orange-100 dark:bg-orange-400/20 p-4 rounded-lg m-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  <h3 className="text-lg font-bold">{category._id}</h3>
                  <p className="text-sm">{category.count} posts</p>
                </div>
              ))}
            </div>
          </Div>

          {/* Top Writers */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
              Top Writers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/50">
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Avatar
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Username
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Email
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Total Blogs
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Total Saves
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Total Shares
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topWriters.map((writer: any) => (
                    <tr
                      key={writer._id}
                      className="odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                    >
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Image
                          height={100}
                          width={100}
                          src={writer.avatar}
                          alt={writer.name}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        {writer.username}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        {writer.name}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        {writer.email}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        {writer.totalBlogs}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        {writer.totalUsersave}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        {writer.totalShare}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        {writer.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Div>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Most Commented Blogs */}
            <Div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
                Most Commented Blogs
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/50">
                      <th className="py-2 px-4 border-b dark:border-slate-600">
                        Image
                      </th>
                      <th className="py-2 px-4 border-b dark:border-slate-600">
                        Title
                      </th>
                      <th className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.mostCommentedBlogs.map((blog: any) => (
                      <tr
                        key={blog._id}
                        className="odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                      >
                        <td className="py-2 px-4 border-b dark:border-slate-600">
                          <Image
                            height={100}
                            width={100}
                            src={blog.images[0].link}
                            alt={blog.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        </td>
                        <td className="py-2 px-4 border-b dark:border-slate-600">
                          <Link
                            href={`/blog/${blog._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {blog.title}
                          </Link>
                        </td>
                        <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                          {blog.commentsCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Div>

            {/* Most Saved Blogs */}
            <Div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
                Most Saved Blogs
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/50">
                      <th className="py-2 px-4 border-b dark:border-slate-600">
                        Image
                      </th>
                      <th className="py-2 px-4 border-b dark:border-slate-600">
                        Title
                      </th>
                      <th className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        Saves
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.mostSavedBlogs.map((blog: any) => (
                      <tr
                        key={blog._id}
                        className="odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                      >
                        <td className="py-2 px-4 border-b dark:border-slate-600">
                          <Image
                            height={100}
                            width={100}
                            src={blog.images[0].link}
                            alt={blog.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        </td>
                        <td className="py-2 px-4 border-b dark:border-slate-600">
                          <Link
                            href={`/blog/${blog._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {blog.title}
                          </Link>
                        </td>
                        <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                          {blog.usersave}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Div>
          </div>
          {/* Most Shared Blogs */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
              Most Shared Blogs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/50">
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Image
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Title
                    </th>
                    <th className="py-2 px-4 border-b text-center dark:border-slate-600">
                      Shares
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostSharedBlogs.map((blog: any) => (
                    <tr
                      key={blog._id}
                      className="odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                    >
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Image
                          height={100}
                          width={100}
                          src={blog.images[0].link}
                          alt={blog.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link
                          href={`/blog/${blog._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">
                        {blog.share}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Div>

          {/* Recent Blogs */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
              Recent Blogs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/50">
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Title
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Category
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBlogs.map((blog: any) => (
                    <tr
                      key={blog._id}
                      className="odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                    >
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link
                          href={`/blog/${blog._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        {blog.category.join(', ')}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Div>

          {/* Popular Blogs */}
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
              Popular Blogs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/50">
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Title
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">
                      Category
                    </th>
                    <th className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popularBlogs.map((blog: any) => (
                    <tr
                      key={blog._id}
                      className="odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                    >
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link
                          href={`/blog/${blog._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        {blog.category.join(', ')}
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Div>
        </>
      )}
    </section>
  );
}
