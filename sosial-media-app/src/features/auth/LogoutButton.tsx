import { logout } from "../../api/auth";

const LogoutButton = () => {
    const handleLogout = async () => {
        // Implement logout logic here
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

  return (
    <button onClick={handleLogout} className="rounded-full px-4 py-1.5 text-sm font-medium bg-red-100 text-red-600 hover:bg-red-300">
      Logout
    </button>
  )
}

export default LogoutButton
