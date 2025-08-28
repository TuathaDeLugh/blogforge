"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { IoAdd, IoTrash, IoCreate, IoEye } from 'react-icons/io5';
import { MdSecurity, MdComment, MdPerson, MdEdit, MdDelete } from 'react-icons/md';
import AdminActionTemplateForm from './AdminActionTemplateForm';

interface AdminActionTemplate {
  _id: string;
  name: string;
  description: string;
  actionType: 'account_ban' | 'comment_ban' | 'username_change' | 'delete_account';
  duration: number | null;
  reason: string;
  isActive: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdBy: {
    username: string;
    name: string;
  };
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminActionTemplateManager() {
  const { data: session } = useSession();
  const [templates, setTemplates] = useState<AdminActionTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<AdminActionTemplate | null>(null);
  const [filter, setFilter] = useState<'all' | 'account_ban' | 'comment_ban' | 'username_change' | 'delete_account'>('all');

  useEffect(() => {
    fetchTemplates();
  }, [filter]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? '/api/admin/action-templates' 
        : `/api/admin/action-templates?actionType=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setTemplates(data.templates);
      } else {
        toast.error('Failed to fetch templates');
      }
    } catch (error) {
      toast.error('Error fetching templates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`/api/admin/action-templates/${templateId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Template deleted successfully');
        fetchTemplates();
      } else {
        toast.error(data.message || 'Failed to delete template');
      }
    } catch (error) {
      toast.error('Error deleting template');
    }
  };

  const handleEdit = (template: AdminActionTemplate) => {
    setEditingTemplate(template);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTemplate(null);
    fetchTemplates();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionTypeIcon = (actionType: string) => {
    switch (actionType) {
      case 'account_ban': return <MdPerson className="text-red-500" size={20} />;
      case 'comment_ban': return <MdComment className="text-orange-500" size={20} />;
      case 'username_change': return <MdEdit className="text-blue-500" size={20} />;
      case 'delete_account': return <MdDelete className="text-red-600" size={20} />;
      default: return <MdSecurity className="text-gray-500" size={20} />;
    }
  };

  const getActionTypeLabel = (actionType: string) => {
    switch (actionType) {
      case 'account_ban': return 'Account Ban';
      case 'comment_ban': return 'Comment Ban';
      case 'username_change': return 'Username Change';
      case 'delete_account': return 'Delete Account';
      default: return 'Unknown';
    }
  };

  const formatDuration = (duration: number | null) => {
    if (!duration) return 'N/A';
    if (duration < 24) return `${duration}h`;
    if (duration < 168) return `${Math.floor(duration / 24)}d`;
    if (duration < 720) return `${Math.floor(duration / 168)}w`;
    return `${Math.floor(duration / 720)}m`;
  };

  if (!session?.user?.isAdmin) {
    return <div className="text-center text-red-500">Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Templates
          </button>
          <button
            onClick={() => setFilter('account_ban')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'account_ban'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Account Bans
          </button>
          <button
            onClick={() => setFilter('comment_ban')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'comment_ban'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Comment Bans
          </button>
          <button
            onClick={() => setFilter('username_change')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'username_change'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Username Changes
          </button>
          <button
            onClick={() => setFilter('delete_account')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'delete_account'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Account Deletions
          </button>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <IoAdd size={20} />
          New Template
        </button>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="text-center py-8">Loading templates...</div>
      ) : templates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No templates found. Create your first template to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getActionTypeIcon(template.actionType)}
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(template.severity)}`}>
                  {template.severity}
                </span>
              </div>

              {/* Action Type */}
              <div className="mb-2">
                <span className="text-xs text-gray-500">Action Type:</span>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getActionTypeLabel(template.actionType)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {template.description}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                {(template.actionType === 'account_ban' || template.actionType === 'comment_ban') && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{formatDuration(template.duration)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Used:</span>
                  <span className="font-medium">{template.usageCount} times</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${template.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Reason Preview */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Reason:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded text-ellipsis overflow-hidden">
                  {template.reason.length > 100 
                    ? `${template.reason.substring(0, 100)}...` 
                    : template.reason
                  }
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(template)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  <IoCreate size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(template._id)}
                  className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  <IoTrash size={16} />
                </button>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500">
                  Created by {template.createdBy.username} • {new Date(template.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <AdminActionTemplateForm
          template={editingTemplate}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}