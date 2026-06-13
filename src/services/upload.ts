import api from '@/api/axios';

/**
 * Uploads an image file to our backend, which securely forwards it to Cloudinary.
 * @param file The image file to upload.
 * @returns The secure URL of the uploaded image.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  // The backend multer middleware expects the key name to be 'image'
  formData.append('image', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data || !response.data.secure_url) {
      throw new Error('Upload response did not contain secure_url');
    }

    return response.data.secure_url;
  } catch (error: any) {
    console.error('Backend image upload error:', error);
    const message = error.response?.data?.error || error.message || 'An unknown error occurred during image upload';
    throw new Error(message);
  }
}
