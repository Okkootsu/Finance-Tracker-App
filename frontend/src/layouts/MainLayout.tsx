import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav>
        <Navbar />
      </nav>

      {/* Page contents */}
      <main className="flex-1 flex flex-col w-full bg-slate-50 font-sans">
        <Outlet />
      </main>
    </div>
  );
};
