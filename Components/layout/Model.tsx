'use client';
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DModalProps {
  btn: React.ReactNode | null | undefined;
  header: React.ReactNode | null | undefined;
  children?: React.ReactNode | null | undefined;
  submit?: React.ReactNode | null | undefined;
  timerDuration?: number;
  form?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DModal: React.FC<DModalProps> = ({ btn, header, children, submit, timerDuration, form, isOpen, setIsOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const modalOpen = isOpen !== undefined ? isOpen : internalOpen;
  const setModalOpen = setIsOpen !== undefined ? setIsOpen : setInternalOpen;

  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!modal.current) return;
      if (!modalOpen || modal.current.contains(target as Node) || trigger.current?.contains(target as Node)) return;
      setModalOpen(false);
    };

    const keyHandler = ({ keyCode }: { keyCode: number }) => {
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

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (timeLeft !== null && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setModalOpen(false);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timeLeft]);

  const handleOpenModal = () => {
    setModalOpen(true);
    if (timerDuration) {
      setTimeLeft(timerDuration);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <button
        className="w-full"
        ref={trigger}
        onClick={handleOpenModal}
      >
        {btn}
      </button>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 left-0 top-0 flex backdrop-blur-md h-full min-h-screen w-full items-center justify-center px-4 py-5"
          >
            <motion.div
              ref={modal}
              initial={{ y: -50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.8 }}
              onFocus={() => setModalOpen(true)}
              onBlur={() => setModalOpen(false)}
              className="w-full max-w-[570px] rounded-[20px] bg-gray-50 dark:bg-gray-800 border dark:border-slate-600 px-8 py-12 text-center md:px-[70px] md:py-[60px]"
            >
              <h3 className="pb-[18px] text-xl font-semibold sm:text-2xl text-orange-500 dark:text-orange-400">
                {header}
              </h3>
              
              <div className=" text-base font-normal leading-relaxed flex flex-col items-center gap-5 text-black dark:text-white">
                {children}
              </div>
              {
                !form &&
              
              <div className="mt-10 -mx-3 flex flex-wrap">
                {timeLeft === null ? (
                  <>
                    <div className="w-1/2 px-3">
                      <motion.button
                        onClick={() => setModalOpen(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full text-gray-400 dark:text-white rounded-md border border-stroke dark:border-slate-600 p-3 text-center text-base font-medium transition hover:border-red-500/70 dark:hover:border-red-500 hover:text-red-500/70 dark:hover:text-red-500"
                      >
                        Cancel
                      </motion.button>
                    </div>
                    <div className="w-1/2 px-3">
                      <motion.div
                        onClick={() => setModalOpen(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full rounded-md border dark:border-slate-600 bg-orange-500/70 dark:bg-orange-400/90 text-center text-base font-medium text-white transition"
                      >
                        {submit}
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <motion.div className="w-full px-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
<motion.button
  onClick={() => setModalOpen(false)}
  className="block w-full bg-gradient-to-r from-orange-500 to-orange-500/60 rounded-md border border-stroke dark:border-slate-600 p-3 text-center text-base font-medium transition hover:border-orange-500/70 dark:hover:border-orange-500 text-black dark:text-white relative"
  style={{
    backgroundSize: `${((timeLeft / (timerDuration || 1)) * 100)}% 100%`,
    backgroundPosition: '0% 50%',
    backgroundRepeat: 'no-repeat',
  }}
  initial={{ backgroundSize: '0% 100%' }}
  animate={{ backgroundSize: `${((timeLeft / (timerDuration || 1)) * 100)}% 100%` }}
  transition={{ duration: 1, ease: 'linear' }}
>
  Close
</motion.button>
                  </motion.div>
                )}
              </div>
}
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DModal;
