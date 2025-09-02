'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Enable2FA() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing token');
      router.push('/user');
      return;
    }

    const enable2FA = async () => {
      try {
        const response = await fetch('/api/auth/enable-2fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          toast.success(
            'Two-Factor Authentication has been enabled successfully!'
          );
          setTimeout(() => {
            router.push('/user');
          }, 3000);
        } else {
          toast.error(data.message || 'Failed to enable 2FA');
          setTimeout(() => {
            router.push('/user');
          }, 2000);
        }
      } catch (error) {
        console.error('Error enabling 2FA:', error);
        toast.error('An error occurred while enabling 2FA');
        setTimeout(() => {
          router.push('/user');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    enable2FA();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? 'Enabling 2FA...' : success ? '2FA Enabled!' : 'Error'}
          </h2>

          {loading && (
            <div className="mt-8 flex justify-center">
              <AiOutlineLoading3Quarters
                size={40}
                className="animate-spin text-orange-500"
              />
            </div>
          )}

          {success && (
            <div className="mt-8">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-gray-600 dark:text-gray-400">
                Two-Factor Authentication has been successfully enabled for your
                account. You will now receive verification codes via email when
                logging in.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Redirecting you back to your profile...
              </p>
            </div>
          )}

          {!loading && !success && (
            <div className="mt-8">
              <div className="text-6xl mb-4">❌</div>
              <p className="text-gray-600 dark:text-gray-400">
                Failed to enable Two-Factor Authentication. The link may be
                invalid or expired.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Redirecting you back to your profile...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
