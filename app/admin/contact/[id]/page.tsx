"use dynamic"
import DelmailBtn from '@/Components/Delmail'
import Goback from '@/Components/layout/GoBack'
import { getSingleEmail } from '@/controllers/email'
import React from 'react'

export default async function Cdatapage({ params: { id } }: any) {
  const email = await getSingleEmail(id)
  return (
    <>
      <div className='mb-4 flex items-center'>
        <Goback />
        <span className='block text-base font-semibold  text-orange-500 dark:text-orange-400 '>
          Contact Request
        </span>
      </div>
      <div className="mb-6 text-[32px] flex justify-between font-bold capitalize text-dark lg:text-[4xl] items-center">
      <h2 className=" text-[32px] font-bold capitalize lg:text-[4xl]">
        {email.subject} 
      </h2>
      <div className='w-10'>
        <DelmailBtn id={email._id} subject={email.subject} />
      </div>
</div>
      <div className='pb-10'>
        <p className='mb-3' >
          <span className='text-orange-500 dark:text-orange-400 font-semibold'>Full Name : </span>
          {email.name}
        </p>

        <p className='mb-3'>
          <span className='text-orange-500 dark:text-orange-400 font-semibold'>
            Email : </span> {email.email}
        </p>

        <p className='mb-3'>
          <span className='text-orange-500 dark:text-orange-400 font-semibold'>Subject : </span>
          {email.subject}
        </p>

        <p className='mb-3'>
          <span className='text-orange-500 dark:text-orange-400 font-semibold'>Details :</span>
          <textarea className='h-[80vh] w-full bg-transparent resize-none' value={email.details} disabled></textarea>
        </p>
      </div>
    </>
  )
}
