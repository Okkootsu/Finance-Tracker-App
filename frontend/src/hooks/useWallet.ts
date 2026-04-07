import { useTransactionStore } from "@/stores/transactionStore";
import { useMemo } from "react";

export const useWallet = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const { totalIncome, totalExpense, netWorth } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((ta) => {
      if (ta.amount > 0) {
        income += ta.amount;
      } else {
        expense += ta.amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      netWorth: income + expense,
    };
  }, [transactions]);

  return { totalIncome, totalExpense, netWorth };
};
