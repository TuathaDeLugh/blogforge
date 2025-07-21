"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DModal from '../layout/Model';
import { MdEdit, MdBlock, MdComment, MdPersonOff } from 'react-icons/md';
import toast from 'react-hot-toast';

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

export default function UserManagementActions({ user }: UserManagementActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    newUsername: user.username,
    reason: '',
    duration: '1day'
  });

  // Reset form when modal closes
  const resetForm = () => {
    setFormData({
      newUsername: user.username,
      reason: '',
      duration: '1day'
    });
  };

  // Reset form when modal opens
  const handleModalOpen = (modalType: string) => {
    resetForm();
    setModalOpen(modalType);
  };
  const router = useRouter();

  const handleUsernameChange = async () => {
    if (!formData.newUsername.trim() || !formData.reason.trim()) {
      toast.error('Please provide both new username and reason');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/change-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          newUsername: formData.newUsername,
          reason: formData.reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Username changed from ${data.originalUsername} to ${data.newUsername}`);
        setFormData({ newUsername: user.username, reason: '', duration: '1day' }); // Reset form
        router.refresh();
        setModalOpen(null);
      } else {
        toast.error(data.message || 'Failed to change username');
      }
    } catch (error) {
      console.error('Error changing username:', error);
      toast.error('Failed to change username');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBanUser = async (action: 'ban' | 'unban') => {
    if (action === 'ban' && !formData.reason.trim()) {
      toast.error('Please provide a reason for banning');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/ban-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          action,
          duration: formData.duration,
          reason: formData.reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({ newUsername: user.username, reason: '', duration: '1day' }); // Reset form
        router.refresh();
        setModalOpen(null);
      } else {
        toast.error(data.message || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${action}ning user:`, error);
      toast.error(`Failed to ${action} user`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentBan = async (action: 'ban' | 'unban') => {
    if (action === 'ban' && !formData.reason.trim()) {
      toast.error('Please provide a reason for comment ban');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/ban-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          action,
          duration: formData.duration,
          reason: formData.reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({ newUsername: user.username, reason: '', duration: '1day' }); // Reset form
        router.refresh();
        setModalOpen(null);
      } else {
        toast.error(data.message || `Failed to ${action} comment privileges`);
      }
    } catch (error) {
      console.error(`Error ${action}ning comment privileges:`, error);
      toast.error(`Failed to ${action} comment privileges`);
    } finally {
      setIsLoading(false);
    }
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
      <DModal
        btn={<MdEdit size={18} className='text-blue-500 hover:text-blue-700 cursor-pointer' title="Change Username" />}
        header="Change Username"
        isOpen={modalOpen === 'username'}
        setIsOpen={(open) => setModalOpen(open ? 'username' : null)}
        submit={
          <button 
            className='w-full h-full rounded bg-blue-500 hover:bg-blue-600 text-white p-3 disabled:opacity-50' 
            onClick={handleUsernameChange}
            disabled={isLoading}
          >
            {isLoading ? 'Changing...' : 'Change Username'}
          </button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Username: @{user.username}
            </label>
            <input
              type="text"
              value={formData.newUsername}
              onChange={(e) => setFormData({...formData, newUsername: e.target.value})}
              placeholder="Enter new username"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Change:
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Enter reason for username change"
              rows={3}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </DModal>

      {/* Ban/Unban User */}
      <DModal
        btn={
          <MdPersonOff 
            size={18} 
            className={`cursor-pointer ${user.isBanned ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
            title={user.isBanned ? 'Unban User' : 'Ban User'}
          />
        }
        header={user.isBanned ? 'Unban User' : 'Ban User'}
        isOpen={modalOpen === 'ban'}
        setIsOpen={(open) => setModalOpen(open ? 'ban' : null)}
        submit={
          <button 
            className={`w-full h-full rounded text-white p-3 disabled:opacity-50 ${
              user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
            onClick={() => handleBanUser(user.isBanned ? 'unban' : 'ban')}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (user.isBanned ? 'Unban User' : 'Ban User')}
          </button>
        }
      >
        <div className="space-y-4">
          {user.isBanned ? (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                User is currently banned. {user.banExpiry && `Ban expires: ${new Date(user.banExpiry).toLocaleDateString()}`}
              </p>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for Unbanning:
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Enter reason for unbanning"
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ban Duration:
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="1day">1 Day</option>
                  <option value="1week">1 Week</option>
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Ban:
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Enter reason for banning"
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </>
          )}
        </div>
      </DModal>

      {/* Comment Ban/Unban */}
      <DModal
        btn={
          <MdComment 
            size={18} 
            className={`cursor-pointer ${user.commentBanned ? 'text-green-500 hover:text-green-700' : 'text-orange-500 hover:text-orange-700'}`}
            title={user.commentBanned ? 'Restore Comment Privileges' : 'Ban from Commenting'}
          />
        }
        header={user.commentBanned ? 'Restore Comment Privileges' : 'Ban from Commenting'}
        isOpen={modalOpen === 'comment'}
        setIsOpen={(open) => setModalOpen(open ? 'comment' : null)}
        submit={
          <button 
            className={`w-full h-full rounded text-white p-3 disabled:opacity-50 ${
              user.commentBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
            }`}
            onClick={() => handleCommentBan(user.commentBanned ? 'unban' : 'ban')}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (user.commentBanned ? 'Restore Privileges' : 'Ban Comments')}
          </button>
        }
      >
        <div className="space-y-4">
          {user.commentBanned ? (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                User is currently banned from commenting. {user.commentBanExpiry && `Ban expires: ${new Date(user.commentBanExpiry).toLocaleDateString()}`}
              </p>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for Restoring Privileges:
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Enter reason for restoring comment privileges"
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ban Duration:
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="1day">1 Day</option>
                  <option value="1week">1 Week</option>
                  <option value="1month">1 Month</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Comment Ban:
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Enter reason for comment ban"
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </>
          )}
        </div>
      </DModal>
    </div>
  );
}