import { PieChart, Pie, Cell } from "recharts";

const moodData = [
  { name: "keren", value: 1, color: "#1abc9c", emoji: "😎" },
  { name: "baik", value: 0, color: "#2ecc71", emoji: "🙂" },
  { name: "biasa", value: 2, color: "#3498db", emoji: "😐" },
  { name: "buruk", value: 1, color: "#e67e22", emoji: "😞" },
  { name: "sangat buruk", value: 1, color: "#e74c3c", emoji: "😠" },
];

const total = moodData.reduce((sum, item) => sum + item.value, 0);

export default function MoodCounter() {
  return (
    <div className="w-full bg-base-100 rounded-md p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Mood Counter
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>

      <div style={{ position: "relative", width: 300 }}>
        <PieChart width={300} height={150}>
          <Pie
            data={moodData}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            {moodData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {total}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          {moodData.map((mood) => (
            <div key={mood.name} style={{ textAlign: "center", fontSize: 12 }}>
              <div>{mood.emoji}</div>
              <div>{mood.name}</div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: mood.color,
                  borderRadius: "50%",
                  color: "white",
                  fontSize: 12,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
