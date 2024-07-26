import { H1 } from '@/Components/Motion/Motion';
import React, { Suspense } from 'react'

export default async function AdminUsers(context: { searchParams: { page: string; }; }) {
  // const users = await getAllUsers(parseInt(context.searchParams.page));
  // let i = 1;
  return (
    <><section className='md:my-6'>
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
        All Users
      </H1>
    </div>
    </section>
  {/* <h2 className="mb-6 text-[32px] font-bold capitalize text-dark lg:text-[4xl]">
    Total Users : {users.meta.totalDocuments}
  </h2>
  <div
        className={
          "relative  md:m-3 flex flex-col min-w-0 break-words w-full mb-6 rounded "}>

        <div className=" block w-full rounded overflow-x-auto">
          <table className=" items-center w-full bg-transparent ">
            <thead>
              <tr className='border border-l-0 border-r-0 bg-slate-200 dark:bg-slate-600 dark:border-slate-500'>
                <th
                  className={
                    "pl-6 table-cell pr-1 w-1/12 py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  #
                </th>
                <th
                  className={
                    "px-6 table-cell  w-3/12 py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  username
                </th>
                <th
                  className={
                    "hidden sm:table-cell w-3/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  name
                </th>
                <th
                  className={
                    "hidden sm:table-cell w-3/12 px-6    py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  email
                </th>
                  
                <th
                  className={
                    " px-6 w-3/12 py-3 text-xs md:text-sm uppercase   font-semibold text-left "
                  }
                >
                  role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.data?.map((user: { _id: React.Key | null | undefined; username: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; email: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => {
                return (
                  <tr key={user._id} className='border-b dark:border-slate-500'>
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
                        {user.username}
                      </td><td
                        className={
                          "hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                        }
                      >
                        {user.name}
                      </td>
                      <td
                        className={
                          "hidden sm:table-cell pl-6 pr-1    py-3 text-xs md:text-sm    text-left "
                        }
                      >
                        {user.email}
                      </td>
                      <td
                        className={
                          "table-cell px-6 align-middle   py-3 text-xs md:text-sm flex-grow   text-left "
                        }
                      >
                        <RoleBtn user={user}/>
                      </td>
                    </Suspense>
                  </tr>

                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination pagedata={users.meta}/> */}
  </>
  )
}
