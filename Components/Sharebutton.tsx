// components/ShareButton.tsx
"use client"
import React from 'react';
import toast from 'react-hot-toast';

const ShareButton: React.FC = () => {
  const handleCopyToClipboard = () => {
    const shareUrl: string = 'https://example.com';

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
    <button onClick={handleCopyToClipboard} className='bg-orange-500 rounded px-5 py-2' >Share</button>
  );
};

export default ShareButton;

