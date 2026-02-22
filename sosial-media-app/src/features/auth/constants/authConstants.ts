// src/features/auth/constants/authConstants.ts

/**
 * Route paths untuk auth feature
 */
export const AUTH_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/',
  DASHBOARD: '/dashboard',
} as const;

/**
 * Success messages
 */
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login berhasil! Selamat datang kembali.',
  SIGNUP_SUCCESS: 'Akun berhasil dibuat. Silakan login untuk melanjutkan.',
  LOGOUT_SUCCESS: 'Logout berhasil. Sampai jumpa kembali!',
  EMAIL_VERIFIED: 'Email berhasil diverifikasi.',
} as const;

/**
 * Error messages
 */
export const AUTH_ERROR_MESSAGES = {
  // Validation errors
  INVALID_EMAIL: 'Format email tidak valid',
  WEAK_PASSWORD: 'Password harus minimal 6 karakter',
  PASSWORD_MISMATCH: 'Password tidak cocok',
  EMAIL_REQUIRED: 'Email wajib diisi',
  PASSWORD_REQUIRED: 'Password wajib diisi',

  // Firebase errors
  EMAIL_ALREADY_EXISTS: 'Email sudah terdaftar. Silakan gunakan email lain atau login.',
  USER_NOT_FOUND: 'User tidak ditemukan. Pastikan email benar atau buat akun baru.',
  WRONG_PASSWORD: 'Password salah. Silakan coba lagi.',
  TOO_MANY_ATTEMPTS: 'Terlalu banyak percobaan login. Coba lagi dalam beberapa menit.',
  OPERATION_NOT_ALLOWED: 'Login dengan email/password tidak diaktifkan.',
  EMAIL_DISABLED: 'Akun ini telah dinonaktifkan.',

  // General errors
  NETWORK_ERROR: 'Kesalahan koneksi. Periksa koneksi internet Anda.',
  UNEXPECTED_ERROR: 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.',
  LOGOUT_FAILED: 'Logout gagal. Silakan coba lagi.',
} as const;

/**
 * Form labels
 */
export const AUTH_LABELS = {
  EMAIL: 'Email',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Konfirmasi Password',
  REMEMBER_ME: 'Ingat saya',
  FORGOT_PASSWORD: 'Lupa password?',
} as const;

/**
 * Button labels
 */
export const AUTH_BUTTON_LABELS = {
  LOGIN: 'Login',
  SIGNUP: 'Buat Akun',
  LOGOUT: 'Logout',
  CANCEL: 'Batal',
  SUBMIT: 'Kirim',
} as const;

/**
 * Form status/states
 */
export enum AuthFormStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Auth error codes untuk specific handling
 */
export const FIREBASE_AUTH_ERRORS = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  USER_DISABLED: 'auth/user-disabled',
} as const;

/**
 * Validation rules
 */
export const AUTH_VALIDATION_RULES = {
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
} as const;