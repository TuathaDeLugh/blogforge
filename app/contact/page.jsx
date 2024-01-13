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
        className="px-5 md:px-10 grid md:grid-cols-2 items-center gap-16 my-6 mx-auto max-w-7xl font-[sans-serif]"
      >

            <motion.div 
                    initial={{ opacity: 0, x:-50  }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
            >
                <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-extrabold"
          >Let&apos;s Talk</motion.h1>
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
                    <h2 class="text-lg font-extrabold">Email</h2>
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
                     class="text-lg font-extrabold">FAQs</h2>
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
            <div className="h-full flex items-center">
            <motion.form 
                    initial={{ opacity: 0, x:50  }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }} class="mx-auto space-y-4 p-7 rounded-lg border shadow dark:border-slate-500 dark:shadow-slate-600 ">
                <motion.input
              type="text"
              placeholder="Name"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-blue-500"
            />
            <motion.input
              type="email"
              placeholder="Email"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-blue-500"
            />
            <motion.input
              type="text"
              placeholder="Subject"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-blue-500"
            />
            <motion.textarea
              placeholder="Message"
              rows="12"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full resize-none rounded-md px-4 bg-gray-100 dark:bg-gray-700 text-sm pt-3 outline-blue-500"
            ></motion.textarea>
            <motion.button
              type="button"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-3 w-full"
            >
              Send
            </motion.button>
            </motion.form>
            </div>
        </div>
        </div>
  )
}
