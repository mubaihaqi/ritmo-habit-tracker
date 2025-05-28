// src/components/EntryForm.jsx
import { useState } from "react";

export default function EntryForm() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");

  const submit = async () => {
    const res = await fetch("/api/addEntry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date(),
        mood,
        note,
      }),
    });
    const data = await res.json();
    console.log("Saved:", data);
  };

  return (
    <div>
      <input
        type="number"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={submit} className="hover:cursor-pointer">
        Save Entry
      </button>
    </div>
  );
}
