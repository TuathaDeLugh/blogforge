'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  IoClose,
  IoFlash,
  IoCreate,
  IoWarning,
  IoRefresh,
} from 'react-icons/io5';
import { MdPerson, MdComment, MdEdit, MdDelete } from 'react-icons/md';
import Image from 'next/image';

interface AdminActionTemplate {
  _id: string;
  name: string;
  description: string;
  actionType:
    | 'account_ban'
    | 'comment_ban'
    | 'username_change'
    | 'delete_account';
  duration: number | null;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  usageCount: number;
  createdBy: {
    username: string;
    name: string;
  };
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

interface EnhancedAdminActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    _id: string;
    username: string;
    name?: string;
    email: string;
    isBanned?: boolean;
    commentBanned?: boolean;
  };
  actionType:
    | 'account_ban'
    | 'comment_ban'
    | 'username_change'
    | 'delete_account';
  onSuccess?: () => void;
}

export default function EnhancedAdminActionModal({
  isOpen,
  onClose,
  user,
  actionType,
  onSuccess,
}: EnhancedAdminActionModalProps) {
  const [templates, setTemplates] = useState<AdminActionTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<AdminActionTemplate | null>(null);
  const [useCustom, setUseCustom] = useState(false);
  const [customReason, setCustomReason] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  // Email templates for delete account action
  const emailTemplates = [
    {
      id: 'policy_violation',
      name: 'Policy Violation',
      message: `Dear ${user.name || user.username},

We regret to inform you that your BlogForge account has been scheduled for deletion due to violations of our community guidelines and terms of service.

Your account will be permanently deleted, and all associated data will be removed from our systems. Any blogs you have created will be transferred to our admin account to maintain content integrity for other users.

If you believe this action was taken in error, please contact our support team immediately.

Best regards,
BlogForge Admin Team`,
    },
    {
      id: 'inactive_account',
      name: 'Inactive Account',
      message: `Dear ${user.name || user.username},

Your BlogForge account has been inactive for an extended period. As part of our data management policy, we will be deleting inactive accounts.

Your account will be permanently deleted, and any blogs you have created will be transferred to our admin account to preserve content for the community.

If you wish to keep your account active, please log in within the next 7 days.

Best regards,
BlogForge Admin Team`,
    },
    {
      id: 'user_request',
      name: 'User Request',
      message: `Dear ${user.name || user.username},

We have received and processed your request to delete your BlogForge account.

Your account will be permanently deleted as requested. Any blogs you have created will be transferred to our admin account to maintain content availability for other users.

Thank you for being part of the BlogForge community.

Best regards,
BlogForge Admin Team`,
    },
    {
      id: 'custom',
      name: 'Custom Message',
      message: '',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
      if (actionType === 'username_change') {
        generateRandomUsername();
      }
    }
  }, [isOpen, actionType]);

  const generateRandomUsername = () => {
    const adjectives = [
      'Cool',
      'Smart',
      'Fast',
      'Bright',
      'Swift',
      'Bold',
      'Wise',
      'Quick',
      'Sharp',
      'Strong',
    ];
    const nouns = [
      'User',
      'Writer',
      'Reader',
      'Blogger',
      'Creator',
      'Thinker',
      'Explorer',
      'Dreamer',
      'Builder',
      'Maker',
    ];
    const numbers = Math.floor(Math.random() * 1000);

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    setNewUsername(`${randomAdjective}${randomNoun}${numbers}`);
  };

  const handleEmailTemplateChange = (templateId: string) => {
    setSelectedEmailTemplate(templateId);
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setEmailMessage(template.message);
    }
  };

  const fetchTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const response = await fetch(
        `/api/admin/action-templates?actionType=${actionType}&isActive=true`
      );
      const data = await response.json();

      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleQuickAction = async (template: AdminActionTemplate) => {
    setLoading(true);

    try {
      let endpoint = '';
      let payload: any = {
        userId: user._id,
        templateId: template._id,
      };

      switch (actionType) {
        case 'account_ban':
          endpoint = '/api/admin/ban-user';
          payload.action = 'ban';
          break;
        case 'comment_ban':
          endpoint = '/api/admin/ban-comment';
          payload.action = 'ban';
          break;
        case 'username_change':
          endpoint = '/api/admin/change-username';
          payload.newUsername = newUsername;
          break;
        case 'delete_account':
          endpoint = '/api/admin/delete-account';
          if (emailMessage.trim()) {
            payload.emailMessage = emailMessage;
          }
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || getSuccessMessage(actionType));
        onSuccess?.();
        onClose();
      } else {
        toast.error(data.message || `Failed to ${getActionLabel(actionType)}`);
      }
    } catch (error) {
      toast.error(`Error ${getActionLabel(actionType)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomAction = async () => {
    if (!customReason.trim()) {
      toast.error('Please provide a reason for this action');
      return;
    }

    if (actionType === 'username_change' && !newUsername.trim()) {
      toast.error('Please provide a new username');
      return;
    }

    if (actionType === 'delete_account' && !emailMessage.trim()) {
      toast.error('Please provide an email message for the user');
      return;
    }

    setLoading(true);

    try {
      let endpoint = '';
      let payload: any = {
        userId: user._id,
        reason: customReason,
        customSubject: customSubject || null,
      };

      switch (actionType) {
        case 'account_ban':
          endpoint = '/api/admin/ban-user';
          payload.action = 'ban';
          payload.duration = customDuration || 'permanent';
          break;
        case 'comment_ban':
          endpoint = '/api/admin/ban-comment';
          payload.action = 'ban';
          payload.duration = customDuration || 'permanent';
          break;
        case 'username_change':
          endpoint = '/api/admin/change-username';
          payload.newUsername = newUsername;
          break;
        case 'delete_account':
          endpoint = '/api/admin/delete-account';
          payload.emailMessage = emailMessage;
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || getSuccessMessage(actionType));
        onSuccess?.();
        onClose();
      } else {
        toast.error(data.message || `Failed to ${getActionLabel(actionType)}`);
      }
    } catch (error) {
      toast.error(`Error ${getActionLabel(actionType)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUnban = async () => {
    setLoading(true);

    try {
      const endpoint =
        actionType === 'account_ban'
          ? '/api/admin/ban-user'
          : '/api/admin/ban-comment';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          action: 'unban',
          reason: customReason || 'Ban lifted by administrator',
          customSubject: customSubject || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          data.message ||
            `${actionType === 'account_ban' ? 'User unbanned' : 'Comment privileges restored'} successfully`
        );
        onSuccess?.();
        onClose();
      } else {
        toast.error(data.message || 'Failed to remove ban');
      }
    } catch (error) {
      toast.error('Error removing ban');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'account_ban':
        return <MdPerson className="text-red-500" size={24} />;
      case 'comment_ban':
        return <MdComment className="text-orange-500" size={24} />;
      case 'username_change':
        return <MdEdit className="text-blue-500" size={24} />;
      case 'delete_account':
        return <MdDelete className="text-red-600" size={24} />;
      default:
        return <MdPerson className="text-gray-500" size={24} />;
    }
  };

  const getActionTitle = (type: string) => {
    switch (type) {
      case 'account_ban':
        return 'Account Ban';
      case 'comment_ban':
        return 'Comment Ban';
      case 'username_change':
        return 'Username Change';
      case 'delete_account':
        return 'Delete Account';
      default:
        return 'Admin Action';
    }
  };

  const getActionLabel = (type: string) => {
    switch (type) {
      case 'account_ban':
        return 'ban user';
      case 'comment_ban':
        return 'ban comments';
      case 'username_change':
        return 'change username';
      case 'delete_account':
        return 'delete account';
      default:
        return 'perform action';
    }
  };

  const getSuccessMessage = (type: string) => {
    switch (type) {
      case 'account_ban':
        return 'User banned successfully';
      case 'comment_ban':
        return 'Comment privileges suspended successfully';
      case 'username_change':
        return 'Username changed successfully';
      case 'delete_account':
        return 'Account deleted successfully';
      default:
        return 'Action completed successfully';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'high':
        return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'critical':
        return 'border-red-200 bg-red-50 text-red-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const formatDuration = (duration: number | null) => {
    if (!duration) return 'Permanent';
    if (duration < 24) return `${duration}h`;
    if (duration < 168) return `${Math.floor(duration / 24)}d`;
    if (duration < 720) return `${Math.floor(duration / 168)}w`;
    return `${Math.floor(duration / 720)}m`;
  };

  const isCurrentlyBanned =
    actionType === 'account_ban' ? user.isBanned : user.commentBanned;
  const showUnbanSection =
    (actionType === 'account_ban' || actionType === 'comment_ban') &&
    isCurrentlyBanned;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {getActionIcon(actionType)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {getActionTitle(actionType)} - {user.username}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.name || user.username} ({user.email})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Current Status - Unban Section */}
          {showUnbanSection && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <IoWarning className="text-red-500" size={20} />
                <span className="font-medium text-red-800">
                  User is currently{' '}
                  {actionType === 'account_ban' ? 'banned' : 'comment-banned'}
                </span>
              </div>

              {/* Quick Unban */}
              <div className="mb-4">
                <button
                  onClick={handleUnban}
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-4"
                >
                  {loading
                    ? 'Processing...'
                    : `Quick Remove ${actionType === 'account_ban' ? 'Ban' : 'Comment Ban'}`}
                </button>
              </div>

              {/* Custom Unban Reason */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Unban Reason (Optional)
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 resize-none"
                    placeholder="Enter reason for removing the ban (optional)..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Custom email subject for unban notification..."
                  />
                </div>

                <button
                  onClick={() => handleUnban()}
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading
                    ? 'Processing...'
                    : `Remove ${actionType === 'account_ban' ? 'Ban' : 'Comment Ban'} with Custom Details`}
                </button>
              </div>
            </div>
          )}

          {!showUnbanSection && (
            <>
              {/* Quick Actions */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <IoFlash className="text-orange-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h3>
                </div>

                {loadingTemplates ? (
                  <div className="text-center py-4">Loading templates...</div>
                ) : templates.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No templates available for{' '}
                    {getActionTitle(actionType).toLowerCase()}.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template._id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${getSeverityColor(template.severity)}`}
                        onClick={() => !loading && handleQuickAction(template)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                            {template.severity}
                          </span>
                        </div>
                        <p className="text-sm mb-2 opacity-80">
                          {template.description}
                        </p>
                        {(actionType === 'account_ban' ||
                          actionType === 'comment_ban') && (
                          <div className="flex justify-between text-xs">
                            <span>
                              Duration: {formatDuration(template.duration)}
                            </span>
                            <span>Used: {template.usageCount || 0} times</span>
                          </div>
                        )}
                        <div className="mt-2 text-xs opacity-70">
                          <strong>Reason:</strong>{' '}
                          {template.reason.substring(0, 100)}
                          {template.reason.length > 100 && '...'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Action Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <IoCreate className="text-blue-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Custom {getActionTitle(actionType)}
                  </h3>
                </div>

                {/* Delete Account Special UI */}
                {actionType === 'delete_account' && (
                  <div className="mb-6">
                    <Image
                      src={'/delete.svg'}
                      alt="delete user"
                      width={150}
                      height={150}
                      className="mx-auto mb-4"
                    />

                    <div className="text-center mb-6">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Delete user:{' '}
                        <span className="text-red-500">@{user.username}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        This action will permanently delete the user and
                        transfer their blogs to admin.
                      </p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Template:
                      </label>
                      <select
                        value={selectedEmailTemplate}
                        onChange={(e) =>
                          handleEmailTemplateChange(e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">Select a template...</option>
                        {emailTemplates.map((template) => (
                          <option key={template.id} value={template.id}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2 mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Message to User:
                      </label>
                      <textarea
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        placeholder="Enter the message to send to the user before deletion..."
                        rows={8}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm resize-none"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        This message will be sent to {user.email} before account
                        deletion.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Username Change Specific Fields */}
                  {actionType === 'username_change' && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Username *
                        </label>
                        <button
                          onClick={generateRandomUsername}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <IoRefresh size={14} />
                          Generate Random
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-600 dark:text-gray-400">
                          @
                        </span>
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter new username..."
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Current username: @{user.username}
                      </p>
                    </div>
                  )}

                  {actionType !== 'delete_account' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Custom Reason *
                      </label>
                      <textarea
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        placeholder={`Enter custom reason for ${getActionLabel(actionType)}...`}
                      />
                    </div>
                  )}

                  {actionType === 'delete_account' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Admin Reason for Deletion *
                      </label>
                      <textarea
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        placeholder="Enter admin reason for account deletion (for internal logging)..."
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Duration field for ban actions */}
                    {(actionType === 'account_ban' ||
                      actionType === 'comment_ban') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration
                        </label>
                        <select
                          value={customDuration}
                          onChange={(e) => setCustomDuration(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Permanent</option>
                          <option value="1day">1 Day</option>
                          <option value="1week">1 Week</option>
                          <option value="1month">1 Month</option>
                          <option value="3months">3 Months</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Subject (Optional)
                      </label>
                      <input
                        type="text"
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Custom email subject..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCustomAction}
                    disabled={
                      loading ||
                      !customReason.trim() ||
                      (actionType === 'username_change' &&
                        !newUsername.trim()) ||
                      (actionType === 'delete_account' && !emailMessage.trim())
                    }
                    className={`w-full px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                      actionType === 'delete_account'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                  >
                    {loading
                      ? 'Processing...'
                      : `Apply Custom ${getActionTitle(actionType)}`}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
