import getAllBlog from '@/controllers/allblog'
import React from 'react'

export default async function Blogs({context}:any) {
  const pageno = parseInt(context?.searchParams.page)
  const blogs = await getAllBlog(pageno);
  // console.log(blogs);
   
  return (
    <>
<div className="mx-auto px-4 max-w-[1500px] grid grid-cols-2 gap-5 ">
        <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
            <div className="md:flex-shrink-0">
                <img src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg" alt="mountains" className="w-full h-64 rounded-lg rounded-b-none object-cover"/>
            </div>
            <div className="px-4 py-2 mt-2">
                <h2 className="font-bold text-2xl text-gray-800 tracking-normal">My Amaizing Journey to the Mountains.</h2>
                    <p className="text-sm text-gray-700 px-2 mr-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora reiciendis ad architecto at aut placeat quia, minus dolor praesentium officia maxime deserunt porro amet ab debitis deleniti modi soluta similique...
                    </p>
                <div className="author flex items-center -ml-3 my-3">
                    <div className="user-logo">
                        <img className="w-12 h-12 object-cover rounded-full mx-4  shadow" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar"/>
                    </div>
                    <h2 className="text-sm tracking-tighter text-gray-900">
                        <a href="#">By Mohammed Ibrahim</a> <span className="text-gray-600">21 SEP 2015.</span>
                    </h2>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
