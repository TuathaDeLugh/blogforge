'use client'
import { RootState } from '@/Redux/store';
import { emailSchema } from '@/yupSchema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export default function ContactForm(){
    const user = useSelector((state: RootState) => state.user.data);
     const name = user?.name;
     const email = user?.email;
 return(
    <>
    <Form name={name} email={email}/>
    </>
 )
}



interface FormProps {
    name?: string | null;
    email?: string | null;
  }


function Form({ name , email}: FormProps) {
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
                setDisabled(false);
            }
            ),
        });

    return (
        <form onSubmit={handleSubmit}
            className="mx-auto p-4 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 ">

            <div className="w-full h-[4.25rem] inline-block">
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
                    <span className=" text-red-500 text-sm">* {errors.name}</span>
                ) : null}
            </div>


            <div className="w-full h-[4.25rem] inline-block">
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
                    <span className=" text-red-500 text-sm ">
                        * {errors.email}
                    </span>
                ) : null}
            </div>



            <div className="w-full h-[4.25rem] inline-block">
                <input
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`outline ${errors.subject && touched.subject ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}

                />
                {errors.subject && touched.subject ? (
                    <span className=" text-red-500 text-sm ">
                        * {errors.subject}
                    </span>
                ) : null}
            </div>
            <div className="w-full h-[18.5rem] inline-block ">

                <textarea
                    placeholder="Message"
                    rows={12}
                    name="details"
                    value={values.details}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`outline resize-none ${errors.details && touched.details ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
                ></textarea>
                {errors.details && touched.details ? (
                    <span className=" text-red-500 text-sm ">
                        * {errors.details}
                    </span>
                ) : null}
            </div>
            <button
                                    disabled={disabled}
                                    type="submit"
                                    className="text-white bg-orange-400 hover:bg-orange-600  disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
                                >
                                    Send
                                    {
                                        disabled ?
                                            <AiOutlineLoading3Quarters size={20} className='animate-spin' />
                                            : null
                                    }
                                </button>
        </form>
    )
}
