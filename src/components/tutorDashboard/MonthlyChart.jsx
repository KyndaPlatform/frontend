import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", value: 150 },
  { month: "Feb", value: 220 },
  { month: "Mar", value: 280 },
  { month: "Apr", value: 190 },
  { month: "May", value: 320 },
  { month: "Jun", value: 280 },
  { month: "Jul", value: 260 },
  { month: "Aug", value: 300 },
  { month: "Sep", value: 350 },
  { month: "Oct", value: 330 },
  { month: "Nov", value: 310 },
  { month: "Dec", value: 250 },
];

export default function MonthlyChart() {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E5] shadow rounded-xl p-6">
      <h2 className="text-[#020A1F] text-xl font-semibold font-dmsans leading-7">
        Monthly Earning
      </h2>

      <div className="w-full h-44 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#E5E5E5" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#009BFF"
              strokeWidth={3}
              dot={{ r: 4, fill: "#009BFF" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
