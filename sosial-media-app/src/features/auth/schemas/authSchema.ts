// src/features/auth/schemas/authSchema.ts
import { z } from 'zod';

/**
 * Email validation schema
 * - Valid email format
 * - Max 100 characters
 * - Not empty
 */
const emailSchema = z
  .string( )
  .nonempty('Email wajib diisi')
  .trim()
  .toLowerCase()
  .email('Format email tidak valid (contoh: user@example.com)')
  .max(100, 'Email terlalu panjang (maksimal 100 karakter)')
  .describe('Email pengguna');

/**
 * Password validation schema
 * - Minimum 6 characters
 * - Maximum 128 characters
 * - At least one uppercase letter (optional, tapi recommended)
 * - At least one number (optional, tapi recommended)
 * - At least one special character (optional, tapi recommended)
 */
const passwordSchema = z
  .string()
  .nonempty('Password wajib diisi')
  .min(6, 'Password minimal 6 karakter')
  .max(128, 'Password terlalu panjang (maksimal 128 karakter)')
  .describe('Password pengguna');

/**
 * Strong password validation schema (dengan persyaratan lebih ketat)
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 */
const strongPasswordSchema = z
  .string()
  .nonempty('Password wajib diisi')
  .min(8, 'Password minimal 8 karakter')
  .max(128, 'Password terlalu panjang (maksimal 128 karakter)')
  .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
  .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password harus mengandung minimal 1 karakter khusus (!@#$%^&*dll)')
  .describe('Password kuat');

/**
 * Basic auth schema untuk login
 * - Email validation
 * - Password validation (minimal 6 karakter)
 */
export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Type inference dari authSchema
 */
export type AuthSchema = z.infer<typeof authSchema>;

/**
 * Signup schema dengan password confirmation
 * - Email validation
 * - Strong password validation (8 karakter + rules)
 * - Password confirmation (harus sama dengan password)
 */
export const signupSchema = z
  .object({
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().nonempty('Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'], // Error akan ditampilkan di field confirmPassword
  });

/**
 * Type inference dari signupSchema
 */
export type SignupSchema = z.infer<typeof signupSchema>;

/**
 * Login schema (same as authSchema)
 */
export const loginSchema = authSchema;

/**
 * Type inference dari loginSchema
 */
export type LoginSchema = z.infer<typeof loginSchema>;

/**
 * Password reset request schema
 * - Email validation
 */
export const passwordResetSchema = z.object({
  email: emailSchema,
});

/**
 * Type inference dari passwordResetSchema
 */
export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;

/**
 * Password reset confirmation schema
 * - New password validation
 * - Password confirmation (harus sama)
 * - Reset token (dari email)
 */
export const passwordResetConfirmSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().nonempty('Konfirmasi password wajib diisi'),
    token: z.string().nonempty('Reset token tidak ditemukan').min(10, 'Token invalid'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

/**
 * Type inference dari passwordResetConfirmSchema
 */
export type PasswordResetConfirmSchema = z.infer<typeof passwordResetConfirmSchema>;

/**
 * Profile update schema (untuk edit profile)
 * - Email (optional)
 * - Full name (optional)
 * - Bio (optional)
 */
export const profileUpdateSchema = z.object({
  email: emailSchema.optional(),
  fullName: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama terlalu panjang')
    .optional(),
  bio: z
    .string()
    .max(500, 'Bio terlalu panjang (maksimal 500 karakter)')
    .optional(),
  photoUrl: z
    .string()
    .url('URL foto tidak valid')
    .optional()
    .or(z.literal('')), // Allow empty string
});

/**
 * Type inference dari profileUpdateSchema
 */
export type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;

/**
 * Helper function untuk validate email
 * @param email - Email to validate
 * @returns true jika valid, false jika invalid
 */
export const isValidEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper function untuk validate password
 * @param password - Password to validate
 * @returns true jika valid, false jika invalid
 */
export const isValidPassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper function untuk validate strong password
 * @param password - Password to validate
 * @returns true jika valid, false jika invalid
 */
export const isValidStrongPassword = (password: string): boolean => {
  try {
    strongPasswordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper function untuk get validation errors dari schema
 * @param schema - Zod schema
 * @param data - Data to validate
 * @returns Object dengan error messages per field
 */
export const getValidationErrors = (schema: z.ZodSchema, data: unknown): Record<string, string> => {
  try {
    schema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      });
      return errors;
    }
    return { root: 'Validation error' };
  }
};

/**
 * Validation rules constant untuk reference di UI
 */
export const VALIDATION_RULES = {
  EMAIL: {
    description: 'Format email yang valid (contoh: user@example.com)',
    maxLength: 100,
  },
  PASSWORD: {
    description: 'Minimal 6 karakter',
    minLength: 6,
    maxLength: 128,
  },
  STRONG_PASSWORD: {
    description: 'Minimal 8 karakter, 1 huruf besar, 1 angka, 1 karakter khusus',
    minLength: 8,
    maxLength: 128,
    rules: [
      'Minimal 8 karakter',
      'Minimal 1 huruf besar (A-Z)',
      'Minimal 1 angka (0-9)',
      'Minimal 1 karakter khusus (!@#$%^&*dll)',
    ],
  },
} as const;