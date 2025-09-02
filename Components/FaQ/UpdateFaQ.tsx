'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import DModal from '../layout/Model';
import { HiPencilAlt } from 'react-icons/hi';
import { faQSchema } from '@/yupSchema';

interface UpdateFAQModalProps {
  faq: {
    _id: string;
    title: string;
    info: string;
  };
}

const UpdateFAQ: React.FC<UpdateFAQModalProps> = ({ faq }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: faq.title,
    info: faq.info,
  });

  useEffect(() => {
    setFormValues({
      title: faq.title,
      info: faq.info,
    });
  }, [faq]);

  const postapi = async (ogvalues: any) => {
    await fetch(`/api/faq/${faq._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ogvalues),
    });
    router.refresh();
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: formValues,
    validationSchema: faQSchema,
    enableReinitialize: true, // Ensure form reinitializes on prop change
    onSubmit: async (values, action) => {
      toast.promise(postapi(values), {
        loading: 'updating FAQ',
        success: 'FAQ updated',
        error: 'Failed to update FAQ',
      });
      action.resetForm();
      router.refresh();
      setModalOpen(false);
    },
  });

  return (
    <DModal
      btn={<HiPencilAlt className="text-blue-600" size={25} />}
      header="Update FAQ"
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      form
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
          className="w-full rounded-lg p-2 bg-orange-400 text-white hover:bg-orange-500/60 transition duration-300 flex items-center justify-center"
        >
          <FaEdit size={20} className="mr-1" /> Update FAQ
        </button>
      </form>
    </DModal>
  );
};

export default UpdateFAQ;
