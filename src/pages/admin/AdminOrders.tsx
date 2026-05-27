import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string; customer_email: string | null; customer_name: string | null;
  total_cents: number; currency: string; status: string;
  tracking_number: string | null; tracking_carrier: string | null; tracking_url: string | null;
  fulfilled_at: string | null; created_at: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "paid" | "fulfilled">("all");
  const [editing, setEditing] = useState<Order | null>(null);
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("orders").select("*")
      .order("created_at", { ascending: false }).limit(200);
    setOrders((data as Order[]) || []);
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!editing) { setItems([]); return; }
    supabase.from("order_items").select("*").eq("order_id", editing.id)
      .then(({ data }) => setItems(data || []));
  }, [editing]);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (filter === "paid" && o.fulfilled_at) return false;
      if (filter === "fulfilled" && !o.fulfilled_at) return false;
      if (q) {
        const s = q.toLowerCase();
        return (o.customer_email || "").toLowerCase().includes(s)
          || (o.customer_name || "").toLowerCase().includes(s)
          || o.id.toLowerCase().includes(s);
      }
      return true;
    });
  }, [orders, q, filter]);

  const money = (c: number, cur = "usd") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: cur.toUpperCase() }).format(c / 100);

  const saveTracking = async () => {
    if (!editing) return;
    await supabase.from("orders").update({
      tracking_number: editing.tracking_number,
      tracking_carrier: editing.tracking_carrier,
      tracking_url: editing.tracking_url,
      fulfilled_at: editing.fulfilled_at || new Date().toISOString(),
      status: "fulfilled",
    }).eq("id", editing.id);
    setEditing(null);
    load();
  };

  return (
    <div>
      <header style={{ marginBottom: 20 }}>
        <div style={{ letterSpacing: 4, fontSize: 10, color: "#8a6a4c", textTransform: "uppercase" }}>Orders</div>
        <h1 style={{ fontWeight: 400, fontSize: 32, margin: "6px 0 0" }}>All orders</h1>
      </header>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, email, or order id"
          style={{ flex: 1, minWidth: 220, padding: "10px 12px", border: "1px solid #d9c2a3",
            background: "transparent", borderRadius: 2, fontFamily: "inherit" }} />
        <select value={filter} onChange={e => setFilter(e.target.value as any)}
          style={{ padding: "10px 12px", border: "1px solid #d9c2a3", background: "transparent" }}>
          <option value="all">All</option>
          <option value="paid">Unfulfilled</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
      </div>

      <div style={{ background: "#fbf6ee", border: "1px solid #e8d9c4", borderRadius: 4, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead style={{ background: "#efe1ce", textAlign: "left" }}>
            <tr>
              <th style={th}>Date</th>
              <th style={th}>Customer</th>
              <th style={th}>Total</th>
              <th style={th}>Status</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} style={{ borderTop: "1px solid #e8d9c4" }}>
                <td style={td}>{new Date(o.created_at).toLocaleDateString()}</td>
                <td style={td}>
                  <div>{o.customer_name || "—"}</div>
                  <div style={{ fontSize: 12, color: "#8a6a4c" }}>{o.customer_email}</div>
                </td>
                <td style={td}>{money(o.total_cents, o.currency)}</td>
                <td style={td}>
                  <span style={{
                    fontSize: 11, padding: "3px 8px", borderRadius: 999,
                    background: o.fulfilled_at ? "#d8e7d2" : "#f3e6d3",
                    color: o.fulfilled_at ? "#2f5a32" : "#8a6a4c",
                  }}>
                    {o.fulfilled_at ? "Fulfilled" : "Paid"}
                  </span>
                </td>
                <td style={td}>
                  <button style={linkBtn} onClick={() => setEditing(o)}>Manage</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ ...td, textAlign: "center", color: "#8a6a4c" }}>No orders</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div style={modalOverlay} onClick={() => setEditing(null)}>
          <div style={modal} onClick={e => e.stopPropagation()}>
            <div style={{ letterSpacing: 4, fontSize: 10, color: "#8a6a4c", textTransform: "uppercase" }}>
              Order #{editing.id.slice(0,8).toUpperCase()}
            </div>
            <h2 style={{ fontWeight: 400, fontSize: 22, margin: "6px 0 16px" }}>
              {editing.customer_name || "Customer"}
              <span style={{ fontSize: 13, color: "#8a6a4c", marginLeft: 8 }}>{editing.customer_email}</span>
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", borderTop: "1px solid #e8d9c4" }}>
              {items.map((i, idx) => (
                <li key={idx} style={{ padding: "10px 0", borderBottom: "1px solid #e8d9c4",
                  display: "flex", justifyContent: "space-between" }}>
                  <span>{i.product_name}{i.scent ? ` — ${i.scent}` : ""}{i.size_label ? ` (${i.size_label})` : ""} × {i.quantity}</span>
                  <span>{money(i.line_total_cents, editing.currency)}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "grid", gap: 10 }}>
              <label style={lbl}>Carrier
                <input style={inp} value={editing.tracking_carrier || ""}
                  onChange={e => setEditing({ ...editing, tracking_carrier: e.target.value })}
                  placeholder="USPS / UPS / DHL" />
              </label>
              <label style={lbl}>Tracking number
                <input style={inp} value={editing.tracking_number || ""}
                  onChange={e => setEditing({ ...editing, tracking_number: e.target.value })} />
              </label>
              <label style={lbl}>Tracking URL
                <input style={inp} value={editing.tracking_url || ""}
                  onChange={e => setEditing({ ...editing, tracking_url: e.target.value })}
                  placeholder="https://..." />
              </label>
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button style={linkBtn} onClick={() => setEditing(null)}>Cancel</button>
              <button style={btnPrimary} onClick={saveTracking}>Save & Mark fulfilled</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const th: React.CSSProperties = { padding: "12px 14px", fontWeight: 500, fontSize: 12,
  letterSpacing: 2, textTransform: "uppercase", color: "#5a4434" };
const td: React.CSSProperties = { padding: "12px 14px", verticalAlign: "top" };
const linkBtn: React.CSSProperties = { background: "none", border: "none",
  color: "#8a6a4c", cursor: "pointer", textDecoration: "underline", fontSize: 13 };
const btnPrimary: React.CSSProperties = { background: "#3d2a1f", color: "#fbf6ee",
  border: "none", padding: "10px 16px", letterSpacing: 2, fontSize: 12,
  textTransform: "uppercase", cursor: "pointer", borderRadius: 2 };
const inp: React.CSSProperties = { padding: "10px 12px", border: "1px solid #d9c2a3",
  background: "#fbf6ee", borderRadius: 2, fontFamily: "inherit", fontSize: 14, width: "100%" };
const lbl: React.CSSProperties = { display: "grid", gap: 4, fontSize: 12,
  letterSpacing: 1, color: "#8a6a4c", textTransform: "uppercase" };
const modalOverlay: React.CSSProperties = { position: "fixed", inset: 0,
  background: "rgba(61,42,31,0.4)", display: "flex", alignItems: "center",
  justifyContent: "center", padding: 24, zIndex: 50 };
const modal: React.CSSProperties = { background: "#fbf6ee", padding: "28px 30px",
  borderRadius: 6, maxWidth: 560, width: "100%", maxHeight: "90vh", overflow: "auto",
  border: "1px solid #e8d9c4" };