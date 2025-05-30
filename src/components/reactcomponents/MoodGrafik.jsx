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

const moodLabels = ["Sedih", "Biasa", "Santai", "Senang", "Bahagia"];
const moodMap = {
  1: "secondary", // Sedih
  2: "error", // Biasa
  3: "warning", // Santai
  4: "primary", // Senang
  5: "success", // Bahagia
};

function getDaisyUIColor(className) {
  const el = document.createElement("div");
  el.className = `bg-${className} text-white p-2 hidden`;
  el.textContent = ".";
  document.body.appendChild(el);

  const color = getComputedStyle(el).backgroundColor;
  document.body.removeChild(el);

  return color === "rgba(0, 0, 0, 0)" ? "#facc15" : color;
}

const MoodShape = (props) => {
  const { cx, cy, payload } = props;
  const mood = payload.mood;
  const className = moodMap[mood];
  const color = getDaisyUIColor(className);

  return (
    <g>
      <rect
        x={cx - 4}
        y={cy - 12}
        rx={6}
        ry={6}
        width={15}
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
    <div className="w-full bg-base-100 rounded-md p-3 flex-2/4 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Mood Grafik
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <ScatterChart>
          <XAxis
            type="category"
            dataKey="date"
            tickLine={true}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            type="number"
            dataKey="mood"
            domain={[0.45, 5.5]}
            tickLine={true}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(val) => {
              const index = Math.round(val) - 1;
              return moodLabels[index] ?? "";
            }}
          />

          {/* <Tooltip
          formatter={(value) => moodLabels[value - 1]}
          labelFormatter={(label) => `Tanggal ${label}`}
        /> */}
          <Scatter
            name="Mood"
            data={data}
            shape={<MoodShape />}
            fill="#23d5e8"
            line
          />
        </ScatterChart>
      </ResponsiveContainer>{" "}
    </div>
  );
}
