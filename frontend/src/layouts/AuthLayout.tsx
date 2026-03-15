import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Arka Plan */}
      <img
        src="auth-bg-2.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* İçerik Konteyneri */}
      <div className="relative z-10 flex-1 flex justify-center items-center">
        <div className="backdrop-blur-3xl bg-white/30 border border-white/20 rounded-lg p-8 shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
