import { Navbar } from "@/components/Navbar";
import { useInitializeApp } from "@/hooks/useInitializeApp";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";
import { FullPageLoader } from "@/components/FullPageLoader";

export const MainLayout = () => {
  const { isLoading } = useInitializeApp();

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>

      {createPortal(
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-sans font-medium text-slate-700 shadow-lg",
          }}
          containerStyle={{
            zIndex: 99999,
            marginTop: "10px",
          }}
        />,
        document.body,
      )}

      {/* Page contents */}
      <main className="flex-1 flex flex-col w-full bg-slate-50 font-sans">
        <Outlet />
      </main>
    </div>
  );
};
