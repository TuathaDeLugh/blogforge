"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import DModal from "../layout/Model";
import Image from "next/image";
import { motion } from 'framer-motion';

interface props
    {
        blogid: string;
        commid: string;
    }

export default function DelCommentBtn({ blogid , commid }:props) {
  
    const router = useRouter();

  async function handleDelete() {
    const delapi = async (ogvalues:any) => {
        await fetch(`/api/blog`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(ogvalues),
        });
        router.refresh();
    
      }
  const data =  {
    blog:blogid,
    commid:commid,
    action:'remove'
  }
    toast.promise(delapi(data), {
      loading: "Deleting Comment",
      success: "Comment Deleted Successfully",
      error: "Failed To Delete"
    });
    
  }
  return (
    <DModal btn={<MdOutlineDelete size={25} className='text-red-400 m-2 rounded-bl-lg backdrop-blur-xl' />} header={'Are You Sure ?'} submit={<motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.1}} className='w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600  inline-block p-3' onClick={handleDelete}>Delete</motion.button>}>
          <Image src={'/delete.svg'} alt='delete person' width={200} height={200}/>
          You want to delete this Comment ?
        </DModal>

  );
}