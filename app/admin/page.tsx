import { H1 } from '@/Components/Motion/Motion'
import { getStats } from '@/controllers/blog'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaFileAlt, FaUsers } from 'react-icons/fa'

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

        <div className="flex justify-around gap-4 w-full border-b pb-2 md:pb-5 dark:border-slate-400 mt-5">
              <div className=" relative items-center border border-blue-500 rounded-md p-4 bg-blue-50 dark:bg-blue-600/50 mb-4 sm:mb-0 w-1/3 ">
                <FaFileAlt className=" absolute text-blue-500 text-3xl mb-2 right-3 hidden sm:block" />
                <p className='text-5xl mb-2'>{stats.totalBlogs}</p>
                <p>Total Blogs</p>
              </div>
              <div className="w-1/3 relative items-center border border-green-500 rounded-md p-4 bg-green-50 dark:bg-green-600/50 mb-4 sm:mb-0 ">
                <FaEnvelope className="absolute text-green-500 text-3xl mb-2 right-3 hidden sm:block" />
                <p className='text-5xl mb-2'>{stats.totalEmails}</p>
                <p>Total Emails</p>
              </div>
              <div className="w-1/3 relative items-center border border-purple-500 rounded-md p-4 bg-purple-50 dark:bg-purple-600/50 mb-4 sm:mb-0 ">
                <FaUsers className="absolute text-purple-500 text-3xl mb-2 right-3 hidden sm:block" />
                <p className='text-5xl mb-2'>{stats.totalUsers}</p>
                <p>Total Users</p>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white dark:bg-slate-700/60 shadow-lg p-4 rounded-lg mt-8">
  <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-2">Popular Categories</h2>
  <div className="flex flex-wrap justify-center">
    {stats.popularCategories.map((category: any) => (
      <div key={category._id} className="bg-orange-100 dark:bg-orange-400/20 p-4 rounded-lg m-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <h3 className="text-lg font-bold">{category._id}</h3>
        <p className="text-sm">{category.count} posts</p>
      </div>
    ))}
  </div>
</div>

          {/* Top Writers */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">Top Writers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Avatar</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Username</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Name</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Email</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Total Blogs</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Total Saves</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Total Shares</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topWriters.map((writer:any) => (
                    <tr key={writer._id}>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Image height={100} width={100} src={writer.avatar} alt={writer.name} className="w-12 h-12 rounded-full" />
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">{writer.username}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">{writer.name}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">{writer.email}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{writer.totalBlogs}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{writer.totalUsersave}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{writer.totalShare}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{writer.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
          {/* Most Commented Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">Most Commented Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Image</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Title</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600 text-center">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostCommentedBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Image height={100} width={100} src={blog.images[0].link} alt={blog.title} className="w-12 h-12 rounded object-cover" />
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{blog.commentsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Saved Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">Most Saved Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                  <th className="py-2 px-4 border-b dark:border-slate-600">Image</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Title</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600 text-center">Saves</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostSavedBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Image height={100} width={100} src={blog.images[0].link} alt={blog.title} className="w-12 h-12 rounded object-cover" />
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{blog.usersave}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </div>
          {/* Most Shared Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">Most Shared Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                  <th className="py-2 px-4 border-b dark:border-slate-600">Image</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Title</th>
                    <th className="py-2 px-4 border-b text-center dark:border-slate-600">Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.mostSharedBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Image height={100} width={100} src={blog.images[0].link} alt={blog.title} className="w-12 h-12 rounded object-cover" />
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 text-center">{blog.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">Recent Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Title</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Category</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">{blog.category.join(', ')}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Blogs */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">Popular Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Title</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600">Category</th>
                    <th className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popularBlogs.map((blog:any) => (
                    <tr key={blog._id}>
                      <td className="py-2 px-4 border-b dark:border-slate-600">
                        <Link href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                          {blog.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-slate-600">{blog.category.join(', ')}</td>
                      <td className="py-2 px-4 border-b dark:border-slate-600 hidden md:table-cell">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
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
