// Edge function: subscribe an email to a MailerLite group
// Public endpoint (verify_jwt = false default). Validates input with Zod.
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Map app-side group slugs → MailerLite group IDs OR group names.
// We'll resolve names to IDs via the MailerLite groups API at runtime.
const GROUP_NAMES: Record<string, string> = {
  "ritual-list": "Ritual List",
  "endless-summer-waitlist": "Endless Summer Waitlist",
  "gothic-romance-waitlist": "Gothic Romance Waitlist",
  "holiday-waitlist": "Holiday Waitlist",
  "vip-waitlist": "VIP Waitlist",
};

const Body = z.object({
  email: z.string().email().max(255),
  group: z.enum([
    "ritual-list",
    "endless-summer-waitlist",
    "gothic-romance-waitlist",
    "holiday-waitlist",
    "vip-waitlist",
  ]),
  name: z.string().max(120).optional(),
  source: z.string().max(60).optional(),
});

const ML_BASE = "https://connect.mailerlite.com/api";

async function ensureGroup(apiKey: string, groupName: string): Promise<string> {
  // Find existing group
  const search = await fetch(`${ML_BASE}/groups?filter[name]=${encodeURIComponent(groupName)}`, {
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
  });
  if (search.ok) {
    const j = await search.json();
    const found = (j.data ?? []).find((g: any) => g.name === groupName);
    if (found?.id) return String(found.id);
  }
  // Create it
  const create = await fetch(`${ML_BASE}/groups`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name: groupName }),
  });
  const cj = await create.json().catch(() => ({}));
  if (!create.ok || !cj?.data?.id) {
    throw new Error(`MailerLite group create failed: ${create.status} ${JSON.stringify(cj)}`);
  }
  return String(cj.data.id);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("MAILERLITE_API_KEY");
    if (!apiKey) throw new Error("MAILERLITE_API_KEY is not configured");

    const json = await req.json().catch(() => ({}));
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const { email, group, name, source } = parsed.data;
    const groupName = GROUP_NAMES[group];
    const groupId = await ensureGroup(apiKey, groupName);

    // Upsert subscriber and assign to group
    const upsert = await fetch(`${ML_BASE}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: { name: name ?? null, source: source ?? null },
        groups: [groupId],
        status: "active",
      }),
    });
    const uj = await upsert.json().catch(() => ({}));
    if (!upsert.ok) {
      throw new Error(`MailerLite subscribe failed: ${upsert.status} ${JSON.stringify(uj)}`);
    }

    return new Response(JSON.stringify({ ok: true, subscriber_id: uj?.data?.id ?? null }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("mailerlite-subscribe error", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
