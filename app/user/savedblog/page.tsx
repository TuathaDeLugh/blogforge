import AnimationData from '@/Components/Motion/AnimationData'
import { H1 } from '@/Components/Motion/Motion'
import Pagination from '@/Components/layout/Pagination'
import RemoveFromSaveBtn from '@/Components/RemoveFromSaveBTN'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getBlogs } from '@/controllers/savelist'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import ToastInfo from '@/Components/layout/ToastInfo'

const SaveList = async () => {
  const session = await getServerSession(authOptions)
  const blogs = await getBlogs(session?.user.dbid!)
  console.log(blogs.data[0]);
  
  return (
    <section className="px-4 lg:px-8 mx-auto max-w-[1500px]">
      <div className="relative m-5 md:mt-16 mx-2">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-16 lg:-top-20 left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
        >
          User
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white"
        >
          Saved Blogs
               <ToastInfo message={'This tab display your saved blogs those are publically avaliable. Deleted or Private blogs are not shown here'} duration={10000}/>
        </H1>
      </div>
      <div className="min-h-[90vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.data.map((blog: any, index: number) => (
            <AnimationData
              key={blog._id}
              index={index}
              className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="block group">
                  <div className="">
                    <Image
                      src={blog.images[0].link}
                      alt="Blog Image"
                      className="w-full h-48 object-cover"
                      width={300}
                      height={200}
                    />
                    
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-orange-500 dark:text-orange-400">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {blog.info}
                    </p>
                    <div className="flex items-center">
                      {blog.creator.avatar ? (
                        <Image
                          className="rounded-full border-2 border-gray-300 dark:border-gray-600"
                          src={blog.creator.avatar}
                          width={40}
                          height={40}
                          alt={blog.creator.createdby}
                        />
                      ) : null}
                      <div className="ml-3">
                        <p className="text-gray-700 dark:text-gray-400">{blog.creator.username}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {new Date(blog.updatedAt).toLocaleString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="flex items-center px-4 pb-4 rounded-b-lg justify-between bg-white dark:bg-gray-800">
                <Link
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 text-white bg-orange-400 hover:bg-orange-400/80 dark:bg-orange-500/80 dark:hover:bg-orange-500/50"
                  href={`/blogs/${blog._id}`}
                >
                  Read Blog
                </Link>
                <RemoveFromSaveBtn name={blog.title} uid={session?.user.dbid!} rid={blog._id} page="saveist" />
              </div>
            </AnimationData>
          ))}
        </div>
      </div>
      <Pagination pagedata={blogs.meta} />
    </section>
  )
}

export default SaveList
