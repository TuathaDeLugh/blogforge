import Pagination from '@/Components/Pagination'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import getUserBlog from '@/controllers/userblog'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { HiPencilAlt } from "react-icons/hi";
import { Div, H1 } from '@/Components/Motion/Motion'
import Image from 'next/image'
import DelBlogBtn from './DeleteBlog'

export default async function UserBlog(context: { searchParams: { page: string } }) {
  const session = await getServerSession(authOptions)
  const dbid = session?.user.dbid || ''
  const page = parseInt(context.searchParams.page) || 1;
  const filter = 'published' 
  const blogs = await getUserBlog(dbid,page,filter);
  
  return (
      <section className="px-2 mx-auto max-w-[1500px]">
        <div className=" px-6 py-5 mx-auto">
          <div className="relative mt-5 md:mt-16 mx-2">
            <H1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
            >
              User
            </H1>
            <H1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              My Blogs
            </H1>
          </div>
          <Div className='flex gap-2 w-full mx-2'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Link href={"/user/blog/new"} className='bg-orange-500/90 hover:opacity-80 my-5 font-bold text-white py-3 px-6 rounded'>Add blog</Link>
          </Div>
          <Div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={
              "relative  m-3 flex flex-col min-w-0 break-words w-full mb-6 rounded "}>

            <div className=" block w-full rounded overflow-x-auto">
              {
                blogs.data.length > 0 ? 
              <table className=" items-center w-full bg-transparent ">
                <thead>
                  <tr className='border border-l-0 border-r-0 bg-slate-200 dark:bg-slate-600 dark:border-slate-500 '>
                    <th
                      className={
                        "px-6 table-cell  w-6/12 py-3 text-xs md:text-sm uppercase   font-semibold "
                      }
                    >
                      Title
                    </th>
                    <th
                      className={
                        "hidden sm:table-cell  w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold "
                      }
                    >
                      Views
                    </th>
                    <th
                      className={
                        "hidden sm:table-cell  w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold "
                      }
                    >
                      Share
                    </th>
                    <th
                      className={
                        "hidden sm:table-cell w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold  "
                      }
                    >
                      Image
                    </th>
                    <th
                      className={
                        "w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold  "
                      }
                    >
                      Status
                    </th>
                    <th
                      className={
                        " px-6 w-1/12 py-3 text-xs md:text-sm uppercase   font-semibold "
                      }
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    blogs.data?.map((blog: any) => {
                      return (
                        <tr key={blog._id} className='border-b dark:border-slate-500 text-center'>
                          <Suspense fallback={<p>Loading</p>}>

                            <td
                              className={
                                "table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                              }
                            >
                              {blog.title}
                            </td><td
                              className={
                                "hidden sm:table-cell  pl-6 pr-1    py-3 text-xs md:text-sm "
                              }
                            >
                              {blog.pageview}
                            </td>
                            <td
                              className={
                                "hidden sm:table-cell  pl-6 pr-1    py-3 text-xs md:text-sm "
                              }
                            >
                              {blog.share}
                            </td>
                            <td
                              className={
                                "hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm "
                              }
                            > 
                              <Image src={blog.images[0].link}
                              height={100}
                              width={300}
                              alt={blog.images[0].name}
                              className=' w-full h-14 object-cover rounded'/>
                            </td>
                            <th
                      className={
                        "w-2/12 px-6 py-3 text-xs md:text-sm uppercase   "
                      }
                    >
                      {blog.status}
                    </th>
                            <td
                              className={
                                "table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow "
                              }
                            >
                              <div className=' flex gap-2'>
                                <Link href={`/user/blog/${blog._id}`} title="Edit" >
                                  <HiPencilAlt className='text-blue-600' size={25} />
                                </Link>
                                <DelBlogBtn id={blog._id} images={blog.images} title={blog.title}/>
                              </div>
                            </td>
                          </Suspense>
                        </tr>

                      )
                    })
                  }
                </tbody>
              </table>
              :<div className='text-center text-lg'>Looks Like You don&apos;t created any Blogs </div> 
            }
            </div>
          </Div>
          <Pagination pagedata={blogs.meta} />
        </div>
      </section>
  )
}
