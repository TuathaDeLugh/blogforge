"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { ref, deleteObject } from "firebase/storage";
import { storage } from '@/util/firebase';
import toast from "react-hot-toast";
import DModal from "@/Components/layout/Model";

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
            toast.error('firebase image deletion error report this issue to admin',
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
    <DModal btn={<MdOutlineDelete size={25} className='text-red-600 ' />} header={'Are You Sure ?'} submit={<button className='w-full h-full inline-block p-3' onClick={handleDelete}>Delete</button>}>
          You want to delete this blog : {title} ?
        </DModal>
  );
}