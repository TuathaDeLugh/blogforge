'use client'
import { Div, H1 } from '@/Components/Motion/Motion';
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { loginSchema } from '@/yupSchema';

export default function Login() {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (async (values, action) => {

        try {
          setDisabled(true)
          const result = await signIn('credentials', {
            redirect: false,
            callbackUrl: "/",
            email: values.email,
            password: values.password,
          })
          if (
            result &&
            (result).status == 200 &&
            (result).error == undefined
          ) {
            router.refresh();
            router.push('/')
            toast.success(`Logedin sucessfully with ${values.email}`)
          } else {
            toast.error('incorrect username or password')
          }
        } catch (error) {
          console.log('Login Failed:', error)
        }
        setDisabled(false)
        action.resetForm();

      }
      ),
    });




  return (
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center px-4 lg:px-8">
      <Div
        className="h-full flex items-center relative max-w-2xl md:mx-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]"
        >
          <div className="relative mt-5 md:mt-10">
            <H1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute md:-top-16 lg:-top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
            >
              BlogForge
            </H1>
            <H1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pl-2 font-bold border-l-8 border-orange-400 text-5xl dark:text-white"
            >
              SIGN IN
            </H1>
          </div>




          <form onSubmit={handleSubmit} autoComplete="off" className=' space-y-4 pt-10 pb-4 ' >
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
            <div className="w-[85vw] md:w-[450px] h-14">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`outline ${errors.password && touched.password ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

                /> <div
                  className={` absolute top-0  right-3 h-full flex items-center text-slate-400`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={22} />}
                </div>
              </div>
              {errors.password && touched.password ? (
                <p className=" text-red-500 text-sm">* {errors.password}</p>
              ) : null}
            </div>
            <div className="md:w-[450px] mt-8 mb-2">
              <button
                disabled={disabled}
                type="submit"
                className="text-white bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
              >
                Login
                {
                  disabled ?
                    <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                    : null
                }
              </button>
            </div>
          </form>
          <div className="md:w-[450px] text-center">
            OR
          </div>
          <div className="md:w-[450px] mb-8 mt-2 grid grid-cols-2 gap-3 ">
            <button
              onClick={() => signIn('google', { callbackUrl: '/authlogin' })}
              className="text-black bg-slate-200 hover:opacity-50 border border-slate-500 font-semibold rounded-md text-sm px-4 py-3 w-full flex gap-2 items-center justify-center"
            >
              Login With <FcGoogle size={20} className="bg-white rounded-full" />
            </button>
            <button
              onClick={() => signIn('github', { callbackUrl: '/authlogin' })}
              className="text-white bg-slate-600 hover:opacity-50 font-semibold rounded-md text-sm px-4 py-3 w-full flex gap-2 items-center justify-center"
            >
              Login With
              <FaGithub size={20} className="bg-slate-800 rounded-full" />
            </button>
          </div>
          <div className="md:w-[450px] text-center">
            Forgot Password? <Link href={'/reset/request'} className='text-orange-400 hover:text-orange-500'>Reset here</Link>
          </div>
          <div className="md:w-[450px] mt-2 text-center">
            Don&apos;t have Account? <Link href={'/register'} className='text-orange-400 hover:text-orange-500'>Sign up here </Link>
          </div>
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
