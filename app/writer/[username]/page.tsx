import getSingleWriter from '@/controllers/singlewriter';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

interface BlogProps {
  params: {
    username: string;
  };
}

export default async function OneWriter({ params: { username } }: BlogProps) {
  const writer = await getSingleWriter(username);
  
  return (
    <div className="container mx-auto p-4">
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <div className="flex items-center space-x-4">
          <img src={writer.user.avatar} alt={writer.user.name} className="w-32 h-32 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{writer.user.name}</h2>
            <p className="text-gray-600">{writer.user.username}</p>
            <p className="text-gray-600">{writer.user.email}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-xl font-semibold">Total Blogs</h3>
            <p>{writer.blogs.all.length}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Joined</h3>
            <p>{writer.user.createdAt}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Shares & Saves</h3>
            <p>Saves: {writer.stats.totalSaves}, Shares: {writer.stats.totalShares}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Most Shared</h3>
          <Link href={`/blogs/${writer.blogs.mostShared._id}`} className="block bg-white p-4 rounded-lg shadow mb-4">
            <img src={writer.blogs.mostShared.images[0].link} alt={writer.blogs.mostShared.title} className="w-full h:32 lg:h-48 object-cover rounded-lg" />
            <h4 className="text-lg font-bold mt-2">{writer.blogs.mostShared.title}</h4>
            <p className="text-gray-600 mt-1">{writer.blogs.mostShared.info}</p>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Most Saved</h3>
          <Link href={`/blogs/${writer.blogs.mostSaved._id}`} className=" block bg-white p-4 rounded-lg shadow mb-4">
            <img src={writer.blogs.mostSaved.images[0].link} alt={writer.blogs.mostSaved.title} className="w-full h-32 lg:h-48 object-cover rounded-lg" />
            <h4 className="text-lg font-bold mt-2">{writer.blogs.mostSaved.title}</h4>
            <p className="text-gray-600 mt-1">{writer.blogs.mostSaved.info}</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Recent Blogs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {writer.blogs.recent.map((blog:any) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id} className="bg-white p-4 rounded-lg shadow mb-4">
                <img src={blog.images[0].link} alt={blog.title} className="w-full h-32 object-cover rounded-lg" />
                <h4 className="text-lg font-bold mt-2">{blog.title}</h4>
                <p className="text-gray-600 mt-1">{blog.info}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Popular Blogs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {writer.blogs.popular.map((blog:any) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id} className="bg-white p-4 rounded-lg shadow mb-4">
                <img src={blog.images[0].link} alt={blog.title} className="w-full h-32 object-cover rounded-lg" />
                <h4 className="text-lg font-bold mt-2">{blog.title}</h4>
                <p className="text-gray-600 mt-1">{blog.info}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      

      <div className=" py-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">All Blogs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {writer.blogs.all.map((blog:any) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id} className="bg-white p-4 rounded-lg shadow mb-4">
                <img src={blog.images[0].link} alt={blog.title} className="w-full h-32 object-cover rounded-lg" />
                <h4 className="text-lg font-bold mt-2">{blog.title}</h4>
                <p className="text-gray-600 mt-1">{blog.info}</p>
              </Link>
            ))}
          </div>
      </div>
    </div>
  </div>
  );
};
