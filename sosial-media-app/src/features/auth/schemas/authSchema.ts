// features/auth/schemas/authSchema.ts
import { z } from 'zod';
import { LIMITS } from '@/shared/constant';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email wajib diisi')
      .email('Format email tidak valid'),
    username: z
      .string()
      .min(LIMITS.USERNAME_MIN, `Username minimal ${LIMITS.USERNAME_MIN} karakter`)
      .max(LIMITS.USERNAME_MAX, `Username maksimal ${LIMITS.USERNAME_MAX} karakter`)
      .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh huruf, angka, dan underscore'),
    displayName: z
      .string()
      .min(1, 'Nama tampilan wajib diisi')
      .max(LIMITS.DISPLAY_NAME_MAX, `Nama maksimal ${LIMITS.DISPLAY_NAME_MAX} karakter`),
    password: z
      .string()
      .min(6, 'Password minimal 6 karakter'),
    confirmPassword: z
      .string()
      .min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],  // error muncul di field confirmPassword
  });

// Tipe yang di-infer dari schema — tidak perlu tulis manual
export type LoginFormData    = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;