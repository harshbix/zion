import api from '@/api/axios';

/**
 * Perform admin login against the Express backend
 */
export async function adminLogin(id: string, password: string): Promise<boolean> {
  try {
    const res = await api.post('/auth/login', { adminId: id, password });
    return res.data?.success === true;
  } catch (error) {
    console.error('Admin login API error:', error);
    return false;
  }
}

/**
 * Perform admin logout
 */
export async function adminLogout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Admin logout API error:', error);
  }
}

/**
 * Verify if the current admin session is valid
 */
export async function checkAdminSession(): Promise<boolean> {
  try {
    const res = await api.get('/auth/verify');
    return res.data?.success === true;
  } catch (error) {
    return false;
  }
}
