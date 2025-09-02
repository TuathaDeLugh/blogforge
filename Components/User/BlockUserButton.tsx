'use client';

import { useState } from 'react';
import { MdBlock, MdCheckCircle } from 'react-icons/md';
import toast from 'react-hot-toast';

interface BlockUserButtonProps {
  targetUserId: string;
  targetUsername: string;
  isBlocked: boolean;
  onBlockStatusChange?: (blocked: boolean) => void;
}

export default function BlockUserButton({
  targetUserId,
  targetUsername,
  isBlocked,
  onBlockStatusChange,
}: BlockUserButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [blocked, setBlocked] = useState(isBlocked);

  const handleBlockToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId,
          action: blocked ? 'unblock' : 'block',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newBlockedStatus = !blocked;
        setBlocked(newBlockedStatus);
        toast.success(
          `User ${newBlockedStatus ? 'blocked' : 'unblocked'} successfully`
        );
        onBlockStatusChange?.(newBlockedStatus);
      } else {
        toast.error(data.message || 'Failed to update block status');
      }
    } catch (error) {
      console.error('Error updating block status:', error);
      toast.error('Failed to update block status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBlockToggle}
      disabled={isLoading}
      className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
        blocked
          ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/20 dark:text-green-400 dark:hover:bg-green-800/30'
          : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800/20 dark:text-red-400 dark:hover:bg-red-800/30'
      }`}
      title={
        blocked ? `Unblock @${targetUsername}` : `Block @${targetUsername}`
      }
    >
      {blocked ? (
        <>
          <MdCheckCircle size={16} />
          <span>{isLoading ? 'Unblocking...' : 'Unblock'}</span>
        </>
      ) : (
        <>
          <MdBlock size={16} />
          <span>{isLoading ? 'Blocking...' : 'Block'}</span>
        </>
      )}
    </button>
  );
}
