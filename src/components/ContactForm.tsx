"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  budgetOptions,
  emptyEnquiry,
  enquiryTypes,
  timeframeOptions,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { placeholderText, shouldRender, site } from "@/content/site";
import { Arrow } from "./Icons";
import { Confirmed } from "./Placeholder";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; kind: "not_configured" | "failed" | "invalid"; message: string };

const genericFailure = "Something went wrong and your enquiry was not sent. Please try again.";
const notConfigured: Status = {
  state: "error",
  kind: "not_configured",
  message:
    site.contact.phone || site.contact.email
      ? "Online enquiries aren't connected yet, so your enquiry has not been sent. Please contact us directly using the details on this page."
      : "Online enquiries aren't connected yet, so your enquiry has not been sent. Please try again later.",
};

const fieldOrder: (keyof Enquiry)[] = ["projectType", "name", "email", "phone", "location", "budget", "timeframe", "description"];

export function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");
  // Before hydration the form falls back to a native POST with browser validation.
  const [hydrated, setHydrated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Pre-select the enquiry type when arriving from a division page (?type=renovations),
  // and show the outcome of a native (no-JavaScript) submission (?enquiry=...).
  useEffect(() => {
    setHydrated(true);
    const outcome = params.get("enquiry");
    if (outcome === "sent") setStatus({ state: "success" });
    else if (outcome === "not_configured") setStatus(notConfigured);
    else if (outcome) setStatus({ state: "error", kind: "failed", message: genericFailure });
    const type = params.get("type");
    if (type && enquiryTypes.some((t) => t.value === type)) {
      setValues((v) => (v.projectType ? v : { ...v, projectType: type }));
    }
  }, [params]);

  useEffect(() => {
    if (status.state === "error") statusRef.current?.focus();
    if (status.state === "success") successRef.current?.focus();
  }, [status]);

  const update = (key: keyof Enquiry, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key] || errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateEnquiry(next)[key] }));
    }
  };

  const blur = (key: keyof Enquiry) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateEnquiry(values)[key] }));
  };

  const focusFirstError = (errs: EnquiryErrors) => {
    const first = fieldOrder.find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.state === "submitting") return;

    const errs = validateEnquiry(values);
    setErrors(errs);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    if (Object.keys(errs).length > 0) {
      setStatus({ state: "idle" });
      focusFirstError(errs);
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; message?: string; errors?: EnquiryErrors };

      if (res.ok && data.ok) {
        setStatus({ state: "success" });
        return;
      }
      if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus({ state: "error", kind: "invalid", message: "Please check the highlighted fields and try again." });
        return;
      }
      if (data.code === "not_configured") {
        setStatus(notConfigured);
        return;
      }
      setStatus({
        state: "error",
        kind: "failed",
        message: data.message ?? genericFailure,
      });
    } catch {
      setStatus({
        state: "error",
        kind: "failed",
        message: "We couldn't reach the server, so your enquiry was not sent. Please check your connection and try again.",
      });
    }
  };

  if (status.state === "success") {
    return (
      <div className="success-panel" ref={successRef} tabIndex={-1} role="status">
        <p className="eyebrow eyebrow--accent">Enquiry sent</p>
        <h2 className="h-lg">
          Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""} — we&apos;ve received your enquiry.
        </h2>
        <p className="lead">
          Your project details have been sent to the {site.name} team. We&apos;ll be in touch using the contact details
          you provided.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn--outline">
            <span>Back to home</span>
            <Arrow />
          </Link>
          <Link href="/projects" className="btn btn--outline">
            <span>View projects</span>
            <Arrow />
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: keyof Enquiry) => (touched[k] || status.state !== "idle" ? errors[k] : undefined);
  const describedBy = (k: keyof Enquiry, hint?: boolean) =>
    [hint ? `${k}-hint` : null, err(k) ? `${k}-error` : null].filter(Boolean).join(" ") || undefined;

  const submitting = status.state === "submitting";

  return (
    <form
      ref={formRef}
      className="form"
      method="post"
      action="/api/enquiry"
      onSubmit={onSubmit}
      noValidate={hydrated}
      aria-busy={submitting} aria-labelledby="form-title">
      <div>
        <h2 id="form-title" className="h-lg">
          Tell Us About Your Project
        </h2>
        <p className="muted" style={{ marginTop: "0.75rem" }}>
          Fields marked optional can be left blank. Everything else helps us respond properly.
        </p>
      </div>

      <fieldset>
        <legend id="projectType-legend">
          <span className="step">01</span> What can we help with?
        </legend>
        <div
          className="choice-grid"
          role="radiogroup"
          aria-labelledby="projectType-legend"
          aria-invalid={err("projectType") ? true : undefined}
          aria-describedby={describedBy("projectType")}
        >
          {enquiryTypes.map((t) => (
            <label key={t.value} className="choice">
              <input
                type="radio"
                name="projectType"
                value={t.value}
                checked={values.projectType === t.value}
                required
                onChange={(e) => {
                  update("projectType", e.target.value);
                  setTouched((x) => ({ ...x, projectType: true }));
                  setErrors((prev) => ({ ...prev, projectType: undefined }));
                }}
              />
              <span className="card">
                <strong>{t.label}</strong>
                <span>{t.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {err("projectType") && (
          <p id="projectType-error" className="field-error" style={{ marginTop: "0.6rem" }}>
            {err("projectType")}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend>
          <span className="step">02</span> Your details
        </legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              className="input"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => blur("name")}
              aria-invalid={err("name") ? true : undefined}
              aria-describedby={describedBy("name")}
              required
            />
            {err("name") && (
              <p id="name-error" className="field-error">
                {err("name")}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-invalid={err("email") ? true : undefined}
              aria-describedby={describedBy("email")}
              required
            />
            {err("email") && (
              <p id="email-error" className="field-error">
                {err("email")}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="phone">
              Phone<span className="optional">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="input"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => blur("phone")}
              aria-invalid={err("phone") ? true : undefined}
              aria-describedby={describedBy("phone")}
            />
            {err("phone") && (
              <p id="phone-error" className="field-error">
                {err("phone")}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="location">Project location</label>
            <input
              id="location"
              name="location"
              className="input"
              autoComplete="address-level2"
              placeholder="Suburb, e.g. Brisbane City"
              value={values.location}
              onChange={(e) => update("location", e.target.value)}
              onBlur={() => blur("location")}
              aria-invalid={err("location") ? true : undefined}
              aria-describedby={describedBy("location")}
              required
            />
            {err("location") && (
              <p id="location-error" className="field-error">
                {err("location")}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="step">03</span> Project details
        </legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="budget">
              Approximate budget<span className="optional">(optional)</span>
            </label>
            <select
              id="budget"
              name="budget"
              className="select"
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              aria-invalid={err("budget") ? true : undefined}
              aria-describedby={describedBy("budget")}
            >
              <option value="">Select a range</option>
              {budgetOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {err("budget") && (
              <p id="budget-error" className="field-error">
                {err("budget")}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="timeframe">
              Timeframe<span className="optional">(optional)</span>
            </label>
            <select
              id="timeframe"
              name="timeframe"
              className="select"
              value={values.timeframe}
              onChange={(e) => update("timeframe", e.target.value)}
              aria-invalid={err("timeframe") ? true : undefined}
              aria-describedby={describedBy("timeframe")}
            >
              <option value="">Select a timeframe</option>
              {timeframeOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {err("timeframe") && (
              <p id="timeframe-error" className="field-error">
                {err("timeframe")}
              </p>
            )}
          </div>
          <div className="field full">
            <label htmlFor="description">Project description</label>
            <p id="description-hint" className="hint">
              What would you like to achieve? Include anything useful — the current situation, scope, plans or approvals
              you already have.
            </p>
            <textarea
              id="description"
              name="description"
              className="textarea"
              rows={6}
              maxLength={4000}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              onBlur={() => blur("description")}
              aria-invalid={err("description") ? true : undefined}
              aria-describedby={describedBy("description", true)}
              required
            />
            {err("description") && (
              <p id="description-error" className="field-error">
                {err("description")}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Honeypot (hidden from people and assistive technology) */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status.state === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className={`form-status ${status.kind === "not_configured" ? "form-status--warning" : "form-status--error"}`}
        >
          <span className="dot" aria-hidden="true" />
          <div>
            <strong>{status.kind === "not_configured" ? "Enquiry not sent" : "Your enquiry wasn't sent"}</strong>
            <p>{status.message}</p>
            {status.kind !== "invalid" && (shouldRender(site.contact.phone) || shouldRender(site.contact.email)) && (
              <p style={{ marginTop: "0.5rem" }}>
                {shouldRender(site.contact.phone) && (
                  <>
                    Phone: <Confirmed value={site.contact.phone} fallback={placeholderText.phone} />
                  </>
                )}
                {shouldRender(site.contact.phone) && shouldRender(site.contact.email) && " · "}
                {shouldRender(site.contact.email) && (
                  <>
                    Email: <Confirmed value={site.contact.email} fallback={placeholderText.email} />
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="form-footer">
        <p>
          We&apos;ll only use your details to respond to your enquiry. See our{" "}
          <Link href="/privacy" className="text-link">
            privacy information
          </Link>
          .
        </p>
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send Enquiry</span>
              <Arrow />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}
