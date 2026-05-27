import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Campaign = {
  id: string; name: string; campaign_type: string; subject: string;
  preheader: string | null; body_html: string; mailerlite_group: string | null;
  scheduled_at: string | null; status: string; approved_at: string | null;
  sent_at: string | null; send_error: string | null; created_at: string;
};

const TYPES = [
  { id: "newsletter", label: "Newsletter" },
  { id: "spotlight", label: "Scent spotlight" },
  { id: "launch", label: "Product launch" },
  { id: "drop", label: "Limited drop" },
  { id: "coupon", label: "Coupon / promo" },
  { id: "care", label: "Care tips" },
  { id: "review_request", label: "Review request" },
  { id: "restock", label: "Restock alert" },
  { id: "seasonal", label: "Seasonal" },
];

const empty = (): Partial<Campaign> => ({
  name: "", campaign_type: "newsletter", subject: "", preheader: "",
  body_html: "", mailerlite_group: "ritual-list",
  scheduled_at: "", status: "draft",
});

export default function AdminCampaigns() {
  const [list, setList] = useState<Campaign[]>([]);
  const [editing, setEditing] = useState<Partial<Campaign> | null>(null);

  const load = async () => {
    const { data } = await supabase.from("email_campaigns").select("*")
      .order("created_at", { ascending: false });
    setList((data as Campaign[]) || []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload: any = {
      name: editing.name, campaign_type: editing.campaign_type,
      subject: editing.subject, preheader: editing.preheader,
      body_html: editing.body_html, mailerlite_group: editing.mailerlite_group,
      scheduled_at: editing.scheduled_at || null, status: editing.status || "draft",
    };
    if (editing.id) {
      await supabase.from("email_campaigns").update(payload).eq("id", editing.id);
    } else {
      const { data: u } = await supabase.auth.getUser();
      await supabase.from("email_campaigns").insert({ ...payload, created_by: u.user?.id });
    }
    setEditing(null); load();
  };

  const approve = async (c: Campaign) => {
    if (!confirm(`Approve "${c.name}" for sending at ${c.scheduled_at ? new Date(c.scheduled_at).toLocaleString() : "next dispatch"}?`)) return;
    const { data: u } = await supabase.auth.getUser();
    await supabase.from("email_campaigns").update({
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: u.user?.id,
    }).eq("id", c.id);
    load();
  };

  const cancel = async (c: Campaign) => {
    await supabase.from("email_campaigns").update({ status: "cancelled" }).eq("id", c.id);
    load();
  };

  const remove = async (c: Campaign) => {
    if (!confirm(`Delete "${c.name}"?`)) return;
    await supabase.from("email_campaigns").delete().eq("id", c.id);
    load();
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ letterSpacing: 4, fontSize: 10, color: "#8a6a4c", textTransform: "uppercase" }}>Newsletters</div>
          <h1 style={{ fontWeight: 400, fontSize: 32, margin: "6px 0 0" }}>Campaigns</h1>
        </div>
        <button style={btnPrimary} onClick={() => setEditing(empty())}>+ New campaign</button>
      </header>

      <div style={{ display: "grid", gap: 10 }}>
        {list.map(c => (
          <div key={c.id} style={{
            background: "#fbf6ee", border: "1px solid #e8d9c4", borderRadius: 4,
            padding: "16px 18px", display: "flex", gap: 16, alignItems: "center",
            flexWrap: "wrap", justifyContent: "space-between"
          }}>
            <div style={{ flex: "1 1 280px" }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#8a6a4c", textTransform: "uppercase" }}>
                {TYPES.find(t => t.id === c.campaign_type)?.label || c.campaign_type}
              </div>
              <div style={{ fontSize: 18, marginTop: 2 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: "#5a4434", marginTop: 4 }}>{c.subject}</div>
              <div style={{ fontSize: 12, color: "#8a6a4c", marginTop: 4 }}>
                {c.scheduled_at ? `Scheduled: ${new Date(c.scheduled_at).toLocaleString()}` : "No schedule"}
              </div>
              {c.send_error && <div style={{ fontSize: 12, color: "#7a2f1f", marginTop: 4 }}>Error: {c.send_error}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <StatusBadge status={c.status} />
              {c.status === "draft" && <button style={linkBtn} onClick={() => approve(c)}>Approve & schedule</button>}
              {(c.status === "approved" || c.status === "scheduled") && <button style={linkBtn} onClick={() => cancel(c)}>Cancel</button>}
              <button style={linkBtn} onClick={() => setEditing(c)}>Edit</button>
              <button style={linkBtn} onClick={() => remove(c)}>Delete</button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#8a6a4c",
            background: "#fbf6ee", border: "1px dashed #d9c2a3", borderRadius: 4 }}>
            No campaigns yet. Create your first newsletter to get started.
          </div>
        )}
      </div>

      {editing && (
        <div style={modalOverlay} onClick={() => setEditing(null)}>
          <div style={modal} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontWeight: 400, fontSize: 24, marginTop: 0 }}>
              {editing.id ? "Edit campaign" : "New campaign"}
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="Internal name">
                <input style={inp} value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })} />
              </Field>
              <Field label="Type">
                <select style={inp} value={editing.campaign_type}
                  onChange={e => setEditing({ ...editing, campaign_type: e.target.value })}>
                  {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </Field>
              <Field label="Subject line">
                <input style={inp} value={editing.subject || ""} onChange={e => setEditing({ ...editing, subject: e.target.value })} />
              </Field>
              <Field label="Preheader (preview text)">
                <input style={inp} value={editing.preheader || ""} onChange={e => setEditing({ ...editing, preheader: e.target.value })} />
              </Field>
              <Field label="MailerLite group">
                <input style={inp} value={editing.mailerlite_group || ""} onChange={e => setEditing({ ...editing, mailerlite_group: e.target.value })} />
              </Field>
              <Field label="Schedule (your local time)">
                <input style={inp} type="datetime-local"
                  value={editing.scheduled_at ? toLocalInput(editing.scheduled_at) : ""}
                  onChange={e => setEditing({ ...editing, scheduled_at: e.target.value ? new Date(e.target.value).toISOString() : "" })} />
              </Field>
              <Field label="Body (HTML supported)">
                <textarea style={{ ...inp, minHeight: 180, fontFamily: "inherit" }}
                  value={editing.body_html || ""}
                  onChange={e => setEditing({ ...editing, body_html: e.target.value })} />
              </Field>
            </div>
            <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button style={linkBtn} onClick={() => setEditing(null)}>Cancel</button>
              <button style={btnPrimary} onClick={save}>Save draft</button>
            </div>
            <p style={{ fontSize: 12, color: "#8a6a4c", marginTop: 12 }}>
              Drafts are saved only. Use <strong>Approve & schedule</strong> on the list to authorize sending.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function toLocalInput(iso: string) {
  const d = new Date(iso); const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { bg: string; fg: string }> = {
    draft: { bg: "#f3e6d3", fg: "#8a6a4c" },
    approved: { bg: "#fbecc6", fg: "#7a5a1f" },
    scheduled: { bg: "#dde7f2", fg: "#2f4a7a" },
    sending: { bg: "#dde7f2", fg: "#2f4a7a" },
    sent: { bg: "#d8e7d2", fg: "#2f5a32" },
    failed: { bg: "#fbe6e2", fg: "#7a2f1f" },
    cancelled: { bg: "#e8d9c4", fg: "#5a4434" },
  };
  const s = map[status] || map.draft;
  return <span style={{ background: s.bg, color: s.fg, fontSize: 11,
    padding: "3px 10px", borderRadius: 999, textTransform: "capitalize" }}>{status}</span>;
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label style={{ display: "grid", gap: 4, fontSize: 11, letterSpacing: 1,
    color: "#8a6a4c", textTransform: "uppercase" }}>{label}{children}</label>
);

const btnPrimary: React.CSSProperties = { background: "#3d2a1f", color: "#fbf6ee",
  border: "none", padding: "10px 18px", letterSpacing: 2, fontSize: 12,
  textTransform: "uppercase", cursor: "pointer", borderRadius: 2 };
const linkBtn: React.CSSProperties = { background: "none", border: "none",
  color: "#8a6a4c", cursor: "pointer", textDecoration: "underline", fontSize: 13 };
const inp: React.CSSProperties = { padding: "10px 12px", border: "1px solid #d9c2a3",
  background: "#fbf6ee", borderRadius: 2, fontFamily: "inherit", fontSize: 14, width: "100%" };
const modalOverlay: React.CSSProperties = { position: "fixed", inset: 0,
  background: "rgba(61,42,31,0.4)", display: "flex", alignItems: "center",
  justifyContent: "center", padding: 24, zIndex: 50 };
const modal: React.CSSProperties = { background: "#fbf6ee", padding: "28px 30px",
  borderRadius: 6, maxWidth: 600, width: "100%", maxHeight: "90vh", overflow: "auto",
  border: "1px solid #e8d9c4" };