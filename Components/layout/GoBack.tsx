"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoMdArrowBack } from "react-icons/io";

export default function Goback() {
    const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
<button
      onClick={handleGoBack}
      className="group inline-flex items-center h-12 space-x-2 p-2 rounded-lg hover:bg-orange-500 dark:hover:bg-orange-400 hover:mr-4 ease-in-out duration-300"
    >
      <IoMdArrowBack size={23} className=" text-orange-500 group-hover:text-white" />
      <span className="hidden group-hover:inline-block text-white">Go Back</span>
    </button>  )
}