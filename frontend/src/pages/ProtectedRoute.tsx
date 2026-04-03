import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const { createUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const user = createUser(token!);
  setUser(user);

  return <Outlet />;
};
