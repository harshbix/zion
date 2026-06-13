/**
 * lib/cloudinary.ts
 * Config wrapper for client-side Cloudinary operations.
 * Keeping variables client-safe under the NEXT_PUBLIC_ prefix.
 */
export const cloudinaryConfig = {
  cloudName: import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'zion_preset',
};
