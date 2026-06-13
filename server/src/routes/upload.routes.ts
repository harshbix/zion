import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'zion_cms'
    });

    return res.json({ secure_url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
