import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const { session, isAdmin, loading } = useAdminAuth();
  const nav = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      const { count } = await supabase
        .from("admin_alerts")
        .select("*", { count: "exact", head: true })
        .is("read_at", null);
      setUnread(count || 0);
    };
    load();
    const ch = supabase
      .channel("admin-alerts-nav")
      .on("postgres_changes", { event: "*", schema: "public", table: "admin_alerts" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [isAdmin]);

  if (loading) return <div style={S.loading}>Loading…</div>;
  if (!session) { nav("/admin/login", { replace: true }); return null; }
  if (isAdmin === false) {
    return (
      <div style={S.loading}>
        <div style={{ textAlign: "center" }}>
          <p>You don't have admin access.</p>
          <button style={S.linkBtn} onClick={async () => {
            await supabase.auth.signOut(); nav("/admin/login");
          }}>Sign out</button>
        </div>
      </div>
    );
  }

  const link = (to: string, label: string, badge?: number) => (
    <NavLink to={to} end style={({ isActive }) => ({
      ...S.navLink, ...(isActive ? S.navLinkActive : {}),
    })}>
      <span>{label}</span>
      {badge ? <span style={S.badge}>{badge}</span> : null}
    </NavLink>
  );

  return (
    <div style={S.wrap}>
      <aside style={S.aside}>
        <div style={S.brand}>
          <div style={S.eyebrow}>Leola Nichelle</div>
          <div style={S.brandTitle}>Atelier</div>
        </div>
        <nav style={{ display: "grid", gap: 4 }}>
          {link("/admin", "Dashboard", unread)}
          {link("/admin/orders", "Orders")}
          {link("/admin/campaigns", "Newsletters")}
          {link("/admin/calendar", "Calendar")}
        </nav>
        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <div style={S.user}>{session.user.email}</div>
          <button style={S.linkBtn} onClick={async () => {
            await supabase.auth.signOut(); nav("/admin/login");
          }}>Sign out</button>
        </div>
      </aside>
      <main style={S.main}><Outlet /></main>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  loading: { minHeight: "100vh", background: "#f6efe6", color: "#3d2a1f",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    fontFamily: "Georgia, serif" },
  wrap: { minHeight: "100vh", display: "grid", gridTemplateColumns: "240px 1fr",
    background: "#f6efe6", color: "#3d2a1f", fontFamily: "Georgia, 'Cormorant Garamond', serif" },
  aside: { background: "#fbf6ee", borderRight: "1px solid #e8d9c4",
    padding: "32px 20px", display: "flex", flexDirection: "column" },
  brand: { marginBottom: 24 },
  eyebrow: { letterSpacing: 4, fontSize: 10, color: "#8a6a4c", textTransform: "uppercase" },
  brandTitle: { fontSize: 22, marginTop: 2 },
  navLink: { textDecoration: "none", color: "#5a4434", padding: "10px 12px",
    borderRadius: 2, fontSize: 15, display: "flex", justifyContent: "space-between", alignItems: "center" },
  navLinkActive: { background: "#efe1ce", color: "#3d2a1f" },
  badge: { background: "#7a2f1f", color: "#fbf6ee", borderRadius: 999,
    fontSize: 11, padding: "2px 8px" },
  user: { fontSize: 12, color: "#7a5a44", marginBottom: 8, wordBreak: "break-all" },
  linkBtn: { background: "none", border: "none", color: "#8a6a4c",
    cursor: "pointer", textDecoration: "underline", fontSize: 13, padding: 0 },
  main: { padding: "32px 36px", overflow: "auto" },
};