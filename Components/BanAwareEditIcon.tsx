"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

interface BanStatus {
  isBanned: boolean;
  commentBanned: boolean;
  banExpiry?: string;
  commentBanExpiry?: string;
  banReason?: string;
  commentBanReason?: string;
}

interface BanAwareEditIconProps {
  blogId: string;
  isAdmin?: boolean; // If true, always show enabled edit icon
}

export default function BanAwareEditIcon({ blogId, isAdmin = false }: BanAwareEditIconProps) {
  const { data: session } = useSession();
  const [banStatus, setBanStatus] = useState<BanStatus | null>(null);

  useEffect(() => {
    if (session?.user?.dbid && !isAdmin) {
      checkBanStatus();
    }
  }, [session, isAdmin]);

  const checkBanStatus = async () => {
    try {
      const response = await fetch(`/api/user/ban-status?userId=${session?.user?.dbid}`);
      if (response.ok) {
        const data = await response.json();
        setBanStatus(data);
      }
    } catch (error) {
      console.error('Error checking ban status:', error);
    }
  };

  // If admin or user is not banned, show normal edit icon
  if (isAdmin || !banStatus?.isBanned) {
    return (
      <Link href={`/user/blog/edit/${blogId}`} title="Edit">
        <HiPencilAlt className='text-blue-600 hover:text-blue-800' size={25} />
      </Link>
    );
  }

  // If user is banned, show disabled edit icon
  return (
    <div title="Editing disabled - Account banned" className="cursor-not-allowed">
      <HiPencilAlt className='text-gray-400' size={25} />
    </div>
  );
}