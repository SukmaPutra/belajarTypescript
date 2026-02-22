// src/features/auth/services/authService.ts
import {  auth } from '@/core/api/firebase/firebaseInit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

/**
 * Sign up user dengan email dan password
 */
export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
      },
    };
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Login user dengan email dan password
 */
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
      },
    };
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Helper function untuk handle Firebase auth errors
 */
const handleAuthError = (error: unknown): Error => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('Email sudah terdaftar');
      case 'auth/weak-password':
        return new Error('Password terlalu lemah (minimal 6 karakter)');
      case 'auth/invalid-email':
        return new Error('Email tidak valid');
      case 'auth/user-not-found':
        return new Error('User tidak ditemukan');
      case 'auth/wrong-password':
        return new Error('Password salah');
      case 'auth/too-many-requests':
        return new Error('Terlalu banyak percobaan login, coba lagi nanti');
      case 'auth/operation-not-allowed':
        return new Error('Email/password login tidak diaktifkan');
      default:
        return new Error(error.message || 'Terjadi kesalahan authentication');
    }
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error('Terjadi kesalahan yang tidak diketahui');
};

export { handleAuthError };