import { useAuthStore } from "@/stores/authStore";

export const useAuth = () => {
  const selectedForm = useAuthStore((state) => state.selectedForm);
  const setSelectedForm = useAuthStore((state) => state.setSelectedForm);

  const handlePageSwitch = () => {
    if (selectedForm === "login") {
      setSelectedForm("register");
    } else {
      setSelectedForm("login");
    }
  };

  return { selectedForm, handlePageSwitch };
};
