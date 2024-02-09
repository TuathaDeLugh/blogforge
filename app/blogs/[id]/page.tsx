import Carousel from '@/Components/Crousel';
import getSingleblog from '@/controllers/singleblog';
import React from 'react'

interface BlogProps {
  params: {
    id: string;
  };
}

export default async function page({ params: { id } }: BlogProps) {
  const blog = await getSingleblog(id)
  console.log(blog.images);
  
  return (<>
  <section className=" max-w-[1500px] mx-auto ">
    <div className="md:w-[50%]">

  <Carousel data={blog.images}/>
    </div>
  </section>
  </>
  
  )
}
