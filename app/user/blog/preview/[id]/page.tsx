import Carousel from '@/Components/layout/Crousel';
import { Animation, Div, H1, P } from '@/Components/Motion/Motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import '@/style/datadisplay.css';
import Error from '@/app/not-found';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Metadata } from 'next';
import { getSingleblog } from '@/controllers/blog';
import DefaultUserProfile from '@/Components/layout/DefaultUserProfile';
import PreviewBanner from './PreviewBanner';

interface BlogProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: BlogProps): Promise<Metadata> {
  const blogdata = await getSingleblog(id);
  const blogTitle = blogdata?.title || 'Blog Preview';
  const blogInfo = blogdata?.info || 'Blog Preview';
  return {
    title: `Preview: ${blogTitle}`,
    description: blogInfo,
  };
}

// Generate dummy comments
const generateDummyComments = () => {
  const dummyUsers = [
    { username: 'reader_123', avatar: null },
    { username: 'blog_enthusiast', avatar: null },
    { username: 'tech_lover', avatar: null },
  ];

  const dummyCommentTexts = [
    'Great article! Very informative and well-written.',
    'Thanks for sharing this. Looking forward to more content like this!',
    'Interesting perspective. I learned something new today.',
  ];

  return dummyCommentTexts
    .slice(0, Math.floor(Math.random() * 2) + 2)
    .map((text, index) => ({
      _id: `dummy_${index}`,
      comment: text,
      user: dummyUsers[index],
      createdAt: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));
};

export default async function PreviewPage({ params: { id } }: BlogProps) {
  const session = await getServerSession(authOptions);
  const blog = await getSingleblog(id);

  if (!blog) {
    return <Error />;
  }

  // Check if user owns this blog
  const isOwner = session?.user?.dbid === blog.creator._id;

  if (!isOwner && blog.status !== 'published') {
    return <Error />;
  }

  // Generate dummy statistics
  const dummyViews = Math.floor(Math.random() * 150) + 50;
  const dummySaves = Math.floor(Math.random() * 40) + 10;
  const dummyShares = Math.floor(Math.random() * 25) + 5;
  const dummyComments = generateDummyComments();

  return (
    <>
      {/* Preview Mode Banner */}
      <PreviewBanner />

      <section className="max-w-[1500px] mx-auto px-4 lg:px-8 relative">
        <div className="relative m-5 md:mt-16 mx-2">
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute md:-top-16 lg:-top-20 left-0 text-[80px] lg:text-[100px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
          >
            Blog
          </H1>
          <H1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white"
          >
            {blog.title}
          </H1>
        </div>

        <div className="flex flex-col gap-3 justify-center mb-5 items-center">
          {/* Images */}
          <div className="w-full lg:w-[70%] xl:w-[77%]">
            <Carousel data={blog.images} />
          </div>
          {/* header section */}
          <div className="w-full p-2 lg:P-0 px-2">
            <Div
              className="flex tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-orange-500 dark:text-orange-400 font-medium">
                Category:{' '}
              </span>
              <div className="flex flex-wrap capitalize">
                {
                  blog.category?.map((category: string, index: number) => (
                    <span key={category} className="px-2">
                      {index === blog.category.length - 1
                        ? category.split('_').join(' ')
                        : category.split('_').join(' ') + ', '}
                    </span>
                  )) as JSX.Element[]
                }
              </div>
            </Div>
            <P
              className="mt-3 tracking-wider white-space-pre-wrap text-wrap inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-orange-500 dark:text-orange-400 font-medium">
                {' '}
                Summary:{' '}
              </span>
              {blog.info}
            </P>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <P
                className="tracking-wider mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-orange-500 dark:text-orange-400 font-medium">
                  {' '}
                  Views:{' '}
                </span>{' '}
                {dummyViews}
                <span className="text-xs ml-2 opacity-60">(Preview)</span>
              </P>
              <P
                className="tracking-wider mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-orange-500 dark:text-orange-400 font-medium">
                  {' '}
                  Users Save:{' '}
                </span>{' '}
                {dummySaves}
                <span className="text-xs ml-2 opacity-60">(Preview)</span>
              </P>
              <P
                className="tracking-wider flex gap-3 items-center mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-orange-500 dark:text-orange-400 flex items-center font-medium">
                  {' '}
                  Share:{' '}
                </span>{' '}
                {dummyShares}
                <span className="text-xs opacity-60">(Preview)</span>
              </P>
              <Div
                className="grow sm:grow-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-base mt-3 text-gray-500 dark:text-gray-400">
                  Save feature disabled in preview
                </p>
              </Div>
            </div>
            <div className="mt-3">
              <P
                className="flex gap-2 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-orange-500 dark:text-orange-400 font-medium">
                  {' '}
                  Writer:{' '}
                </span>{' '}
                {blog.creator.avatar ? (
                  <Image
                    className="rounded-full border dark:border-slate-500 h-7 w-7"
                    src={blog.creator.avatar}
                    width={23}
                    height={23}
                    alt={blog.creator.username}
                  />
                ) : null}
                <span className="hover:font-semibold">
                  {blog.creator.username}
                </span>
              </P>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row justify-between items-start border-t dark:border-slate-600 mx-2 mb-6">
          <Div
            className="w-full lg:w-[70%] xl:w-[77%] mt-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Blog content */}
            <div
              className={`data min-h-[80vh] text-justify`}
              dangerouslySetInnerHTML={{
                __html: blog.detail.replace(/\n/g, '<br>'),
              }}
            />
          </Div>
          {/* comments */}
          <Div
            className="w-full lg:w-[25%] xl:w-[20%] sticky top-[73px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <P
              className="tracking-wider mt-3 text-orange-500 dark:text-orange-400 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Comments (Preview)
            </P>
            <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comment form disabled in preview mode
              </p>
            </div>

            <div className="pt-3">
              {dummyComments.length > 0 ? (
                <div className="max-h-[50vh] lg:max-h-[80dvh] overflow-y-auto flex flex-col gap-2">
                  <Animation>
                    {dummyComments?.map((comment: any) => {
                      return (
                        <Div
                          initial={{
                            opacity: 0,
                            y: -20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -20,
                          }}
                          layout={true}
                          key={comment._id}
                          className="rounded-lg bg-slate-100 dark:bg-gray-800 p-1 w-[98%] relative"
                        >
                          <div className="py-1 px-2 flex justify-between">
                            <div className="flex items-center gap-2">
                              <DefaultUserProfile
                                username={comment?.user?.username}
                                size={28}
                                random
                              />
                              <div className="flex flex-col justify-start">
                                <p> {comment.user.username} </p>
                                <p className="text-xs opacity-75">
                                  at{' '}
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={`py-1 px-2 overflow-x-scroll`}>
                            {comment.comment}
                          </div>
                        </Div>
                      );
                    })}
                  </Animation>
                </div>
              ) : (
                <p className="mt-5">No comments available</p>
              )}
            </div>
          </Div>
        </div>
        <div className="my-5">
          <P
            className="flex gap-2 items-center text-slate-400 dark:text-slate-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {blog.creator.avatar ? (
              <Image
                className="rounded-full border dark:border-slate-500 h-7 w-7"
                src={blog.creator.avatar}
                width={23}
                height={23}
                alt={blog.creator.username}
              />
            ) : null}
            {blog.creator.username +
              ' at ' +
              new Date(blog.createdAt).toLocaleString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata',
              }) +
              ' IST'}
          </P>
        </div>
      </section>
    </>
  );
}
