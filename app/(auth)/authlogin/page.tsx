import { Div, H1 } from '@/Components/Motion/Motion';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import React from 'react';
import AuthForm from './form';
import { redirect } from 'next/navigation';





export default async function AuthLogin() {

    const session = await getServerSession(authOptions)

    if (session?.user.dbid) {
        redirect('/')
    }
    else {
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
                                New Account
                            </H1>
                        </div>
                        <div className="w-[85vw] md:w-[450px] my-4 p-3 rounded-md bg-red-200 dark:bg-red-600/20 text-sm">
                            <p>
                                No account found with this email <span className=' underline '>{session?.user?.email}</span>.
                            </p>
                            <p>
                                Create new one & login again
                            </p>
                        </div>


                        <AuthForm user={session?.user} />


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
}
