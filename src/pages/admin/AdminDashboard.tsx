import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Alert {
  id: string; type: string; title: string; body: string | null;
  metadata: any; order_id: string | null; read_at: string | null; created_at: string;
}

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState({ today: 0, week: 0, revenue: 0 });

  const load = async () => {
    const { data } = await supabase
      .from("admin_alerts").select("*")
      .order("created_at", { ascending: false }).limit(30);
    setAlerts((data as Alert[]) || []);

    const since = new Date(); since.setDate(since.getDate() - 7);
    const { data: orders } = await supabase
      .from("orders").select("total_cents, created_at, status")
      .gte("created_at", since.toISOString());
    const today = new Date(); today.setHours(0,0,0,0);
    setStats({
      today: (orders || []).filter(o => new Date(o.created_at) >= today).length,
      week: orders?.length || 0,
      revenue: (orders || []).reduce((s, o) => s + (o.total_cents || 0), 0),
    });
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("dash")
      .on("postgres_changes", { event: "*", schema: "public", table: "admin_alerts" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const markRead = async (id: string) => {
    await supabase.from("admin_alerts")
      .update({ read_at: new Date().toISOString() }).eq("id", id);
  };
  const markAllRead = async () => {
    await supabase.from("admin_alerts")
      .update({ read_at: new Date().toISOString() }).is("read_at", null);
  };

  const money = (c: number) => `$${(c / 100).toFixed(2)}`;

  return (
    <div>
      <header style={H.head}>
        <div style={H.eyebrow}>Dashboard</div>
        <h1 style={H.title}>Good morning, Leola</h1>
      </header>

      <section style={H.statsRow}>
        <Stat label="Orders today" value={String(stats.today)} />
        <Stat label="Orders this week" value={String(stats.week)} />
        <Stat label="Revenue this week" value={money(stats.revenue)} />
      </section>

      <section style={H.card}>
        <div style={H.cardHead}>
          <h2 style={H.h2}>Alerts</h2>
          <button style={H.linkBtn} onClick={markAllRead}>Mark all read</button>
        </div>
        {alerts.length === 0 && <p style={H.empty}>No alerts yet.</p>}
        <ul style={H.list}>
          {alerts.map(a => (
            <li key={a.id} style={{ ...H.item, ...(a.read_at ? {} : H.itemUnread) }}>
              <div>
                <div style={H.itemTitle}>{a.title}</div>
                {a.body && <div style={H.itemBody}>{a.body}</div>}
                <div style={H.itemMeta}>{new Date(a.created_at).toLocaleString()}</div>
              </div>
              {!a.read_at && (
                <button style={H.linkBtn} onClick={() => markRead(a.id)}>Mark read</button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div style={H.stat}>
    <div style={H.statLabel}>{label}</div>
    <div style={H.statValue}>{value}</div>
  </div>
);

const H: Record<string, React.CSSProperties> = {
  head: { marginBottom: 24 },
  eyebrow: { letterSpacing: 4, fontSize: 10, color: "#8a6a4c", textTransform: "uppercase" },
  title: { fontWeight: 400, fontSize: 32, margin: "6px 0 0" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 16, marginBottom: 24 },
  stat: { background: "#fbf6ee", border: "1px solid #e8d9c4", borderRadius: 4,
    padding: "18px 20px" },
  statLabel: { fontSize: 11, letterSpacing: 2, color: "#8a6a4c", textTransform: "uppercase" },
  statValue: { fontSize: 26, marginTop: 4 },
  card: { background: "#fbf6ee", border: "1px solid #e8d9c4", borderRadius: 4,
    padding: "22px 24px" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 12 },
  h2: { fontWeight: 400, fontSize: 20, margin: 0 },
  empty: { color: "#8a6a4c", fontStyle: "italic" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: { padding: "14px 0", borderTop: "1px solid #e8d9c4",
    display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" },
  itemUnread: { background: "linear-gradient(to right,#f3e6d3,#fbf6ee 40%)",
    margin: "0 -24px", padding: "14px 24px" },
  itemTitle: { fontSize: 16 },
  itemBody: { fontSize: 14, color: "#5a4434", marginTop: 2 },
  itemMeta: { fontSize: 12, color: "#8a6a4c", marginTop: 4 },
  linkBtn: { background: "none", border: "none", color: "#8a6a4c",
    cursor: "pointer", textDecoration: "underline", fontSize: 13 },
};