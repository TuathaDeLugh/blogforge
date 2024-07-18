import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from 'next/link';

const DarkmodeCSR = dynamic(() => import('./Darkmode'), { ssr: false })

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-slate-700" >
  <div className="mx-auto max-w-[1500px] space-y-8 px-4 pt-10 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
    <div className="lg:col-span-2">
        <div className=" flex items-center gap-3 ">
          <Image src={'/BlogForge.png'} height={60} width={60} alt='LOGO' className='rounded-full' />
          <Image src={'/Logo.png'} height={100} width={200} alt='LOGO'/>
        </div>

        <p className="mt-4 text-gray-500 dark:text-gray-400  max-w-md">
        BlogForge, your destination for inspired blogging. Unleash creativity with our innovative platform, where every word matters. Connect, create, and elevate your stories with us.
        </p>

        <ul className="mt-2 flex gap-6">
          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-blue-500 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">Facebook</span>

              <FaFacebook size={25} />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-rose-500 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">Instagram</span>

              <FaInstagram size={25} />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-sky-400 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">Twitter</span>

              <FaTwitter size={25} />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-900 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">GitHub</span>

              <FaGithub size={25} />
            </Link>
          </li>
        </ul>
        <div className='mt-4 flex gap-3  items-center'>
          <p className='text-slate-500 dark:text-slate-300'>MODE</p>
        <DarkmodeCSR/>
        </div>
      </div>

      <div className='text-center md:text-left'>
      <p className="font-medium text-lg text-orange-600 dark:text-orange-400">Company</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                About BlogForge
              </Link>
            </li>

            <li>
              <Link href="/terms" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Terms & Condation
              </Link>
            </li>

            <li>
              <Link href="/contact" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        
        <div className='text-center md:text-left' >
          <p className="font-medium text-lg text-orange-600 dark:text-orange-400">Category</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="/blogs/filter/Lifestyle" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Lifestyle
              </Link>
            </li>

            <li>
              <Link href="/blogs/filter/Food%20and%20Cooking" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Food And Cooking
              </Link>
            </li>

            <li>
              <Link href="/blogs/filter/Education" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Education
              </Link>
            </li>

            <li>
              <Link href="/blogs/filter/Gaming" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Gaming
              </Link>
            </li>
          </ul>
        </div>

        

         <div className='text-center md:text-left'>
         <p className="font-medium text-lg text-orange-600 dark:text-orange-400">Helpful Links</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="/" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Home
              </Link>
            </li>

            <li>
              <Link href="/blogs" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                All blog
              </Link>
            </li>

            <li>
              <Link href="/writer" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                All Writer
              </Link>
            </li>
            <li>
              <Link href="/user/blog/tab" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                My blog
              </Link>
            </li>
          </ul>
        </div>
    </div>

    <p className="text-xs text-gray-500 dark:text-gray-400 text-center border-t dark:border-slate-700 p-5">
      &copy; {(new Date().getFullYear())} Sailor. All rights reserved.
    </p>
  </div>
</footer>
  )
}
