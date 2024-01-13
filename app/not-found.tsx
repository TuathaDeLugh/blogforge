"use client"
import Image from "next/image";
import React from "react";

export default function Error() {
  return (
    <>
    <section className="max-w-[1500px] mx-auto">
<div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="mx-auto">

                    <div>
                        <Image width={400} height={400} alt="404" className="w-[50%]" src="https://i.ibb.co/G9DC8S0/404-2.png" />
                        <div className="">
                            <h1 className="my-2 text-gray-800 dark:text-gray-400 font-bold text-2xl">
                                Looks like you've found the
                                doorway to the great nothing
                            </h1>
                            <p className="my-2 text-gray-800 dark:text-gray-400">Sorry about that! Please visit our hompage to get where you need to go.</p>
                            <a href="/" className=" block  w-52 my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me Home!</a>
                        </div>
                    </div>
                    </div>
                </div>
            <div className=" w-[50%] flex justify-center md:justify-end ">
                <Image width={400} height={400} alt="disconnected" src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
        </section>
    </>
  );
};