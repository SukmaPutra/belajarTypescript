// src/features/auth/index.ts
/**
 * Auth Feature - Public API (Barrel Export)
 *
 * File ini adalah "central hub" untuk semua export dari auth feature.
 * Semua public APIs di-export dari satu tempat ini.
 *
 * Dengan barrel export, kamu bisa import seperti ini:
 * import { LoginPage, useAuth, logout } from '@/features/auth';
 *
 * Bukan seperti ini (yang rumit):
 * import LoginPage from '../features/auth/pages/LoginPage';
 * import { useAuth } from '../features/auth/hooks/useAuth';
 * import { logout } from '../features/auth/services/authService';
 */

// ==================== PAGES ====================
// Page components yang digunakan untuk routing
export { default as LoginPage } from "./pages/LoginPage";
export { default as SignupPage } from "./pages/SignupPage";

// ==================== COMPONENTS ====================
// Reusable UI components untuk auth feature
export { default as LoginForm } from "./components/LoginForm";
export { default as SignupForm } from "./components/SignupForm";
export { default as LogoutButton } from "./components/LogoutButton";
export { AuthGuard } from "./components/AuthGuard";

// ==================== HOOKS ====================
// Custom React hooks untuk auth logic
export { useAuth } from "./hooks/useAuth";


// ==================== SERVICES ====================
// Business logic functions untuk auth operations
export { login, signup, logout, handleAuthError } from "./services/authService";

// ==================== STORE ====================
// Zustand store untuk state management
export { useAuthStore } from "./store/useAuthStore";

// ==================== TYPES ====================
// TypeScript type definitions
export type { User, AuthState, AuthContextType, AuthFormData, AuthResponse } from "./types/auth.types";

// ==================== SCHEMAS ====================
// Zod validation schemas
export { authSchema, loginSchema, signupSchema, passwordResetSchema, passwordResetConfirmSchema, profileUpdateSchema, isValidEmail, isValidPassword, isValidStrongPassword, getValidationErrors, VALIDATION_RULES } from "./schemas/authSchema";

// Export schema types
export type { AuthSchema, LoginSchema, SignupSchema, PasswordResetSchema, PasswordResetConfirmSchema, ProfileUpdateSchema } from "./schemas/authSchema";

// ==================== CONSTANTS ====================
// Constants, enums, dan messages
export { AUTH_ROUTES, AUTH_SUCCESS_MESSAGES, AUTH_ERROR_MESSAGES, AUTH_LABELS, AUTH_BUTTON_LABELS, AuthFormStatus, FIREBASE_AUTH_ERRORS, AUTH_VALIDATION_RULES } from "./constants/authConstants";

/**
 * USAGE EXAMPLES:
 *
 * 1. Import individual items
 * ────────────────────────────
 * import { LoginPage, useAuth } from '@/features/auth';
 *
 * 2. Import multiple items
 * ────────────────────────────
 * import {
 *   LoginPage,
 *   SignupPage,
 *   useAuth,
 *   logout,
 *   authSchema,
 *   AUTH_ROUTES
 * } from '@/features/auth';
 *
 * 3. Import with types
 * ────────────────────────────
 * import { useAuth, type User, type AuthState } from '@/features/auth';
 *
 * 4. Import constants
 * ────────────────────────────
 * import { AUTH_ROUTES, AUTH_ERROR_MESSAGES } from '@/features/auth';
 *
 * RULES:
 * - Selalu import dari '@/features/auth', bukan dari subfolder
 * - Jangan import dari './services/authService' atau './@/features/auth/hooks/useAuth'
 * - File ini mengorganisir semua public APIs
 * - Internal/private code jangan di-export
 */
