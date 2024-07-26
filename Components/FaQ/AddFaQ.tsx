"use client"
import React, { useState } from "react";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoAddSharp } from "react-icons/io5";
import DModal from "../layout/Model";
import { faQSchema } from "@/yupSchema";

const AddFAQ: React.FC = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const initialValues = {
    title: "",
    info: "",
  };

  const postapi = async (ogvalues: any) => {
    await fetch(`/api/faq`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(ogvalues),
    });
    router.refresh();
  }

  const { values,errors,touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: faQSchema,
    onSubmit: async (values, action) => {
      toast.promise(postapi(values), {
        loading: "Adding FAQ",
        success: "FAQ Added",
        error: "Failed to Add FAQ"
      }).then(() => {
        action.resetForm();
        router.refresh();
        setModalOpen(false);
      });
    },
  });

  return (
    <DModal
      btn={<span className="text-res-500 hover:text-orange-500/60 flex items-center"><IoAddSharp size={20} className="mr-1" /> Add New FAQ</span>}
      header="Add New FAQ"
      form
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
    >
      <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
      <div className=" h-[4.25rem]">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="FAQ Title"
            className={`outline ${errors.title && touched.title ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
          />
          {errors.title && touched.title ? (
                  <span className=" text-red-500 text-sm">* {errors.title}</span>
              ) : null}
        </div>
        <div className=" h-[12.25rem]">
          <textarea
            name="info"
            value={values.info}
            onChange={handleChange}
            placeholder="FAQ Information"
            className={`outline ${errors.info && touched.info ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50' : ' outline-transparent '} w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none h-40`}
          />
        {errors.info && touched.info ? (
                  <span className=" text-red-500 text-sm">* {errors.info}</span>
              ) : null}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg p-2 bg-orange-500 text-white hover:bg-orange-500/70 transition duration-300 flex items-center justify-center"
        >
          Add FAQ
        </button>
      </form>
    </DModal>
  );
};

export default AddFAQ;
