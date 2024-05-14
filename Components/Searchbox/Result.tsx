import { getSearchbarBlogs } from '@/controllers/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ResultProp{
    query: string
}

export default async function SearchbarResult({query}:ResultProp) {
    const results = await getSearchbarBlogs(query) || ""
  return (
    <>
                
                    
                        {results.length === 0 ? (
                            <p>No Blogs Available Named: <span className='text-orange-500'>{query}</span></p>
                        ) : (
                            <div className="flex gap-2 flex-wrap w-full">
                                {results.map((blog: any) => (
                                    <Link href={`/blogs/${blog._id}`} key={blog._id} className="flex w-full items-center p-2 border border-slate-300 dark:border-slate-500 hover:border-orange-500 dark:hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-200/50 dark:hover:bg-orange-800/10 rounded-md">
                                        <Image
                                            width={200}
                                            height={200}
                                            className="w-28 h-20 mr-2 object-cover rounded border dark:border-slate-500 bg-slate-200/50 dark:bg-slate-600"
                                            src={blog.image.link}
                                            alt={blog.title}
                                            />
                                        <div className=' space-y-2'>
                                            <h2 className="font-semibold ">{blog.title}</h2>
                                            <p className="flex gap-2 items-center text-sm"><Image src={blog.creator.avatar} alt='userimage' width={50} height={50} className=' w-5 h-5 rounded-full'/><span className=' opacity-80'>{blog.creator.username}</span></p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
    </>
  )
}
