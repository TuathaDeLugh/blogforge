import React from 'react';

export default function LoadingOneBlog() {
  const review = {
    category: ['1', '2', '3'],
    characters: [1, 2, 3],
    comments: [1, 2, 3, 4, 5, 6, 7, 8],
  };
  return (
    <>
      <section className="px-4 lg:px-8 mx-auto max-w-[1500px] animate-pulse duration-300">
        <div className="relative my-5 md:mt-16 animate-pulse duration-300">
          <h1 className="absolute -top-16 -z-10 px-32 py-10  left-0 text-[80px] lg:text-[100px] bg-gray-900 font-bold  dark:bg-gray-200 rounded-full opacity-5 md:block hidden"></h1>
          <h1 className="pl-2 text-3xl font-bold border-l-8 border-slate-400 md:text-5xl dark:text-white">
            <span className=" block w-[60%] py-7 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
          </h1>
        </div>

        <div className="flex justify-center flex-wrap lg:border-b dark:border-slate-400 pb-10">
          <div className="mx-2 rounded-lg h-48 md:h-[40rem] bg-slate-200 dark:bg-slate-700 w-full lg:w-[70%] xl:w-[77%]" />
          <div className=" text-lg w-full ">
            <div className="mt-5 flex flex-wrap">
              <div className="mt-2 w-36 bg-slate-300 dark:bg-slate-600 rounded-full p-3 " />

              {review.category?.map((category) => {
                return (
                  <span
                    key={category.split('_').join(' ')}
                    className="bg-slate-300 dark:bg-slate-600 rounded-full mt-2 w-20 p-3 mx-2"
                  />
                );
              })}
            </div>
            <div className="mt-5 w-full">
              <div className="mt-5 flex gap-3">
                <div className="w-28  bg-slate-300 dark:bg-slate-600 rounded-full p-3 " />
                <div className="grow bg-slate-300 dark:bg-slate-600 rounded-full p-3" />
              </div>
              <div className="mt-3 w-full bg-slate-300 dark:bg-slate-600 rounded-full p-3" />
              <div className="mt-3 w-full bg-slate-300 dark:bg-slate-600 rounded-full p-3" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 ">
              <p className="rounded-full  tracking-wider mt-3 bg-slate-300 dark:bg-slate-600 py-3 px-20"></p>
              <p className="rounded-full tracking-wider flex gap-3 items-center mt-3 bg-slate-300 dark:bg-slate-600 py-3 px-20"></p>
              <div className=" grow sm:grow-0">
                <div className="bg-slate-300 dark:bg-slate-600 mt-3 text-white rounded-full  w-full py-5 md:w-40 hover:bg-orange-600 focus:outline-none focus:shadow-outline-green active:bg-orange-800 disabled:opacity-30 flex justify-center items-center gap-2" />
              </div>
            </div>

            <div className="mt-3 w-44 bg-slate-300 dark:bg-slate-600 rounded-full p-3 " />
          </div>
        </div>
        <div className="flex justify-between flex-wrap mt-5 ">
          <div className="w-full lg:w-[70%] xl:w-[77%]">
            <div className="mt-2 w-36  bg-slate-300 dark:bg-slate-600 rounded-full p-2" />

            <div className="w-full mt-5">
              <div className="mt-2 w-44  bg-slate-300 dark:bg-slate-600 rounded-full p-1" />
              <div className="mt-2 w-full  bg-slate-300 dark:bg-slate-600 rounded-lg p-24" />
              <div className="mt-4 w-44  bg-slate-300 dark:bg-slate-600 rounded-full p-1" />
              <div className="mt-2 w-full  bg-slate-300 dark:bg-slate-600 rounded-lg p-28" />
              <div className="mt-4 w-44  bg-slate-300 dark:bg-slate-600 rounded-full p-1" />
              <div className="mt-2 w-full  bg-slate-300 dark:bg-slate-600 rounded-lg p-32" />
            </div>
          </div>
          <div className="w-full lg:w-[25%] xl:w-[20%]">
            <div className="mt-2 w-36  bg-slate-300 dark:bg-slate-600 rounded-full p-2" />
            <div className="flex justify-between">
              <div className=" mt-4 w-9/12 rounded-full bg-slate-100 dark:bg-gray-700 p-5" />
              <div className=" mt-4 rounded-full bg-slate-100 dark:bg-gray-700 p-5" />
            </div>
            <div>
              <div className="pt-2 max-h-[50vh] lg:max-h-[75vh] overflow-hidden flex flex-col gap-2">
                {review.comments?.map((comment) => {
                  return (
                    <div
                      key={comment}
                      className="rounded-lg bg-slate-100 dark:bg-gray-700 p-2"
                    >
                      <div className="py-1 px-2 flex justify-between">
                        <div className="flex items-center">
                          <div className="border bg-slate-400 dark:bg-slate-700 dark:border-slate-400 mr-1 w-7 h-7 rounded-full" />
                          <div className="flex flex-col gap-2">
                            <div className=" w-36  bg-slate-300 dark:bg-slate-600 rounded-full p-3" />
                            <div className=" w-24  bg-slate-300 dark:bg-slate-600 rounded-full p-1" />
                          </div>
                        </div>
                      </div>
                      <div className=" w-46 mt-2 bg-slate-300 dark:bg-slate-600 rounded-full p-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-7 w-44 text-base font-semibold p-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>
      </section>
    </>
  );
}
