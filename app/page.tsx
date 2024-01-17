'use client'
import UserData from '@/Components/Logic/userdataget';
// import { getServerSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import Progress from './loading';
// import { authOptions } from './api/auth/[...nextauth]/options';

export default  function Home() {
  const { data: session } = useSession();
  // const session = await getServerSession(authOptions)
  console.log(session);
  
  return (
    <div>
      <Progress/>
      <UserData/>
      {session?.user?.dbid}
      <button onClick={() => signOut({ callbackUrl: '/' })}>Log Out</button>

    </div>
  )
}
