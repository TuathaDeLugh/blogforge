"use dynamic"
import { Div, H1 } from '@/Components/Motion/Motion';
import React from 'react';
import UserAvatarEdit from './UserAvatarEdit';
import UserEditForm from './UserEdit';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { getSingleUser } from '@/controllers/user';



export default async function Profile() {
  const session  =  await getServerSession(authOptions)
  const user = await getSingleUser(session?.user?.dbid||'');

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
                className="absolute md:-top-16 lg:-top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
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

            <UserEditForm user={{
              dbid: session?.user.dbid!,
              name: user.name,
              email: user.email,
              newMail: user.newMail || user.email ,
              username: user.username}}/>

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
