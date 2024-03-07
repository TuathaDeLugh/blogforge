'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function UserLayoutDisplay({
  display,
  notdisplay
}: {
  display: React.ReactNode,
  notdisplay?: React.ReactNode
}) {
  const pathname = usePathname()
  const isBlogRoute = pathname.startsWith('/user/blog') && pathname !== '/user/blog/new' && pathname !== '/user/blog/edit'
  
  return (
    <>
      {isBlogRoute ? display : notdisplay}
    </>
  )
}
