'use client'
import { Div, H1 } from '@/Components/Motion/Motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SignupSchema } from '@/yupSchema';
import UserAvatarEdit from './UserAvatarEdit';


let initialValues = {
  name: "",
  username: "",
  email: "",
  pass: "",
  avatar: "",
};

export default function Login() {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState(false);
  const router = useRouter()


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: (async (values, action) => {


      setDisabled(true);
      try {
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        setDisabled(false);
        console.log(data);

        if (response.status == 401) {
          values.username = "";
          toast.error(data.error);
        }
        else if (response.status == 400) {
          toast.error(data.error)
          setTimeout(() => router.push('/login'), 2000)
        }
        else {
          action.resetForm();
          toast.success('Account  created ! Verify your account by clicking the link sent to your email');
          router.push("/login");
        }
      }
      catch (error: any) {
        console.error("Error:", error);
      }
    }
    ),
  });

  const { data: session } = useSession()

  // if (session && session.user.dbid) {
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
                className="absolute -top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
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


            <form onSubmit={handleSubmit} autoComplete='off' className=' space-y-4 pb-4 mt-5' >
              <div className=" w-[85vw] md:w-[450px] h-14">
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
                  <p className=" text-red-500 text-sm">* {errors.name}</p>
                ) : null}
              </div>
              <div className="w-[85vw] md:w-[450px] h-14">
                <input
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

              <div className="w-[85vw] md:w-[450px] mb-2">
                <button
                  disabled={disabled}
                  type="submit"
                  className="text-white bg-orange-400 hover:bg-orange-600  disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
                >
                  Register
                  {
                    disabled ?
                      <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                      : null
                  }
                </button>
              </div>
            </form>
          </div>
          <Div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block"></Div>
        </Div>
      </div>
    );
  // }
  // else{
  //     router.push('/login')
  // }
}
