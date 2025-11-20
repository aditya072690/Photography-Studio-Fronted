/**
 * Utility functions for handling Google Drive image URLs
 */

/**
 * Converts a Google Drive sharing URL to a direct image URL
 * Supports multiple Google Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - Direct file ID
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;

  // If it's already a direct image URL, return as is
  if (url.includes('drive.google.com/uc?export=view') || url.includes('lh3.googleusercontent.com')) {
    return url;
  }

  // Extract file ID from various Google Drive URL formats
  let fileId = '';

  // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileIdMatch1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch1) {
    fileId = fileIdMatch1[1];
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  const fileIdMatch2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch2 && !fileId) {
    fileId = fileIdMatch2[1];
  }

  // Format 3: https://drive.google.com/uc?id=FILE_ID
  const fileIdMatch3 = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch3 && !fileId) {
    fileId = fileIdMatch3[1];
  }

  // If no file ID found, assume it's already a direct URL or return as is
  if (!fileId) {
    return url;
  }

  // Convert to direct image URL
  // Option 1: Using uc?export=view (recommended for full resolution)
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Checks if a URL is a Google Drive URL
 */
export function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com') || url.includes('googleusercontent.com');
}

/**
 * Gets a thumbnail URL from Google Drive file ID
 * Useful for smaller preview images
 */
export function getGoogleDriveThumbnail(fileId: string, size: 'small' | 'medium' | 'large' = 'large'): string {
  const sizes = {
    small: 's220',
    medium: 's400',
    large: 's800'
  };
  return `https://lh3.googleusercontent.com/d/${fileId}=${sizes[size]}`;
}

