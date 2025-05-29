const moodCalendar = {
  "2025-05-25": "😞",
  "2025-05-26": "😐",
  "2025-05-27": "😎",
  "2025-05-28": "😐",
  "2025-05-29": "😠",
};

function getDayEmoji(dateStr) {
  return moodCalendar[dateStr] || "+";
}

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
      }}
    >
      {days.map((d, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "#333",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: moodCalendar[d.key] ? "white" : "gray",
          }}
        >
          {getDayEmoji(d.key)}
        </div>
      ))}
    </div>
  );
}

export default function MoodCalendar() {
  return (
    <div className="w-full bg-base-100 rounded-md p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Mood Calendar
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>
      <CalendarGrid />
    </div>
  );
}
