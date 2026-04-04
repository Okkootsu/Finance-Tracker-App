import { create } from "zustand";

export type Transaction = {
  id: number;
  name: string;
  category: string;
  description?: string;
  amount: number;
  time: string;
};

type Range = {
  start: Date;
  end: Date;
};

type TransactionStore = {
  transactions: Transaction[];
  filterRange: Range | null;

  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;

  setFilterRange: (obj: Range) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  filterRange: null,

  setTransactions: (transactions) => set({ transactions: transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),

  setFilterRange: (obj) => set({ filterRange: obj }),
}));
