import AnimationData from '@/Components/Motion/AnimationData';
import { H1 } from '@/Components/Motion/Motion';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaShare } from 'react-icons/fa'
import { IoHeartCircleOutline } from 'react-icons/io5'
import { MdDateRange, MdDescription } from 'react-icons/md';

export default function Writer() {
    const writers = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6]
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4'>
                
                {/* LOOP */}
                {
                    writers.map((writer:any, index:number) => (
                        <AnimationData
                        key={1}
                        index={index}
                        className="border bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border-slate-500 hover:border-orange-500 dark:hover:border-orange-400 ">
                            <Link href={'/writer/abc'}>

                    <div className="p-4">
                        <div className="flex items-center space-x-4">
                            <Image
                                alt="User Avatar"
                                className="rounded-full object-cover w-24 h-24"
                                height={100}
                                width={100}
                                src="https://firebasestorage.googleapis.com/v0/b/blog-forge-sailor.appspot.com/o/Avatars%2FAvatar%20(1).png?alt=media"
                                />
                            <div className="space-y-1">
                                <p className="font-medium">John Doe</p>
                                <p className="text-sm text-orange-500 dark:text-orange-400">@johndoe</p>
                                <div className="flex text-xs items-center space-x-1 text-gray-500 dark:text-gray-400">
                                    <MdDateRange className="w-4 h-4" />
                                    <span className="text-sm">joined 2 months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <FaShare size={18} className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium">1.2K</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MdDescription size={18} className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium">25</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <IoHeartCircleOutline size={18} className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium">500</span>
                        </div>

                    </div>
                            </Link>
                </AnimationData>
                            )
                        )
                            }
                                </div>
            </section>
            </>
        )
    }
    