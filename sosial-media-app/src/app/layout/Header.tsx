// app/layout/Header.tsx
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { Avatar } from "@/shared/components";
import { useAuth } from "@/features/auth";
import { HeaderActions } from "./HeaderActions";
import { Zap } from "lucide-react";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-sm border-b border-[#1e293b]">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.FEED} aria-label="Beranda" className="text-xl font-bold text-white hover:text-[#94a3b8] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-[#137fec] flex items-center justify-center shadow-md shadow-[#137fec]/30 group-hover:shadow-[#137fec]/50 transition-shadow duration-200">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Somad</span>
        </Link>

        {/* Kanan: actions + avatar */}
        <div className="flex items-center gap-1">
          <HeaderActions />

          {user && (
            <Link to={`/${user.username}`} aria-label={`Profil ${user.displayName}`} className="ml-2">
              <Avatar src={user.photoURL} alt={user.displayName} size="sm" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
