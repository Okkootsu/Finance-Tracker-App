import { Button } from "@/components/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export const AccountPage = () => {
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useAuth();

  return (
    <div>
      <p>Id: {user?.id}</p>
      <p>Username: {user?.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
