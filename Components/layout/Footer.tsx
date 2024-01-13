import React from 'react'
import Darkmode from './Darkmode'
import Image from 'next/image'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-slate-700" >
  <div className="mx-auto max-w-[1500px] space-y-8 px-4 pt-10 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
    <div className="lg:col-span-2">
        <div className="">
          <Image src={'/Logo.png'} height={100} width={200} alt='LOGO'/>
        </div>

        <p className="mt-4 text-gray-500 dark:text-gray-400  max-w-md">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam
          molestias.
        </p>

        <ul className="mt-2 flex gap-6">
          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-blue-500 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">Facebook</span>

              <FaFacebook size={25} />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-rose-500 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">Instagram</span>

              <FaInstagram size={25} />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-sky-400 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">Twitter</span>

              <FaTwitter size={25} />
            </a>
          </li>

          <li>
            <a
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-900 transition hover:opacity-75 dark:text-gray-300"
            >
              <span className="sr-only">GitHub</span>

              <FaGithub size={25} />
            </a>
          </li>
        </ul>
        <div className='mt-4 flex gap-3  items-center'>
          <p className='text-slate-500 dark:text-slate-300'>MODE</p>
        <Darkmode/>
        </div>
      </div>

      <div className='text-center md:text-left'>
          <p className="font-medium text-lg text-gray-900 dark:text-white">Company</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                About
              </Link>
            </li>

            <li>
              <Link href="/about#feature" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Features
              </Link>
            </li>

            <li>
              <Link href="/contact" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Contact
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
          <p className="font-medium text-lg text-gray-900 dark:text-white">Category</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Lifestyle
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Food
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Educational
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Gaming
              </a>
            </li>
          </ul>
        </div>

        

         <div className='text-center md:text-left'>
          <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                All Review
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                My Review
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                My Saved Review
              </a>
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
