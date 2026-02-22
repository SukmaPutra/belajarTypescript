// app/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { ROUTES, generatePath } from '@/config/routes';
import { LogoutButton } from '@/features/auth';
import { useAuth } from '@/features/auth';

const navItems = [
  { label: 'Feed',       path: ROUTES.FEED,          icon: '🏠' },
  { label: 'Explore',    path: ROUTES.EXPLORE,        icon: '🔍' },
  { label: 'Notifikasi', path: ROUTES.NOTIFICATIONS,  icon: '🔔' },
  { label: 'Pesan',      path: ROUTES.MESSAGES,       icon: '✉️'  },
];

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-[#334155] p-4 sticky top-0 h-screen">
      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg
              text-sm font-medium transition-colors duration-200
              ${isActive
                ? 'bg-[#137fec]/10 text-[#137fec]'
                : 'text-[#cbd5e1] hover:bg-[#1e293b]'
              }
            `}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Profile link — dynamic username */}
        {user && (
          <NavLink
            to={generatePath(ROUTES.PROFILE, { username: user.username })}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg
              text-sm font-medium transition-colors duration-200
              ${isActive
                ? 'bg-[#137fec]/10 text-[#137fec]'
                : 'text-[#cbd5e1] hover:bg-[#1e293b]'
              }
            `}
          >
            <span>👤</span>
            <span>Profil</span>
          </NavLink>
        )}
      </nav>

      {/* Logout di bawah */}
      <div className="mt-auto pt-4 border-t border-[#334155]">
        <LogoutButton variant="ghost" />
      </div>
    </aside>
  );
};