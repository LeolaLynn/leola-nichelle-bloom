// Dispatches approved & scheduled newsletter campaigns to MailerLite.
// Intended to be triggered by a cron job every few minutes.
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const MAILERLITE_API_KEY = Deno.env.get("MAILERLITE_API_KEY");

async function sendToMailerLite(campaign: any): Promise<{ id?: string; error?: string }> {
  if (!MAILERLITE_API_KEY) return { error: "MAILERLITE_API_KEY not configured" };
  try {
    // Create + schedule a campaign via MailerLite classic API.
    const res = await fetch("https://connect.mailerlite.com/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        name: campaign.name,
        type: "regular",
        emails: [{
          subject: campaign.subject,
          from_name: "Leola Nichelle",
          from: `noreply@notify.leolanichelle.com`,
          content: campaign.body_html,
        }],
        groups: campaign.mailerlite_group ? [campaign.mailerlite_group] : [],
      }),
    });
    const data = await res.json();
    if (!res.ok) return { error: JSON.stringify(data) };
    return { id: data?.data?.id };
  } catch (e) {
    return { error: String(e) };
  }
}

Deno.serve(async () => {
  const now = new Date().toISOString();
  const { data: due, error } = await supabase
    .from("email_campaigns")
    .select("*")
    .eq("status", "approved")
    .lte("scheduled_at", now)
    .limit(20);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  const results: any[] = [];
  for (const c of due || []) {
    await supabase.from("email_campaigns").update({ status: "sending" }).eq("id", c.id);
    const { id, error: sendErr } = await sendToMailerLite(c);
    if (sendErr) {
      await supabase.from("email_campaigns").update({
        status: "failed",
        send_error: sendErr,
      }).eq("id", c.id);
      results.push({ id: c.id, ok: false, error: sendErr });
    } else {
      await supabase.from("email_campaigns").update({
        status: "sent",
        sent_at: new Date().toISOString(),
        mailerlite_campaign_id: id || null,
      }).eq("id", c.id);
      results.push({ id: c.id, ok: true });
    }
  }
  return new Response(JSON.stringify({ processed: results.length, results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});