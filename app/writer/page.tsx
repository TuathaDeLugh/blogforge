import AnimationData from '@/Components/Motion/AnimationData';
import { H1 } from '@/Components/Motion/Motion';
import Pagination from '@/Components/Pagination';
import getAllWriter from '@/controllers/allwriter';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaShare } from 'react-icons/fa'
import { IoHeartCircleOutline } from 'react-icons/io5'
import { MdDateRange, MdDescription } from 'react-icons/md';

export default async function Writer( context :any) {
    const pageno = parseInt(context?.searchParams.page)
    
    const writers = await getAllWriter(pageno)
    
    return (
        <>
            <section className="max-w-[1500px] mx-auto px-2 md:px-4">
                <div className="relative my-5 md:mt-16">
                    <H1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 0.1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
                    >
                        Creators
                    </H1>
                    <H1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
                        All Writers
                    </H1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-4'>

                    {/* LOOP */}
                    {
                        writers.data.map((writer: any, index: number) => (
                            <AnimationData
                                key={1}
                                index={index}
                                className="border bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border-slate-500 hover:border-orange-500 dark:hover:border-orange-400 ">
                                <Link href={`/writer/${writer.username}`}>

                                    <div className="p-4">
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                alt={writer.username}
                                                className="rounded-full object-cover w-24 h-24"
                                                height={100}
                                                width={100}
                                                src={writer.avatar}
                                            />
                                            <div className="space-y-1">
                                                <p className="font-medium">{writer.name}</p>
                                                <p className="text-sm text-orange-500 dark:text-orange-400">@{writer.username}</p>
                                                <div className="flex text-xs items-center space-x-1 text-gray-500 dark:text-gray-400">
                                                    <MdDateRange className="w-4 h-4" />
                                                    <span className="text-sm">Joined : {writer.joined}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <FaShare size={18} className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium">{writer.totalShares}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MdDescription size={18} className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium">{writer.totalBlogs}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <IoHeartCircleOutline size={18} className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium">{writer.totalSaves}</span>
                                        </div>
                                    </div>
                                </Link>
                            </AnimationData>
                        )
                        )
                    }
                </div>
                <Pagination pagedata={writers.meta}/>
            </section>
        </>
    )
}
