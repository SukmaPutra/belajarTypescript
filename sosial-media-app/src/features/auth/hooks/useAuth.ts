// src/features/auth/hooks/useAuth.ts
import { useAuthStore } from '@/features/auth/store/useAuthStore';

/**
 * Custom hook untuk mengakses auth state dan methods
 * 
 * @example
 * ```typescript
 * const { user, isAuthenticated, logout, isLoading } = useAuth();
 * 
 * if (!isAuthenticated) return <Navigate to="/login" />;
 * ```
 */
export const useAuth = () => {
  const { user, isLoading, error, setUser, setError, clearError, logout } = useAuthStore();

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    setUser,
    setError,
    clearError,
    logout,
  };
};