'use client'

import { addToWatchlist } from '@/controller/watchlist'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface WatchListBtnProps {
  uid: string
  rid: string
}

const WatchListBtn = ({ uid, rid }: WatchListBtnProps) => {
  const router = useRouter()

  const handleWatchlist = async () => {
    await addToWatchlist(uid, rid)
    toast.success('Added to the Watchlist')
    router.refresh()
  }
  return (
    <button
      className='inline-block text-white w-full text-center mt-5 py-2 px-5 rounded-full border text-lg bg-purple-500 dark:bg-purple-400 hover:text-purple-400 hover:border-purple-400 hover:bg-transparent dark:hover:bg-transparent  font-medium'
      onClick={handleWatchlist}
    >
      Add to watchlist
    </button>
  )
}

export default WatchListBtn