"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import DModal from "../layout/Model";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface props {
  blogid: string;
  commid: string;
  commentAuthorId?: string;
}

export default function DelCommentBtn({ blogid, commid, commentAuthorId }: props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [adminReason, setAdminReason] = useState('');

  const isAdminDeletion = session?.user?.isAdmin && commentAuthorId && commentAuthorId !== session.user.dbid;

  async function handleDelete() {
    if (isAdminDeletion && !adminReason.trim()) {
      toast.error('Please provide a reason for removing this comment');
      return;
    }

    const delapi = async (ogvalues: any) => {
      const response = await fetch(`/api/blog`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(ogvalues),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      
      router.refresh();
      setModalOpen(false);
    }

    const data = {
      blog: blogid,
      commid: commid,
      action: 'remove',
      adminReason: isAdminDeletion ? adminReason : undefined
    }

    toast.promise(delapi(data), {
      loading: "Deleting Comment",
      success: "Comment Deleted Successfully",
      error: "Failed To Delete"
    });
  }

  return (
    <DModal 
      btn={<MdOutlineDelete size={25} className='text-red-400 m-2 rounded-bl-lg backdrop-blur-xl cursor-pointer' />} 
      header={isAdminDeletion ? 'Remove Comment (Admin)' : 'Are You Sure ?'} 
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      submit={
        <button 
          className='w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600 inline-block p-3' 
          onClick={handleDelete}
        >
          Delete
        </button>
      }
    >
      <div className="space-y-4">
        <Image src={'/delete.svg'} alt='delete comment' width={200} height={200} className="mx-auto" />
        
        <p className="text-center">
          {isAdminDeletion 
            ? 'You are about to remove this comment as an admin. The comment author and blog creator will be notified.'
            : 'You want to delete this Comment ?'
          }
        </p>

        {isAdminDeletion && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Reason for Removal (Required):
            </label>
            <textarea
              value={adminReason}
              onChange={(e) => setAdminReason(e.target.value)}
              placeholder="Enter reason for removing this comment (e.g., inappropriate content, spam, etc.)"
              rows={3}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This reason will be included in the notification emails sent to the comment author and blog creator.
            </p>
          </div>
        )}
      </div>
    </DModal>
  );
}