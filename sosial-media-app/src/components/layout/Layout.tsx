import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
