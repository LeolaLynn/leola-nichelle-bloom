import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<"loading" | "ready" | "done" | "invalid" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON },
        });
        if (!res.ok) { setState("invalid"); return; }
        const json = await res.json().catch(() => ({}));
        setEmail(json?.email || null);
        setState("ready");
      } catch { setState("error"); }
    })();
  }, [token]);

  const confirm = async () => {
    const { error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
    setState(error ? "error" : "done");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6efe6",
      color: "#3d2a1f",
      fontFamily: "Georgia, 'Cormorant Garamond', serif",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "32px",
    }}>
      <div style={{
        maxWidth: 480, width: "100%", background: "#fbf6ee",
        padding: "44px 32px", borderRadius: 8, border: "1px solid #e8d9c4", textAlign: "center",
      }}>
        <div style={{ letterSpacing: 4, fontSize: 11, color: "#8a6a4c", textTransform: "uppercase" }}>
          Leola Nichelle
        </div>
        {state === "loading" && <p style={{ marginTop: 24 }}>Checking your link…</p>}
        {state === "invalid" && (
          <>
            <h1 style={{ fontWeight: 400 }}>Link expired</h1>
            <p>This unsubscribe link is invalid or already used.</p>
          </>
        )}
        {state === "ready" && (
          <>
            <h1 style={{ fontWeight: 400, fontSize: 28, margin: "16px 0 8px" }}>Leaving the ritual?</h1>
            <p style={{ color: "#5a4434" }}>
              {email ? <>Unsubscribe <strong>{email}</strong> from Leola Nichelle emails.</> : "Confirm to unsubscribe from Leola Nichelle emails."}
            </p>
            <button onClick={confirm} style={{
              marginTop: 20, background: "#3d2a1f", color: "#fbf6ee",
              border: "none", padding: "14px 28px", letterSpacing: 2, fontSize: 12,
              textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
            }}>Confirm Unsubscribe</button>
          </>
        )}
        {state === "done" && (
          <>
            <h1 style={{ fontWeight: 400 }}>You're unsubscribed</h1>
            <p>You won't receive marketing emails from us. We'll miss you.</p>
          </>
        )}
        {state === "error" && <p>Something went wrong. Please try again.</p>}
      </div>
    </div>
  );
}