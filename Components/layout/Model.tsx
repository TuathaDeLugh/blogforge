'use client'
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DModalProps {
  btn: React.ReactNode | null | undefined;
  header: React.ReactNode | null | undefined;
  children?: React.ReactNode | null | undefined;
  submit: React.ReactNode | null | undefined;
}

const DModal: React.FC<DModalProps> = ({ btn, header, children, submit }) => {
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <>
      <button
        ref={trigger}
        onClick={() => setModalOpen(true)}
      >
        {btn}
      </button>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0,  }}
            animate={{ opacity: 1,  }}
            exit={{ opacity: 0,  }}
            transition={{ duration: 0.3 }}
            className={`fixed z-50 left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-slate-900/50 px-4 py-5`}
          >
            <motion.div
              ref={modal}
              initial={{ y: -50, opacity: 0,scale: 0.8 }}
              animate={{ y: 0, opacity: 1,scale: 1 }}
              exit={{ y: -50, opacity: 0,scale: 0.8 }}
              onFocus={() => setModalOpen(true)}
              onBlur={() => setModalOpen(false)}
              className="w-full max-w-[570px] rounded-[20px] bg-gray-50 dark:bg-gray-800 border dark:border-slate-600 px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
            >
              <h3 className="pb-[18px] text-xl font-semibold sm:text-2xl text-orange-500 dark:text-orange-400">
                {header}
              </h3>
              <span
                className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
              ></span>
              <div className="mb-10 text-base leading-relaxed flex flex-col items-center gap-5">
                {children}
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-1/2 px-3">
                  <motion.button
                    onClick={() => setModalOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full rounded-md border border-stroke dark:border-slate-600 p-3 text-center text-base font-medium  transition hover:border-red-500/70 dark:hover:border-red-500  hover:text-red-500/70 dark:hover:text-red-500"
                  >
                    Cancel
                  </motion.button>
                </div>
                <div className="w-1/2 px-3">
                  <motion.div
                    onClick={() => setModalOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full rounded-md border dark:border-slate-600 bg-orange-500/70 dark:bg-orange-400/90  text-center text-base font-medium text-white transition"
                  >
                    {submit}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DModal;
