import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

type GoalProgressChartProps = {
  title: string;
  savedAmount: number;
  targetAmount: number;
};

export const GoalProgressChart: React.FC<GoalProgressChartProps> = ({
  title,
  savedAmount,
  targetAmount,
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

  const COLORS = ["#3B82F6", "#F1F5F9"];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <h2 className="text-slate-600 font-bold text-lg mb-2 self-start">
        Saving Progress for {title}
      </h2>

      <div className="w-full h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData.data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {chartData.data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}

              <Label
                value={`%${chartData.percentage}`}
                position="center"
                fill="#1e293b"
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex w-full justify-between mt-4 px-4 text-sm font-medium">
        <div className="flex flex-col">
          <span className="text-slate-500">Saved</span>
          <span className="text-blue-600 text-lg">{savedAmount}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-slate-500">Target</span>
          <span className="text-slate-800 text-lg">{targetAmount}</span>
        </div>
      </div>
    </div>
  );
};
