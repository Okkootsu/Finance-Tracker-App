import { create } from "zustand";

export type Currency = "try" | "usd" | "eur";

type SettingsStore = {
  currency: Currency;
  setCurrency: (option: Currency) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  currency: "usd",

  setCurrency: (opt) => set({ currency: opt }),
}));
