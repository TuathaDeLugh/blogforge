import Image from 'next/image'
import React from 'react'
import { FaFeatherAlt } from 'react-icons/fa';
import { Child, Parent } from '@/Components/Motion/Data';
import { Div, H1, P } from '@/Components/Motion/Motion';


export default function About() {
  return (
    <section className="flex items-center lg:py-10">
      <div className="justify-center flex-1 max-w-[1500px] py-4 mx-auto lg:py-6 md:px-6">
        <Div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap "
        >
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="relative">
              <Image width={300} height={250} src="/About.gif" alt=""
                className="relative z-40 object-cover w-full bg-slate-200 h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded" />
              <Div
        initial={{ opacity: 0, x: 20, y:-20 }}
        animate={{ opacity: 1, x: 0,y:0  }}
        transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute z-10 hidden w-full h-full bg-orange-400 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block">
              </Div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 lg:mb-0 ">
            <div className="relative">
              <H1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 lg:block hidden">
                About Us
              </H1>
              <H1

                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
                Welcome to Blog Forge
              </H1>
            </div>
            <P
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400 text-justify">
              Your ultimate destination for seamless and expressive blogging. At BlogForga, we&apos;ve crafted a sophisticated web application that effortlessly marries an elegant user interface with powerful features, empowering both newcomers and seasoned bloggers to bring their ideas to life. Our platform is designed to be your creative haven, where you can easily create, customize, and share captivating content. Whether you&apos;re a seasoned writer, a niche enthusiast, or an aspiring influencer, BlogForg provides a versatile space for you to unleash your creativity, share multimedia content, and connect with a global audience. Join us on this exciting journey where the art of blogging converges with the convenience of modern technology. Elevate your online presence with BlogForga, where your voice truly matters
            </P>
          </div>
        </Div>
        <span id='feature'></span>
        <Div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-6 mb-10 lg:mt-24 lg:mb-14 px-4"

        >
          <H1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 lg:block hidden">
            Features
          </H1>
          <H1

            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
            Why Choose Us
          </H1>
        </Div>
        <Parent className="flex flex-wrap mx-4">


          <Card heading='Adaptive Theme Switching' data='Enjoy a tailored writing experience with our Adaptive Theme Switching. Let your surroundings influence your creativity by seamlessly adjusting between light and dark modes, ensuring optimal visibility and comfort in any environment.' />

          <Card heading='Cross-Platform Harmony' data={`Immerse yourself in a unified blogging experience across all your devices. With Cross-Platform Harmony, BlogForga ensures that your creativity is never confined  whether you're crafting posts on your laptop, tablet, or smartphone.`} />
          <Card heading='Fortified Security with Google Shield' data={`Trust in the security of BlogForga with our exclusive Google Shield integration. Benefit from an additional layer of protection through Google Authentication, providing peace of mind while simplifying the login process.`} />
          <Card heading='Swift and Smart with NextGen Tech' data={`Elevate your blogging journey with the power of Next.js technology. Experience a platform that is both swift and intelligent, as NextGen Tech enhances the speed, performance, and overall efficiency of BlogForg.`} />
          <Card heading='Intuitive Design Elegance' data={`Choose a blogging platform that not only looks stunning but also feels intuitive. Our Intuitive Design Elegance ensures a seamless and aesthetically pleasing user interface, enhancing the overall user experience for bloggers of all levels.`} />
          <Card heading='Creative Freedom with Rich Multimedia Toolbox' data={`Unleash your creativity with the Rich Multimedia Toolbox. Craft visually stunning blog posts effortlessly by leveraging a range of formatting options, multimedia embedding capabilities, and a suite of tools that transform your ideas into captivating content.`} />
        </Parent>
      </div>

    </section>
  )
}


function Card({ heading, data }: { heading: string; data: string }) {
  return (
    <Child
      className="w-full px-4 mb-16 md:w-1/2 lg:w-1/3"
    >
      <div
        className="relative h-full px-8 pt-16 pb-8 transition duration-200 rounded-md shadow-md border dark:border-slate-600 dark:shadow-gray-700/50 "
      >
        <div
          className="absolute top-0 inline-flex items-center justify-center w-16 h-16 transition duration-200 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full dark:bg-gray-900 left-1/2">
          <div
            className="inline-flex items-center justify-center w-12 h-12 text-white bg-orange-500 rounded-full">
            <FaFeatherAlt size={25} />
          </div>
        </div>
        <h2 className="max-w-xs mb-4 text-xl font-bold leading-7 text-gray-700 dark:text-gray-300">
          {heading}
        </h2>
        <p className="font-medium text-gray-500 transition duration-200 dark:text-gray-500 text-justify">
          {data}
        </p>
      </div>
    </Child>
  )
}
