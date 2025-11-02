'use client';
import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface ModalWrapperProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  header?: ReactNode;
  disableOutsideclick?: boolean;
  showCancelButton?: boolean;
  submitButton?: ReactNode;
  modalClassName?: string;
  [key: string]: any; // Allow any other props
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  setIsOpen,
  children,
  header,
  disableOutsideclick = false,
  showCancelButton = false,
  submitButton,
  modalClassName = '',
  ...rest
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const modalOpen = isOpen !== undefined ? isOpen : internalOpen;
  const setModalOpen = setIsOpen !== undefined ? setIsOpen : setInternalOpen;

  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      if (disableOutsideclick) return;
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
  }, [modalOpen, disableOutsideclick]);

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 left-0 top-0 flex backdrop-blur-md h-full min-h-screen w-full items-center justify-center px-4 py-5"
          {...rest}
        >
          <motion.div
            ref={modal}
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.8 }}
            className={`${modalClassName} w-full relative max-w-[570px] max-h-[90vh] rounded-[20px] bg-gray-50 dark:bg-gray-800 border dark:border-slate-600 px-4 py-8 text-center md:px-[40px] md:py-[50px]`}
          >
            {disableOutsideclick && (
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <IoClose size={24} />
              </button>
            )}
            {header && (
              <h3 className="pb-[18px] text-xl font-semibold sm:text-2xl text-orange-500 dark:text-orange-400">
                {header}
              </h3>
            )}
            <div className="text-base font-normal leading-relaxed flex flex-col items-center gap-5 text-black dark:text-white max-h-[calc(90vh-250px)] overflow-y-auto">
              {children}
            </div>
            {(showCancelButton || submitButton) && (
              <div className="mt-10 -mx-3 flex flex-wrap">
                {showCancelButton && (
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
                )}
                {submitButton && (
                  <div
                    className={`${showCancelButton ? 'w-1/2' : 'w-full'} px-3`}
                  >
                    {submitButton}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
