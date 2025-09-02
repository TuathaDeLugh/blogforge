'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MdEdit,
  MdBlock,
  MdComment,
  MdPersonOff,
  MdDelete,
} from 'react-icons/md';
import EnhancedAdminActionModal from './EnhancedAdminActionModal';

interface UserManagementActionsProps {
  user: {
    _id: string;
    username: string;
    name?: string;
    email: string;
    isAdmin: boolean;
    isBanned?: boolean;
    commentBanned?: boolean;
    banExpiry?: string;
    commentBanExpiry?: string;
  };
}

export default function UserManagementActions({
  user,
}: UserManagementActionsProps) {
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const router = useRouter();

  const handleModalClose = () => {
    setModalOpen(null);
  };

  const handleSuccess = () => {
    router.refresh();
  };

  if (user.isAdmin) {
    return (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Admin User
      </span>
    );
  }

  return (
    <div className="flex space-x-2">
      {/* Change Username */}
      <MdEdit
        size={18}
        className="text-blue-500 hover:text-blue-700 cursor-pointer"
        title="Change Username"
        onClick={() => setModalOpen('username_change')}
      />

      {/* Ban/Unban User */}
      <MdPersonOff
        size={18}
        className={`cursor-pointer ${user.isBanned ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
        title={user.isBanned ? 'Unban User' : 'Ban User'}
        onClick={() => setModalOpen('account_ban')}
      />

      {/* Comment Ban/Unban */}
      <MdComment
        size={18}
        className={`cursor-pointer ${user.commentBanned ? 'text-green-500 hover:text-green-700' : 'text-orange-500 hover:text-orange-700'}`}
        title={
          user.commentBanned
            ? 'Restore Comment Privileges'
            : 'Ban from Commenting'
        }
        onClick={() => setModalOpen('comment_ban')}
      />

      {/* Delete Account */}
      <MdDelete
        size={18}
        className="text-red-600 hover:text-red-800 cursor-pointer"
        title="Delete Account"
        onClick={() => setModalOpen('delete_account')}
      />

      {/* Enhanced Admin Action Modal */}
      {modalOpen && (
        <EnhancedAdminActionModal
          isOpen={true}
          onClose={handleModalClose}
          user={{
            _id: user._id,
            username: user.username,
            name: user.name || user.username,
            email: user.email,
            isBanned: user.isBanned,
            commentBanned: user.commentBanned,
          }}
          actionType={
            modalOpen as
              | 'account_ban'
              | 'comment_ban'
              | 'username_change'
              | 'delete_account'
          }
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
