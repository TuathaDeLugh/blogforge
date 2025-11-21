'use client';

import { useState, useEffect } from 'react';
import { IoAlertCircleOutline, IoClose } from 'react-icons/io5';

export default function PreviewBanner() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger popup animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Minimized State - Icon Button on Left */}
      <div
        className={`fixed left-4 bottom-6 z-50 transition-all duration-500 ease-out ${
          isMinimized
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 -translate-x-20 scale-50 pointer-events-none'
        }`}
      >
        <button
          onClick={handleExpand}
          className="bg-orange-500/80 dark:bg-orange-600/80 backdrop-blur-md text-white p-3 rounded-full shadow-lg border border-orange-400/30 hover:bg-orange-500 dark:hover:bg-orange-600 hover:scale-110 transition-all duration-300 group"
          title="Show preview info"
        >
          <IoAlertCircleOutline
            size={24}
            className="group-hover:rotate-12 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Expanded State - Full Banner */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          isVisible && !isMinimized
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        } ${isMinimized ? 'pointer-events-none' : ''}`}
      >
        <div className="bg-orange-500/50 dark:bg-orange-600/50 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-orange-400/30 flex items-center gap-3 hover:shadow-xl hover:bg-orange-500/60 dark:hover:bg-orange-600/60 transition-all duration-300">
          <IoAlertCircleOutline
            size={18}
            className="flex-shrink-0 animate-pulse"
          />
          <p className="text-sm font-medium whitespace-nowrap">
            Preview Mode - Statistics shown are for preview only
          </p>
          <button
            onClick={handleMinimize}
            className="ml-2 hover:bg-white/20 rounded-full p-1 transition-all duration-200 hover:rotate-90"
            title="Minimize"
          >
            <IoClose size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
