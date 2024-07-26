"use client"
import { AiOutlineRetweet } from "react-icons/ai";
import Dmodal from "./layout/Model";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RoleBtn({ user }:any) {
    const router = useRouter()
    const { data: session } = useSession();
    const postapi = async () => {
        try {
          const rolevalue = {
            isAdmin: user.isAdmin ? false : true
          };
      
          const response = await fetch(`/api/user/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(rolevalue),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update role');
          }
      
          router.refresh();
        } catch (error:any) {
          console.error('Error updating role:', error.message);
          throw error; 
        }
      };
      
      const handleConfirm = async () => {
        try {
          await toast.promise(postapi(), {
            loading: 'Updating role',
            success: 'Role updated successfully',
            error: 'Failed to update role',
          });
        } catch (error:any) {
          console.error('Toast promise error:', error.message);
        }
      };
  
    return (
      <>
<div className="w-full flex justify-between items-center">
      {user.role}
      {
          session?.user?.dbid == user._id ? null :(
              
              <div className="p-2 flex items-center bg-orange-500/80 rounded text-white">
        <Dmodal
        btn={<span className="flex items-center justify-center gap-2">
          {user.isAdmin ? 'Admin' : 'User'} <AiOutlineRetweet size={17} /> 
        </span>
        }
        header={`Are you sure you want to change ${user.username}'s role to ${user.isAdmin ? 'User' : 'Admin'}?`}
        submit={<button className="w-full h-full p-3" onClick={handleConfirm}>Confirm</button>}
        />
        </div>
      )
    }
    </div>
      
      </>
    );
  }