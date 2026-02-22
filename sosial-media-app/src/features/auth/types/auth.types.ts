
/**
 * Represents a user in the application
 */
export interface User {
  uid: string;
  email: string;
}

/**
 * Auth store state interface
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Auth context type for Context API (if used)
 */
export interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * Login/Signup form data
 */
export interface AuthFormData {
  email: string;
  password: string;
}

/**
 * API response untuk auth operations
 */
export interface AuthResponse {
  success: boolean;
  user: User;
}