import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { cn } from "@/utils/cn";
import { ChevronDown, Rocket } from "lucide-react";
import { useState } from "react";
import { Statistics } from "./Statistics";
import { GoalProgressChart } from "./GoalProgressChart";
import { useGoals } from "../hooks/useGoals";
import { useTranslation } from "react-i18next";

export const GoalOverview = () => {
  const { setFilterRange, currentGoal, startDate, endDate } = useGoals();

  const [open, setOpen] = useState<boolean>(true);

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between  ">
        <div className="flex relative gap-3 items-center">
          <h1 className="font-bold text-xl flex items-center gap-2">
            <Rocket className="w-5 h-5 text-emerald-500" />
            {t("savings.overview.title")}
          </h1>
          <Button
            variant="iconOutline"
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
                {!currentGoal ? (
                  <div className="flex flex-1 justify-center items-center">
                    <h1 className="font-bold text-xl">
                      {t("savings.overview.noCurrent")}
                    </h1>
                  </div>
                ) : (
                  <GoalProgressChart
                    title={currentGoal.name}
                    savedAmount={currentGoal?.savedAmount}
                    targetAmount={currentGoal?.targetAmount}
                  />
                )}
              </div>
              <div className="w-[50%] flex flex-col justify-between">
                <Statistics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
