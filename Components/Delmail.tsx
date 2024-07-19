"use client";
import React from 'react'
import { useRouter } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import DModal from './layout/Model';
import Image from 'next/image';

function DelmailBtn({ id,subject }:{id:string,subject:string}) {
    const router = useRouter();
    
  async function handleDelete() {
    router.push('/admin/contact');
      
        await fetch(`/api/email?id=${id}`, {
          method: "DELETE",
        });
      toast.success('Contact request Deleted');
      router.refresh();
      }
    return (
      
        
<DModal btn={<MdOutlineDelete size={25} className='text-red-400 m-2 rounded-bl-lg backdrop-blur-xl' />} header={'Are You Sure ?'} submit={<button className='w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600  inline-block p-3' onClick={handleDelete}>Delete</button>}>
          <Image src={'/delete.svg'} alt='delete person' width={200} height={200}/>
          You want to delete this Contect ? {subject}
        </DModal>
    );
  }

export default DelmailBtn