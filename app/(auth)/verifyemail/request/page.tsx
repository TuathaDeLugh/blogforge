'use client';
import React, { useState, useEffect } from 'react';
import { Div, H1 } from '@/Components/Motion/Motion';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { redirect } from 'next/navigation';

export default function VerifyFirst() {
  const { data: session } = useSession();
  if (session?.user.isVerified || !session) {
    redirect('/');
  }
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  const handleVerifyEmail = async () => {
    try {
      setDisabled(true);
      setTimer(59);
      const values = {
        email: session?.user.email,
        emailType: 'VERIFY',
      };
      const response = await fetch(`/api/email/sendmail`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error sending verification link');
      }

      toast.success('Verification email sent to ' + values.email);
    } catch (error) {
      console.error(error);
      toast.error('Failed to send verification email. Please try again later.');
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (timer) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(timerId);
            setDisabled(false);
            return null;
          }
          return prevTimer! - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  return (
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center p-3">
      <Div
        className="h-full flex items-center relative max-w-2xl md:mx-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]">
          <div className="relative mt-5 md:mt-10 mb-10">
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
              Verify Email
            </H1>
          </div>
          <Div
            className="md:w-[450px] text-center space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              Looks like you didn&apos;t verified! Just need to confirm your
              email address by clicking the button.
            </p>
            <div className="md:w-[450px] text-center flex items-center justify-center">
              <button
                disabled={disabled || timer !== null}
                onClick={handleVerifyEmail}
                className="text-white w-1/3 bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 flex items-center justify-center gap-4"
              >
                Get Email
                {disabled && (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                )}
              </button>
            </div>
            <p>
              If you don&apos;t get the email within a few minutes please check
              your spam folder.
              {timer && (
                <span>
                  {` or retry for email in 00:${timer < 10 ? `0${timer}` : timer}`}
                </span>
              )}
            </p>
          </Div>
        </div>
        <Div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block"
        ></Div>
      </Div>
    </div>
  );
}
