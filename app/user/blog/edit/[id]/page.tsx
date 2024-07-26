import { H1 } from '@/Components/Motion/Motion'
import React from 'react'
import EditBlogForm from './EditBlogForm';
import Goback from '@/Components/layout/GoBack';
import { getSingleblog } from '@/controllers/blog';

interface EditBlogProps {
  params: {
    id: string;
  };
}

export default async function EditBlog({ params: { id } }: EditBlogProps) {
  const blog = await getSingleblog(id)
  // console.log(blog);


  return (
    <>
      <section className='max-w-[1500px] mx-auto px-4 lg:px-8 '>

      <div className="flex items-end my-5 md:mt-16">

<Goback/>
<div className="relative ">
<H1
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 0.1, y: 0 }}
transition={{ duration: 0.3 }}
className="absolute md:-top-16 lg:-top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
>
Edit
</H1>
<H1
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3}} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
{blog.title}
</H1>
</div>
</div>
        <EditBlogForm blog={blog} />
      </section>
    </>
  )
}
