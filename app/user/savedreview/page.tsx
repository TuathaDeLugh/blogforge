import { H1 } from '@/Components/Motion/Motion'
import RemoveFromSaveBtn from '@/Components/RemoveFromSaveBTN'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getBlogs } from '@/controllers/savelist'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const SaveList = async () => {
  const session = await getServerSession(authOptions)
  // const user = await getSingleUser(session.user.id)
  const blogs = await getBlogs(session?.user.dbid!)
  

  return (
    <section className='px-3 mx-auto max-w-[1500px] '>
        <div className="relative m-5 md:mt-16 mx-2">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute md:-top-16 lg:-top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
          >
            User
          </H1>
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
            Saved Blogs
          </H1>
        </div>
        <ul>
          {blogs?.map((blog: any ) => (
            <li key={blog._id}>
              <div
      key={blog._id}
      className='flex flex-wrap  overflow-auto bg-white rounded-lg shadow-lg dark:shadow-gray-700/50 dark:bg-slate-800 mb-5 border dark:border-slate-600'
    >
      <div
        className='h-60 md:h-auto w-full md:w-1/2 bg-cover'
        style={{
          backgroundImage: `url(${blog.images[0].link})`,
          backgroundPosition: 'center center',
        }}
      ></div>

      <div className='w-full md:w-1/2 px-4 py-8  flex-wrap flex flex-col'>
        <h1 className='text-2xl font-bold text-orange-500 dark:text-orange-400 mb-5'>
          {blog.title}
        </h1>

        <div className='flex mt-2 item-center flex-wrap mb-3'>
          <span className='block text-lg font-semibold text-orange-700 dark:text-orange-400'>
            Category :
          </span>

          <span className='block px-2 text-lg'>
            {blog.category.join(', ')}
          </span>
        </div>

        <div className='flex justify-between mt-3 item-center flex-col md:flex-row gap-3'>
          <h1 className='text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl flex gap-2'>
            <span className='block text-lg font-semibold text-orange-700 dark:text-orange-400'>
              &#9733;
            </span>{' '}
            {blog.usershare}
          </h1>
          <div className='flex flex-wrap gap-1'>
            <RemoveFromSaveBtn
              uid={session?.user.dbid!}
              rid={blog._id}
              page='savelist'
            />
            <Link
              href={`/allblog/${blog._id}`}
              className='inline-block mr-2 px-2 py-2 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-orange-500/80 rounded dark:bg-orange-400/80 hover:bg-orange-700 dark:hover:bg-orange-600 focus:outline-none '
            >
              Read Review
            </Link>
          </div>
        </div>
      </div>
    </div>
            </li>
          ))}
        </ul>
    </section>
  )
}

export default SaveList