import { NextResponse } from "next/server";

/* Enquiry handler. Sends via Resend when RESEND_API_KEY / ENQUIRY_TO / ENQUIRY_FROM are set; otherwise reports `unconfigured`
 * so the drawer can show the dev note (mirrors the design's "no submission endpoint" state). */
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(req: Request) {
  let body: Record<string, string>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 }); }
  const v = (k: string) => String(body[k] ?? "").trim();
  const name = v("name"), email = v("email"), message = v("message");
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Required Field";
  if (!email) errors.email = "Required Field"; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please Enter a Valid Email";
  if (!message) errors.message = "Required Field";
  if (!v("consent")) errors.consent = "Required Field";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY, to = process.env.ENQUIRY_TO, from = process.env.ENQUIRY_FROM;
  if (!key || !to || !from) return NextResponse.json({ ok: false, unconfigured: true }, { status: 503 });

  const rows: [string, string][] = [["Name", name], ["Email", email], ["Phone", v("phone")], ["Suburb / postcode", v("suburb")], ["Project type", v("type")], ["Message", message]];
  const html = `<h2>New website enquiry</h2><table cellpadding="6">${rows.map(([k, val]) => `<tr><td><b>${k}</b></td><td>${esc(val).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), reply_to: email, subject: `Enquiry from ${name}${v("type") ? ` · ${v("type")}` : ""}`, html }),
  });
  if (!r.ok) return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
