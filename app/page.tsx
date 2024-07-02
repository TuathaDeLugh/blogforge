import React from 'react'
import Carousel from '@/Components/layout/Crousel';
import Search from '@/Components/Searchbox/Search';
import { authOptions } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import BlogList from '@/Components/BlogList';
import UserList from '@/Components/UserList';
import getHomeData from '@/controllers/homedata';

export default async function Home() {
  
  const session = await getServerSession(authOptions)
  const data = await getHomeData()
  console.log(data.trending);
  
  return (
    <section className='max-w-[1500px] mx-auto'>
      <Carousel data = {data.trending} />
      <Search/>
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Our Blog</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Blogs</h2>
        <BlogList blogs={data?.recent || []} />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Blogs</h2>
        <BlogList blogs={data?.popular || []} />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Trending Blogs</h2>
        <BlogList blogs={data?.trending || []} />
      </section>
      {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Blogs by Category</h2>
        <BlogList blogs={data?.category || []} />
      </section> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Most Shared Blogs</h2>
        <BlogList blogs={data?.mostShared || []} />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Most Saved Blogs</h2>
        <BlogList blogs={data?.mostSaved || []} />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Writers</h2>
        <UserList users={data?.topWriters || []} />
      </section>
    </div>

    </section>
  )
}
