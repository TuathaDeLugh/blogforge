import DelmailBtn from '@/Components/Delmail';
import Pagination from '@/Components/layout/Pagination';
import { Animation, Div, H1 } from '@/Components/Motion/Motion';
import Tr from '@/Components/Motion/TableAnimation';
import getEmails from '@/controllers/email';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

export default async function AdminContact(context: any) {
  const emails = await getEmails(parseInt(context.searchParams.page));
  let i = 1;
  return (
    <section className="md:my-6">
      <div className="md:relative -z-10">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
        >
          Admin
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white"
        >
          Contact
        </H1>
      </div>
      {emails.data.length > 0 ? (
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" my-2 text-xl font-bold capitalize text-orange-500 dark:text-orange-400 lg:text-[4xl]"
        >
          Total Request : {emails.meta.totalDocuments}
        </H1>
      ) : null}
      <Div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={
          'relative  py-3 flex flex-col min-w-0 break-words w-full mb-6 rounded '
        }
      >
        <div className=" block w-full rounded overflow-x-auto">
          {emails.data.length > 0 ? (
            <>
              <table className="items-center w-full bg-transparent -collapse">
                <thead>
                  <tr className=" bg-slate-200 dark:bg-slate-600">
                    <th
                      className={
                        'pl-6 table-cell pr-1   py-3 text-xs md:text-sm uppercase   font-semibold text-left '
                      }
                    >
                      #
                    </th>
                    <th
                      className={
                        'px-6 table-cell  py-3 text-xs md:text-sm uppercase   font-semibold text-left '
                      }
                    >
                      Name
                    </th>
                    <th
                      className={
                        'hidden sm:table-cell  px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left '
                      }
                    >
                      Email
                    </th>
                    <th
                      className={
                        'px-6  py-3 text-xs md:text-sm uppercase   font-semibold text-left '
                      }
                    >
                      Subject
                    </th>
                    <th
                      className={
                        'hidden sm:table-cell px-6    py-3 text-xs md:text-sm flex-grow uppercase   font-semibold text-left '
                      }
                    >
                      Details
                    </th>
                    <th
                      className={
                        ' w-12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left '
                      }
                    >
                      ac
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Animation>
                    {emails.data?.map((email: any, index: number) => {
                      return (
                        <Tr
                          index={index}
                          key={email._id}
                          className="border-y dark:border-slate-500 odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50"
                        >
                          <Suspense fallback={<p>Loading</p>}>
                            <td
                              className={
                                ' table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left '
                              }
                            >
                              {i++}
                            </td>
                            <td
                              className={
                                'table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left '
                              }
                            >
                              {email.name}
                            </td>
                            <td
                              className={
                                'hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left '
                              }
                            >
                              {email.email}
                            </td>
                            <td
                              className={
                                'table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left '
                              }
                            >
                              {email.subject.substring(0, 15)}
                            </td>
                            <td
                              className={
                                'hidden sm:table-cell pl-6 pr-1 align-middle   py-3 text-xs md:text-sm    text-left '
                              }
                            >
                              {email.details.substring(0, 12)}
                            </td>
                            <td
                              className={
                                'table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow   text-left '
                              }
                            >
                              <div className="md:flex">
                                <Link
                                  href={`/admin/contact/${email._id}`}
                                  title="View "
                                >
                                  <AiOutlineEye
                                    className="text-green-600 m-2 backdrop-blur-xl"
                                    size={25}
                                  />
                                </Link>
                                <DelmailBtn
                                  id={email._id}
                                  subject={email.subject}
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
              <Pagination pagedata={emails.meta} />
            </>
          ) : (
            <div className="text-center text-lg">No New Applications </div>
          )}
        </div>
      </Div>
    </section>
  );
}
