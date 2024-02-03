import Link from 'next/link'
import React from 'react'

export default function UserBlog() {
  
  return (
    <div>
      <Link href={'/user/blog/new'}>Create new</Link>
    </div>
  )
}
