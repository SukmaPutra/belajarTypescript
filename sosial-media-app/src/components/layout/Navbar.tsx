import { Link } from "react-router-dom";
import { Home, Search, User } from "lucide-react";
import LogoutButton from "../../features/auth/LogoutButton";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const {user} = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to={"/"}>
          <div className="text-xl font-bold text-blue-600">SosialApp</div>
        </Link>

        {/* Search */}
        <div className="hidden md:flex w-full max-w-md items-center rounded-full bg-gray-100 px-4 py-2">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Cari teman atau postingan" className="ml-2 w-full bg-transparent text-sm outline-none" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* AUTH CONDITIONAL */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <button className="rounded-full px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">Login</button>
              </Link>

              <Link to={"/signup"}>
                <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700">Sign Up</button>
              </Link>
            </div>
          ) : (
            <>
              {/* Home */}
              <Link to={"/"}
                 className="rounded-full p-2 hover:bg-gray-100">
                  <Home size={22} />
                
              </Link>

              {/* Profile */}
              <Link to={"/profile/123"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white">
                  <User size={18} />
              </Link>

              {/* Logout Button */}
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
