"use client"
import { Div } from "@/Components/Motion/Motion";
import Image from "next/image";
import React from "react";

export default function Error() {
    return (
        <>
            <section className="max-w-[1500px] mx-auto">
                <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 min-h-[93vh] md:min-h-[91vh]  items-center flex justify-center flex-col lg:flex-row md:gap-28 gap-16">
                    <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                        <Div className="mx-auto"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}>

                            <div>
                                <div 
                                className=" lg:absolute left-0 md:-top-16 lg:-top-20 text-[100px] lg:text-[200px] font-black text-slate-300 lg:opacity-30 lg:dark:opacity-10 "
                                >404</div>
                                <div className="">
                                    <h1 className="my-2 text-orange-400  font-bold text-2xl">
                                        Looks like you&apos;ve found the
                                        doorway to the great nothing
                                    </h1>
                                    <p className="my-2 text-gray-800 dark:text-gray-400">Sorry about that! Please visit our hompage to get where you need to go.</p>
                                    <a href="/" className=" block  w-52 my-2 border rounded md py-4 px-8 text-center bg-orange-400 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me Home!</a>
                                </div>
                            </div>
                        </Div>
                    </div>
                    <Div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }} className=" w-[50%] flex justify-center md:justify-end  ">
                        <Image width={400} height={400} alt="disconnected" src="https://firebasestorage.googleapis.com/v0/b/blog-forge-sailor.appspot.com/o/202012_07.jpg?alt=media&token=82f0ce91-8dd4-4d73-b126-e64351ef4877" className="rounded-full" />
                    </Div>
                </div>
            </section>
        </>
    );
};