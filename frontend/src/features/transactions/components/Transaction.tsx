import { cn } from "@/utils/cn";

type TransactionProps = {
  key: string;
  name: string;
  description?: string;
  category: string;
  amount: number;
  time: string;
};

export const Transaction = ({
  key,
  amount,
  description,
  category,
  name,
  time,
}: TransactionProps) => {
  const isIncome = amount >= 0;

  return (
    <div
      key={key}
      className={cn(
        "rounded border flex p-1 font-bold cursor-pointer transition-all bg-slate-50 hover:bg-slate-100",
      )}
    >
      <div className=" flex items-center py-1 px-4 w-[32%] gap-5">
        💵
        <span className="flex flex-col ">
          <p className="text-xl">{name}</p>
          <p className="font-normal text-sm">{category}</p>
        </span>
      </div>
      <div className="  w-[31%] flex flex-col justify-center items-center">
        {description}
      </div>
      <div
        className={cn(
          " flex justify-center items-center p-1 w-[25%] text-lg",
          isIncome ? "text-emerald-500" : "text-rose-500",
        )}
      >
        {isIncome ? `+ ${amount}` : `- ${Math.abs(amount)}`}
      </div>
      <div className=" flex justify-center items-center p-1 text-sm w-[12%]">
        {time}
      </div>
    </div>
  );
};
