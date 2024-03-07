import Pagination from '@/Components/Pagination'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import getUserBlog from '@/controllers/userblog'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { HiPencilAlt } from "react-icons/hi";
import { Div} from '@/Components/Motion/Motion'
import Image from 'next/image'
import DelBlogBtn from './DeleteBlog'
import Tr from '@/Components/Motion/TableAnimation'

export default async function UserBlog(context: { searchParams: { page: string } }) {
  const session = await getServerSession(authOptions)
  const dbid = session?.user.dbid || ''
  const page = parseInt(context.searchParams.page) || 1;
  const filter = ''
  const blogs = await getUserBlog(dbid, page, filter);

  return (
    <>
    <div className="flex gap-4 mb-3">
        <Link
        href={'/user/blog/'}
          className={`py-2 px-4 border-b-2 border-orange-400 focus:outline-none`}
        >
          All
        </Link>
        <Link
        href={'/user/blog/published'}
          className={`py-2 px-4  focus:outline-none`}
        >
          Published
        </Link>
        <Link
        href={'/user/blog/archived'}
          className={`py-2 px-4 focus:outline-none`}
        >
          Archived
        </Link>
        <Link
        href={'/user/blog/draft'}
          className={`py-2 px-4  focus:outline-none`}
        >
          Draft
        </Link>
      </div>
        <Div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={
            "relative  m-3 flex flex-col min-w-0 break-words w-full mb-6 rounded "}>

          <div className=" block w-full rounded overflow-x-auto">
            {
              blogs.data.length > 0 ?
                <table className=" items-center w-full bg-transparent overflow-y-hidden ">
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
                          " px-6 w-1/12 py-3 text-xs md:text-sm uppercase   font-semibold "
                        }
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      blogs.data?.map((blog: any,index:number) => {
                        return (
                          <Tr index={index} key={blog._id} className='border-b dark:border-slate-500 text-center'>
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
                                  className=' w-full h-14 object-cover rounded' />
                              </td>
                              <td
                                className={
                                  "table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow "
                                }
                              >
                                <div className=' flex gap-2'>
                                  <Link href={`/user/blog/edit/${blog._id}`} title="Edit" >
                                    <HiPencilAlt className='text-blue-600' size={25} />
                                  </Link>
                                  <DelBlogBtn id={blog._id} images={blog.images} title={blog.title} />
                                </div>
                              </td>
                            </Suspense>
                          </Tr>

                        )
                      })
                    }
                  </tbody>
                </table>
                : <div className='text-center text-lg'>Looks Like You don&apos;t created any Blogs </div>
            }
          </div>
        </Div>
        <Pagination pagedata={blogs.meta} />
            </>
  )
}
