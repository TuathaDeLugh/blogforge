import React from 'react'
import Darkmode from './Darkmode'
import Image from 'next/image'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-slate-700" >
  <div className="mx-auto max-w-[1500px] space-y-8 px-4 pt-10 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      <div>
        <div className="text-teal-600 dark:text-teal-300">
          <Image src={'/Logo.png'} height={100} width={200} alt='LOGO'/>
        </div>

        <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
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

      <div className=" text-center sm:text-left grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
        <div>
          <p className="font-medium text-lg text-gray-900 dark:text-white">Services</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                1on1 Coaching
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Company Review
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Accounts Review
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                HR Consulting
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                SEO Optimisation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-lg text-gray-900 dark:text-white">Company</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                About
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Meet the Team
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Accounts Review
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Contact
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                FAQs
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Live Chat
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-lg text-gray-900 dark:text-white">Legal</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Accessibility
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Returns Policy
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Refund Policy
              </a>
            </li>

            <li>
              <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                Hiring Statistics
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p className="text-xs text-gray-500 dark:text-gray-400 text-center border-t dark:border-slate-700 p-5">
      &copy; {(new Date().getFullYear())} Sailor. All rights reserved.
    </p>
  </div>
</footer>
  )
}
