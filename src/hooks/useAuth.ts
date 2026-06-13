

import { useAuthContext } from '@/services/auth-context';

/**
 * Convenience hook for consuming the auth context.
 * Prefer this over importing useAuthContext directly in components.
 *
 * @example
 * const { user, loading, loginWithGoogle, logout } = useAuth();
 */
export function useAuth() {
  return useAuthContext();
}
