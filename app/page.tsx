import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(authOptions)  
  return (
    <div>
      Empty Like your Brain
      {session?.user?.dbid}
      
    </div>
  )
}
