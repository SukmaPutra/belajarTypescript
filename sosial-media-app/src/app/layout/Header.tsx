// app/layout/Header.tsx
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { APP_NAME } from '@/shared/constant/index';
import { Avatar } from '@/shared/components';
import { useAuth } from '@/features/auth';

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-sm border-b border-[#334155]">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.FEED} className="text-xl font-bold text-white">
          {APP_NAME}
        </Link>

        {/* Avatar user */}
        {user && (
          <Link to={`/${user.username}`}>
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              size="sm"
            />
          </Link>
        )}
      </div>
    </header>
  );
};