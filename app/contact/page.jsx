'use client'
import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion';
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { RiQuestionAnswerLine } from "react-icons/ri";
export default function contact() {
  return (
    <div
      className="flex md:min-h-[90vh] items-center"
    >
      <div
        className="px-5 md:px-10 grid md:grid-cols-2 items-center gap-16 my-6 mx-auto max-w-[1500px]"
      >

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
              >
              Contact Us
            </motion.h1>
            <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              Let&apos;s Talk
            </motion.h1>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-extrabold"
          ></motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-gray-400 mt-3"
            class="text-sm text-gray-400 mt-3">Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about your project  and provide help.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            class="mt-12">
            <h2 class="text-lg font-semibold text-orange-400">Email</h2>
            <ul class="mt-3">
              <li class="flex items-center">
                <p class="bg-[#e6e6e6cf] dark:bg-slate-700  p-4 rounded-full flex items-center justify-center shrink-0">
                  <CiMail size={30} />
                </p>
                <p class=" text-sm ml-3">
                  <span class="block">Mail</span>
                  <strong>umangsailor@hotmail.com</strong>
                </p>
              </li>

            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            class="mt-12">
            <h2
              class="text-lg font-semibold text-orange-400">FAQs</h2>
            <ul class="mt-3">
              <li class="flex items-center">
                <Link href={'faqs'} class="bg-[#e6e6e6cf] dark:bg-slate-700 p-4 rounded-full flex items-center justify-center shrink-0">
                  <RiQuestionAnswerLine size={30} />
                </Link>
                <p class=" text-sm ml-3">
                  <span class="block">FAQ</span>
                  <strong>Did you Checked FAQs?</strong>
                </p>
              </li>

            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            class="mt-12">
            <h2 class="text-lg font-extrabold">Socials</h2>
            <ul class="flex mt-3 space-x-4">
              <li class="bg-[#e6e6e6cf] dark:bg-slate-700 p-3 rounded-full flex items-center justify-center shrink-0">
                <a href="#" target='_blank'>
                  <FaFacebook size={25} />
                </a>
              </li>
              <li class="bg-[#e6e6e6cf] dark:bg-slate-700 p-3 rounded-full flex items-center justify-center shrink-0">
                <a href="#" target='_blank'>
                  <FaInstagram size={25} />
                </a>
              </li>
              <li class="bg-[#e6e6e6cf] dark:bg-slate-700 p-3 rounded-full flex items-center justify-center shrink-0">
                <a href="#" target='_blank'>
                  <FaTwitter size={25} />
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        <motion.div className="h-full flex items-center relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}>

          <form
             class="mx-auto space-y-4 p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 ">
            <input
              type="text"
              placeholder="Name"

              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-orange-500"
            />
            <input
              type="email"
              placeholder="Email"

              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-orange-500"
            />
            <input
              type="text"
              placeholder="Subject"

              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-orange-500"
            />
            <textarea
              placeholder="Message"
              rows="12"

              className="w-full resize-none rounded-md px-4 bg-gray-100 dark:bg-gray-700 text-sm pt-3 outline-orange-500"
            ></textarea>
            <button
              type="button"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white bg-orange-400 hover:bg-orange-600 font-semibold rounded-md text-sm px-4 py-3 w-full"
            >
              Send
            </button>
          </form>
          <div
                            className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 lg:block">
                        </div>
        </motion.div>
      </div>
    </div>
  )
}
