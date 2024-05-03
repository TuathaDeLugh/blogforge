import Carousel from '@/Components/Crousel';
import { Div, H1, P } from '@/Components/Motion/Motion';
import ShareButton from '@/Components/Sharebutton';
import getSingleblog from '@/controllers/singleblog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/style/datadisplay.css"
import Error from '@/app/not-found';

interface BlogProps {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: BlogProps) {
  const blog = await getSingleblog(id)

  if (blog) {
    return (<>
      <section className=" max-w-[1500px] mx-auto px-4 lg:px-8 ">
        <div className="relative m-5 md:mt-16 mx-2">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute md:-top-16 lg:-top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
          >
            Blog
          </H1>
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
            {blog.title}
          </H1>
        </div>
                  
        <div className="flex flex-col gap-3 justify-center mb-5 items-center ">
          {/* Images */}
          <div className=" w-full lg:w-[70%] xl:w-[77%] ">

            <Carousel data={blog.images} />
          </div>
            {/* header section */}
            <div className='w-full P-2 lg:P-0 px-2'>
            <Div className='flex tracking-wider '
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                Category:{' '}
              </span>
              <div className='flex flex-wrap capitalize'>{
                blog.category?.map((category: string, index: number) => (
                  <span key={category} className='px-2'>{
                    index === blog.category.length - 1 ? category.split('_').join(' ') : (
                      category.split('_').join(' ') + ', '
                    )
                  }</span>
                )) as JSX.Element[]
              }</div>
            </Div>
            <P className='mt-5  tracking-wider  white-space-pre-wrap text-wrap inline-block'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                {' '}
                Summary :{' '}
              </span>
                {blog.info}
            </P>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-5">

              <P className='  tracking-wider'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                  {' '}
                  Users Save :{' '}
                </span>{' '}
                {blog.usersave}
              </P>
              <P className=' tracking-wider flex gap-3 items-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                  {' '}
                  Share :{' '}
                </span>{' '}
                {blog.share}
                <ShareButton link={`${process.env.API_URL}blogs/${blog._id}`} />
              </P>
              <Div
              className=' grow sm:grow-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              >
              <button
                        className="bg-orange-500 text-white px-7  w-full sm:w-36 h-10 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline-green active:bg-orange-800 disabled:opacity-30 flex justify-center items-center gap-2"
                        >
                        Save Blog
              </button>
              </Div>
                          </div>
            <div className='mt-5'>
              <P className="flex gap-2 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                  {' '}
                  Writer:{' '}
                </span>{' '}
                {
                  blog.creator.avatar ?
                    <Image className='rounded-full border dark:border-slate-500 h-7 w-7' src={blog.creator.avatar} width={23} height={23} alt={blog.creator.createdby} />
                    :
                    null
                }
                <Link href={`/writer/${blog.creator.username}`} className=' hover:font-semibold hover:underline'>{blog.creator.username}</Link>
              </P>

            </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row justify-between border-t dark:border-slate-600 mx-2 mb-6">
            <Div className=" w-full lg:w-[70%] xl:w-[77%] mt-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              {/* Blog content */}
              <div
                className={`data min-h-[80vh] text-justify`}
                dangerouslySetInnerHTML={{ __html: blog.detail.replace(/\n/g, '<br>') }} />
              <div className='mt-5'>
                <P className="flex gap-2 items-center text-slate-400 dark:text-slate-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}>
                  {
                    blog.creator.avatar ?
                      <Image className='rounded-full border dark:border-slate-500 h-7 w-7' src={blog.creator.avatar} width={23} height={23} alt={blog.creator.createdby} />
                      :
                      null
                  }
                  {blog.creator.username + (blog.createdAt !== blog.updatedAt ? ', Last Updated at ' : ' at ') +
                    new Date(blog.createdAt).toLocaleString()}
                </P>

              </div>
            </Div>
            {/* comments */}
            <Div className='w-full lg:w-[30%] xl:w-[20%] mt-5'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              Comments
            </Div>
          </div>
      </section >
    </>

    )
  }
  else {
    return (
      <Error />
    )
  }
}
