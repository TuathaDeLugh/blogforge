import Carousel from '@/Components/Crousel';
import { Div, H1, P } from '@/Components/Motion/Motion';
import ShareButton from '@/Components/Sharebutton';
import getSingleblog from '@/controllers/singleblog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/style/datadisplay.css"
import Error from '@/app/not-found';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import getSingleUser from '@/controllers/singleuser';
import RemoveFromSaveBtn from '@/Components/RemoveFromSaveBTN';
import SaveBlogBtn from '@/Components/SaveBlogBTN';

interface BlogProps {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: BlogProps) {
  const session = await getServerSession(authOptions)
  const blog = await getSingleblog(id)
  let user ;
  if (session && session.user.dbid)
   {
  user =  await getSingleUser(session?.user?.dbid)
  }

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
            <div className='w-full p-2 lg:P-0 px-2'>
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
            <P className='mt-3  tracking-wider  white-space-pre-wrap text-wrap inline-block'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                {' '}
                Summary :{' '}
              </span>
                {blog.info}
            </P>

              <div className="flex flex-wrap items-center justify-between gap-3 ">

              <P className='  tracking-wider mt-3'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                  {' '}
                  Users Save :{' '}
                </span>{' '}
                {blog.usersave}
              </P>
              <P className=' tracking-wider flex gap-3 items-center mt-3'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <span className=' text-orange-500 dark:text-orange-400  font-medium'>
                  {' '}
                  Share :{' '}
                </span>{' '}
                {blog.share}
                <ShareButton link={`${process.env.API_URL}share?blog=${blog.title}`} />
              </P>
              <Div
              className=' grow sm:grow-0'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              >
                { session ? (
            session?.user?.dbid &&
              (user.savelist.indexOf(blog._id) >= 0 ? (
                <RemoveFromSaveBtn
                  name={blog.title}
                  uid={session.user.dbid}
                  rid={blog._id}
                />
              ) : (
                <SaveBlogBtn uid={session.user.dbid} rid={blog._id} />
              ))
            ) : (<p className=' text-base mt-3' >Please <Link href={'/login'} className='text-orange-500 hover:underline' >Login</Link> For add to savelist</p>)
            }
              </Div>
                          </div>
            <div className='mt-3'>
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
