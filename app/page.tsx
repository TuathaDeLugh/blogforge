import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/options';
import Carousel from '@/Components/Crousel';
import AnimationList from '@/Components/Motion/AnimationList';

export default async function Home() {
  const images = [
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  const session = await getServerSession(authOptions)
  console.log(session);
  const  data = ['apple','mango','banana','pineapple','watermelon','melon','strowbarry','blueberry','raspberry','cherry','peach']
  return (
    <section className='max-w-[1500px] mx-auto'>
      <Carousel images={images} />
      {session?.user?.dbid}
      <AnimationList data={data}/>
    </section>
  )
}
