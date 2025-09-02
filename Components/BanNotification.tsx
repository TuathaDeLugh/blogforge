'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { MdWarning, MdBlock } from 'react-icons/md';

interface BanStatus {
  isBanned: boolean;
  commentBanned: boolean;
  banExpiry?: string;
  commentBanExpiry?: string;
  banReason?: string;
  commentBanReason?: string;
}

export default function BanNotification() {
  const { data: session } = useSession();
  const [banStatus, setBanStatus] = useState<BanStatus | null>(null);

  useEffect(() => {
    if (session?.user?.dbid) {
      checkBanStatus();
    }
  }, [session]);

  const checkBanStatus = async () => {
    try {
      const response = await fetch(
        `/api/user/ban-status?userId=${session?.user?.dbid}`
      );
      if (response.ok) {
        const data = await response.json();
        setBanStatus(data);
      }
    } catch (error) {
      console.error('Error checking ban status:', error);
    }
  };

  if (!banStatus || (!banStatus.isBanned && !banStatus.commentBanned)) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
      {banStatus.isBanned && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-2 shadow-lg">
          <div className="flex items-center">
            <MdBlock className="text-xl mr-2" />
            <div>
              <strong className="font-bold">Account Banned</strong>
              <p className="text-sm">
                Your account has been banned. You cannot create or edit blogs.
                {banStatus.banExpiry && (
                  <span className="block">
                    Ban expires:{' '}
                    {new Date(banStatus.banExpiry).toLocaleDateString()}
                  </span>
                )}
              </p>
              {banStatus.banReason && (
                <p className="text-xs mt-1">Reason: {banStatus.banReason}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {banStatus.commentBanned && !banStatus.isBanned && (
        <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <MdWarning className="text-xl mr-2" />
            <div>
              <strong className="font-bold">
                Comment Privileges Suspended
              </strong>
              <p className="text-sm">
                You have been banned from commenting on blogs.
                {banStatus.commentBanExpiry && (
                  <span className="block">
                    Ban expires:{' '}
                    {new Date(banStatus.commentBanExpiry).toLocaleDateString()}
                  </span>
                )}
              </p>
              {banStatus.commentBanReason && (
                <p className="text-xs mt-1">
                  Reason: {banStatus.commentBanReason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
