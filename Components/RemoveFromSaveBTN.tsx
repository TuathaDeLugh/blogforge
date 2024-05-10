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
      'inline-block mr-2 px-2 py-2 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-orange-500/80 rounded dark:bg-orange-400/80 hover:bg-orange-700 dark:hover:bg-orange-600 focus:outline-none ',
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