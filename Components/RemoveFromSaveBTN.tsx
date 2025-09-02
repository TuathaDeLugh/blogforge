'use client';

import { removeSavelist } from '@/controllers/savelist';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DModal from './layout/Model';
import Image from 'next/image';

interface SaveListBtnProps {
  name?: string;
  uid: string;
  rid: string;
  page?: string;
}

const RemoveFromSaveBtn = ({
  name,
  uid,
  rid,
  page = 'read_review',
}: SaveListBtnProps) => {
  const router = useRouter();

  const classes = {
    read_review:
      'text-white w-full text-center mt-3 py-2 px-5 rounded-full border text-lg bg-orange-500 dark:bg-orange-400 hover:text-orange-400 hover:border-orange-400 hover:bg-transparent dark:hover:bg-transparent  font-medium',
    savelist:
      'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors  h-9 rounded-md px-3 border border-red-400 text-red-500/80  bg-transprent  hover:bg-red-400/80 hover:text-white dark:border-red-500/80 dark:hover:bg-red-500/50',
  };

  const handleSavelist = async () => {
    await removeSavelist(uid, rid);
    toast.success('Removed from the Savelist');
    router.refresh();
  };
  return (
    <div>
      <DModal
        btn={
          <div
            className={
              page === 'read_review' ? classes.read_review : classes.savelist
            }
          >
            Remove from Saved
          </div>
        }
        header={'Are You Sure?'}
        submit={
          <button
            className="w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600  inline-block p-3"
            onClick={handleSavelist}
          >
            Remove
          </button>
        }
      >
        <Image
          src={'/delete.svg'}
          alt="delete person"
          width={200}
          height={200}
        />
        <p>
          {' '}
          You want to remove <span className="text-orange-500">
            {name}
          </span>{' '}
          from savelist ?{' '}
        </p>
      </DModal>
    </div>
  );
};

export default RemoveFromSaveBtn;
