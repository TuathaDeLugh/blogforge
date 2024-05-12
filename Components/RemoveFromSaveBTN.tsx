'use client'

import { removeSavelist } from '@/controllers/savelist'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface SaveListBtnProps {
  uid: string
  rid: string
  page?: string
}

const RemoveFromSaveBtn = ({ uid, rid, page = 'read_review' }: SaveListBtnProps) => {
  const router = useRouter()

  const classes = {
    read_review:
      'inline-block text-white w-full text-center mt-3 py-2 px-5 rounded-full border text-lg bg-orange-500 dark:bg-orange-400 hover:text-orange-400 hover:border-orange-400 hover:bg-transparent dark:hover:bg-transparent  font-medium',
    savelist:
      'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors  h-9 rounded-md px-3 border border-red-400 text-red-500/80  bg-transprent  hover:bg-red-400/80 hover:text-white dark:border-red-500/80 dark:hover:bg-red-500/50',
  }

  const handleSavelist = async () => {
    await removeSavelist(uid, rid)
    toast.success('Removed from the Savelist')
    router.refresh()
  }
  return (
    <button className={page === 'read_review' ? classes.read_review : classes.savelist} onClick={handleSavelist}>
      Remove from Saved
    </button>
  )
}

export default RemoveFromSaveBtn