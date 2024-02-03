import getAllBlog from '@/controllers/allblog'
import React from 'react'

export default async function Blogs({context}:any) {
  const pageno = parseInt(context?.searchParams.page)
  const blogs = await getAllBlog(pageno);
  console.log(blogs);
   
  return (
    <div>page</div>
  )
}
