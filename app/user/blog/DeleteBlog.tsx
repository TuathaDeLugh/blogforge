"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { ref, deleteObject } from "firebase/storage";
import { storage } from '@/util/firebase';
import toast from "react-hot-toast";
import DModal from "@/Components/layout/Model";
import Image from "next/image";
import { motion } from 'framer-motion';

interface DelBlogBtnProps {
    id: string;
    images:{
        link:string;
        name:string;
    }[];
    title:string
  }

export default function DelBlogBtn({ id , images , title }:DelBlogBtnProps) {
  const router = useRouter();

  async function handleDelete() {
    const delapi = async () => {
        try{
            
            await Promise.all(images.map(async ({ name }) => {
                const imageRef = ref(storage, `blogimages/${name}`);
                await deleteObject(imageRef);
              }));
        }
        catch(error:any){
            toast.error('Firebase image deletion error report this issue to admin on contact page',
            {
                duration:10000
            })
        }
    await fetch(`/api/blog?id=${id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

    toast.promise(delapi(), {
      loading: "Deleting blog from database",
      success: "Blog deleted Successfully",
      error: "Failed To delete"
    });
  }
  return (
    <DModal btn={<MdOutlineDelete size={25} className='text-red-600 ' />} header={'Are You Sure ?'} submit={<motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.05}} className='w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600 inline-block p-3' onClick={handleDelete}>Delete</motion.button>}>
         <Image src={'/delete.svg'} alt='delete person' width={200} height={200}/>
         <p>
          You want to delete this blog : <span className="text-orange-500">{title}</span> ?
          </p> 
        </DModal>
  );
}