import { Transaction } from "@/features/transactions/components/Transaction";
import { useGoals } from "../hooks/useGoals";

export const Statistics = () => {
  const { topExpenses, topIncomes } = useGoals();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm text-slate-700 border-b pb-1">
          Top Expenses
        </h1>

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
            <div className="text-xs text-slate-400 italic py-1">
              No expenses found.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm text-slate-700 border-b pb-1">
          Top Incomes
        </h1>

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
            <div className="text-xs text-slate-400 italic py-1">
              No incomes found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
