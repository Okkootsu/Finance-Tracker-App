import { GoalProgressChart } from "@/features/savings/components/GoalProgressChart";
import { useWallet } from "@/hooks/useWallet";
import { useGoalStore } from "@/stores/goalStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";

export const Overview = () => {
  const currentGoal = useGoalStore((state) => state.currentGoal);
  const currency = useSettingsStore((state) => state.currency);

  const { netWorth } = useWallet();
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{t('home.overview.welcome1')}</h1>
        <p className="text-slate-500">{t("home.overview.welcome2")}</p>
      </div>

      <div
        className={`bg-white border flex flex-col rounded-2xl min-h-60 shadow-xl shadow-slate-100 border-slate-300 transition-all
               hover:shadow-2xl hover:shadow-slate-200 duration-300 mt-4`}
      >
        <div className="flex h-full">
          <div className="w-[50%] flex flex-col border-r border-slate-300 p-6 ">
            <div className="flex flex-1 flex-col gap-1 items-center">
              <h2 className="text-slate-600 font-bold self-start text-xl">
                {t("home.overview.balance")}
              </h2>
              <p className="text-5xl flex-1 flex items-center justify-center font-extrabold text-slate-900">
                {formatCurrency(netWorth, currency)}
              </p>
            </div>
          </div>

          <div className="w-[50%] flex flex-col justify-center p-2">
            {currentGoal ? (
              <GoalProgressChart
                title={currentGoal.name}
                savedAmount={currentGoal.savedAmount}
                targetAmount={currentGoal.targetAmount}
                variant="compact"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 font-medium">
                {t("home.overview.noGoal")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
