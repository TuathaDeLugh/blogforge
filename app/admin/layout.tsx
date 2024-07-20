import React from 'react'

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import AdminNav from '@/Components/layout/AdminSlider';

export default async function layout({ children }:{children: React.ReactNode}) {
  const session = await getServerSession(authOptions)
    
    if (session && session.user && session.user.isAdmin==true){

        return (<>
        <section>
  </section>
      <AdminNav>
      { children }
      </AdminNav>
  </>
  )
}
    else{
        throw new Error("Not Authorized")
    }
}