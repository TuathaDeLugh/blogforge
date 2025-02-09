import AddFAQ from '@/Components/FaQ/AddFaQ';
import DeleteFaQ from '@/Components/FaQ/DeleteFaQ';
import UpdateFAQ from '@/Components/FaQ/UpdateFaQ';
import { Animation, Div, H1 } from '@/Components/Motion/Motion'
import Tr from '@/Components/Motion/TableAnimation';
import getFaQs from '@/controllers/faq';
import React, { Suspense } from 'react'

export default async function Adminfaq() {
  const faqs = await getFaQs()
  let i = 1;

  return (
    <section className='md:my-6'>
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
          transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white">
          FaQ
        </H1>
      </div>
      <div className="mt-3">
      <AddFAQ/>
      </div>
          <Div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={
              "relative  py-3 flex flex-col min-w-0 break-words w-full mb-6 rounded "}>

            <div className=" block w-full rounded overflow-x-auto">
              {
                faqs?.length > 0 ? (
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
                          title
                        </th>
                        <th
                          className={
                            "hidden sm:table-cell  px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                          }
                        >
                          info
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
                      <Animation>
                      {faqs?.map((faq: any, index: number) => {
                        return (
                          <Tr index={index} key={faq._id} className='border-y dark:border-slate-500 odd:bg-transparent even:bg-slate-100 dark:even:bg-slate-800/50'>
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
                                {faq.title}
                              </td><td
                                className={
                                  "hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                                }
                              >
                                {faq.info}
                              </td>
                              <td
                                className={
                                  "table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow   text-left "
                                }
                              >
                                <div className='md:flex'>

                                  <UpdateFAQ faq={faq}/>
                                  <DeleteFaQ faqid={faq._id} title={faq.title} />
                                </div>
                              </td>
                            </Suspense>
                          </Tr>
                        )
                      })}
                      </Animation>
                    </tbody>
                  </table></>
                ) : <div className='text-center text-lg'>No FaQs avaliable </div>
              }
            </div>
          </Div>
          </section>
  )
}
