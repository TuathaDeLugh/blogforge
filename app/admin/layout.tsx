import React from 'react'

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import AdminNav from '@/Components/layout/AdminSlider';

export default async function layout({ children }:{children: React.ReactNode}) {
  const session = await getServerSession(authOptions)
    
    if (session && session.user && session.user.isAdmin==true){

        return (<>
        <section>
      <AdminNav/>
  </section>
    <section className="mx-auto max-w-[1500px]">
            <div className="ml-16 2xl:ml-0 px-3 md:px-6 py-5 mx-auto">
      { children }
      
      </div>
      </section>
  </>
  )
}
    else{
        throw new Error("Not Authorized")
    }
}