'use client'
import { Div, H1 } from '@/Components/Motion/Motion';
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import * as Yup from "yup";

export default function Reset() {
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
}, []);

  const initialValues = {
    password: "",
    confirmpassword:""
  };
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema:Yup.object({
        password: Yup.string().required("Please enter new password").min(8, 'Password must be 8 characters long').matches(/[0-9]/, 'Password requires a number').matches(/[a-z]/, 'Password requires a lowercase letter').matches(/[A-Z]/, 'Password requires an uppercase letter').matches(/[^\w]/, 'Password requires a symbol'),
        confirmpassword: Yup.string().required("Please confirm password").oneOf([Yup.ref('password')], 'Confirm Password does not match with password'),
      }),
      onSubmit: (async (values, action) => {

        try {
          setDisabled(true)
          console.log(token);
      
      const data = {
        token: token,
        newpassword: values.password
      };
      const response = await fetch(`/api/user/reset`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error to reset password');
      }

      toast.success("Password Reset Sucessfully");
      if(session){
        signOut({ callbackUrl: '/login' })
      }
      else{
        router.push("/login")
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
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center">
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
              className="absolute -top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
            >
              BlogForge
            </H1>
            <H1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pl-2 font-bold border-l-8 border-orange-400 text-5xl dark:text-white"
            >
              Reset Password
            </H1>
          </div>




          <form onSubmit={handleSubmit} autoComplete="off" className=' space-y-4 pt-10 pb-4 ' >
          <div className="w-[85vw] md:w-[450px] h-14">
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="New Password"
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
                            <div className="w-[85vw] md:w-[450px] h-14">
                                <div className="relative">
                                    <input
                                        type={conPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        name="confirmpassword"
                                        value={values.confirmpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`outline ${errors.confirmpassword && touched.confirmpassword ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

                                    /> <div
                                        className={` absolute top-0  right-3 h-full flex items-center text-slate-400`}
                                        onClick={() => setConPassword(!conPassword)}
                                    >
                                        {conPassword ? <FaEyeSlash size={25} /> : <FaEye size={22} />}
                                    </div>
                                </div>
                                {errors.confirmpassword && touched.confirmpassword ? (
                                    <p className=" text-red-500 text-sm">* {errors.confirmpassword}</p>
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

