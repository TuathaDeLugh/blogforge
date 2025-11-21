'use client';

import Pagination from '@/Components/layout/Pagination';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiEye } from 'react-icons/fi';
import { Animation, Div, H1 } from '@/Components/Motion/Motion';
import Image from 'next/image';
import Tr from '@/Components/Motion/TableAnimation';
import DelBlogBtn from '../DeleteBlog';
import BanAwareEditIcon from '@/Components/BanAwareEditIcon';
import BlogSearchFilter from '@/Components/BlogSearchFilter';
import { useSearchParams } from 'next/navigation';

// Available blog categories
const BLOG_CATEGORIES = [
  'technology',
  'lifestyle',
  'travel',
  'food',
  'health_and_fitness',
  'business',
  'entertainment',
  'education',
  'sports',
  'fashion',
];

export default function UserBlog() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<any>({
    data: [],
    meta: { totalDocuments: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!session?.user?.dbid) return;

      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        const response = await fetch(
          `/api/blog/user/${session.user.dbid}?${params.toString()}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [session, searchParams]);

  if (!session) {
    return (
      <div className="text-center py-10">
        Please sign in to view your blogs.
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 mb-3">
        <Link
          href={'/user/blog/tab/'}
          className={`py-2 px-4 border-b-2 border-orange-400 focus:outline-none`}
        >
          All
        </Link>
        <Link
          href={'/user/blog/tab/published'}
          className={`py-2 px-4  focus:outline-none`}
        >
          Published
        </Link>
        <Link
          href={'/user/blog/tab/archived'}
          className={`py-2 px-4 focus:outline-none`}
        >
          Archived
        </Link>
        <Link
          href={'/user/blog/tab/draft'}
          className={`py-2 px-4  focus:outline-none`}
        >
          Draft
        </Link>
      </div>

      {/* Search and Filter Component */}
      <BlogSearchFilter categories={BLOG_CATEGORIES} showStatusFilter={true} />

      <H1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-2 text-xl font-semibold capitalize text-orange-500 dark:text-orange-400 lg:text-[4xl]"
      >
        Total blogs : {blogs.meta.totalDocuments}
      </H1>
      <Div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={
          'relative  py-3 flex flex-col min-w-0 break-words w-full mb-6 rounded '
        }
      >
        <div className=" block w-full rounded overflow-x-auto">
          {loading ? (
            <div className="text-center py-10">Loading blogs...</div>
          ) : blogs.data.length > 0 ? (
            <table className=" items-center w-full bg-transparent overflow-y-hidden ">
              <thead>
                <tr className="border border-l-0 border-r-0 bg-slate-200 dark:bg-slate-600 dark:border-slate-500 ">
                  <th
                    className={
                      'px-6 table-cell  w-6/12 py-3 text-xs md:text-sm uppercase   font-semibold '
                    }
                  >
                    Title
                  </th>
                  <th
                    className={
                      'hidden sm:table-cell  w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold '
                    }
                  >
                    Saves-Share
                  </th>
                  <th
                    className={
                      'hidden sm:table-cell  w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold '
                    }
                  >
                    Status
                  </th>
                  <th
                    className={
                      'hidden sm:table-cell w-2/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold  '
                    }
                  >
                    Image
                  </th>
                  <th
                    className={
                      ' px-6 w-1/12 py-3 text-xs md:text-sm uppercase   font-semibold '
                    }
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <Animation>
                  {blogs.data?.map((blog: any, index: number) => {
                    return (
                      <Tr
                        index={index}
                        key={blog._id}
                        className="border-b dark:border-slate-500 text-center odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                      >
                        <Suspense fallback={<p>Loading</p>}>
                          <td
                            className={
                              'table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left '
                            }
                          >
                            {blog.title}
                          </td>
                          <td
                            className={
                              'hidden sm:table-cell  pl-6 pr-1    py-3 text-xs md:text-sm '
                            }
                          >
                            {blog.usersave}-{blog.share}
                          </td>
                          <td
                            className={
                              'hidden sm:table-cell  pl-6 pr-1    py-3 text-xs md:text-sm '
                            }
                          >
                            {blog.status}
                          </td>
                          <td
                            className={
                              'hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm '
                            }
                          >
                            <Image
                              src={blog.images[0].link}
                              height={100}
                              width={300}
                              alt={blog.images[0].name}
                              className=" w-full h-14 object-cover rounded"
                            />
                          </td>
                          <td
                            className={
                              'table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow '
                            }
                          >
                            <div className=" flex gap-2">
                              <Link
                                href={`/user/blog/preview/${blog._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                title="Preview blog"
                              >
                                <FiEye size={25} />
                              </Link>
                              <BanAwareEditIcon blogId={blog._id} />
                              <DelBlogBtn
                                id={blog._id}
                                images={blog.images}
                                title={blog.title}
                              />
                            </div>
                          </td>
                        </Suspense>
                      </Tr>
                    );
                  })}
                </Animation>
              </tbody>
            </table>
          ) : (
            <div className="text-center text-lg">
              Looks Like You don&apos;t created any Blogs{' '}
            </div>
          )}
        </div>
      </Div>
      <Pagination pagedata={blogs.meta} />
    </>
  );
}
