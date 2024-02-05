import getAllBlog from '@/controllers/allblog'
import React from 'react'

export default async function Blogs({ context }: any) {
    const pageno = parseInt(context?.searchParams.page)
    const blogs = await getAllBlog(pageno);
    // console.log(blogs);

    return (
        <>
            <div className="mx-auto px-4 max-w-[1500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {
                    blogs.data.map((blog: any) => (
                        <div className="bg-white dark:bg-neutral-800/30  shadow-2xl rounded-lg tracking-wide" >
                            <div className="md:flex-shrink-0">
                                <img src={blog.images[0].link} alt={blog.images[0].name} className="w-full h-64 rounded-lg rounded-b-none object-cover" />
                            </div>
                            <div className="px-4 py-2 mt-2">
                                <h2 className="font-bold text-2xl text-orange-500 tracking-normal">{blog.title}</h2>
                                <p className="text-sm text-gray-700 dark:text-gray-400 px-2 mr-1">
                                    {}
                                </p>
                                <div className="author flex items-center -ml-3 my-3">
                                    <div className="user-logo">
                                        <img className="w-12 h-12 object-cover rounded-full mx-4  shadow" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" />
                                    </div>
                                    <h2 className="text-sm tracking-tighter text-gray-900">
                                        <a href="#">By Mohammed Ibrahim</a> <span className="text-gray-600">21 SEP 2015.</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))

                }

            </div>
        </>
    )
}
