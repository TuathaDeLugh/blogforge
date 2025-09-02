import Pagination from '@/Components/layout/Pagination';
import { Div, H1 } from '@/Components/Motion/Motion';
import RoleBtn from '@/Components/RoleDropdown';
import { getAllUsers, getAdminCount } from '@/controllers/user';
import DeleteUserButton from '@/Components/Admin/DeleteUserButton';
import UserManagementActions from '@/Components/Admin/UserManagementActions';
import React, { Suspense } from 'react';
import { FaUsers, FaUserShield } from 'react-icons/fa';
import Image from 'next/image';

export default async function AdminUsers(context: {
  searchParams: { page: string };
}) {
  const users = await getAllUsers(parseInt(context.searchParams.page));
  const adminCount = await getAdminCount();
  let i = 1;
  return (
    <section className="md:my-6">
      {/* Header */}
      <div className="md:relative -z-10 mb-8">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
        >
          Users
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white"
        >
          User Management
        </H1>
      </div>

      {/* User Stats */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold">{users.meta.totalDocuments}</p>
              <p className="text-blue-100 text-xs mt-1">Registered members</p>
            </div>
            <div className="bg-blue-400/30 p-3 rounded-lg">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Current Page</p>
              <p className="text-3xl font-bold">{users.meta.currentPage}</p>
              <p className="text-green-100 text-xs mt-1">
                of {users.meta.totalPages} pages
              </p>
            </div>
            <div className="bg-green-400/30 p-3 rounded-lg">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">
                Total Admins
              </p>
              <p className="text-3xl font-bold">{adminCount}</p>
              <p className="text-purple-100 text-xs mt-1">Admin users</p>
            </div>
            <div className="bg-purple-400/30 p-3 rounded-lg">
              <FaUserShield className="text-2xl" />
            </div>
          </div>
        </div>
      </Div>
      {/* Enhanced Users Table */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {users.data?.map((user: any) => {
                return (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <Suspense
                      fallback={<td className="px-6 py-4">Loading...</td>}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {i++}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <Image
                                height={40}
                                width={40}
                                src={user.avatar}
                                alt={user.name || user.username}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {(user.name || user.username)
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {user.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {user.email}
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <RoleBtn user={user} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isBanned
                                ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                                : user.isActive !== false
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400'
                            }`}
                          >
                            {user.isBanned
                              ? 'Banned'
                              : user.isActive !== false
                                ? 'Active'
                                : 'Inactive'}
                          </span>
                          {user.commentBanned && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400">
                              Comment Banned
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <UserManagementActions user={user} />
                          <DeleteUserButton
                            userId={user._id}
                            username={user.username}
                            userEmail={user.email}
                          />
                        </div>
                      </td>
                    </Suspense>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Div>
      <Pagination pagedata={users.meta} />
    </section>
  );
}
