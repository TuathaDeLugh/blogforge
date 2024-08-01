"use client"
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { loginSchema } from '@/yupSchema';


export default function LoginForm() {
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
    <>
    <form onSubmit={handleSubmit} autoComplete="off" className=' space-y-4 pt-10 pb-4 ' >
            <div className="w-[85vw] md:w-[450px] h-14">
              <input
                type="text"
                placeholder="Email or Username"
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
    </>
  )
}
