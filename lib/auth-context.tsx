'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  signInWithGoogle,
  signOut,
  subscribeToAuthState,
  type User,
} from './auth';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  /** Currently signed-in Firebase user, or null if unauthenticated. */
  user: User | null;
  /** True while the initial auth state is being determined. */
  loading: boolean;
  /** Sign in with Google popup. */
  loginWithGoogle: () => Promise<void>;
  /** Sign out the current user. */
  logout: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await signInWithGoogle();
  }, []);

  const logout = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used inside <AuthProvider>');
  }
  return ctx;
}
