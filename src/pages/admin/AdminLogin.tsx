import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      nav("/admin");
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        <div style={S.eyebrow}>Leola Nichelle · Admin</div>
        <h1 style={S.h1}>{mode === "signin" ? "Sign in" : "Create owner account"}</h1>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input style={S.input} placeholder="Email" type="email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input style={S.input} placeholder="Password" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          {error && <div style={S.err}>{error}</div>}
          <button style={S.btn} disabled={loading}>
            {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={S.linkBtn}>
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        <p style={S.note}>
          Owner access is granted automatically to <strong>leolalynn8277@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", background: "#f6efe6", color: "#3d2a1f",
    fontFamily: "Georgia, 'Cormorant Garamond', serif",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { background: "#fbf6ee", border: "1px solid #e8d9c4", borderRadius: 8,
    padding: "40px 32px", width: "100%", maxWidth: 420 },
  eyebrow: { letterSpacing: 4, fontSize: 11, color: "#8a6a4c", textTransform: "uppercase" },
  h1: { fontWeight: 400, fontSize: 26, margin: "8px 0 20px" },
  input: { background: "transparent", border: "1px solid #d9c2a3", padding: "12px 14px",
    fontFamily: "inherit", fontSize: 15, color: "#3d2a1f", borderRadius: 2 },
  btn: { background: "#3d2a1f", color: "#fbf6ee", border: "none",
    padding: "12px 18px", letterSpacing: 2, fontSize: 12, textTransform: "uppercase",
    cursor: "pointer", borderRadius: 2 },
  linkBtn: { background: "none", border: "none", color: "#8a6a4c",
    marginTop: 16, cursor: "pointer", fontSize: 13, textDecoration: "underline" },
  err: { background: "#fbe6e2", border: "1px solid #d99d8f", color: "#7a2f1f",
    padding: 10, fontSize: 13, borderRadius: 2 },
  note: { fontSize: 12, color: "#7a5a44", marginTop: 18, lineHeight: 1.5 },
};