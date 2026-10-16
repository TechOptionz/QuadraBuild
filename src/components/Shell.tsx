"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QB from "@/lib/qb-engine";
import { navTo, openDrawer } from "./ui";

const SERVICES: [string, string][] = [["Quadra Renovations", "/renovations"], ["Quadra Homes", "/homes"], ["Quadra Commercial", "/commercial"], ["Quadra Approvals", "/approvals"]];
const NAV: [string, string][] = [["Home", "/"], ["About", "/about"], ["Projects", "/projects"], ["Contact", "/contact"]];

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <a href={href} onClick={navTo} data-navlink><span data-nav-a>{label}</span><span data-nav-b aria-hidden="true">{label}</span></a>
);

/** Persistent shell: cursor glow, header, mobile menu, enquiry drawer. Lives in the root layout across routes. */
export default function Shell() {
  const router = useRouter();
  const [time, setTime] = useState("--:--");
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "unconfigured">("idle");

  useEffect(() => {
    QB.push = (href: string) => router.push(href);
    QB.prefetchRoute = (href: string) => router.prefetch(href);
    QB.onMenuState = (open: boolean) => setMenuOpen(open);
    const tick = () => setTime(QB.brisbaneTime()); tick(); const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, [router]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = e.currentTarget; const errs = QB.validate(f); setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const fd = new FormData(f); const body = Object.fromEntries(fd.entries());
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setStatus("sent"); f.reset(); } else if (j.unconfigured) setStatus("unconfigured"); else setStatus("failed");
    } catch { setStatus("failed"); }
  };

  return (
    <div data-shell>
      <div data-glow style={{ position: "fixed", left: 0, top: 0, width: "40vw", height: "40vw", margin: "-20vw 0 0 -20vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,101,0,.6) 0%,rgba(255,101,0,0) 62%)", mixBlendMode: "screen", opacity: 0.16, pointerEvents: "none", zIndex: 1150, display: "none" }} />

      <header data-header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200, height: "var(--hh)", color: "#F9F4EE", opacity: 0, background: "rgba(58,51,48,.5)", backdropFilter: "blur(18px) saturate(140%)", WebkitBackdropFilter: "blur(18px) saturate(140%)", borderBottom: "1px solid rgba(249,244,238,.08)", boxShadow: "0 1px 0 rgba(0,0,0,.25)" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", padding: "0 var(--pad)" }}>
          <a href="/" onClick={navTo} data-logo aria-label="Quadra Build — home" style={{ display: "flex", alignItems: "center", flex: "none", paddingLeft: "1.4rem" }}>
            <Image src="/brand/qb-lockup.png" alt="Quadra Build" width={1179} height={726} sizes="240px" loading="eager" style={{ height: "min(5rem, calc(var(--hh) - .5rem))", width: "auto", display: "block" }} />
          </a>
          <nav data-r="desk" aria-label="Primary" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "flex", gap: "2.6rem", alignItems: "center", whiteSpace: "nowrap" }}>
              <NavLink label="Home" href="/" />
              <NavLink label="About" href="/about" />
              <div data-svc style={{ position: "relative", display: "flex" }}>
                <NavLink label="Services" href="/services" />
                <div data-svc-panel style={{ position: "absolute", top: "100%", left: "-1.2rem", paddingTop: ".6rem", opacity: 0, transform: "translateY(.5rem)", pointerEvents: "none" }}>
                  <div style={{ background: "rgba(46,40,38,.9)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", color: "#F9F4EE", padding: ".8rem 1.2rem", display: "flex", flexDirection: "column", minWidth: "16rem", border: "1px solid rgba(249,244,238,.1)" }}>
                    {SERVICES.map(([l, h]) => (
                      <a key={h} href={h} onClick={navTo} data-svc-item><span data-svc-bar /><span>{l}</span><span data-svc-arrow>↗</span></a>
                    ))}
                    <a href="/services" onClick={navTo} data-svc-item data-svc-all style={{ marginTop: ".4rem", paddingTop: ".9rem", borderTop: "1px solid rgba(249,244,238,.14)", color: "#F9F4EE", fontWeight: 700 }}><span data-svc-bar /><span>All Services</span><span data-svc-arrow>↗</span></a>
                  </div>
                </div>
              </div>
              <NavLink label="Projects" href="/projects" />
              <NavLink label="Contact" href="/contact" />
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
            <span className="sans" style={{ fontWeight: 500, fontSize: "calc(var(--l1) * 1.05)", lineHeight: 1.45, letterSpacing: ".1em", textTransform: "uppercase", fontVariantNumeric: "tabular-nums", opacity: 0.85 }} suppressHydrationWarning>{time} BNE</span>
            <button data-r="desk" data-cta onClick={openDrawer} className="sans" style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", background: "rgba(255,101,0,.08)", border: "1px solid rgba(255,101,0,.75)", borderRadius: 999, padding: ".7rem 1.3rem .7rem 1.1rem", color: "inherit", cursor: "pointer", fontWeight: 700, fontSize: "calc(var(--l1) * 1.08)", lineHeight: 1, letterSpacing: ".1em", textTransform: "uppercase", transition: "background .4s,color .4s,border-color .4s" }}>
              <span data-cta-dot style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6500", display: "block", transition: "background .4s" }} /><span>Let&apos;s Talk</span>
            </button>
            <button data-r="mob" onClick={() => QB.toggleMenu()} aria-label="Menu" className="lab" style={{ display: "flex", alignItems: "center", gap: ".7rem", background: "none", border: 0, padding: 0, color: "inherit", cursor: "pointer" }}>
              <span data-menu-icon style={{ display: "flex", gap: 3 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }} /><span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }} /></span>
              <span>{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <div data-menu data-lenis-prevent style={{ position: "fixed", inset: 0, zIndex: 1100, background: "#211A19", color: "#F9F4EE", display: "none", opacity: 0, flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: "var(--hh) var(--pad) 6rem", overflow: "auto" }}>
        <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "28rem", textAlign: "center", margin: "auto 0" }}>
          {NAV.slice(0, 2).map(([l, h]) => (
            <span key={h} style={{ display: "contents" }}>
              <a href={h} onClick={navTo} data-el="ctn" className="h2t" style={{ display: "block", padding: "1rem 0" }}>{l}</a>
              <span data-el="ctn" style={{ display: "block", width: "2rem", height: 1, background: "rgba(249,244,238,.25)" }} />
            </span>
          ))}
          <a href="/services" onClick={navTo} data-el="ctn" className="h2t" style={{ display: "block", padding: "1rem 0" }}>Services</a>
          <div data-el="ctn" style={{ display: "flex", flexDirection: "column", gap: ".8rem", padding: ".2rem 0 1.2rem" }}>
            {SERVICES.map(([l, h]) => <a key={h} href={h} onClick={navTo} className="lab5" style={{ color: "rgba(249,244,238,.75)" }}>{l}</a>)}
          </div>
          <span data-el="ctn" style={{ display: "block", width: "2rem", height: 1, background: "rgba(249,244,238,.25)" }} />
          {NAV.slice(2).map(([l, h], i) => (
            <span key={h} style={{ display: "contents" }}>
              <a href={h} onClick={navTo} data-el="ctn" className="h2t" style={{ display: "block", padding: "1rem 0" }}>{l}</a>
              {i === 0 && <span data-el="ctn" style={{ display: "block", width: "2rem", height: 1, background: "rgba(249,244,238,.25)" }} />}
            </span>
          ))}
          <button onClick={openDrawer} data-el="ctn" className="lab" style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "none", border: 0, padding: "1.6rem 0 0", color: "inherit", cursor: "pointer" }}><span className="dot" /><span>Let&apos;s Talk</span></button>
        </nav>
        <div data-el="ctn" className="lab5" style={{ position: "absolute", left: "var(--pad)", bottom: "var(--pad)", display: "flex", flexDirection: "column", gap: ".2rem", color: "rgba(249,244,238,.6)" }}><span>© 2026.</span><span>Quadra Build.</span><span>All rights reserved.</span></div>
      </div>

      <div data-drawer-overlay onClick={() => QB.closeDrawer()} style={{ position: "fixed", inset: 0, background: "rgba(33,26,25,.45)", zIndex: 1300, display: "none", opacity: 0 }} />
      <aside data-drawer data-r="drawer" data-lenis-prevent aria-label="Enquiry" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "60vw", background: "#F9F4EE", color: "#211A19", zIndex: 1301, transform: "translateX(100%)", display: "none", overflow: "auto", padding: "3rem" }}>
        <button data-magnetic onClick={() => QB.closeDrawer()} aria-label="Close" className="sans" style={{ position: "absolute", top: "1.2rem", right: "1.2rem", width: "3.4rem", height: "3.4rem", borderRadius: "50%", border: "1px solid rgba(33,26,25,.3)", background: "none", color: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", lineHeight: 1 }}><span>×</span></button>
        <div data-drawer-grid style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", minHeight: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "3rem" }}>
            <div>
              <div data-el="ctn" className="lab" style={{ marginBottom: "2rem" }}>Get in touch</div>
              <h2 data-el="h" className="h1"><span data-ln className="ln">Let&apos;s</span><span data-ln className="ln">Begin.</span></h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", maxWidth: "24rem" }}>
              <p data-el="p" className="p1">Whether you are planning a renovation, a new home, a commercial space or an approval pathway, tell us what you have in mind. We will help identify the right next conversation.</p>
              <p data-el="p" className="p1" style={{ color: "rgba(33,26,25,.65)" }}>Share as much detail as you can. We will be in touch to discuss next steps.</p>
            </div>
          </div>
          <form onSubmit={submit} noValidate data-el="ctn" style={{ display: "flex", flexDirection: "column", gap: "1.6rem", paddingTop: ".4rem" }}>
            <label className="field"><span>Full name *</span><input name="name" type="text" autoComplete="name" className="input" />{errors.name && <span className="err">{errors.name}</span>}</label>
            <label className="field"><span>Email *</span><input name="email" type="email" autoComplete="email" className="input" />{errors.email && <span className="err">{errors.email}</span>}</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.6rem" }}>
              <label className="field"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" placeholder="+61" className="input" /></label>
              <label className="field"><span>Suburb / postcode</span><input name="suburb" type="text" className="input" /></label>
            </div>
            <label className="field"><span>Project type</span>
              <select name="type" className="input" defaultValue="">
                <option value="">Select</option><option>Renovation</option><option>New Home</option><option>Granny Flat</option><option>Commercial Fit-out</option><option>Development Approval</option><option>Outdoor Works</option><option>Other</option>
              </select>
            </label>
            <label className="field"><span>Message *</span><textarea name="message" rows={4} className="input" />{errors.message && <span className="err">{errors.message}</span>}</label>
            <label className="sans" style={{ display: "flex", gap: ".8rem", alignItems: "flex-start", fontSize: "var(--p1)", lineHeight: 1.4, color: "rgba(33,26,25,.8)" }}>
              <input name="consent" type="checkbox" style={{ accentColor: "#FF6500", margin: ".25em 0 0", flex: "none" }} />
              <span>I agree to the handling of my information under the <a href="/privacy-policy" onClick={navTo} style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>Privacy Policy</a>.</span>
            </label>
            {errors.consent && <span className="err" style={{ marginTop: "-1rem" }}>{errors.consent}</span>}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: ".6rem" }}>
              <button type="submit" data-ul disabled={status === "sending"} style={{ minWidth: "14rem" }}>
                <span className="ul-row"><span>{status === "sending" ? "Sending…" : "Send Enquiry"}</span><span>→</span></span><span className="ul-base" /><span data-ul-line className="ul-line" />
              </button>
            </div>
            {status === "sent" && <p className="p1" style={{ borderTop: "1px solid rgba(33,26,25,.15)", paddingTop: "1.2rem" }}>Thank you. Your enquiry has been sent and we will be in touch to discuss next steps.</p>}
            {status === "failed" && <p className="p1" style={{ borderTop: "1px solid rgba(33,26,25,.15)", paddingTop: "1.2rem" }}>We couldn&apos;t send your enquiry. Please try again or contact us directly.</p>}
            {status === "unconfigured" && (
              <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", borderTop: "1px solid rgba(33,26,25,.15)", paddingTop: "1.2rem" }}>
                <p className="p1" style={{ lineHeight: 1.4 }}>We couldn&apos;t send your enquiry. Please try again or contact us directly.</p>
                <p style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace", fontSize: ".7rem", lineHeight: 1.5, letterSpacing: ".02em", color: "#C8460B" }}>DEV NOTE · No submission endpoint is configured. Set RESEND_API_KEY, ENQUIRY_TO and ENQUIRY_FROM in .env.local (see /api/enquiry) and the verified contact email/phone before launch. Validation passed; nothing was sent.</p>
              </div>
            )}
          </form>
        </div>
      </aside>
    </div>
  );
}
