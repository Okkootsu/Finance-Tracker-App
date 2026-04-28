import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getCategoryColor } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useSettingsStore } from "@/stores/settingsStore";

interface ChartSectionProps {
  title: string;
  data: { name: string; value: number }[];
  dataKey: string;
}

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  value,
  currency,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#475569"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-bold font-sans"
    >
      {`${formatCurrency(Number(value), currency)}`}
    </text>
  );
};

export const ChartSection: React.FC<ChartSectionProps> = ({
  title,
  data,
  dataKey,
}) => {
  const currency = useSettingsStore((state) => state.currency);

  return (
    <div className="flex flex-col h-full w-full p-4">
      <h2 className="font-bold text-slate-700 text-lg mb-2 text-center">
        {title}
      </h2>

      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 font-medium italic">
          No data available
        </div>
      ) : (
        <div className="w-full flex-1 min-h-65">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey={dataKey}
                stroke="none"
                label={(props) => renderCustomLabel({ ...props, currency })}
                labelLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getCategoryColor(entry.name)}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${formatCurrency(Number(value), currency)}`,
                  `${name}`,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#475569",
                  paddingTop: "30px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
