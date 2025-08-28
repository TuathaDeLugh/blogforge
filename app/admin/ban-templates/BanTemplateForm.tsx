"use client";
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { IoClose, IoSave } from 'react-icons/io5';

interface BanTemplate {
  _id: string;
  name: string;
  description: string;
  banType: 'account' | 'comment';
  duration: number | null;
  reason: string;
  isActive: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface BanTemplateFormProps {
  template?: BanTemplate | null;
  onClose: () => void;
}

export default function BanTemplateForm({ template, onClose }: BanTemplateFormProps) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: template?.name || '',
      description: template?.description || '',
      banType: template?.banType || 'account',
      duration: template?.duration || '',
      reason: template?.reason || '',
      severity: template?.severity || 'medium',
      isActive: template?.isActive !== undefined ? template.isActive : true,
    },
    validate: (values) => {
      const errors: any = {};
      
      if (!values.name.trim()) {
        errors.name = 'Template name is required';
      }
      
      if (!values.description.trim()) {
        errors.description = 'Description is required';
      }
      
      if (!values.reason.trim()) {
        errors.reason = 'Reason is required';
      }
      
      if (values.duration && (isNaN(Number(values.duration)) || Number(values.duration) <= 0)) {
        errors.duration = 'Duration must be a positive number';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      
      try {
        const payload = {
          ...values,
          duration: values.duration ? Number(values.duration) : null,
        };

        const url = template 
          ? `/api/admin/ban-templates/${template._id}`
          : '/api/admin/ban-templates';
        
        const method = template ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(template ? 'Template updated successfully' : 'Template created successfully');
          onClose();
        } else {
          toast.error(data.message || 'Failed to save template');
        }
      } catch (error) {
        toast.error('Error saving template');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {template ? 'Edit Ban Template' : 'Create New Ban Template'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          {/* Template Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Spam Content Warning"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              placeholder="Brief description of when to use this template"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
            )}
          </div>

          {/* Ban Type and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ban Type *
              </label>
              <select
                name="banType"
                value={formik.values.banType}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="account">Account Ban</option>
                <option value="comment">Comment Ban</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Severity *
              </label>
              <select
                name="severity"
                value={formik.values.severity}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Leave empty for permanent ban"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty for permanent ban. Examples: 24 (1 day), 168 (1 week), 720 (1 month)
            </p>
            {formik.touched.duration && formik.errors.duration && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.duration}</p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ban Reason *
            </label>
            <textarea
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              placeholder="Detailed reason that will be shown to the user"
            />
            {formik.touched.reason && formik.errors.reason && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.reason}</p>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formik.values.isActive}
              onChange={formik.handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Template is active and available for use
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <IoSave size={16} />
                  {template ? 'Update Template' : 'Create Template'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}