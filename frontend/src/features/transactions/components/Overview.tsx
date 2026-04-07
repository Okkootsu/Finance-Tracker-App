import { Button } from "@/components/Button";
import { ChevronDown } from "lucide-react";
import { ChartSection } from "./ChartSection";
import { DatePicker } from "@/components/DatePicker";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useTransactions } from "../hooks/useTransactions";

export interface UserStatusData {
  name: string;
  value: number;
}

export const Overview = () => {
  const COLORS = [
    "#10B981",
    "#F59E0B",
    "#FCD34D",
    "#6B7280",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];

  const [open, setOpen] = useState<boolean>(true);

  const { setFilterRange, chartData, startDate, endDate } = useTransactions();

  const { incomeData, spendingData } = chartData;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between  ">
        <div className="flex relative gap-3 items-center">
          <h1 className="font-bold text-xl">Financial Overview</h1>
          <Button
            className="bg-transparent border-0 w-fit rounded-full mt-1 h-fit p-2"
            icon={
              <ChevronDown
                className={cn(
                  "transition-transform duration-300",
                  open ? "rotate-180" : "rotate-0",
                )}
              />
            }
            onClick={() => setOpen(!open)}
          />
        </div>

        <div>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onRangeChange={(start, end) => setFilterRange({ start, end })}
          />
        </div>
      </div>

      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className={cn(open ? "overflow-visible" : "overflow-hidden")}>
          <div
            className={`bg-white border rounded-2xl min-h-fit shadow-xl shadow-slate-100 border-slate-300 transition-all
               hover:shadow-2xl hover:shadow-slate-200 duration-300 mt-2`}
          >
            <div className="flex">
              <div className="w-[50%] flex flex-col border-r border-slate-300 justify-between">
                <ChartSection
                  title="Incomes"
                  colors={COLORS}
                  data={incomeData}
                  dataKey="value"
                />
              </div>
              <div className="w-[50%] flex flex-col justify-between">
                <ChartSection
                  title="Spendings"
                  colors={COLORS}
                  data={spendingData}
                  dataKey="value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
