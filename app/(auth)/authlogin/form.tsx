'use client'
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { UsernameSchema } from '@/yupSchema';
import { useFormik } from 'formik';

const initialValues = {
  username: "",
  pass: "",
  confirmpassword: ""
};

export default function AuthForm({ user }: any) {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState(false);

  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: UsernameSchema,
    onSubmit: (async (values, action) => {


      
      
      
      try {
        const userdata = {
          name: user.name,
          username: values.username,
          email: user.email,
          pass: values.pass,
          provider: "auth",
          avatar: user.image,
        }
        setDisabled(true);
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: {
              "Content-type": "application/json",
          },
          body: JSON.stringify(userdata),
      });
      const data = await response.json();
      setDisabled(false);
      console.log(data);
      
      if(response.status == 401)
      {   
          values.username= "";
          toast.error(data.error);
      }
      else{
          action.resetForm();
          toast.success('Account  created successfully!')
          signOut({ callbackUrl: '/login' })
      }

        
      } catch (error: any) {
        console.error('Error:', error);
      }

    }
    ),
  });
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete='off' className=' space-y-4 py-4'>

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

        <div className="w-[85vw] md:w-[450px] mt-4 mb-2">
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
      <div className="md:w-[450px] mt-6 text-center">
        Want To  <button onClick={() => signOut({ callbackUrl: '/login' })} className='text-orange-400 hover:text-orange-500'>Change  Auth/Email </button>
      </div>
    </>
  )
}
