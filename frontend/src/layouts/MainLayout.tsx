import { Navbar } from "@/components/Navbar";
import { useInitializeApp } from "@/hooks/useInitializeApp";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  useInitializeApp();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>

      {/* Page contents */}
      <main className="flex-1 flex flex-col w-full bg-slate-50 font-sans">
        <Outlet />
      </main>
    </div>
  );
};
