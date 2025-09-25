'use client';

import { Div } from '@/Components/Motion/Motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ErrorComponent = () => {
  const path = usePathname();

  return (
    <>
      <section className="max-w-[1500px] mx-auto">
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 min-h-[93vh] md:min-h-[91vh]  items-center flex justify-center flex-col lg:flex-row md:gap-28 gap-16">
          <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <Div
              className="mx-auto"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <div className=" lg:absolute left-0 md:-top-16 lg:-top-20 text-[100px] lg:text-[200px] font-black text-slate-300 lg:opacity-30 lg:dark:opacity-10 -z-10 ">
                  500
                </div>
                <div className="">
                  <h1 className="my-2 text-orange-400  font-bold text-2xl">
                    Looks like you&apos;ve lost the doorway
                  </h1>
                  <p className="my-2 text-gray-800 dark:text-gray-400">
                    Sorry about that! Please visit our hompage or refresh.
                  </p>
                  <div className="grid grid-flow-col grid-cols-2 w-[80%] gap-5">
                    <a
                      href={path}
                      className=" block my-2 border rounded md py-4 text-center bg-orange-400 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50"
                    >
                      Refresh Page
                    </a>
                    <a
                      href="/"
                      className=" block my-2 border rounded md py-4 text-center bg-orange-400 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50"
                    >
                      GO Home!
                    </a>
                  </div>
                </div>
              </div>
            </Div>
          </div>
          <Div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=" w-[50%] hidden md:flex md:justify-end  "
          >
            <Image
              width={400}
              height={400}
              alt="disconnected"
              src="https://bucket.umangsailor.com/storage/blogforge/assets/202012_07.jpg"
              className="rounded-full"
            />
          </Div>
        </div>
      </section>
    </>
  );
};

export default ErrorComponent;
