import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartSectionProps = {
  title: string;
  data: any[];
  dataKey: string;
  colors: string[];
};

export const ChartSection = ({
  title,
  data,
  dataKey,
  colors,
}: ChartSectionProps) => {
  return (
    <>
      <div className=" p-2 px-4 font-bold text-xl">{title}</div>
      <div className=" flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" className="min-h-62.5">
          <PieChart margin={{ top: 40, right: 40, bottom: 12, left: 40 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey="name"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "30px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
