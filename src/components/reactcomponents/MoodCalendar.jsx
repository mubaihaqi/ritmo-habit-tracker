import { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";

// Ambil data dari MoodGrafik.jsx
const grafikData = [
  { date: "25", mood: 2 },
  { date: "26", mood: 3 },
  { date: "27", mood: 5 },
  { date: "28", mood: 3 },
  { date: "29", mood: 1 },
  { date: "30", mood: 4 },
  { date: "31", mood: 2 },
];

const moodMap = {
  1: "secondary", // Sedih
  2: "error", // Biasa
  3: "warning", // Santai
  4: "primary", // Senang
  5: "success", // Bahagia
};
const fallbackColors = {
  success: "#22c55e",
  primary: "#3b82f6",
  warning: "#facc15",
  error: "#ef4444",
  secondary: "#a855f7",
};

function getDaisyUIColor(className) {
  if (typeof document === "undefined") return fallbackColors[className];
  const el = document.createElement("div");
  el.className = `bg-${className} hidden`;
  document.body.appendChild(el);
  const color = getComputedStyle(el).backgroundColor;
  document.body.removeChild(el);
  return color === "rgba(0, 0, 0, 0)" ? fallbackColors[className] : color;
}

// Generate moodCalendar dari grafikData
const moodCalendar = grafikData.reduce((acc, cur) => {
  const dateStr = `2025-05-${cur.date.padStart(2, "0")}`;
  acc[dateStr] = getDaisyUIColor(moodMap[cur.mood]);
  return acc;
}, {});

function CalendarGrid() {
  const days = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(2025, 4, 25 + i);
    return {
      date,
      label: date.getDate(),
      key: date.toISOString().split("T")[0],
    };
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
        padding: "8px",
        height: "231px",
      }}
    >
      {days.map((d, i) => (
        <div
          key={i}
          className={`
            flex items-center justify-center rounded-full
            font-semibold transition-colors duration-200
            ${
              moodCalendar[d.key]
                ? "text-white border-2 border-white"
                : "text-gray-400 border border-gray-700"
            }
          `}
          style={{
            backgroundColor: moodCalendar[d.key] || "#333",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: moodCalendar[d.key] ? "white" : "gray",
            border: moodCalendar[d.key] ? "2px solid #fff" : "1px solid #444",
            transition: "background 0.2s",
          }}
        >
          {d.label}
        </div>
      ))}
    </div>
  );
}

export default function MoodCalendar() {
  const [moodCalendar, setMoodCalendar] = useState({});

  useEffect(() => {
    // Generate moodCalendar di client
    const calendar = grafikData.reduce((acc, cur) => {
      const dateStr = `2025-05-${cur.date.padStart(2, "0")}`;
      acc[dateStr] = getDaisyUIColor(moodMap[cur.mood]);
      return acc;
    }, {});
    setMoodCalendar(calendar);
  }, []);

  return (
    <div className="w-full h-full bg-base-100 rounded-md p-3 flex-1/4 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Mood Calendar
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>
      <ResponsiveContainer width="100%">
        <CalendarGrid />
      </ResponsiveContainer>
    </div>
  );
}
