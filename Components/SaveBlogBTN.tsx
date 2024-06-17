'use client'

import { addToSavelist } from '@/controllers/savelist'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion';

interface SaveListBtnProps {
  uid: string
  rid: string
}

const SaveBlogBtn = ({ uid, rid }: SaveListBtnProps) => {
  const router = useRouter()

  const handleSavelist = async () => {
    await addToSavelist(uid, rid)
    toast.success('Added to the Savelist')
    router.refresh()
  }
  return (
    <motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.05}}
      className='inline-block text-white w-full text-center mt-3 py-2 px-5 rounded-full border text-lg bg-orange-500 dark:bg-orange-400 hover:text-orange-400 hover:border-orange-400 hover:bg-transparent dark:hover:bg-transparent  font-medium'
      onClick={handleSavelist}
    >
      Add to Save Blog
    </motion.button>
  )
}

export default SaveBlogBtn