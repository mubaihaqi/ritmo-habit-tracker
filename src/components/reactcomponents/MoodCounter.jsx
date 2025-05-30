import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const moodMap = {
  Sedih: "secondary",
  Biasa: "error",
  Santai: "warning",
  Senang: "primary",
  Bahagia: "success",
};

function getDaisyUIColor(className) {
  const fallbackColors = {
    success: "#22c55e",
    primary: "#3b82f6",
    warning: "#facc15",
    error: "#ef4444",
    secondary: "#a855f7",
  };

  const el = document.createElement("div");
  el.className = `bg-${className} hidden`;
  document.body.appendChild(el);

  const color = getComputedStyle(el).backgroundColor;
  document.body.removeChild(el);

  return color === "rgba(0, 0, 0, 0)" ? fallbackColors[className] : color;
}

const rawMoodData = [
  { name: "Sedih", value: 1, emoji: "😞" },
  { name: "Biasa", value: 2, emoji: "😐" },
  { name: "Santai", value: 2, emoji: "😎" },
  { name: "Senang", value: 1, emoji: "🙂" },
  { name: "Bahagia", value: 1, emoji: "😠" },
];

export default function MoodCounter() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const mapped = rawMoodData.map((item) => ({
      ...item,
      color: getDaisyUIColor(moodMap[item.name]),
    }));
    setMoodData(mapped);
  }, []);

  const total = moodData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full bg-base-100 rounded-md p-3 flex-1/4 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Mood Counter
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>

      <div style={{ position: "relative", width: "100%", minHeight: 190 }}>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart
            style={{ transform: "scale(2)", transformOrigin: "center" }}
          >
            <Pie
              data={moodData}
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="100%"
              dataKey="value"
              cy="75%"
            >
              {moodData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div
          className="absolute top-[45%] right-[50%] font-bold text-4xl text-center pt-11"
          style={{ transform: "translate(50%, -50%)" }}
        >
          {total}
        </div>
        <div className="flex justify-center items-center gap-5 mt-4">
          {moodData.map((mood) => (
            <div
              key={mood.name}
              className="font-medium flex flex-col items-center gap-1 justify-center"
            >
              {/* <div>{mood.emoji}</div> */}
              <div>{mood.name}</div>
              <div
                className="text-xs text-gray-500 w-7 aspect-square rounded-full flex items-center justify-center"
                style={{ backgroundColor: mood.color }}
              >
                {mood.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
