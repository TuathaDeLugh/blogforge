'use client'
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SignupSchema } from '@/yupSchema';

export default function RegisterForm() {
    let initialValues = {
        name: "",
        username: "",
        email: "",
        pass: "",
        avatar: "",
        confirmpassword: "",
        provider: "email"
    };
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
                
                if(response.status == 401)
                {   
                    values.username= "";
                    toast.error(data.error);
                }
                else if(response.status == 400)
                {   
                    toast.error(data.error)
                    setTimeout(()=>router.push('/login'),2000)
                }
                else{
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
  return (
    <>
    <form onSubmit={handleSubmit} autoComplete='off' className=' space-y-4 pt-10 pb-4' >
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

                            <div className="w-[85vw] md:w-[450px] h-14">
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        name="pass"
                                        value={values.pass}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`outline ${errors.pass && touched.pass ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

                                    /> <div
                                        className={` absolute top-0  right-3 h-full flex items-center text-slate-400`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={22} />}
                                    </div>
                                </div>
                                {errors.pass && touched.pass ? (
                                    <p className=" text-red-500 text-sm">* {errors.pass}</p>
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
                        <div className="md:w-[450px] text-center">
                            OR
                        </div>
                        <div className="md:w-[450px] mb-8 mt-2 grid grid-cols-2 gap-3 ">
                            <button
                                onClick={() => signIn('google', { callbackUrl: '/authlogin' })}
                                className="text-black bg-slate-200 hover:opacity-50 border border-slate-500 font-semibold rounded-md text-sm px-4 py-3 w-full flex gap-2 items-center justify-center"
                            >
                                Sign Up With
                                <FcGoogle size={20} className="bg-white rounded-full" />
                            </button>
                            <button
                                onClick={() => signIn('github', { callbackUrl: '/authlogin' })}
                                className="text-white bg-slate-600 hover:opacity-50 font-semibold rounded-md text-sm px-4 py-3 w-full flex gap-2 items-center justify-center"
                            >
                                Sign Up With
                                <FaGithub size={20} className="bg-slate-800 rounded-full" />
                            </button>
                        </div>
    </>
  )
}
