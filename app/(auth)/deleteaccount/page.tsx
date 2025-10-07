'use client';
import React, { useEffect, useState } from 'react';
import { Div, H1 } from '@/Components/Motion/Motion';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function DeleteAccount() {
  const router = useRouter();
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState('');

  const handleDeleteAccount = async () => {
    try {
      setDisabled(true);
      const response = await fetch(`/api/user?token=${token}`, {
        method: 'DELETE',
      });

      if (response && response.status === 200) {
        toast.success('Account Successfully Deleted');
        if (session) {
          signOut({ callbackUrl: '/' });
        } else {
          router.push('/');
        }
      } else {
        toast.error(
          'Failed to delete account. The token might be expired, you can request a new one.'
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to Delete Account. Please try again later.');
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get('token') || '');
  }, []);

  return (
    <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center mb-4 p-3">
      <Div
        className="h-full flex items-center relative max-w-2xl md:mx-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]">
          <div className="relative mt-5 md:mt-10 mb-16">
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
              className="pl-2 font-bold border-l-8 border-red-400 text-5xl dark:text-white"
            >
              Delete Account
            </H1>
          </div>

          <Div
            className="text-center space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              We&apos;re sorry to see you go! Before you delete your account,
              consider the benefits of staying with us:
            </p>
            <ul className="list-disc list-inside text-justify mx-auto max-w-[30rem]">
              <li>You will no longer be able to add new blogs</li>
              <li>You will lose the ability to comment on blogs</li>
              <li>Your created blogs will be transferred to admin</li>
              <li>You will no longer be able to save blogs to your list</li>
              <li>All your current saved blogs and preferences will be lost</li>
              <li>Rejoining will require a new account creation and setup</li>
            </ul>
            <p>
              If you&apos;re sure you want to delete your account, click the
              button below.
            </p>
            <div className="text-center flex items-center justify-center">
              <button
                disabled={disabled}
                onClick={handleDeleteAccount}
                className="text-white bg-red-400 hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-5 py-3 flex items-center justify-center gap-4"
              >
                Delete Account
                {disabled && (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                )}
              </button>
            </div>
            <p className="text-sm">
              After deleting your account, you will be redirected to the home
              page.
            </p>
          </Div>
        </div>
        <Div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -z-10 hidden w-full h-full bg-red-400/50 rounded-md -bottom-3 -right-3 md:block"
        ></Div>
      </Div>
    </div>
  );
}
