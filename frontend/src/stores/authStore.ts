import { create } from "zustand";

type AuthForm = "register" | "login";

type AuthStore = {
  selectedForm: AuthForm;
  setSelectedForm: (val: AuthForm) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  selectedForm: "login",
  setSelectedForm: (val) => set({ selectedForm: val }),
}));
