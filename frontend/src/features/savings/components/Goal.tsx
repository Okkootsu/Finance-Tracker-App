import { Checkbox } from "@/components/Checkbox";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { cn } from "@/utils/cn";
import { useSettingsStore } from "@/stores/settingsStore";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";
import { formatAppDate } from "@/utils/dateFormatter";

type GoalProps = {
  onClick?: () => void;
  name: string;
  category: string;
  isActive?: boolean;
  startTime: string;
  endTime?: string;
  savedAmount: number;
  targetAmount: number;
};

export const Goal = ({
  onClick,
  category,
  name,
  isActive = false,
  startTime,
  endTime,
  savedAmount,
  targetAmount,
}: GoalProps) => {
  const currency = useSettingsStore((state) => state.currency);
  const formattedSavedAmount = formatCurrency(savedAmount, currency);
  const formattedTargetAmount = formatCurrency(targetAmount, currency);

  const { findIcon } = useCategories();

  const icon = findIcon(category);

  const percentage =
    targetAmount > 0
      ? Math.min(100, Math.round((savedAmount / targetAmount) * 100))
      : 0;

  const { t } = useTranslation();

  category = t(`categories.${category}`, { defaultValue: category });

  return (
    <div
      className={cn(
        "rounded border flex font-bold transition-all p-1 cursor-pointer",
        isActive
          ? "bg-slate-200 border-slate-400 shadow-inner"
          : "bg-slate-100 border-slate-200 shadow-sm hover:bg-slate-200 hover:border-slate-300 hover:shadow",
      )}
      onClick={onClick}
    >
      <div className={cn(" flex items-center py-1 px-4 w-[27%] gap-5")}>
        <span className={"text-2xl"}>{icon}</span>

        <span className="flex flex-col ">
          <p className={cn("text-xl")}>{name}</p>
          <p className={cn("font-normal text-slate-500 text-sm")}>{category}</p>
        </span>
      </div>

      <div className=" font-normal w-[32%] flex flex-col justify-center px-4 gap-1.5">
        <div className="flex justify-between items-end px-1">
          <span className="text-sm font-bold text-blue-600">
            {formattedSavedAmount}
          </span>
          <span className="text-xs font-bold text-slate-400">
            % {percentage}
          </span>
          <span className="text-sm font-bold text-slate-500">
            {formattedTargetAmount}
          </span>
        </div>

        {/* Line Graphic (Percentage Bar) */}
        <div className="w-full h-2.5 bg-slate-300 rounded-full overflow-hidden shadow-inner">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              percentage >= 100 ? "bg-emerald-500" : "bg-blue-500",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div
        className={cn(" flex flex-col justify-center items-center p-1 w-[17%]")}
      >
        <h1 className="font-bold text-sm">{t("savings.goals.start")}</h1>
        <p className="font-normal text-sm text-slate-500">
          {formatAppDate(startTime)}
        </p>
      </div>

      <div
        className={cn(
          " flex flex-col justify-center items-center text-center p-1 w-[17%]",
        )}
      >
        <h1 className="font-bold text-sm">{t("savings.goals.finish")}</h1>
        <p className="font-normal text-sm text-slate-500">
          {!endTime ? "-" : formatAppDate(endTime)}
        </p>
      </div>

      <div className=" flex justify-center items-center p-1 w-[7%]">
        <Checkbox readOnly checked={isActive} />
      </div>
    </div>
  );
};
