'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { IoClose, IoFlash, IoCreate, IoWarning } from 'react-icons/io5';
import { MdPerson, MdComment } from 'react-icons/md';

interface BanTemplate {
  _id: string;
  name: string;
  description: string;
  banType: 'account' | 'comment';
  duration: number | null;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  usageCount: number;
  createdBy: {
    username: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface EnhancedBanModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    _id: string;
    username: string;
    name: string;
    email: string;
    isBanned?: boolean;
    commentBanned?: boolean;
  };
  banType: 'account' | 'comment';
  onSuccess?: () => void;
}

export default function EnhancedBanModal({
  isOpen,
  onClose,
  user,
  banType,
  onSuccess,
}: EnhancedBanModalProps) {
  const [templates, setTemplates] = useState<BanTemplate[]>([]);
  const [unbanTemplates, setUnbanTemplates] = useState<BanTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<BanTemplate | null>(
    null
  );
  const [useCustom, setUseCustom] = useState(false);
  const [customReason, setCustomReason] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen, banType]);

  const fetchTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const response = await fetch(
        `/api/admin/ban-templates?banType=${banType}&isActive=true`
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

  const handleQuickAction = async (template: BanTemplate) => {
    setLoading(true);

    try {
      const endpoint =
        banType === 'account'
          ? '/api/admin/ban-user'
          : '/api/admin/ban-comment';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          action: 'ban',
          templateId: template._id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `${banType === 'account' ? 'User banned' : 'Comment privileges suspended'} successfully`
        );
        onSuccess?.();
        onClose();
      } else {
        toast.error(data.message || 'Failed to apply ban');
      }
    } catch (error) {
      toast.error('Error applying ban');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomBan = async () => {
    if (!customReason.trim()) {
      toast.error('Please provide a reason for the ban');
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        banType === 'account'
          ? '/api/admin/ban-user'
          : '/api/admin/ban-comment';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          action: 'ban',
          reason: customReason,
          duration: customDuration || 'permanent',
          customSubject: customSubject || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `${banType === 'account' ? 'User banned' : 'Comment privileges suspended'} successfully`
        );
        onSuccess?.();
        onClose();
      } else {
        toast.error(data.message || 'Failed to apply ban');
      }
    } catch (error) {
      toast.error('Error applying ban');
    } finally {
      setLoading(false);
    }
  };

  const handleUnban = async () => {
    setLoading(true);

    try {
      const endpoint =
        banType === 'account'
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
          `${banType === 'account' ? 'User unbanned' : 'Comment privileges restored'} successfully`
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
    banType === 'account' ? user.isBanned : user.commentBanned;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {banType === 'account' ? (
              <MdPerson className="text-red-500" size={24} />
            ) : (
              <MdComment className="text-orange-500" size={24} />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {banType === 'account' ? 'Account Ban' : 'Comment Ban'} -{' '}
                {user.username}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.name} ({user.email})
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
          {isCurrentlyBanned && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <IoWarning className="text-red-500" size={20} />
                <span className="font-medium text-red-800">
                  User is currently{' '}
                  {banType === 'account' ? 'banned' : 'comment-banned'}
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
                    : `Quick Remove ${banType === 'account' ? 'Ban' : 'Comment Ban'}`}
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
                    : `Remove ${banType === 'account' ? 'Ban' : 'Comment Ban'} with Custom Details`}
                </button>
              </div>
            </div>
          )}

          {!isCurrentlyBanned && (
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
                    No templates available for {banType} bans.
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
                        <div className="flex justify-between text-xs">
                          <span>
                            Duration: {formatDuration(template.duration)}
                          </span>
                          <span>Used: {template.usageCount || 0} times</span>
                        </div>
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

              {/* Custom Ban Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <IoCreate className="text-blue-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Custom Ban
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Reason *
                    </label>
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      placeholder="Enter custom reason for the ban..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    onClick={handleCustomBan}
                    disabled={loading || !customReason.trim()}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading
                      ? 'Processing...'
                      : `Apply Custom ${banType === 'account' ? 'Ban' : 'Comment Ban'}`}
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
