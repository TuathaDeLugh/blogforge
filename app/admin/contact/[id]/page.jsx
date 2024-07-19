import DelmailBtn from '@/components/Delmail'
import Goback from '@/components/Goback'
import getSingleEmail from '@/controller/singleEmail'
import React from 'react'

export default async function Cdatapage({ params: { id } }) {
    const email = await getSingleEmail(id)
  return (
    <>
    <div className='mb-4 flex items-center'>
          <Goback />
          <span className='mb-1 block text-base font-semibold  text-purple-700 dark:text-purple-400 '>
            Contact Request
          </span>
        </div>
  <h2 className="mb-6 text-[32px] flex justify-between font-bold capitalize text-dark lg:text-[4xl]">
    {email.subject} <DelmailBtn id={email._id} subject={email.subject} />
  </h2>
  <div className='pb-10'>
    <p className='mb-3' >
    <sapn className='text-purple-500 dark:text-purple-400 font-semibold'>Full Name : </sapn> 
    {email.fullname}
    </p>
    
    <p className='mb-3'>
    <sapn className='text-purple-500 dark:text-purple-400 font-semibold'>
    Email : </sapn> {email.email}
    </p>
   
    <p className='mb-3'>
    <sapn className='text-purple-500 dark:text-purple-400 font-semibold'>Subject : </sapn>
    {email.subject}
    </p>

    <p className='mb-3'>
    <sapn className='text-purple-500 dark:text-purple-400 font-semibold'>Details :</sapn>
     <textarea className='h-[80vh] w-full bg-transparent resize-none' value={email.details} disabled></textarea>
     </p>
  </div>
    </>
  )
}
