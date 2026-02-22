// features/auth/components/LogoutButton.tsx
import { Button } from '@/shared/components';
import { useAuth } from '../hooks/useAuth';

interface LogoutButtonProps {
  variant?: 'primary' | 'ghost' | 'danger';
}

export const LogoutButton = ({ variant = 'ghost' }: LogoutButtonProps) => {
  const { logout, isLoading } = useAuth();

  return (
    <Button
      variant={variant}
      onClick={logout}
      isLoading={isLoading}
    >
      Keluar
    </Button>
  );
};

export default LogoutButton;