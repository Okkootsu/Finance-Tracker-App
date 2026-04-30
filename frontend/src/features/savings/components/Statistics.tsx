import { Transaction } from "@/features/transactions/components/Transaction";
import { useGoals } from "../hooks/useGoals";
import { useTranslation } from "react-i18next";

export const Statistics = () => {
  const { topExpenses, topIncomes } = useGoals();
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm text-slate-700 border-b pb-1">
          {t("savings.overview.topExpenses")}
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
              {t("savings.overview.noExpenses")}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm text-slate-700 border-b pb-1">
          {t("savings.overview.topIncomes")}
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
              {t("savings.overview.noIncomes")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
