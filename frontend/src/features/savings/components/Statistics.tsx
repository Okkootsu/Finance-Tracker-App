import { Transaction } from "@/features/transactions/components/Transaction";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import type { Transaction as TransactionType } from "@/stores/transactionStore";
import { useMemo } from "react";

export const Statistics = () => {
  const { filteredTransactions } = useTransactions();

  const { topIncomes, topExpenses } = useMemo(() => {
    let incomeTransactions: TransactionType[] = [];
    let expenseTransactions: TransactionType[] = [];

    filteredTransactions.forEach((ta) => {
      if (ta.amount > 0) {
        incomeTransactions.push(ta);
      } else {
        expenseTransactions.push(ta);
      }
    });

    const topIncomes = incomeTransactions
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    const topExpenses = expenseTransactions
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 3);

    return { topIncomes, topExpenses };
  }, [filteredTransactions]);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-slate-800 border-b pb-1">Top Expanses</h1>
        <div className="flex flex-col gap-2">
          {topExpenses.length > 0 ? (
            topExpenses.map((ta) => (
              <Transaction
                key={`exp-${ta.id}`}
                amount={ta.amount}
                category={ta.category}
                time={ta.time}
                name={ta.name}
                variant="compact"
              />
            ))
          ) : (
            <div className="text-sm text-slate-400 italic">
              No expenses found.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-slate-800 border-b pb-1">Top Incomes</h1>
        <div className="flex flex-col gap-2">
          {topIncomes.length > 0 ? (
            topIncomes.map((ta) => (
              <Transaction
                key={`inc-${ta.id}`}
                amount={ta.amount}
                category={ta.category}
                time={ta.time}
                name={ta.name}
                variant="compact"
              />
            ))
          ) : (
            <div className="text-sm text-slate-400 italic">
              No incomes found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
