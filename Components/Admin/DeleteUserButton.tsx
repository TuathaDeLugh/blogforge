'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalWrapper from '../layout/ModalWrapper';
import Image from 'next/image';
import { MdOutlineDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

interface DeleteUserButtonProps {
  userId: string;
  username: string;
  userEmail: string;
}

export default function DeleteUserButton({
  userId,
  username,
  userEmail,
}: DeleteUserButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const router = useRouter();

  const emailTemplates = [
    {
      id: 'policy_violation',
      name: 'Policy Violation',
      message: `Dear ${username},`,
    },
    {
      id: 'inactive_account',
      name: 'Inactive Account',
      message: `Dear ${username},`,
    },
    {
      id: 'user_request',
      name: 'User Request',
      message: `Dear ${username},`,
    },
    {
      id: 'custom',
      name: 'Custom Message',
      message: '',
    },
  ];

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setEmailMessage(template.message);
    }
  };

  const handleDelete = async () => {
    if (!emailMessage.trim()) {
      toast.error('Please provide an email message before deleting the user.');
      return;
    }

    setIsDeleting(true);
    try {
      // First send the email
      const emailResponse = await fetch('/api/user/send-deletion-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          username: username,
          message: emailMessage,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email notification');
      }

      // Then delete the user
      const deleteResponse = await fetch(
        `/api/user/admin-delete?userId=${userId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await deleteResponse.json();

      if (deleteResponse.ok) {
        toast.success(
          `User ${username} deleted successfully. Email notification sent.`
        );
        router.refresh();
        setModalOpen(false);
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user or send email notification');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        <MdOutlineDelete
          size={20}
          className="text-red-400 hover:text-red-600 cursor-pointer"
        />
      </button>
      <ModalWrapper
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        header="Delete User Account"
        disableOutsideclick={true}
        showCancelButton={true}
        submitButton={
          <button
            className="w-full h-full rounded bg-red-500/70 dark:bg-red-400/90 hover:bg-red-600 dark:hover:bg-red-600 inline-block p-3 disabled:opacity-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </button>
        }
      >
        <div className="w-full space-y-4">
          <Image
            src={'/delete.svg'}
            alt="delete user"
            width={150}
            height={150}
            className="mx-auto"
          />

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Delete user: <span className="text-red-500">@{username}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This action will permanently delete the user and transfer their
              blogs to admin.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Template:
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
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

          <div className="space-y-2">
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
              This message will be sent to {userEmail} before account deletion.
            </p>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
