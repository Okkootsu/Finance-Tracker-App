import { create } from "zustand";

export type User = {
  id: number;
  email: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

const initialToken = localStorage.getItem("token");

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: initialToken,
  isAuthenticated: !!initialToken,

  setUser: (user) => {
    set({ user: user });
  },

  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
