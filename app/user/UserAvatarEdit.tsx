'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiOutlineUser } from 'react-icons/ai';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaPencilAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DefaultUserProfile from '@/Components/layout/DefaultUserProfile';

interface AvatarModelProps {
  userId?: string | null;
}

export default function UserAvatarEdit({ userId }: AvatarModelProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: session, update } = useSession();

  const avatars: string[] = [];
  for (let i = 1; i <= 37; i++) {
    const imageName = `https://firebasestorage.googleapis.com/v0/b/blog-forge-sailor.appspot.com/o/Avatars%2FAvatar%20(${i}).png?alt=media`;
    avatars.push(imageName);
  }

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleSubmit = async () => {
    try {
      setModalOpen(false);
      let chosenAvatar = selectedAvatar;
      if (avatars.includes(selectedAvatar!)) {
        chosenAvatar = `${selectedAvatar}`;
      }

      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: chosenAvatar, type: 'avatar' }),
      });
      const { updatedUser } = await response.json();

      await update({
        ...session,
        user: {
          avatar: updatedUser.avatar,
        },
      });
      router.refresh();
      toast.success('Avatar Updated Successfully.');
      if (!response.ok) {
        throw new Error('Avatar update failed');
      }
    } catch (error: any) {
      console.error('Error updating avatar:', error.message);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      setModalOpen(false);
    };

    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (modalOpen && keyCode === 27) {
        setModalOpen(false);
      }
    };

    const handleScroll = () => {
      if (modalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyHandler);
    handleScroll();

    return () => {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative">
          <div className="absolute bottom-1 right-1">
            <button
              className="bg-orange-400 text-white rounded-full p-2 hover:bg-orange-500"
              ref={trigger}
              onClick={() => setModalOpen(true)}
            >
              <FaPencilAlt size={20} />
            </button>
          </div>
          {session?.user.avatar ? (
            <Image
              src={session?.user.avatar!}
              className=" h-28 w-28 rounded-full"
              width={200}
              height={200}
              alt="avatar"
            />
          ) : (
            <div
              className={`w-28 h-28 rounded-full text-gray-400 cursor-pointer border-2 flex items-center justify-center transition duration-300 ${
                selectedAvatar === ''
                  ? 'border-2 border-orange-500 '
                  : 'dark:border-gray-500'
              }`}
            >
              <DefaultUserProfile
                username={session?.user?.username}
                key={'clear'}
                size={105}
              />
            </div>
          )}
        </div>
      </div>
      {/* MAIN AVATAR DISPLAY END MODAL START */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-slate-900/50 px-4 py-5"
          >
            <motion.div
              ref={modal}
              initial={{ y: -50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.8 }}
              onFocus={() => setModalOpen(true)}
              onBlur={() => setModalOpen(false)}
              className="w-full max-w-[570px] rounded-[20px] bg-white dark:bg-gray-800 border dark:border-slate-600 px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
            >
              <h3 className="pb-[18px] text-xl font-semibold sm:text-2xl">
                Select Avatar
              </h3>
              <span
                className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
              ></span>
              <div className="mb-10 text-base leading-relaxed  ">
                <div className="flex flex-wrap gap-4 max-h-72 overflow-auto justify-center">
                  <div
                    className={`w-20 h-20 rounded-full text-gray-400 cursor-pointer border-2 flex items-center justify-center transition duration-300 ${
                      selectedAvatar === ''
                        ? 'border-2 border-orange-500 '
                        : 'dark:border-gray-500'
                    }`}
                    onClick={() => handleAvatarClick('')}
                  >
                    <DefaultUserProfile
                      username={session?.user?.username}
                      key={'clear'}
                      size={73}
                    />
                  </div>
                  {session && session.user && session.user.image ? (
                    <Image
                      key={'google'}
                      src={session.user.image}
                      alt={`googleavatar`}
                      width={100}
                      height={100}
                      className={`w-20 h-20 rounded-full cursor-pointer border-2 p-[1px]  transition duration-300 ${
                        selectedAvatar === session.user.image
                          ? 'border-2 border-orange-500'
                          : 'border'
                      }`}
                      onClick={() => handleAvatarClick(session.user.image!)}
                    />
                  ) : null}
                  {avatars.map((avatar, index) => (
                    <Image
                      key={index}
                      src={`${avatar}`}
                      alt={`Avatar${index + 1}`}
                      width={100}
                      height={100}
                      className={`w-20 h-20 rounded-full cursor-pointer border-2 p-[1px]  transition duration-300 ${
                        selectedAvatar === avatar
                          ? 'border-2 border-orange-500'
                          : 'border-transparent'
                      }`}
                      onClick={() => handleAvatarClick(avatar)}
                    />
                  ))}
                </div>
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-1/2 px-3">
                  <motion.button
                    onClick={() => setModalOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full rounded-md border border-stroke dark:border-slate-600 p-3 text-center text-base font-medium  transition hover:border-red-500/70 hover:bg-red-500/70 hover:text-white dark:text-white"
                  >
                    Cancel
                  </motion.button>
                </div>
                <div className="w-1/2 px-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full rounded-md border dark:border-slate-600 bg-orange-500/70 dark:bg-orange-400/90  p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark"
                    onClick={handleSubmit}
                  >
                    Update
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
