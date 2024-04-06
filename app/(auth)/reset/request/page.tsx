'use client'
import { Div, H1 } from '@/Components/Motion/Motion';
import { useFormik } from "formik";
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import * as Yup from "yup";

export default function ResetReq() {
    const { data: session } = useSession();

    
    const useremail = session?.user.email;

    
    

    return (
        <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center px-5">
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


                    <Div className="md:w-[450px] text-center mt-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}>

                        <Form useremail={useremail} />
                    
                    </Div>
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



function Form( {useremail}: { useremail?: string | null }) {
    const [disabled, setDisabled] = useState(false);
    
    const router = useRouter()

    const initialValues = {
        email: useremail || '',
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: Yup.object({
                email: Yup.string().email().required("Please enter email")
              }),
            onSubmit: (async (values, action) => {

                try {
                    setDisabled(true)
                    const data = {
                        email: values.email,
                        emailType: "RESET",
                      };
                      const response = await fetch(`/api/email/sendmail`, {
                        method: "POST",
                        headers: {
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                      });
                
                      if (!response.ok) {
                        throw new Error('Error sending verification link');
                      }
                
                      toast.success("Reset Password email sent to " + values.email);
                      router.push('/')

                } catch (error) {
                    console.log('Login Failed:', error)
                }
                finally{
                    setDisabled(false)
                    action.resetForm();
                }

            }
            ),
        });
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className=' space-y-6 pt-10 pb-4 ' >
                    <p>Enter your email we will send reset link by email
                    </p>
                        <div className="w-[85vw] md:w-[450px] h-14 text-left">
                            <input
                                type={'text'}
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

                        <div className="md:w-[450px] mt-8 mb-2 text-center">
                            <button
                                disabled={disabled}
                                type="submit"
                                className="w-full text-white bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 flex items-center justify-center gap-4"
                            >
                                Get Reset Link
                                {
                                    disabled ?
                                        <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                                        : null
                                }
                            </button>
                        </div>
                    </form>
  )
}
