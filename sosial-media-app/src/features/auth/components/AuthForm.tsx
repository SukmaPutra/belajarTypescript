// features/auth/components/AuthForm.tsx
import { useState } from 'react';
import { Button, FormField, Alert } from '@/shared/components';
import { useAuth } from '../hooks/useAuth';
import { useLoginForm, useRegisterForm } from '../hooks/useAuthForm';
import type { LoginFormData, RegisterFormData } from '../schemas/authSchema';

// ─── Login Form ───────────────────────────────────────────────────────────────

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useLoginForm();

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {error && <Alert type="error" message={error} />}

      <FormField
        label="Email"
        type="email"
        placeholder="kamu@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="Masukkan password"
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        fullWidth
        className="mt-2"
      >
        Masuk
      </Button>
    </form>
  );
};

// ─── Register Form ────────────────────────────────────────────────────────────

export const RegisterForm = () => {
  const { register: registerAuth, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useRegisterForm();

  const onSubmit = async (data: RegisterFormData) => {
    await registerAuth(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {error && <Alert type="error" message={error} />}

      <FormField
        label="Nama Tampilan"
        placeholder="Nama Kamu"
        error={errors.displayName?.message}
        required
        {...register('displayName')}
      />

      <FormField
        label="Username"
        placeholder="username_kamu"
        error={errors.username?.message}
        hint="Hanya huruf, angka, dan underscore"
        required
        {...register('username')}
      />

      <FormField
        label="Email"
        type="email"
        placeholder="kamu@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="Minimal 6 karakter"
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <FormField
        label="Konfirmasi Password"
        type="password"
        placeholder="Ulangi password"
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        fullWidth
        className="mt-2"
      >
        Daftar Sekarang
      </Button>
    </form>
  );
};