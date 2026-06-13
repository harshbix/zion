import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load from root env for now
dotenv.config({ path: '../.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'zion',
  api_key: process.env.CLOUDINARY_API_KEY || '564431421363967',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'shi0yOqodRoZdeioECjtP_woQG4'
});

export default cloudinary;
