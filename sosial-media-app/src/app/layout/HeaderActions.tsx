// app/layout/HeaderActions.tsx
import { Search, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/shared/hooks/useTheme';
import { ROUTES } from '@/config/routes';

export const HeaderActions = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-1">
      {/* Search */}
      <Link
        to={ROUTES.EXPLORE}
        aria-label="Cari"
        className="
          p-2 rounded-full text-[#475569]
          hover:text-white hover:bg-[#1e293b]
          transition-all duration-150
        "
      >
        <Search size={18} />
      </Link>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
        className="
          p-2 rounded-full text-[#475569]
          hover:text-white hover:bg-[#1e293b]
          transition-all duration-150
        "
      >
        {isDark
          ? <Sun size={18} />
          : <Moon size={18} />
        }
      </button>
    </div>
  );
};