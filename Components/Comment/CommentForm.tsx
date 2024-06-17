"use client"
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { IoAddSharp } from "react-icons/io5";

interface CommentFormPrp{
    blogid: string
}

export default function CommentForm({ blogid }:CommentFormPrp) {
  const router = useRouter();
  const { data: session } = useSession()
  const initialValues = {
    user:"",
    comment: "",
  };
  const postapi = async (ogvalues:any) => {
    await fetch(`/api/blog`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(ogvalues),
    });
    router.refresh();

  }
  const { values,handleChange, handleSubmit } =
  useFormik({
    initialValues,
    onSubmit: (async (values, action) => {
      const data =  {
        user:session?.user.dbid,
        blog:blogid,
        comment:values.comment,
        action:'add'
      }
      toast.promise((postapi(data)), {
        loading: "Adding Comment",
        success: "Comment Added",
        error: "Failed To Add"
      });
      action.resetForm();

    }
    ),
  });
  if(session){
    return (
      <div className=' mt-5'>
                <form className='flex justify-between' onSubmit={handleSubmit} autoComplete="off">
                  <input type="text" className='w-[80%] bg-transparent border rounded-full px-3 py-1 border-gray-400 focus:outline-none focus:ring focus:ring-orange-700' placeholder='Your Comment' required name="comment"
                  value={values.comment}
                  onChange={handleChange} id="" />
                  <button type="submit" value="Submit" className='rounded-full p-2 bg-orange-400 text-white '><IoAddSharp size={25}/></button>
                </form>
    </div>
  )
}
else{
  return(<div className=' mt-5'>Please <Link href="/login" className='text-orange-500 hover:underline'>Login</Link> for comment</div>)
}
}