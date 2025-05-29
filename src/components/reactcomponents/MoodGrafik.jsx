import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { date: "25", mood: 2 },
  { date: "26", mood: 3 },
  { date: "27", mood: 5 },
  { date: "28", mood: 3 },
  { date: "29", mood: 1 },
  { date: "30", mood: 4 },
  { date: "31", mood: 2 },
];

const moodLabels = ["😠", "😞", "😐", "🙂", "😃"];
const moodColors = ["#e74c3c", "#e67e22", "#3498db", "#2ecc71", "#1abc9c"];

// Custom marker shape (lonjong ke bawah)
const MoodShape = (props) => {
  const { cx, cy, payload } = props;
  const mood = payload.mood;
  const color = moodColors[mood - 1];

  return (
    <g>
      <rect
        x={cx - 4}
        y={cy - 12}
        rx={8}
        ry={3}
        width={10}
        height={30}
        fill={color}
      />

      {/* Optional: emoji label */}
      {/* <text x={cx} y={cy - 15} textAnchor="middle" fontSize="14px">
        {moodLabels[mood - 1]}
      </text> */}
    </g>
  );
};

export default function MoodScatterChart() {
  return (
    <div className="w-full bg-base-100 rounded-md p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Mood Grafik
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart>
          <XAxis
            type="category"
            dataKey="date"
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            type="number"
            dataKey="mood"
            domain={[0.6, 0.5]}
            tickCount={5}
            tickFormatter={(val) => {
              const index = Math.round(val) - 1;
              return moodLabels[index] ?? "";
            }}
          />

          {/* <Tooltip
          formatter={(value) => moodLabels[value - 1]}
          labelFormatter={(label) => `Tanggal ${label}`}
        /> */}
          <Scatter name="Mood" data={data} shape={<MoodShape />} />
        </ScatterChart>
      </ResponsiveContainer>{" "}
    </div>
  );
}
