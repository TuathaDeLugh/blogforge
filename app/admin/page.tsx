import { H1 } from '@/Components/Motion/Motion'
import { getStats } from '@/controllers/blog'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaComments, FaEnvelope, FaFileAlt, FaStar, FaUser, FaUsers } from 'react-icons/fa'

export default async function Admin() {
  const stats = await getStats()
  console.log(stats);
  
  let wno=1 ,rno = 1
  return (
    <section className='md:my-6'>
    <div className="md:relative -z-10">
      <H1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
      >
        Admin
      </H1>
      <H1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white">
        Admin Panal
      </H1>
    </div>
    {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total Users */}
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Total Users</h2>
              <p className="text-3xl">{stats.totalUsers}</p>
            </div>

            {/* Total Blogs */}
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Total Blogs</h2>
              <p className="text-3xl">{stats.totalBlogs}</p>
            </div>

            {/* Popular Categories */}
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Popular Categories</h2>
              <ul>
                {stats.popularCategories.map((category:any) => (
                  <li key={category._id} className="flex justify-between">
                    <span>{category._id}</span>
                    <span>{category.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Writers */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Top Writers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Avatar</th>
                    <th className="py-2 px-4 border-b">Username</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Total Blogs</th>
                    <th className="py-2 px-4 border-b">Total Saves</th>
                    <th className="py-2 px-4 border-b">Total Shares</th>
                    <th className="py-2 px-4 border-b">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topWriters.map((writer:any) => (
                    <tr key={writer._id}>
                      <td className="py-2 px-4 border-b">
                        <img src={writer.avatar} alt={writer.name} className="w-12 h-12 rounded-full" />
                      </td>
                      <td className="py-2 px-4 border-b">{writer.username}</td>
                      <td className="py-2 px-4 border-b">{writer.name}</td>
                      <td className="py-2 px-4 border-b">{writer.email}</td>
                      <td className="py-2 px-4 border-b text-center">{writer.totalBlogs}</td>
                      <td className="py-2 px-4 border-b text-center">{writer.totalUsersave}</td>
                      <td className="py-2 px-4 border-b text-center">{writer.totalShare}</td>
                      <td className="py-2 px-4 border-b text-center">{writer.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Commented Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Most Commented Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Image</th>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostCommentedBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b">
                        <img src={blog.images[0].link} alt={blog.title} className="w-12 h-12 rounded" />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b text-center">{blog.commentsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Saved Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Most Saved Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Saves</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostSavedBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b text-center">{blog.usersave}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Shared Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Most Shared Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostSharedBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b text-center">{blog.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    <th className="py-2 px-4 border-b hidden md:table-cell">Created At</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">{blog.category.join(', ')}</td>
                      <td className="py-2 px-4 border-b hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{blog.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Popular Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    <th className="py-2 px-4 border-b hidden md:table-cell">Created At</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popularBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">{blog.category.join(', ')}</td>
                      <td className="py-2 px-4 border-b hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{blog.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  )

}
