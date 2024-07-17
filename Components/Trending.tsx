import React from 'react'
import Carousel from './layout/Crousel'
import getHomeData from '@/controllers/homedata'

export default async function Trending() {
  const data = await getHomeData()
  if (data){
    return (
      <Carousel data = {data?.trending} />
    )
  }
  else{
    return (
      <div>loading</div>
    )
  }
}
