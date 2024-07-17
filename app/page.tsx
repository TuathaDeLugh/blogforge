import React, { Suspense } from 'react'
import Search from '@/Components/Searchbox/Search';
import HomePage from '@/Components/Homepage';
import HomePageSkeletonLoader from '@/Components/layout/LoadingHome';
import Trending from '@/Components/Trending';
import LoadingTrending from '@/Components/layout/LoadingTrending';

export default async function Home() {

  
  return (
    <section className='max-w-[1500px] mx-auto'>
      <Suspense fallback={<LoadingTrending/>}>
      <Trending/>
      </Suspense>
      <Search/>
      <Suspense fallback={<HomePageSkeletonLoader/>}>
      <HomePage/>
      </Suspense>
    </section>
  )
}
