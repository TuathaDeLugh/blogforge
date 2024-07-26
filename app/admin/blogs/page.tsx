
import DelBlogBtn from '@/app/user/blog/DeleteBlog';
import Pagination from '@/Components/layout/Pagination';
import { Animation, Div, H1 } from '@/Components/Motion/Motion';
import Tr from '@/Components/Motion/TableAnimation';
import getAllBlog from '@/controllers/blog';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { HiPencilAlt } from 'react-icons/hi';
import { IoAddSharp } from 'react-icons/io5';

export default async function AdminReview(context:any) {
  const blogs = await getAllBlog(parseInt(context.searchParams.page));
  let i = 1;
  return (
    <section className='md:my-6'>
     <div className="relative  mx-2">
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
            transition={{ duration: 0.5 }} 
            className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white">
            Published Blogs
          </H1>
        </div>
        <H1 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="mt-2 text-xl font-bold capitalize text-orange-500 dark:text-orange-400 lg:text-[4xl]">
    Total blogs : {blogs.meta.totalDocuments}
  </H1>
        <Div className='flex gap-2 w-full mx-2'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Link href={"/user/blog/new"} className=" my-3 hover:text-orange-500/60 flex items-center"> <IoAddSharp size={20} className="mr-1" /> New blog</Link>
        </Div>
    <Div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={
        "relative  py-3 flex flex-col min-w-0 break-words w-full mb-6 rounded "}>

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
                    Saves-Share
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
                <Animation>

                {
                  blogs.data?.map((blog: any,index:number) => {
                    return (
                      <Tr index={index} key={blog._id} className='border-b dark:border-slate-500 text-center odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50'>
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
                            {blog.usersave}-{blog.share}
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
</Animation>
              </tbody>
            </table>
            : <div className='text-center text-lg'>Looks Like You don&apos;t created any Blogs </div>
        }
      </div>
    </Div>
    <Pagination pagedata={blogs.meta} />
    </section>
  )
}
