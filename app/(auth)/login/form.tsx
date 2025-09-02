'use client';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { loginSchema } from '@/yupSchema';

export default function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    userId: string;
    email: string;
  } | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const initialValues = {
    email: '',
    password: '',
  };
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        console.log('Regular login form submitted');
        try {
          setDisabled(true);

          // Store credentials for later use in 2FA
          setLoginCredentials({
            email: values.email,
            password: values.password,
          });

          // First login attempt - check if 2FA is needed
          const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (result?.ok) {
            // Login successful without 2FA
            router.refresh();
            router.push('/');
            toast.success(`Logged in successfully with ${values.email}`);
          } else if (result?.error === '2FA_REQUIRED') {
            // 2FA is required, send OTP
            try {
              const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              });

              const data = await response.json();

              if (data.requires2FA) {
                setShow2FA(true);
                setUserInfo({ userId: data.userId, email: data.email });
                toast.success('Verification code sent to your email');
              } else {
                toast.error('Failed to send verification code');
              }
            } catch (error) {
              console.error('Error sending OTP:', error);
              toast.error('Failed to send verification code');
            }
          } else {
            toast.error(result?.error || 'Invalid credentials');
          }
        } catch (error) {
          console.log('Login Failed:', error);
          toast.error('Login failed');
        }
        setDisabled(false);
        action.resetForm();
      },
    });

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('2FA form submitted');

    if (!loginCredentials || otpCode.length !== 6) {
      toast.error('Please enter a valid 6-character verification code');
      return;
    }

    try {
      setDisabled(true);

      // 2FA verification attempt
      const result = await signIn('credentials', {
        redirect: false,
        email: loginCredentials.email,
        password: loginCredentials.password,
        otpCode: otpCode,
      });

      if (result?.ok) {
        router.refresh();
        router.push('/');
        toast.success(`Logged in successfully with ${loginCredentials.email}`);
      } else if (result?.error === 'INVALID_OTP') {
        toast.error('Invalid verification code');
      } else if (result?.error === 'EXPIRED_OTP') {
        toast.error('Verification code has expired');
      } else {
        toast.error('Verification failed');
      }
    } catch (error) {
      console.log('2FA verification failed:', error);
      toast.error('Verification failed');
    } finally {
      setDisabled(false);
    }
  };

  const handleResendOTP = async () => {
    if (!userInfo || resendCooldown > 0) return;

    setDisabled(true);
    try {
      const response = await fetch('/api/auth/2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          action: 'send-otp',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('New verification code sent');
        setResendCooldown(60);

        // Start countdown
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(data.message || 'Failed to send code');
      }
    } catch (error) {
      toast.error('Failed to send verification code');
    } finally {
      setDisabled(false);
    }
  };

  const handleBack = () => {
    setShow2FA(false);
    setUserInfo(null);
    setOtpCode('');
    setResendCooldown(0);
    setLoginCredentials(null);
  };

  return (
    <>
      {!show2FA ? (
        // Regular login form
        <>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className=" space-y-4 pt-10 pb-4 "
          >
            <div className="w-[85vw] md:w-[450px] h-14">
              <input
                type="text"
                placeholder="Email or Username"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`outline ${
                  errors.email && touched.email
                    ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                    : ' outline-transparent '
                } w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
              />
              {errors.email && touched.email ? (
                <p className=" text-red-500 text-sm">* {errors.email}</p>
              ) : null}
            </div>
            <div className="w-[85vw] md:w-[450px] h-14">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`outline ${
                    errors.password && touched.password
                      ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                      : ' outline-transparent '
                  } w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
                />
                <div
                  className={` absolute top-0  right-3 h-full flex items-center text-slate-400`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={25} />
                  ) : (
                    <FaEye size={22} />
                  )}
                </div>
              </div>
              {errors.password && touched.password ? (
                <p className=" text-red-500 text-sm">* {errors.password}</p>
              ) : null}
            </div>
            <div className="md:w-[450px] mt-8 mb-2">
              <button
                disabled={disabled}
                type="submit"
                className="text-white bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
              >
                Login
                {disabled ? (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                ) : null}
              </button>
            </div>
          </form>
          <div className="md:w-[450px] text-center">OR</div>
          <div className="md:w-[450px] mb-8 mt-2 grid grid-cols-2 gap-3 ">
            <button
              onClick={() => signIn('google', { callbackUrl: '/authlogin' })}
              className="text-black bg-slate-200 hover:opacity-50 border border-slate-500 font-semibold rounded-md text-sm px-4 py-3 w-full flex gap-2 items-center justify-center"
            >
              Login With{' '}
              <FcGoogle size={20} className="bg-white rounded-full" />
            </button>
            <button
              onClick={() => signIn('github', { callbackUrl: '/authlogin' })}
              className="text-white bg-slate-600 hover:opacity-50 font-semibold rounded-md text-sm px-4 py-3 w-full flex gap-2 items-center justify-center"
            >
              Login With
              <FaGithub size={20} className="bg-slate-800 rounded-full" />
            </button>
          </div>
        </>
      ) : (
        // 2FA verification form
        <div className="space-y-4 pt-10 pb-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We've sent a 6-character verification code to
            </p>
            <p className="text-sm text-orange-500 font-medium">
              {userInfo?.email}
            </p>
          </div>

          <form onSubmit={handle2FASubmit} className="space-y-4">
            <div className="w-[85vw] md:w-[450px] h-14">
              <input
                type="text"
                placeholder="Enter 6-character code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-center text-lg font-mono tracking-widest focus:ring-2 ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div className="md:w-[450px] mt-8 mb-2">
              <button
                disabled={disabled || otpCode.length !== 6}
                type="submit"
                className="text-white bg-orange-400 hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none font-semibold rounded-md text-sm px-4 py-3 w-full flex items-center justify-center gap-4"
              >
                Verify & Login
                {disabled ? (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                ) : null}
              </button>
            </div>
          </form>

          <div className="text-center space-y-2">
            <button
              onClick={handleResendOTP}
              disabled={disabled || resendCooldown > 0}
              className="text-sm text-orange-600 hover:text-orange-500 disabled:opacity-50"
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : 'Resend verification code'}
            </button>
            <br />
            <button
              onClick={handleBack}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back to login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
