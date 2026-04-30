import { Checkbox } from "@/components/Checkbox";
import { cn } from "@/utils/cn";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSettingsStore } from "@/stores/settingsStore";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";

type TransactionProps = {
  onClick?: () => void;
  name: string;
  description?: string;
  category: string;
  amount: number;
  time: string;
  isActive?: boolean;
  variant?: "default" | "compact";
};

export const Transaction = ({
  onClick,
  amount,
  description,
  category,
  name,
  time,
  isActive = false,
  variant = "default",
}: TransactionProps) => {
  const currency = useSettingsStore((state) => state.currency);
  const formattedAmount = formatCurrency(amount, currency)

  const { findIcon } = useCategories();

  const icon = findIcon(category);

  const { formatTime } = useTransactions();
  const formattedTime = formatTime(time);

  const isIncome = amount >= 0;

  const isCompact = variant === "compact";

  const { t } = useTranslation()

  category = t(`categories.${category}`, { defaultValue: category })

  return (
    <div
      className={cn(
        "rounded border flex font-bold transition-all",
        isActive
          ? "bg-slate-200 border-slate-400 shadow-inner"
          : "bg-slate-100 border-slate-200 shadow-sm hover:bg-slate-200 hover:border-slate-300 hover:shadow",
        isCompact ? "p-1.5 text-sm" : "p-1 cursor-pointer",
        !onClick && "cursor-default",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          " flex items-center ",
          isCompact ? "w-[50%] px-2 gap-3" : "py-1 px-4 w-[28%] gap-5",
        )}
      >
        <span className={isCompact ? "text-lg" : "text-2xl"}>{icon}</span>
        <span className="flex flex-col ">
          <p className={cn(isCompact ? "text-base leading-tight" : "text-xl")}>
            {name}
          </p>
          <p
            className={cn(
              "font-normal text-slate-500",
              isCompact ? "text-xs" : "text-sm",
            )}
          >
            {category}
          </p>
        </span>
      </div>

      {!isCompact && (
        <div className=" font-normal w-[31%] flex flex-col justify-center items-center text-center px-2">
          {description}
        </div>
      )}

      <div
        className={cn(
          " flex justify-center items-center ",
          isIncome ? "text-emerald-500" : "text-rose-500",
          isCompact ? "w-[25%] text-base" : "p-1 w-[24%] text-lg",
        )}
      >
        {isIncome ? `+${formattedAmount}` : `${formattedAmount}`}
      </div>

      <div
        className={cn(
          " flex justify-center items-center text-center ",
          isCompact ? "w-[25%] text-xs" : "p-1 text-sm w-[12%]",
        )}
      >
        {formattedTime}
      </div>

      {onClick && (
        <div className=" flex justify-center items-center p-1 w-[5%]">
          <Checkbox readOnly checked={isActive} />
        </div>
      )}
    </div>
  );
};
