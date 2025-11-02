import { Div, H1 } from '@/Components/Motion/Motion';
import Pagination from '@/Components/layout/Pagination';
import React from 'react';
import { FaHistory, FaUser, FaBlog, FaComment } from 'react-icons/fa';
import Image from 'next/image';

async function getAdminActions(page: number = 1) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/admin/actions?page=${page}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch admin actions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching admin actions:', error);
    return {
      data: [],
      meta: {
        totalDocuments: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
      },
    };
  }
}

export default async function AdminActionsPage(context: {
  searchParams: { page: string };
}) {
  const page = parseInt(context.searchParams.page) || 1;
  const actionsData = await getAdminActions(page);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'blog_edit':
        return <FaBlog className="text-blue-500" />;
      case 'comment_remove':
        return <FaComment className="text-red-500" />;
      case 'user_ban':
        return <FaUser className="text-red-600" />;
      case 'user_unban':
        return <FaUser className="text-green-600" />;
      case 'username_change':
        return <FaUser className="text-orange-500" />;
      case 'account_deactivate':
        return <FaUser className="text-gray-500" />;
      default:
        return <FaHistory className="text-gray-400" />;
    }
  };

  const getActionDescription = (action: any) => {
    switch (action.actionType) {
      case 'blog_edit':
        return `Modified blog "${action.metadata?.blogTitle || 'Unknown'}"`;
      case 'comment_remove':
        return `Removed comment from "${action.metadata?.blogTitle || 'Unknown'}"`;
      case 'user_ban':
        return `Banned user ${action.targetUserId?.username || 'Unknown'}`;
      case 'user_unban':
        return `Unbanned user ${action.targetUserId?.username || 'Unknown'}`;
      case 'username_change':
        return `Changed username from "${action.metadata?.originalUsername}" to "${action.metadata?.newUsername}"`;
      case 'account_deactivate':
        return `Deactivated account for ${action.targetUserId?.username || 'Unknown'}`;
      default:
        return 'Unknown action';
    }
  };

  return (
    <section className="md:my-6">
      {/* Header */}
      <div className="md:relative -z-10 mb-8">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
        >
          Actions
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white"
        >
          Admin Action Log
        </H1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 ml-2">
          Track all administrative actions for transparency and accountability
        </p>
      </div>

      {/* Stats */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">
                Total Actions
              </p>
              <p className="text-3xl font-bold">
                {actionsData.meta.totalDocuments}
              </p>
              <p className="text-indigo-100 text-xs mt-1">
                Administrative actions logged
              </p>
            </div>
            <div className="bg-indigo-400/30 p-3 rounded-lg">
              <FaHistory className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">
                Current Page
              </p>
              <p className="text-3xl font-bold">
                {actionsData.meta.currentPage}
              </p>
              <p className="text-purple-100 text-xs mt-1">
                of {actionsData.meta.totalPages} pages
              </p>
            </div>
            <div className="bg-purple-400/30 p-3 rounded-lg">
              <FaHistory className="text-2xl" />
            </div>
          </div>
        </div>
      </Div>

      {/* Actions Table */}
      <Div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border overflow-hidden border-gray-200 dark:border-slate-700"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
              {actionsData.data?.map((action: any) => (
                <tr
                  key={action._id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getActionIcon(action.actionType)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {getActionDescription(action)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {action.actionType.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        {action.adminId?.avatar ? (
                          <Image
                            height={32}
                            width={32}
                            src={action.adminId.avatar}
                            alt={action.adminId.name || action.adminId.username}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {(
                                action.adminId?.name || action.adminId?.username
                              )
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {action.adminId?.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          @{action.adminId?.username || 'unknown'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {action.targetUserId ? (
                      <div>
                        <div className="font-medium">
                          {action.targetUserId.name || 'N/A'}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          @{action.targetUserId.username}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        System
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate"
                      title={action.reason}
                    >
                      {action.reason || 'No reason provided'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(action.createdAt).toLocaleDateString()} <br />
                    <span className="text-xs">
                      {new Date(action.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {actionsData.data?.length === 0 && (
          <div className="text-center py-12">
            <FaHistory className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              No actions found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No administrative actions have been logged yet.
            </p>
          </div>
        )}
      </Div>

      {actionsData.meta.totalPages > 1 && (
        <Pagination pagedata={actionsData.meta} />
      )}
    </section>
  );
}
