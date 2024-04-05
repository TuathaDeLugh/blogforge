import React from 'react'
import Carousel from '@/Components/Crousel';
import AnimationList from '@/Components/Motion/AnimationList';
import ShareButton from '@/Components/Sharebutton';
import Search from '@/Components/Search';
import { authOptions } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Home() {
  let images = [
    {
      "_id":"1",
      "title": "Lorem Ipsum",
      "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      "images": [{
        "link": "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
        "name": "Lorem Ipsum Image 1"
      }]
    },
    {
      "_id":"1",
      "title": "Dolor Sit Amet",
      "data": "Dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      "images": [{
        "link": "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "name": "Dolor Sit Amet Image 2"
      }]
    },
    {
      "_id":"1",
      "title": "Consectetur Adipiscing",
      "data": "Consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      "images": [{
        "link": "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "name": "Consectetur Adipiscing Image 3"
      }]
    },
    {
      "_id":"1",
      "title": "Sed Cursus Ante",
      "data": "Sed cursus ante dapibus diam.",
      "images": [{
        "link": "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "name": "Sed Cursus Ante Image 4"
      }]
    },
    {
      "_id":"1",
      "title": "Integer Nec Odio",
      "data": "Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      "images": [{
        "link": "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "name": "Integer Nec Odio Image 5"
      }]
    },
    {
      "_id":"1",
      "title": "Praesent Libero",
      "data": "Praesent libero. Sed cursus ante dapibus diam.",
      "images": [{
        "link": "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "name": "Praesent Libero Image 6"
      }]
    }
  ]
  
  const  data = ['apple','mango','banana','pineapple','watermelon','melon','strowbarry','blueberry','raspberry','cherry','peach']

  const session = await getServerSession(authOptions)

  console.log(session);
  
  return (
    <section className='max-w-[1500px] mx-auto'>
      <Carousel data = {images} />
      <Search/>
      <AnimationList data={data}/>
      <ShareButton link='/'/>

    </section>
  )
}
