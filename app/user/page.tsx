'use client'
import { Div, H1 } from '@/Components/Motion/Motion';
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileSchema} from '@/yupSchema';
import UserAvatarEdit from './UserAvatarEdit';
import Link from 'next/link';
import { motion } from 'framer-motion';



export default function Profile() {
  const { data: session } =  useSession()

  if (session && session.user.dbid) {
    return (
      <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center">
        <Div
          className="h-full flex items-center relative max-w-2xl m-5 mb-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]"
          >
            <div className="relative mt-5 md:mt-10 mb-5">
              <H1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute md:-top-16 lg:-top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
              >
                Profile
              </H1>
              <H1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pl-2 font-bold border-l-8 border-orange-400 text-5xl dark:text-white"
              >
                {session?.user.username}
              </H1>
            </div>

            <UserAvatarEdit userId={session?.user.dbid}/>

            <Form user={session?.user as User}/>

          </div>
          <Div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block"></Div>
        </Div>
      </div>
    );
  }
  else{
      redirect('/')
  }
}

interface User{
  dbid: string,
  name: string,
  username: string,
  email: string,
}

function Form({ user }: { user: User }) {
  
  const router = useRouter()
  const { data : session, update } =  useSession()
  const [disabled, setDisabled] = useState(false);
  const [formdisable, setformdisable] = useState(true);
  let initialValues = {
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ProfileSchema,
    onSubmit: (async (values, action) => {


      setDisabled(true);
      try {
        const response = await fetch(`/api/user/${user.dbid}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...values, type: "info" }),
        });
        const data = await response.json();
        setDisabled(false);
        

        if (response.status === 400) {
          console.log(data.message);
          
          toast.error(data.message);
        } else if (response.status === 500) {
          toast.error("Server Error");
        } 
          await update({
            ...session,
            user: {
              name: data.updatedUser.name,
              email:data.updatedUser.email,
              username:data.updatedUser.username
            }
          });
          
          action.resetForm();
          toast.success('Profile Data Updated');

            router.refresh();
            router.push('/');
      } catch (error) {
        console.error("Error:", error);
      }
    }
    ),
  });
  return (
    <>
    <div className="text-orange-400 text-sm mt-2 flex justify-between ">
        <motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.05}}
          className="text-orange-400 hover:underline underline-offset-4"
          onClick={()=>setformdisable(!formdisable)}
          >
            Need Update?
        </motion.button>
        <Link
          href="/reset/request"
          className="text-orange-400 hover:underline underline-offset-4"
        >
          Reset Password
        </Link>
      </div>
    <form onSubmit={handleSubmit} autoComplete='off' className=' space-y-4 pb-4 mt-5' >
    <div className=" w-[85vw] md:w-[450px] h-14">
      <input
      disabled={formdisable}
        type="text"
        placeholder="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`outline ${errors.name && touched.name ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
      />
      {errors.name && touched.name ? (
        <p className=" text-red-500 text-sm">* {errors.name}</p>
      ) : null}
    </div>
    <div className="w-[85vw] md:w-[450px] h-14">
      <input
      disabled={formdisable}
        type="text"
        placeholder="Username"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`outline ${errors.username && touched.username ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

      />
      {errors.username && touched.username ? (
        <p className=" text-red-500 text-sm">* {errors.username}</p>
      ) : null}
    </div>
    <div className="w-[85vw] md:w-[450px] h-14">
      <input
      disabled={formdisable}
        type="text"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`outline ${errors.email && touched.email ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

      />
      {errors.email && touched.email ? (
        <p className=" text-red-500 text-sm">* {errors.email}</p>
      ) : null}
    </div>

    <div
     className="w-[85vw] md:w-[450px] mb-2">
      <motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.05}}
        disabled={disabled}
        type="submit"
        className={`${formdisable && 'hidden'} text-white bg-orange-400 hover:bg-orange-600  disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4`}
      >
        Update
        {
          disabled ?
            <AiOutlineLoading3Quarters size={20} className='animate-spin' />
            : null
        }
      </motion.button>
    </div>
  </form>
  </>
  )
}
