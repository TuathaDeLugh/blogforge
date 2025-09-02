'use client';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoAddSharp } from 'react-icons/io5';
import { trackBlogComment } from '@/util/analytics';

interface CommentFormPrp {
  blogid: string;
}

interface BanStatus {
  isBanned: boolean;
  commentBanned: boolean;
  banExpiry?: string;
  commentBanExpiry?: string;
  banReason?: string;
  commentBanReason?: string;
}

export default function CommentForm({ blogid }: CommentFormPrp) {
  const router = useRouter();
  const { data: session } = useSession();
  const [banStatus, setBanStatus] = useState<BanStatus | null>(null);
  console.log('🚀 ~ CommentForm ~ session:', session);

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
  const initialValues = {
    user: '',
    comment: '',
  };
  const postapi = async (ogvalues: any) => {
    await fetch(`/api/blog`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ogvalues),
    });

    // Track comment analytics
    await trackBlogComment(blogid);

    router.refresh();
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      const data = {
        user: session?.user.dbid,
        blog: blogid,
        comment: values.comment,
        action: 'add',
      };
      toast.promise(postapi(data), {
        loading: 'Adding Comment',
        success: 'Comment Added',
        error: 'Failed To Add',
      });
      action.resetForm();
    },
  });
  if (session) {
    if (session.user.isVerified === false) {
      return (
        <div className=" mt-5">
          Please{' '}
          <Link
            href="/verifyemail/request"
            className="text-orange-500 hover:underline"
          >
            Verify
          </Link>{' '}
          your account for comment
        </div>
      );
    }
    if (session.user.dbid && session.user.isVerified) {
      // Check if user is comment banned
      if (banStatus?.commentBanned) {
        return (
          <div className="mt-5">
            <div className="flex justify-between opacity-50">
              <input
                type="text"
                className="w-[80%] bg-gray-200 border rounded-full px-3 py-1 border-gray-300 cursor-not-allowed"
                placeholder="Comments disabled - You are banned from commenting"
                disabled
                readOnly
              />
              <button
                type="button"
                disabled
                className="rounded-full p-2 bg-gray-400 text-gray-600 cursor-not-allowed"
              >
                <IoAddSharp size={25} />
              </button>
            </div>
            <p className="text-red-500 text-sm mt-2">
              You have been banned from commenting.
              {banStatus.commentBanExpiry && (
                <span className="block">
                  Ban expires:{' '}
                  {new Date(banStatus.commentBanExpiry).toLocaleDateString()}
                </span>
              )}
              {banStatus.commentBanReason && (
                <span className="block text-xs">
                  Reason: {banStatus.commentBanReason}
                </span>
              )}
            </p>
          </div>
        );
      }

      return (
        <div className=" mt-5">
          <form
            className="flex justify-between"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <input
              type="text"
              className="w-[80%] bg-transparent border rounded-full px-3 py-1 border-gray-400 focus:outline-none focus:ring focus:ring-orange-700"
              placeholder="Your Comment"
              required
              name="comment"
              value={values.comment}
              onChange={handleChange}
              id=""
            />
            <button
              type="submit"
              value="Submit"
              className="rounded-full p-2 bg-orange-400 text-white "
            >
              <IoAddSharp size={25} />
            </button>
          </form>
        </div>
      );
    }
  } else {
    return (
      <div className=" mt-5">
        Please{' '}
        <Link href="/login" className="text-orange-500 hover:underline">
          Login
        </Link>{' '}
        for comment
      </div>
    );
  }
}
