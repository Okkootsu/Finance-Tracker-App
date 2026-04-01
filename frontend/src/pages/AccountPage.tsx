import { useAuthStore } from "@/stores/authStore";

export const AccountPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <p>Id: {user?.id}</p>
      <p>Username: {user?.email}</p>
    </div>
  );
};
