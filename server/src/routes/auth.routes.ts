import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-zion-admin-panel';

router.post('/login', (req, res) => {
  const { adminId, password } = req.body;
  // Fallback to strict hardcoded if env missing during migration
  const validId = process.env.ADMIN_ID || 'ABC123';
  const validPass = process.env.ADMIN_PASS || '123456';

  if (adminId === validId && password === validPass) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.get('/verify', (req, res) => {
  const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ success: true, message: 'Authenticated' });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  return res.json({ success: true });
});

export default router;
