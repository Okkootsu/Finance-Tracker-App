import { Checkbox } from "@/components/Checkbox";
import { cn } from "@/utils/cn";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "@/features/categories/hooks/useCategories";

type TransactionProps = {
  onClick: () => void;
  name: string;
  description?: string;
  category: string;
  amount: number;
  time: string;
  isActive: boolean;
};

export const Transaction = ({
  onClick,
  amount,
  description,
  category,
  name,
  time,
  isActive,
}: TransactionProps) => {
  const { findIcon } = useCategories();

  const icon = findIcon(category);

  const { formatTime } = useTransactions();
  const formattedTime = formatTime(time);

  const isIncome = amount >= 0;

  return (
    <div
      className={cn(
        "rounded border flex p-1 font-bold cursor-pointer transition-all",
        isActive
          ? "bg-slate-300 "
          : "bg-slate-50 hover:bg-slate-100",
      )}
      onClick={onClick}
    >
      <div className=" flex items-center py-1 px-4 w-[28%] gap-5">
        {icon}
        <span className="flex flex-col ">
          <p className="text-xl">{name}</p>
          <p className="font-normal text-sm">{category}</p>
        </span>
      </div>
      <div className=" font-normal w-[31%] flex flex-col justify-center items-center">
        {description}
      </div>
      <div
        className={cn(
          " flex justify-center items-center p-1 w-[24%] text-lg",
          isIncome ? "text-emerald-500" : "text-rose-500",
        )}
      >
        {isIncome ? `+ ${amount}` : `- ${Math.abs(amount)}`}
      </div>
      <div className=" flex justify-center items-center p-1 text-sm w-[12%]">
        {formattedTime}
      </div>

      <div className=" flex justify-center items-center p-1 w-[5%]">
        <Checkbox checked={isActive} />
      </div>
    </div>
  );
};
