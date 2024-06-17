// components/ShareButton.tsx
"use client"
import React from 'react';
import toast from 'react-hot-toast';
import { IoMdShareAlt } from "react-icons/io";
import { motion } from 'framer-motion';

const ShareButton: React.FC<{ link: string,className?:string }> = ({ link,className }) => {
  const handleCopyToClipboard = () => {
    const shareUrl: string = link;

    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    toast('Link saved in your clipbord', {
        icon: '📋'
      });
  };

  return (
    <motion.button
whileTap={{ scale: 0.95 }}				whileHover={{ scale: 1.05}} onClick={handleCopyToClipboard} className={` ${className} border text-orange-500 border-orange-500 rounded px-1 py-1 font-semibold hover:text-white hover:bg-orange-500 `} ><IoMdShareAlt size={20} /></motion.button>
  );
};

export default ShareButton;

