import { create } from "zustand";

export type User = {
  id: number;
  email: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

const initialToken = localStorage.getItem("token");

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: initialToken,
  isAuthenticated: !!initialToken, 

  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
