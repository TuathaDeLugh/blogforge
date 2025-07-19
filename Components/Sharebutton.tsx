// components/ShareButton.tsx
"use client"
import React from 'react';
import toast from 'react-hot-toast';
import { IoMdShareAlt } from "react-icons/io";
import { trackBlogShare } from '@/util/analytics';

const ShareButton: React.FC<{ link: string, className?: string, blogId?: string }> = ({ link, className, blogId }) => {
  const handleCopyToClipboard = async () => {
    const shareUrl: string = link;

    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Track the share if blogId is provided
    if (blogId) {
      await trackBlogShare(blogId);
    }
    
    toast('Link saved in your clipbord', {
        icon: '📋'
      });
  };

  return (
    <button onClick={handleCopyToClipboard} className={` ${className} border text-orange-500 border-orange-500 rounded px-1 py-1 font-semibold hover:text-white hover:bg-orange-500 `} ><IoMdShareAlt size={20} /></button>
  );
};

export default ShareButton;

