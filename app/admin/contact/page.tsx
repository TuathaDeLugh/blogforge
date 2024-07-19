import DelmailBtn from '@/Components/Delmail';
import Pagination from '@/Components/layout/Pagination';
import getEmails from '@/controllers/email';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { AiOutlineEye } from 'react-icons/ai';

export default async function AdminContact(context:any) {
  const emails = await getEmails(parseInt(context.searchParams.page));
  let i = 1;
  return (
    <><span className="mb-4 block text-base font-semibold  text-purple-700 dark:text-purple-400">
    Contact Request
  </span>
  <h2 className="mb-6 text-[32px] font-bold capitalize text-dark lg:text-[4xl]">
    Total Request : {emails.meta.totalDocuments}
  </h2>
  <div className="block mt-10 w-full overflow-x-auto rounded">
        {
      emails ? (
          <><table className="items-center w-full bg-transparent -collapse">
            <thead>
              <tr className=' bg-slate-200 dark:bg-slate-600'>
                <th
                  className={
                    "pl-6 table-cell pr-1   py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  #
                </th>
                <th
                  className={
                    "px-6 table-cell  py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "hidden sm:table-cell  px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6  py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  Subject
                </th>
                <th
                  className={
                    "hidden sm:table-cell px-6    py-3 text-xs md:text-sm flex-grow uppercase   font-semibold text-left "
                  }
                >
                  Details
                </th>
                <th
                  className={
                    " w-12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  ac
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.data?.map((email) => {
                return (
                  <tr key={email._id} className='border-y dark:border-slate-500'>
                    <Suspense fallback={<p>Loading</p>}>
                    <td
                      className={
                        " table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                      }
                    >
                      {i++}
                    </td>
                    <td
                      className={
                        "table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                      }
                    >
                      {email.fullname}
                    </td><td
                      className={
                        "hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                      }
                    >
                      {email.email}
                    </td><td
                      className={
                        "table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                      }
                    >
                      {(email.subject).substring(0,15)}
                    </td><td
                      className={
                        "hidden sm:table-cell pl-6 pr-1 align-middle   py-3 text-xs md:text-sm    text-left "
                      }
                    >
                      {(email.details).substring(0, 12)}
                    </td>
                    <td
                      className={
                        "table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow   text-left "
                      }
                    >
                      <div className='md:flex'>

                      <Link href={`/admin/contact/${email._id}`} title="View " >
                        <AiOutlineEye className='text-green-600 m-2 backdrop-blur-xl' size={25} />
                      </Link>
                      <DelmailBtn id={email._id} subject={email.subject} />
                      </div>
                    </td>
                    </Suspense>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination pagedata={emails.meta}/></>
      ) : null
            }
        </div>
  </>
  )
}
