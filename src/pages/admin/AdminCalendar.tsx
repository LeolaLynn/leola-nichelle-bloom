import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminCalendar() {
  const [items, setItems] = useState<any[]>([]);
  const [cursor, setCursor] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });

  useEffect(() => {
    const start = new Date(cursor); const end = new Date(cursor);
    end.setMonth(end.getMonth() + 1);
    supabase.from("email_campaigns").select("id, name, subject, status, scheduled_at, campaign_type")
      .not("scheduled_at", "is", null)
      .gte("scheduled_at", start.toISOString())
      .lt("scheduled_at", end.toISOString())
      .then(({ data }) => setItems(data || []));
  }, [cursor]);

  const cells = useMemo(() => {
    const first = new Date(cursor);
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const startWeekday = first.getDay();
    const arr: { date: Date | null }[] = [];
    for (let i = 0; i < startWeekday; i++) arr.push({ date: null });
    for (let d = 1; d <= daysInMonth; d++) arr.push({ date: new Date(cursor.getFullYear(), cursor.getMonth(), d) });
    return arr;
  }, [cursor]);

  const monthLabel = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
        <div>
          <div style={{ letterSpacing: 4, fontSize: 10, color: "#8a6a4c", textTransform: "uppercase" }}>Calendar</div>
          <h1 style={{ fontWeight: 400, fontSize: 32, margin: "6px 0 0" }}>{monthLabel}</h1>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={navBtn} onClick={() => { const d = new Date(cursor); d.setMonth(d.getMonth() - 1); setCursor(d); }}>‹</button>
          <button style={navBtn} onClick={() => { const d = new Date(); d.setDate(1); setCursor(d); }}>Today</button>
          <button style={navBtn} onClick={() => { const d = new Date(cursor); d.setMonth(d.getMonth() + 1); setCursor(d); }}>›</button>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1,
        background: "#e8d9c4", border: "1px solid #e8d9c4", borderRadius: 4 }}>
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} style={{ background: "#efe1ce", padding: "8px 10px",
            fontSize: 11, letterSpacing: 2, color: "#5a4434", textTransform: "uppercase" }}>{d}</div>
        ))}
        {cells.map((c, i) => {
          const dayItems = c.date ? items.filter(it =>
            new Date(it.scheduled_at).toDateString() === c.date!.toDateString()) : [];
          return (
            <div key={i} style={{ background: "#fbf6ee", minHeight: 100, padding: 8,
              opacity: c.date ? 1 : 0.4 }}>
              {c.date && <div style={{ fontSize: 12, color: "#8a6a4c" }}>{c.date.getDate()}</div>}
              {dayItems.map(d => (
                <div key={d.id} title={d.subject} style={{
                  marginTop: 4, fontSize: 11, padding: "4px 6px", borderRadius: 2,
                  background: d.status === "sent" ? "#d8e7d2" : d.status === "approved" ? "#fbecc6" : "#f3e6d3",
                  color: "#3d2a1f", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                }}>{new Date(d.scheduled_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {d.name}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = { background: "#fbf6ee", border: "1px solid #d9c2a3",
  padding: "6px 12px", cursor: "pointer", borderRadius: 2, fontFamily: "inherit" };