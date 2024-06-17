import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AnimationData from './Motion/AnimationData'

// Define the interfaces
interface Image {
  link: string;
}

interface Creator {
  avatar?: string;
  createdby: string;
  username: string;
}

interface Blog {
  _id: string;
  title: string;
  info: string;
  images: Image[];
  creator: Creator;
  updatedAt: string;
}

interface BlogProps {
  data: Blog[];
}


export default function BlogCards({ data }: BlogProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.map((blog: Blog, index: number) => (
        <AnimationData
          key={blog._id}
          index={index}
          whileTap={{ scale: 0.99 }}
          whileHover={{ scale: 1.05}}
          className="overflow-hidden rounded-lg shadow-lg hover:scale-105 bg-white dark:bg-gray-800 border border-transparent hover:border-orange-500 hover:bg-orange-500/10 hover:dark:bg-orange-400/10"
        >
          <div className="block group">
            <Link href={`/blogs/${blog._id}`} key={blog._id} passHref>
              <div className="">
                <Image
                  src={blog.images[0].link}
                  alt="Blog Image"
                  className="w-full h-48 object-cover"
                  width={300}
                  height={200}
                />
              </div>
              <div className="p-6 ">
                <h3 className="text-2xl font-semibold mb-2 text-orange-500 dark:text-orange-400 group-hover:text-black group-hover:dark:text-white ">
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
            </Link>
          </div>
        </AnimationData>
      ))}
    </div>
  );
}
