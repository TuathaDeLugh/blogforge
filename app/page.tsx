'use client'
import UserData from '@/Components/Logic/userdataget';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  
  return (
    <div>
      <UserData/>
      {session?.user?.id}
      <button onClick={() => signOut({ callbackUrl: '/' })}>Log Out</button>

    </div>
  )
}
