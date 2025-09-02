import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Div, H1 } from '@/Components/Motion/Motion';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from './form';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session?.user && !session?.user.dbid) {
    redirect('/authlogin');
  } else if (session?.user && session?.user.dbid) {
    redirect('/');
  } else {
    return (
      <div className="flex min-h-[92vh] md:min-h-[90vh] items-center mx-auto max-w-[1500px] justify-center px-4 lg:px-8">
        <Div
          className="h-full flex items-center relative max-w-2xl md:mx-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto p-5 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600 min-h-[400px]">
            <div className="relative mt-5 md:mt-10">
              <H1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute md:-top-16 lg:-top-20 left-0 md:text-[90px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
              >
                BlogForge
              </H1>
              <H1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pl-2 font-bold border-l-8 border-orange-400 text-5xl dark:text-white"
              >
                SIGN IN
              </H1>
            </div>

            <LoginForm />

            <div className="md:w-[450px] text-center">
              Forgot Password?{' '}
              <Link
                href={'/reset/request'}
                className="text-orange-400 hover:text-orange-500"
              >
                Reset here
              </Link>
            </div>
            <div className="md:w-[450px] mt-2 text-center">
              Don&apos;t have Account?{' '}
              <Link
                href={'/register'}
                className="text-orange-400 hover:text-orange-500"
              >
                Sign up here{' '}
              </Link>
            </div>
          </div>
          <Div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -z-10 hidden w-full h-full bg-orange-400/50 rounded-md -bottom-3 -right-3 md:block"
          ></Div>
        </Div>
      </div>
    );
  }
}
