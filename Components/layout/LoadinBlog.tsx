import React from 'react'

export default function LoadingBlogs() {
    const blogs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <section className='px-3 md:px-5 max-w-[1500px] mx-auto mb-5 '>
        <div className="relative my-5 md:mt-16">
     <h1
         className="absolute -top-16 -z-10 px-32 py-10  left-0 text-[80px] lg:text-[100px] bg-gray-900 font-bold  dark:bg-gray-200 rounded-full opacity-5 md:block hidden"
         >
         
       </h1>
       <h1
       className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
         <span className=' block w-[60%] py-7 bg-slate-200 dark:bg-slate-700 rounded-full'></span>
       </h1>
     </div>
     <div className="my-5 flex  items-center justify-center gap-3"

>
 <div className=" bg-gray-300/50 dark:bg-slate-700/50 rounded-lg w-full md:w-[30rem] flex shadow dark:shadow-slate-700 backdrop-blur-md ">
   <div className=" p-5 md:p-7  inline-block relative w-4/5">
   </div>
 </div>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse duration-300 ">
            {
                blogs.map((index: number) => (
                    <div
                        key={index}
                        className="border bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-slate-500"
                    >
                        <div className="flex flex-col space-y-3 p-6 rounded-t-lg bg-white dark:bg-gray-800">
                            <div

                                className="w-full h-48 object-cover mb-4 rounded bg-slate-200 dark:bg-slate-600"

                            />
                            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight bg-slate-200 dark:bg-slate-700 rounded-full p-4 w-[70%]">
                            </h3>
                            <p className="mt-2 text-gray-900 dark:text-white bg-slate-200 dark:bg-slate-700 rounded-full p-3">

                            </p>
                        </div>
                        <div className="px-6 bg-white dark:bg-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center">

                                <span className=' p-3 rounded-full border dark:border-slate-500 bg-slate-200 dark:bg-slate-600' />
                                <span className='p-2 bg-slate-200 dark:bg-slate-700 rounded-full w-[60%]' />

                            </p>

                        </div>
                        <div className=" flex items-center p-6 rounded-b-lg bg-white dark:bg-gray-800">
                            <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-9 rounded-md px-3 text-white bg-orange-400  dark:bg-orange-500/80 "
                            >
                                <span className='p-2 bg-slate-200/20 backdrop-blur-md rounded-full w-[4.5rem]' />
                            </div>
                        </div>
                    </div>
                ))

            }

        </div>
        </section>
    )
}
