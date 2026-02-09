// Bucket API utility functions for file upload and deletion
const BUCKET_API_URL = 'https://bucket.umangsailor.com';
const BUCKET_NAME = 'blogforge';
const FOLDER_NAME = 'blogimages';

export interface UploadedFile {
  name: string;
  link: string;
}

export interface BucketFileInfo {
  originalName: string;
  name: string;
  url: string;
  size: number;
  time: string;
}

export interface BucketUploadResponse {
  message: string;
  files: BucketFileInfo[];
}

export interface BucketDeleteRequest {
  bucket: string;
  folder: string;
  names: string[];
}

/**
 * Upload files to the bucket API
 * @param files - Array of File objects to upload (max 20 files)
 * @returns Promise with uploaded file URLs
 */
export async function uploadFilesToBucket(
  files: File[]
): Promise<UploadedFile[]> {
  if (files.length === 0) {
    throw new Error('No files provided for upload');
  }

  if (files.length > 20) {
    throw new Error('Maximum 20 files allowed per upload');
  }

  const formData = new FormData();
  formData.append('bucket', BUCKET_NAME);
  formData.append('folder', FOLDER_NAME);

  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await fetch(`${BUCKET_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`
      );
    }

    const result: BucketUploadResponse = await response.json();

    // Transform the new response format to match the expected format
    return result.files.map((fileInfo) => ({
      name: fileInfo.name,
      link: fileInfo.url,
    }));
  } catch (error) {
    console.error('Bucket upload error:', error);
    throw new Error(
      `Failed to upload files: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Delete files from the bucket API
 * @param fileNames - Array of file names to delete
 * @returns Promise indicating success/failure
 */
export async function deleteFilesFromBucket(
  fileNames: string[]
): Promise<void> {
  if (fileNames.length === 0) {
    return;
  }

  const deleteRequest: BucketDeleteRequest = {
    bucket: BUCKET_NAME,
    folder: FOLDER_NAME,
    names: fileNames,
  };

  try {
    const response = await fetch(`${BUCKET_API_URL}/files`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteRequest),
    });

    if (!response.ok) {
      throw new Error(
        `Delete failed: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error('Bucket delete error:', error);
    throw new Error(
      `Failed to delete files: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Extract file name from bucket URL for deletion
 * @param url - Full bucket URL
 * @returns File name for deletion
 */
export function extractFileNameFromUrl(url: string): string {
  // Extract filename from URL like: https://bucket.umangsailor.com/storage/blogforge/filename.jpg
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}
