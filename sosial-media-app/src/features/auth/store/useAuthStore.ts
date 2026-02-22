import { create } from "zustand";
import { auth } from '@/core/api/firebase/firebaseInit'
import { onAuthStateChanged, signOut, User } from "firebase/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error : string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      set({ 
        user: user,
        isLoading: false,
        error: null
      });
    } else {
      set({ 
        user: null,
        isLoading: false,
        error: null
      });
    }
  });


  return {
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),

    logout: async () => {
      set({ isLoading: true, error: null });
      try {
        await signOut(auth);
        set({ user: null, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Logout gagal";
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    },
  };
});
