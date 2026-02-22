// src/features/auth/components/AuthGuard.tsx
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AUTH_ROUTES } from '../constants/authConstants';


interface AuthGuardProps {
  children: ReactNode;
  /**
   * Jika true, hanya authenticated users yang bisa akses
   * Jika false, hanya non-authenticated users yang bisa akses
   */
  requireAuth?: boolean;
  fallback?: ReactNode;
}

/**
 * Component untuk melindungi routes berdasarkan auth state
 * 
 * @example
 * ```typescript
 * // Protect route untuk authenticated users
 * <AuthGuard requireAuth={true}>
 *   <Dashboard />
 * </AuthGuard>
 * 
 * // Public route (redirect ke home jika sudah login)
 * <AuthGuard requireAuth={false}>
 *   <LoginPage />
 * </AuthGuard>
 * ```
 */
export const AuthGuard = ({
  children,
  requireAuth = true,
  fallback,
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show fallback while checking auth state
  if (isLoading) {
    return fallback ?? <LoadingFallback />;
  }

  if (requireAuth) {
    // Require authentication
    if (!isAuthenticated) {
      // Redirect ke login, save location untuk redirect setelah login
      return <Navigate to={AUTH_ROUTES.LOGIN} state={{ from: location }} replace />;
    }
    return <>{children}</>;
  } else {
    // Public route, redirect jika sudah authenticated
    if (isAuthenticated) {
      return <Navigate to={AUTH_ROUTES.HOME} replace />;
    }
    return <>{children}</>;
  }
};

/**
 * Default loading fallback
 */
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);