import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { cn } from "@/utils/cn";
import { useSettingsStore } from "@/stores/settingsStore";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";

type GoalProgressChartProps = {
  title: string;
  savedAmount: number;
  targetAmount: number;
  variant?: "default" | "compact";
};

export const GoalProgressChart: React.FC<GoalProgressChartProps> = ({
  title,
  savedAmount,
  targetAmount,
  variant = "default",
}) => {
  const chartData = useMemo(() => {
    const remaining = Math.max(0, targetAmount - savedAmount);
    const percentage =
      targetAmount > 0
        ? Math.min(100, Math.round((savedAmount / targetAmount) * 100))
        : 0;

    const data = [
      { name: "Completed", value: savedAmount },
      { name: "Remaining", value: remaining },
    ];

    return { data, percentage };
  }, [savedAmount, targetAmount]);

  const currency = useSettingsStore(state => state.currency);
  const formattedSavedAmount = formatCurrency(savedAmount, currency)
  const formattedTargetAmount = formatCurrency(targetAmount, currency)

  const { t } = useTranslation()

  const COLORS = ["#3B82F6", "#F1F5F9"];

  const isCompact = variant === "compact";
  const innerRadius = isCompact ? 50 : 80;
  const outerRadius = isCompact ? 70 : 110;
  const chartHeight = isCompact ? "h-36" : "h-64";
  const fontSize = isCompact ? "24px" : "36px";

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        isCompact ? "p-4" : "p-6",
      )}
    >
      <h2
        className={cn(
          "text-slate-600 font-bold mb-2 self-start",
          isCompact ? "text-base" : "text-lg",
        )}
      >
        Saving Progress for {title}
      </h2>

      <div className={cn("w-full relative", chartHeight)}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData.data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius} 
              outerRadius={outerRadius} 
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={isCompact ? 6 : 10}
            >
              {chartData.data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}

              <Label
                value={`%${chartData.percentage}`}
                position="center"
                fill="#1e293b"
                style={{
                  fontSize: fontSize, 
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        className={cn(
          "flex w-full justify-between px-2 font-medium",
          isCompact ? "mt-2 text-xs" : "mt-4 text-sm",
        )}
      >
        <div className="flex flex-col">
          <span className="text-slate-500">{t("savings.overview.saved")}</span>
          <span
            className={cn("text-blue-600", isCompact ? "text-base" : "text-lg")}
          >
            {formattedSavedAmount} 
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-slate-500">{t("savings.overview.target")}</span>
          <span
            className={cn(
              "text-slate-800",
              isCompact ? "text-base" : "text-lg",
            )}
          >
            {formattedTargetAmount} 
          </span>
        </div>
      </div>
    </div>
  );
};
