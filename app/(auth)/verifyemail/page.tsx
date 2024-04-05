"use client"
import React, { useEffect, useState } from 'react';
import { Div, H1 } from '@/Components/Motion/Motion';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function VerifyFirst() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session?.user.isVerified) {
    router.push('/')
  }
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState("");


  const handleVerifyEmail = async () => {
    try {
      setDisabled(true);
      console.log(token);
      
      const values = {
        token: token
      };
      const response = await fetch(`/api/user/verify`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error to verify');
      }

      toast.success("Account verified");
      if(session){
        signOut({ callbackUrl: '/login' })
      }
      else{
        router.push("/login")
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed verification email. Please try again later.');
    } finally {
      setDisabled(false);
      

    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
}, []);



  return (
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center p-3">
      <Div
        className="h-full flex items-center relative max-w-2xl md:mx-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]"
        >
          <div className="relative mt-5 md:mt-10 mb-16">
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
              Verify Email
            </H1>
          </div>

          <Div className="md:w-[450px] text-center space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <p>
              Click the button below to verifiy your email.
            </p>
            <div className="md:w-[450px] text-center flex items-center justify-center">
              <button
                disabled={disabled}
                onClick={handleVerifyEmail}
                className="text-white bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-5 py-3 flex items-center justify-center gap-4"
              >
                Verify Email
                {disabled && (
                  <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                )}
              </button>
            </div>
            <p className='text-sm'>
              After Verifecation you will be redirected to login page and can start using our services!

            </p>
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
