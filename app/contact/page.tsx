'use client'
import { emailSchema } from '@/yupSchema';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { RiQuestionAnswerLine } from "react-icons/ri";
import { Div, H1, P } from '@/Components/Motion/Motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';



export default function Contact() {
  const { data: session} = useSession();
  const user = session?.user;
   const name = user?.name;
   const email = user?.email;
  return (
    <div
      className="flex md:min-h-[90vh] items-center"
    >
      <div
        className="px-5 md:px-10 grid md:grid-cols-2 items-center gap-16 my-6 mx-auto max-w-[1500px]"
      >

        <Div
          className=''
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-20   left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
              >
              Contact
            </H1>
            <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
              Let&apos;s Talk
            </H1>
          </div>
          <P
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-gray-400 mt-3">Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about your project  and provide help.
          </P>
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12">
            <h2 className="text-lg font-semibold text-orange-400">Email</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <p className="bg-[#e6e6e6cf] dark:bg-slate-700  p-4 rounded-full flex items-center justify-center shrink-0">
                  <CiMail size={30} />
                </p>
                <p className=" text-sm ml-3">
                  <span className="block">Mail</span>
                  <strong>umangsailor@hotmail.com</strong>
                </p>
              </li>

            </ul>
          </Div>
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12">
            <h2
              className="text-lg font-semibold text-orange-400">FAQs</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <Link href={'faqs'} className="bg-[#e6e6e6cf] dark:bg-slate-700 p-4 rounded-full flex items-center justify-center shrink-0">
                  <RiQuestionAnswerLine size={30} />
                </Link>
                <p className=" text-sm ml-3">
                  <span className="block">FAQ</span>
                  <strong>Did you Checked FAQs?</strong>
                </p>
              </li>

            </ul>
          </Div>
          <Div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12">
            <h2 className="text-lg font-extrabold">Socials</h2>
            <ul className="flex mt-3 space-x-4">
              <li className="bg-[#e6e6e6cf] dark:bg-slate-700 p-3 rounded-full flex items-center justify-center shrink-0">
                <a href="#" target='_blank'>
                  <FaFacebook size={25} />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] dark:bg-slate-700 p-3 rounded-full flex items-center justify-center shrink-0">
                <a href="#" target='_blank'>
                  <FaInstagram size={25} />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] dark:bg-slate-700 p-3 rounded-full flex items-center justify-center shrink-0">
                <a href="#" target='_blank'>
                  <FaTwitter size={25} />
                </a>
              </li>
            </ul>
          </Div>
        </Div>
        <Div className="h-full flex items-center relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}>

<Form name={name} email={email}/>
          <Div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
         className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block">
      </Div>
        </Div>
      </div>
    </div>
  )
}



interface FormProps {
  name?: string | null;
  email?: string | null;
}


function Form({ name , email}: FormProps) {
  const initialValues = {
      name: name || "",
      email: email || "",
      subject: "",
      details: "",
  };

  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const postapi = async (ogvalues: any) => {
      await fetch(`/api/email`, {
          method: "POST",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify(ogvalues),
      });
      router.refresh();

  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
          initialValues,
          validationSchema: emailSchema,
          onSubmit: (async (values, action) => {
              setDisabled(true);
              toast.promise((postapi(values)), {
                  loading: "Sending Message",
                  success: "Message Sent Successfully",
                  error: " Failed To Send"
              });
              action.resetForm();
              setDisabled(false);
          }
          ),
      });

  return (
      <form onSubmit={handleSubmit}
          className="mx-auto p-4 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 ">

          <div className="w-full h-[4.25rem] inline-block">
              <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`outline ${errors.name && touched.name ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

              />
              {errors.name && touched.name ? (
                  <span className=" text-red-500 text-sm">* {errors.name}</span>
              ) : null}
          </div>


          <div className="w-full h-[4.25rem] inline-block">
              <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`outline ${errors.email && touched.email ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

              />
              {errors.email && touched.email ? (
                  <span className=" text-red-500 text-sm ">
                      * {errors.email}
                  </span>
              ) : null}
          </div>



          <div className="w-full h-[4.25rem] inline-block">
              <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`outline ${errors.subject && touched.subject ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

              />
              {errors.subject && touched.subject ? (
                  <span className=" text-red-500 text-sm ">
                      * {errors.subject}
                  </span>
              ) : null}
          </div>
          <div className="w-full h-[18.5rem] inline-block ">

              <textarea
                  placeholder="Message"
                  rows={12}
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`outline resize-none ${errors.details && touched.details ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
              ></textarea>
              {errors.details && touched.details ? (
                  <span className=" text-red-500 text-sm ">
                      * {errors.details}
                  </span>
              ) : null}
          </div>
          <button
                                  disabled={disabled}
                                  type="submit"
                                  className="text-white bg-orange-400 hover:bg-orange-600  disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
                              >
                                  Send
                                  {
                                      disabled ?
                                          <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                                          : null
                                  }
                              </button>
      </form>
  )
}
