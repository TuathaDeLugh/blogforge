"use dynamic"
import Carousel from '@/Components/layout/Crousel';
import { Animation, Div, H1, P } from '@/Components/Motion/Motion';
import ShareButton from '@/Components/Sharebutton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/style/datadisplay.css"
import Error from '@/app/not-found';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import RemoveFromSaveBtn from '@/Components/RemoveFromSaveBTN';
import SaveBlogBtn from '@/Components/SaveBlogBTN';
import { Metadata } from 'next';
import CommentForm from '@/Components/Comment/CommentForm';
import { AiOutlineUser } from 'react-icons/ai';
import DelCommentBtn from '@/Components/Comment/DelCommentBtn';
import DModal from '@/Components/layout/Model';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { getSingleblog } from '@/controllers/blog';
import { getSingleUser } from '@/controllers/user';

interface BlogProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: BlogProps): Promise<Metadata> {
  const blogdata = await getSingleblog(id)
  const blogTitle = blogdata.title || "Blog is not avaliable"
  const blogInfo = blogdata.info || "Blog is not avaliable"
  const images = blogdata.images || [];
  const imageLink = images.length > 0 ? images[0].link : 'default_image_link';
  return {
    title: blogTitle,
    description: blogInfo,
    openGraph: {
      images: [imageLink],
    },
  };
}

export default async function page({ params: { id } }: BlogProps) {
  const session = await getServerSession(authOptions)
  const blog = await getSingleblog(id)
  
  let user;
  if (session && session.user.dbid) {
    user = await getSingleUser(session?.user?.dbid)
  }

  if (blog && blog.status=="published") {
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
                <span className=' text-orange-500 dark:text-orange-400 flex items-center  font-medium'>
                  {' '}
                  Share 

                  <DModal
        btn={<IoIosInformationCircleOutline size={20} className='text-orange-500 dark:text-orange-400 shadow-md rounded-full m-2 backdrop-blur-xl'/>}
        header="How it count ?"
        timerDuration={10}
        >
        <Image src={'/info.svg'} alt='info person' width={200} height={200}/>
        <div><p>User receive : +1</p><p>User Open Link : +1</p><p>User receive & open : +2</p></div>
      </DModal>
      :{' '}
                </span>{' '}
                {blog.share}
                <ShareButton link={`${process.env.API_URL}share?blog=${encodeURIComponent(blog.title)}`} />
              </P>
              <Div
                className=' grow sm:grow-0'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {session ? (
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
        <div
        className="flex flex-col gap-3 lg:flex-row justify-between items-start border-t dark:border-slate-600 mx-2 mb-6"
        >
          <Div className=" w-full lg:w-[70%] xl:w-[77%] mt-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >
            {/* Blog content */}
            <div
              className={`data min-h-[80vh] text-justify`}
              dangerouslySetInnerHTML={{ __html: blog.detail.replace(/\n/g, '<br>') }} />
          </Div>
          {/* comments */}
          <Div
          className='w-full lg:w-[25%] xl:w-[20%] sticky top-[73px]' 

            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >

            <P className='  tracking-wider mt-3 text-orange-500 dark:text-orange-400  font-medium'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              Comments
            </P>
            <CommentForm blogid={blog._id} />
            

            <div className=' pt-3'>
              {blog.comments.length > 0 ? (
                <div className='max-h-[50vh] lg:max-h-[80dvh] overflow-y-auto flex flex-col gap-2'>
                  <Animation>
                  {blog.comments?.map((comment: any) => {
                    return (
                      <Div
                      initial={{
                        opacity: 0,
                        y: -20
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      exit={{
                        opacity: 0,
                        y: -20
                      }}
                      layout={true}
                      key={comment._id}
                        className=' rounded-lg bg-slate-100 dark:bg-gray-800 p-1 w-[98%] relative '
                      >
                        <div className='py-1 px-2 flex justify-between'>
                          <div className='flex items-center gap-2'>
                            {comment.user.avatar ? (
                              <Image width={50} height={50}
                              src={comment.user.avatar}
                              alt={comment.user.username}
                              className='border dark:border-slate-400 mr-1 w-7 h-7 rounded-full'
                              />
                            ) : (
                              <AiOutlineUser
                              size={20}
                              className='border dark:border-slate-400 mr-1 w-7 h-7 rounded-full'
                              />
                            )} 
                            {' '}
                              <div className='flex flex-col justify-start'>
                           <p> {comment.user.username} </p>
                          <p className=' text-xs opacity-75'>at {new Date(comment.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                          </div>
                          </div>
                          {session &&
                          (blog.creator._id == session.user?.dbid ||
                            comment.user._id == session.user?.dbid ||
                            session.user.isAdmin==true) ? (
                              <div className=' absolute right-0 top-0' >
                              <DelCommentBtn
                                blogid={blog._id}
                                commid={comment._id}
                                />
                            </div>
                          ) : null}
                        </div>
                        <div className={`py-1 px-2 overflow-x-scroll`}>{comment.comment}</div>
                      </Div>
                    )
                  })}
                  </Animation>
                </div>
              ) : (
                <p className='mt-5'>No comments avaliable become the first</p>
              )}
            </div>
            </Div>
        </div>
        <div className='my-5'>
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
                {blog.creator.username +" at "+ new Date(blog.createdAt).toLocaleString('en-IN', {  hour: '2-digit', minute: '2-digit',hour12: true, year: 'numeric', month: 'long', day: 'numeric',timeZone: 'Asia/Kolkata',})+' IST'}
              </P>

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
