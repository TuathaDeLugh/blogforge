"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import DModal from "../layout/Model";
import Image from "next/image";

interface props
    {
        faqid: string;
        title:string;
    }

export default function DeleteFaQ({faqid,title }:props) {
  
    const router = useRouter();

    async function handleDelete() {
        router.push('/admin/faq');
          
            await fetch(`/api/faq?id=${faqid}`, {
              method: "DELETE",
            });
          toast.success(`FaQ ${title} deleted`);
          router.refresh();
          }
  return (
    <DModal btn={<MdOutlineDelete size={25} className='text-red-400 m-2 rounded-bl-lg backdrop-blur-xl' />} header={'Are You Sure ?'} submit={<button className='w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600  inline-block p-3' onClick={handleDelete}>Delete</button>}>
          <Image src={'/delete.svg'} alt='delete person' width={200} height={200}/>
          You want to delete this faq ? {title}
        </DModal>

  );
}