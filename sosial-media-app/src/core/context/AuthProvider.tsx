// core/context/AuthProvider.tsx
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { subscribeAuthState, getUserProfileService } from '@/features/auth/services/authService';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    // Subscribe ke perubahan status login Firebase
    const unsubscribe = subscribeAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        // User login → ambil profil dari Firestore
        const { data } = await getUserProfileService(firebaseUser.uid);
        setUser(data);
      } else {
        // User logout → clear
        setUser(null);
      }
      // Tandai bahwa inisialisasi auth sudah selesai
      setInitialized(true);
    });

    // Cleanup saat component unmount
    return () => unsubscribe();
  }, [setUser, setInitialized]);

  return <>{children}</>;
};