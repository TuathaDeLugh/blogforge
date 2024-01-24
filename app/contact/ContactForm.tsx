'use client'
import { emailSchema } from '@/yupSchema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ContactForm({ name, email }: { name: string, email: string }) {
    const initialValues = {
        name: name || "",
        email: email || "",
        subject: "",
        details: "",
    };

    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    const postapi = async (ogvalues: any) => {
        await fetch(`/api/email`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(ogvalues),
        });
        router.push("/");
        router.refresh();

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: emailSchema,
            onSubmit: (async (values, action) => {
                setDisabled(true);
                toast.promise((postapi(values)), {
                    loading: "Sending Message",
                    success: "Message Sent Successfully",
                    error: " Failed To Send"
                });
                action.resetForm();

            }
            ),
        });

    return (
        <form
            className="mx-auto space-y-3 p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 ">
      
            {/* <div className="w-full h-14"> */}
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`outline ${errors.name && touched.name ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

                />
                {/* {errors.name && touched.name ? (
                    <p className=" text-red-500 text-sm">* {errors.name}</p>
                ) : null} */}
            {/* </div> */}


            {/* <div className="w-full h-14"> */}
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`outline ${errors.email && touched.email ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

                />
                {/* {errors.email && touched.email ? (
                    <p className=" text-red-500 text-sm">* {errors.email}</p>
                ) : null} */}
            {/* </div> */}


        
            <input
                type="text"
                placeholder="Subject"

                className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm outline-orange-500"
            />
            <textarea
                placeholder="Message"
                rows={12}

                className="w-full resize-none rounded-md px-4 bg-gray-100 dark:bg-gray-700 text-sm pt-3 outline-orange-500"
            ></textarea>
            <button
                type="button"
                className="text-white bg-orange-400 hover:bg-orange-600 font-semibold rounded-md text-sm px-4 py-3 w-full"
            >
                Send
            </button>
        </form>
    )
}
