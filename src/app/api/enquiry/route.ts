import { NextResponse } from "next/server";
import { enquiryTypes, normaliseEnquiry, validateEnquiry } from "@/lib/enquiry";

/**
 * Receives contact form enquiries.
 *
 * Delivery is via a webhook configured in ENQUIRY_WEBHOOK_URL (e.g. Formspree,
 * Make, Zapier, Power Automate or a CRM endpoint). If it is not configured the
 * route responds 503 with `code: "not_configured"` so the form can tell the
 * visitor their enquiry was NOT sent — it never reports a false success.
 */
export async function POST(request: Request) {
  const isJson = request.headers.get("content-type")?.includes("application/json") ?? false;
  let body: unknown;
  try {
    // JSON from the enhanced form; a native form post (no JavaScript) is also accepted.
    body = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return reply(isJson, request, { ok: false, code: "bad_request", message: "Invalid request." }, 400);
  }
  const res = await handle(body);
  return reply(isJson, request, res.body, res.status);
}

type Result = { status: number; body: { ok: boolean; code?: string; message?: string; errors?: object } };

/** JSON for the enhanced form; a redirect back to the contact page for native form posts. */
function reply(isJson: boolean, request: Request, body: Result["body"], status: number) {
  if (isJson) return NextResponse.json(body, { status });
  const url = new URL("/contact", request.url);
  url.searchParams.set("enquiry", body.ok ? "sent" : (body.code ?? "failed"));
  return NextResponse.redirect(url, 303);
}

async function handle(body: unknown): Promise<Result> {
  // Honeypot: real visitors never fill this hidden field.
  const company = (body as Record<string, unknown> | null)?.company_website;
  if (typeof company === "string" && company.trim() !== "") {
    return { status: 400, body: { ok: false, code: "rejected", message: "Submission rejected." } };
  }

  const enquiry = normaliseEnquiry(body);
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return { status: 422, body: { ok: false, code: "invalid", errors } };
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[enquiry] ENQUIRY_WEBHOOK_URL is not set — enquiry was not delivered.");
    return {
      status: 503,
      body: {
        ok: false,
        code: "not_configured",
        message: "Online enquiries are not connected yet, so your enquiry has not been sent.",
      },
    };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...enquiry,
        projectTypeLabel: enquiryTypes.find((t) => t.value === enquiry.projectType)?.label ?? enquiry.projectType,
        submittedAt: new Date().toISOString(),
        source: "quadra-build-website",
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[enquiry] Delivery failed:", err);
    return {
      status: 502,
      body: { ok: false, code: "delivery_failed", message: "We couldn't send your enquiry just now. Please try again." },
    };
  }

  return { status: 200, body: { ok: true } };
}
