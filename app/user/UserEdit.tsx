"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileSchema } from '@/yupSchema';
import Link from 'next/link';

interface User {
    dbid: string,
    name: string,
    username: string,
    email: string,
    newMail?: string,
}

export default function UserEditForm({ user }: { user: User }) {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [disabled, setDisabled] = useState(false);
    const [formdisable, setFormDisable] = useState(true);
    const [formData, setFormData] = useState(user);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    const formik = useFormik({
        initialValues: formData,
        validationSchema: ProfileSchema,
        enableReinitialize: true,
        onSubmit: async (values, action) => {
            setDisabled(true);
            try {
                const response = await fetch(`/api/user/${user.dbid}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ ...values,
                        email:user.email, 
                        type: "info" }),
                });
                const data = await response.json();
                setDisabled(false);

                if (response.status === 400) {
                    console.log(data.message);
                    toast.error(data.message);
                } else if (response.status === 500) {
                    toast.error("Server Error");
                } else {
                    await update({
                        ...session,
                        user: {
                            name: data.user.name,
                            username: data.user.username,
                        },
                    });

                    setFormData(data.user);
                    formik.setValues(data.user);
                    setFormDisable(true);
                    router.refresh();
                    action.resetForm();
                    toast.success(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const requestNewEmailVerification = async () => {
        if (cooldown > 0) {
            toast.error(`Please wait ${cooldown} seconds before requesting again.`);
            return;
        }

        setDisabled(true);
        try {
            const response = await fetch(`/api/user/${user.dbid}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newMail: formik.values.newMail }),
            });
            const data = await response.json();
            setDisabled(false);

            if (response.status === 400 || response.status === 500) {
                toast.error(data.message || "Server Error");
            } else {
                setCooldown(60);
                toast.success("Verification email sent. Please check your inbox.");
            }
        } catch (error) {
            console.error("Error:", error);
            setDisabled(false);
        }
    };

    return (
        <>
            <div className="text-orange-400 text-sm mt-2 flex justify-between items-center">
                
                <Link
                    href="/reset/request"
                    className="text-orange-400 hover:underline underline-offset-4"
                >
                    Reset Password
                </Link>
                <Link
                    href="/deleteaccount/request"
                    className="text-red-400 border border-transparent px-2 py-1 rounded hover:border-red-400 underline-offset-4"
                >
                    Delete Account
                </Link>
            </div>
            <form onSubmit={formik.handleSubmit} autoComplete='off' className='space-y-4 pb-4 mt-5'>
                <div className="w-[85vw] md:w-[450px] h-14">
                    <input
                        disabled={formdisable}
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`outline ${formik.errors.name && formik.touched.name ? 'outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : 'outline-transparent'} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <p className="text-red-500 text-sm">* {formik.errors.name}</p>
                    ) : null}
                </div>
                <div className="w-[85vw] md:w-[450px] h-14">
                    <input
                        disabled={formdisable}
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`outline ${formik.errors.username && formik.touched.username ? 'outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : 'outline-transparent'} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
                    />
                    {formik.errors.username && formik.touched.username ? (
                        <p className="text-red-500 text-sm">* {formik.errors.username}</p>
                    ) : null}
                </div>
                <div className="w-[85vw] md:w-[450px] h-14">
                    <input
                        disabled={formdisable}
                        type="text"
                        placeholder="New Email"
                        name="newMail"
                        value={formik.values.newMail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`outline ${formik.errors.newMail && formik.touched.newMail ? 'outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : 'outline-transparent'} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
                    />
                    {formik.errors.newMail && formik.touched.newMail ? (
                        <p className="text-red-500 text-sm">* {formik.errors.newMail}</p>
                    ) : null}
                </div>
                <div className="w-[85vw] md:w-[450px] mb-2">
                {formdisable ? 
                <span
                className="text-orange-400 hover:underline underline-offset-4 cursor-pointer"
                onClick={() => setFormDisable(!formdisable)}
                >
                    Need Update?
                </span>
                :
                    <button
                    disabled={disabled}
                    type="submit"
                    className={` text-white bg-orange-400 hover:bg-orange-600  disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4`}
                    >
                        Update
                        {disabled ? (
                            <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                        ) : null}
                    </button>
            }
                </div>
                </form>
            {formik.values.newMail && formik.values.newMail !== user.email && formdisable == true && (
                <div className="text-sm w-[85vw] md:w-[450px]">
                    <p className="text-orange-500">New Email needs to be verified. We have sent a verification email. If you have not received it or it has expired, please request a new one.</p>
                    <button
                        onClick={requestNewEmailVerification}
                        className={`mt-2 inline-flex gap-2 text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 ${cooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={disabled || cooldown > 0}
                    >
                        Request New Verification Email {cooldown > 0 && `(${cooldown}s)`} {disabled ? (
                            <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                        ) : null}
                    </button>
                </div>
            )}
        </>
    );
}
