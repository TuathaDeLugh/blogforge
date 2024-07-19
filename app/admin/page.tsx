import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaComments, FaEnvelope, FaFileAlt, FaStar, FaUser, FaUsers } from 'react-icons/fa'

export default async function Admin() {
  // const stats = await getStats()
  let wno=1 ,rno = 1
  return (
    <><span className="mb-4 block text-base font-semibold  text-purple-700 dark:text-purple-400">
      Admin Panal
    </span>
      <h2 className="mb-6 text-[32px] font-bold capitalize text-dark lg:text-[4xl]">
        Dashbord
      </h2>
  
    </>
  )

}
