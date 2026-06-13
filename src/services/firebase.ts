import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-api-key-for-build',
  authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock-auth-domain-for-build',
  projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock-project-id-for-build',
  storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock-storage-bucket-for-build',
  messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'mock-sender-id-for-build',
  appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'mock-app-id-for-build',
};

// Singleton pattern — prevent duplicate app initialisation in dev hot-reloads
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
